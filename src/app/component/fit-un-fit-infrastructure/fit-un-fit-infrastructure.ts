import { CommonModule, DatePipe, NgFor,Location } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FitUnfitSummary, FitUnfit,himis_PendigBillSummary,himis_PendigBill, PaidSummary, PaidDetails } from 'src/app/Model/DashProgressCount';
import { ApiService } from 'src/app/service/api.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MatTabsModule } from '@angular/material/tabs';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import * as XLSX from 'xlsx';
// declare module 'file-saver';
import * as FileSaver from 'file-saver';
import { InsertUserPageViewLogmodal } from 'src/app/Model/DashLoginDDL';


@Component({
  selector: 'app-fit-un-fit-infrastructure',
  standalone: true,
  imports: [
    MatSortModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatTableExporterModule,
    MatInputModule,
    MatDialogModule,
    NgbModule,
    MatMenuModule,
    CommonModule,
    MatIconModule,
    MatTabsModule,
    NgSelectModule,
  ],
  templateUrl: './fit-un-fit-infrastructure.html',
  styleUrl: './fit-un-fit-infrastructure.css',
})
export class FitUnFitInfrastructure {
  DId:any;
  isall: boolean = true;
  mainscheme: any[] = [];
  selectedTabIndex2: number = 0;
  himis_PendigBillSummary: himis_PendigBillSummary[] = [];
  himis_PendigBill: himis_PendigBill[] = [];
    PaidSummary: PaidSummary[] = [];
    PaidDetails: PaidDetails[] = [];
  dataSource!: MatTableDataSource<himis_PendigBillSummary>;
  dataSource1!: MatTableDataSource<himis_PendigBill>;
  dataSource2!: MatTableDataSource<PaidSummary>;
  dataSource3!: MatTableDataSource<PaidDetails>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginator1') paginator1!: MatPaginator;
    @ViewChild('paginator2') paginator2!: MatPaginator;
  @ViewChild('paginator3') paginator3!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;
  @ViewChild('sort1') sort1!: MatSort;

  @ViewChild('sort2') sort2!: MatSort;
  @ViewChild('sort3') sort3!: MatSort;
  displayedColumns: string[] = [
    // 'sno',
    // 'sno',
    'fund',
    'billdiv',
    'divgrossamt',
    'billse',
    'segrossamt',
    'billfin',
    'fingrossamt',
    // 'mainschemeid',
    // 'officeorder',
    // 'officeorder',
    'totalgross',
  ];
  displayedColumns1: string[] = [
    'sno',
    'pedingsection',
    'fund',
    'divisionname',
    'district',
    'worK_ID',
    'workname',
    'contractor',
    'billno',
    'billdate',
    'agrbillstatus',
    'measurementdate',
    'grossamount',
    'fileondesk',
    // 'dayssincefile',
    // 'officeorder',
    // 'officeorder',
    // 'mainschemeid',
  ];

displayedColumns3 = [
  // 'sno',
  // 'worK_ID',
  'head',
  'division',
  'district',
  'workname',
  // 'wrokOrderDT',
  'billno',
  'agrbillstatus',
  // 'totalamountofcontract',
  'grosspaid',
  'mesurementDT',
  'billdate',
  // 'chequeDT',
  // 'dayssincemeasurement',
  'totalpaidtillinlac'
];
Divisionlist = [
  {
    DId: 'D1017',
    Dname: 'Surguja Division'
  },
  {
    DId: 'D1004',
    Dname: 'Raipur Division'
  },
  {
    DId: 'D1024',
    Dname: 'Bilaspur Division'
  },
  {
    DId: 'D1031',
    Dname: 'Bastar Division'
  },
  {
    DId: 'D1001',
    Dname: 'Durg Division'
  }
];
  divisionid: any;
  himisDistrictid: any;
  TimeStatus: any;
  mainschemeid: any;
  dateRange!: FormGroup;
  fromdt: any;
  todt: any;
  name:any;
  
  mainSchemeID = 0;
  officeorderid = 0;
  officeorder = [
    { pedingsection: 'Finance', officeorderid: 1 },
    { pedingsection: 'SE Office', officeorderid: 2 },
    { pedingsection: 'Divisional Level', officeorderid: 3 },
  ];
  InsertUserPageViewLogdata: InsertUserPageViewLogmodal =
    new InsertUserPageViewLogmodal();
  pageName: string = '';
  fullUrl: string = '';
  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    public datePipe: DatePipe,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private location: Location,  private fb: FormBuilder
  ) {
    this.pageName = this.location.path();
    this.fullUrl = window.location.href;
    this.dataSource = new MatTableDataSource<himis_PendigBillSummary>([]);
    this.dataSource1 = new MatTableDataSource<himis_PendigBill>([]);
    this.dataSource2 = new MatTableDataSource<PaidSummary>([]);
    this.dataSource3 = new MatTableDataSource<PaidDetails>([]);
  }
  ngOnInit() {
    // this.getCurrentDateTime();

    this.getmain_scheme();
    this.getPendigBillSummary();
    this.getPendigBill();
     const today = new Date();

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  this.fromdt = this.formatDate(sevenDaysAgo);
  this.todt = this.formatDate(today);

  this.GETPaidDetails();

  }

  getCurrentDateTime(): string {
    const now = new Date();
  
    const date = now.toLocaleDateString('en-GB'); 
    // 22/01/2025
  
    const time = now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    // 11:05 AM

    return `${date} ${time}`;
  }
  
  selectedTabValue2(event: any): void {
    this.selectedTabIndex2 = event.index;
    if (this.selectedTabIndex2 == 0) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else if (this.selectedTabIndex2 == 1) {
      this.dataSource1.paginator = this.paginator1;
      this.dataSource1.sort = this.sort1;
    }else if (this.selectedTabIndex2 == 2) {
      this.dataSource3.paginator = this.paginator3;
      this.dataSource3.sort = this.sort3;
    }
  }
  //#region Infrastructure
  getmain_scheme() {
    try {
      //
      this.api.getMainScheme(this.isall).subscribe((res: any) => {
        if (res && res.length > 0) {
          this.mainscheme = res.map(
            (item: { mainSchemeID: any; name: any }) => ({
              mainSchemeID: item.mainSchemeID, // Adjust key names if needed
              name: item.name,
            }),
          );
          // console.log('mainscheme :', this.mainscheme);
        } else {
          console.error('No name found or incorrect structure:', res);
        }
      });
      // this.api.getMainScheme(this.isall).subscribe(
      //   (res: any) => {
      //     this.mainscheme = res;
      //   },

      //   // mainSchemeID!: number;
      //   // name: any;

      //   (error) => {
      //     alert(JSON.stringify(error));
      //   }
      // );
    } catch (ex: any) {
      // alert(ex.message);
      alert(`API Error: ${JSON.stringify(ex.message)}`);
    }
  }
  onselect_mainscheme_data(event: any): void {
    if (event) {
      this.mainSchemeID = event.mainSchemeID;
      // alert(this.mainSchemeID);
      this.getPendigBill();
    }
  }
  onselect_mainscheme_data1(event: any): void {
    if (event) {
      this.officeorderid = event.officeorderid;
      // alert(this.officeorderid);
      this.getPendigBill();
    }
  }

  getPendigBillSummary() {
 
    this.spinner.show();
    this.api.getPendigBillSummary().subscribe(
      (res) => {
        this.himis_PendigBillSummary = res
  .sort((a: any, b: any) => a.fund.localeCompare(b.fund))
  .map((item: any, index: number) => ({
    ...item,
    sno: index + 1
  }));
      
        this.dataSource.data = this.himis_PendigBillSummary;
        // console.log('himis_PendigBillSummary= ', this.himis_PendigBillSummary);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        console.error('Error fetching data', error);
      },
    );
  }

getRowSpan(index: number): number {

  const data = this.dataSource.data;

  const currentFund = data[index]?.fund;

  if (
    index > 0 &&
    data[index - 1]?.fund === currentFund
  ) {
    return 0;
  }

  let rowspan = 1;

  for (
    let i = index + 1;
    i < data.length &&
    data[i]?.fund === currentFund;
    i++
  ) {
    rowspan++;
  }

  return rowspan;
}
isFirstFundRow(index: number): boolean {
  if (index === 0) return true;

  return this.dataSource.data[index].fund !==
         this.dataSource.data[index - 1].fund;
}



  // SE Office
  getPendigBill() {
  this.spinner.show();

  this.api.getPendigBill(this.mainSchemeID, this.officeorderid).subscribe(
    (res) => {

      const groupedData = res.reduce((acc: any[], curr: any) => {

        const cleanDivision =
          curr.divisionname?.replace(' Division', '').trim();

   
const existing = acc.find(
  x =>
    x.fund === curr.fund &&
    x.divisionname === cleanDivision &&
    x.pedingsection?.trim().toLowerCase() ===
    curr.pedingsection?.trim().toLowerCase()
);

        if (existing) {

          // Sum Gross Amount
          existing.grossamount =
            Number(existing.grossamount) +
            Number(curr.grossamount);

          // Update latest values if needed
          existing.fileondesk = curr.fileondesk;
          existing.dayssincefile = curr.dayssincefile;

        } else {

          acc.push({
            ...curr, // ALL columns preserve

            divisionname: cleanDivision,

            grossamount: Number(curr.grossamount)
          });

        }

        return acc;

      }, []);

   
      this.himis_PendigBill = groupedData
      .map((item) => ({
        ...item,
    
        divisionname: item.divisionname
          ?.replace(' Division', '')
          .trim(),
    
        grossamount: Number(
          (item.grossamount / 100000).toFixed(2)
        )
      }))

.sort((a, b) => {

  const sectionOrder: any = {
    'finance': 1,
    'se office': 2,
    'divisional level': 3
  };

  const aSection =
    a.pedingsection?.trim().toLowerCase();

  const bSection =
    b.pedingsection?.trim().toLowerCase();

  const sectionCompare =
    (sectionOrder[aSection] ?? 99) -
    (sectionOrder[bSection] ?? 99);

  if (sectionCompare !== 0) {
    return sectionCompare;
  }

  const divisionCompare =
    a.divisionname.localeCompare(
      b.divisionname
    );

  if (divisionCompare !== 0) {
    return divisionCompare;
  }

  return a.fund.localeCompare(
    b.fund
  );

})
      // Recreate serial number after sorting
      .map((item, index) => ({
        ...item,
        sno: index + 1
      }));
      this.dataSource1.data = this.himis_PendigBill;

      this.dataSource1.paginator = this.paginator1;
      this.dataSource1.sort = this.sort1;

      this.cdr.detectChanges();

      this.spinner.hide();

    },
    (error) => {
      this.spinner.hide();
      console.error(error);
    }
  );
}


  applyTextFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyTextFilter3(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }
  getTotals() {
    return this.himis_PendigBillSummary.reduce(
      (acc, r) => {
        acc.billdiv += Number(r.billdiv) || 0;
        acc.divgrossamt += Number(r.divgrossamt) || 0;
  
        acc.billse += Number(r.billse) || 0;
        acc.segrossamt += Number(r.segrossamt) || 0;
  
        acc.billfin += Number(r.billfin) || 0;
        acc.fingrossamt += Number(r.fingrossamt) || 0;
  
        acc.totalgross += Number(r.totalgross) || 0;
        return acc;
      },
      {
        billdiv: 0,
        divgrossamt: 0,
        billse: 0,
        segrossamt: 0,
        billfin: 0,
        fingrossamt: 0,
        totalgross: 0
      }
    );
  }



  
  exportToPDF2() {
    const currentDateTime = this.getCurrentDateTime();
    const total = this.getTotals();
    const doc = new jsPDF('l', 'mm', 'a4');

const sortedData = [...this.himis_PendigBillSummary]
  .sort((a, b) => a.fund.localeCompare(b.fund));

let previousFund = '';

const bodyData: any[] = [];

let i = 0;

while (i < sortedData.length) {

  const fund = sortedData[i].fund;

  const groupRows = sortedData.filter(x => x.fund === fund);

  groupRows.forEach((r, index) => {

    const row: any[] = [];

    if (index === 0) {
      row.push({
        content: fund,
        rowSpan: groupRows.length,
        styles: {
          halign: 'center',
          valign: 'middle',
          fontStyle: 'bold'
        }
      });
    }

    row.push(
      r.billdiv,
      Number(r.divgrossamt).toFixed(2),
      r.billse,
      Number(r.segrossamt).toFixed(2),
      r.billfin,
      Number(r.fingrossamt).toFixed(2),
      Number(r.totalgross).toFixed(2)
    );

    bodyData.push(row);

  });

  i += groupRows.length;
}
    autoTable(doc, {
      startY: 10,
      theme: 'grid',

      /* ================= HEADER ================= */
      head: [
        [
         
          {
            content: 'Pending Bills (Unpaid) Under Process at Various Level',
            colSpan: 6,
            styles: {
              halign: 'center',
              fontStyle: 'bold',
              fontSize: 11,
              fillColor: [254, 240, 255],
              textColor: [0, 0, 0],
              lineWidth: 0.8,
              lineColor: [0, 0, 0]
            }
          },
          {
            content: `Date : ${currentDateTime}`,
            colSpan: 2,
            styles: {
              halign: 'right',
              valign: 'top',
              fontSize: 9,
              fillColor: [254, 240, 255],
              textColor: [0, 0, 0],
              lineWidth: 0.8,
              lineColor: [0, 0, 0]
            }
          }
        ],
        [
          { content: 'Fund', rowSpan: 2 
           
          },
          { content: 'Division Level', colSpan: 2 ,
            styles: {
              halign: 'center',
              // fontStyle: 'bold',
              // fillColor: [255, 255, 255],
            }
          },
          { content: 'SE Office', colSpan: 2, styles: {
            halign: 'center',
            // fontStyle: 'bold',
            // fillColor: [255, 255, 255],
          } },
          { content: 'Finance-HO', colSpan: 2, styles: {
            halign: 'center',
            // fontStyle: 'bold',
            // fillColor: [255, 255, 255],
          } },
          { content: 'Total Gross to be Paid\n(In Lacs)', rowSpan: 2 }
        ],
        [
          'No of Bills',
          'Gross to be Paid\n(In Lacs)',
          'No of Bills',
          'Gross to be Paid\n(In Lacs)',
          'No of Bills',
          'Gross to be Paid\n(In Lacs)'
        ]
      ],

   

body: [
  ...bodyData,
  [
    { content: 'Total', styles: { fontStyle: 'bold' } },
    { content: total.billdiv, styles: { fontStyle: 'bold' } },
    { content: total.divgrossamt.toFixed(2), styles: { fontStyle: 'bold' } },
    { content: total.billse, styles: { fontStyle: 'bold' } },
    { content: total.segrossamt.toFixed(2), styles: { fontStyle: 'bold' } },
    { content: total.billfin, styles: { fontStyle: 'bold' } },
    { content: total.fingrossamt.toFixed(2), styles: { fontStyle: 'bold' } },
    { content: total.totalgross.toFixed(2), styles: { fontStyle: 'bold' } }
  ]
],
      /* ================= GLOBAL STYLES ================= */
      styles: {
        fontSize: 8,
        lineWidth: 0.6,               
        lineColor: [0, 0, 0],         
        valign: 'middle'
      },
  
      /* ================= COLUMN ALIGNMENT ================= */
      columnStyles: {
        0: { halign: 'left' },     // Fund
        1: { halign: 'center' },
        3: { halign: 'center' },
        5: { halign: 'center' },
        2: { halign: 'right',fontStyle: 'bold' },
        4: { halign: 'right',fontStyle: 'bold' },
        6: { halign: 'right',fontStyle: 'bold'},
        7: { halign: 'right', fontStyle: 'bold' }
      },
didParseCell: (data) => {

  if (data.row.index === data.table.body.length - 1) {
    data.cell.styles.fillColor = [254, 240, 255];
    data.cell.styles.lineWidth = 0.8;
    data.cell.styles.fontStyle = 'bold';
  }

  if (data.section === 'head') {
    data.cell.styles.lineWidth = 0.8;
    data.cell.styles.lineColor = [0, 0, 0];
    data.cell.styles.fontStyle = 'bold';
  }
}
    });
  const formattedDate = this.datePipe.transform(new Date(), 'dd-MMM-yyyy');

    doc.save(`Construction_Pay_Pending_Fundwise_${formattedDate}.pdf`);
  }


  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.dataSource.data,
    );

    const workbook: XLSX.WorkBook = {
      Sheets: { Data: worksheet },
      SheetNames: ['Data'],
    };

    XLSX.writeFile(workbook, 'Pending_Bills_Under_Process_report.xlsx');

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    // this.saveExcelFile(excelBuffer, 'Data_Table');
  }


  saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });

    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + '.xlsx',
    );
  }



  exportToExcel1(): void {
    // alert('lomesh');
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.dataSource1.data,
    );

    const workbook: XLSX.WorkBook = {
      Sheets: { Data: worksheet },
      SheetNames: ['Data'],
    };

    XLSX.writeFile(workbook, 'NHM_Fund_Construction_Bills_Not_Paid_Under_Process.xlsx');

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    // this.saveExcelFile1(excelBuffer, 'Data_Table');
  }

  
  saveExcelFile1 (buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });

    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + '.xlsx',
    );
  }








  onselect_Division_data(event: any) {

  if (!event) {
    return;
  }

  this.DId = event.DId;

  this.GETPaidDetails();
}
GETPaidDetails() {
// debugger
  this.spinner.show();

  this.api.GETPaidDetails(
      this.DId || '0',
      0,
      0,
      this.fromdt,
      this.todt
    )
    .subscribe({
      next: (res: any[]) => {

        this.PaidDetails = res.map((item, index) => ({
          sno: index + 1,
          ...item
        }));
        console.log('s3 data=',this.PaidDetails)
        this.dataSource3.data = this.PaidDetails;

        this.dataSource3.paginator = this.paginator3;
        this.dataSource3.sort = this.sort3;

        this.cdr.detectChanges();

        this.spinner.hide();
      },
      error: (err) => {
        console.error(err);
        this.spinner.hide();
      }
    });
}


GETPaidSummary(): void {
      this.spinner.show();
      var roleName = localStorage.getItem('roleName');
      // if (roleName == 'Division') {
      //   this.divisionid = sessionStorage.getItem('divisionID');
      //   var RPType = 'Division';
      //   this.himisDistrictid = 0;
      //   this.mainschemeid = 0;
      //   this.chartOptions.chart.height = '200px';
      // }
      // // else if (roleName == 'Collector') {
      // //  this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
      // // var RPType="District";
      // //  this.divisionid = 0;
      // //  this.mainschemeid=0;
      // //  this.chartOptions.chart.height = '400px';
      // // }
      // else {
      //   this.divisionid = 0;
      //   this.himisDistrictid = 0;
      //   this.mainschemeid = 0;
        // var RPType = 'Division';
        var RPType = 'GTotal';
      //   this.chartOptions.chart.height = '300';
      // }
      const startDate = this.dateRange.value.start;
      const endDate = this.dateRange.value.end;
      this.fromdt = startDate
        ? this.datePipe.transform(startDate, 'dd-MMM-yyyy')
        : '';
      this.todt = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
      // console.log('this.fromdt=', this.fromdt, 'this.todt=', this.todt);

      // RPType=Total&divisionid=0&districtid=0&mainschemeid=0&TimeStatus=0
      this.api
        .GETPaidSummary(RPType, this.divisionid, this.himisDistrictid,this.mainschemeid,this.fromdt,this.todt )
        .subscribe(
          (data: any) => {
            this.PaidSummary = data.map(
              (item: PaidSummary, index: number) => ({
                ...item,
                sno: index + 1,
              })
            );
            // console.log('PaidDetails total:', res);
            // console.log('PaidDetails2=:',  this.dispatchData);
            this.dataSource2.data = this.PaidSummary;
            this.dataSource2.paginator = this.paginator2;
            this.dataSource2.sort = this.sort2;
            this.cdr.detectChanges();
            this.spinner.hide();
          },
          
          // {
          //   this.PaidSummary = data;
      

          //   this.spinner.hide();
          // },
          (error: any) => {
            console.error('Error fetching data', error);
          }
        );
}
formatDate(date: Date): string {
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  return `${date.getDate().toString().padStart(2, '0')}-${months[date.getMonth()]}-${date.getFullYear()}`;
}


exportToPDF31() {
  const currentDateTime = this.getCurrentDateTime();
  const doc = new jsPDF('l', 'mm', 'a4');

  const head = [
    [
      {
        content: 'Pending Payment Division Wise',
        colSpan: 10, 
        styles: { halign: 'left' as const }
      },
      {
        content: `Pt Date : ${currentDateTime}`,
        colSpan: 2,
        styles: { halign: 'right' as const }
      },
    ],
    [
      'S.No',
      'Section',
      'Fund Head',
      'Division',
      'District',
      'Work',
      'Contractor',
      'Bill Type',
      'BillNo',
      'Bill Date',
      'Amount\n(In Lacs)',
      'File On Desk',
      // 'Measurement Date' 
    ]
  ];

  // Group Fund + Division
  const groupedData = this.himis_PendigBill.reduce((acc: any, row: any) => {
    const division = row.divisionname?.replace(/division/gi, '')?.trim();
    const section = row.pedingsection?.trim();
    const key = `${section}_${row.fund}_${division}`;

    acc[key] = {
      sno: Object.keys(acc).length + 1,
      section: row.pedingsection?.trim(),
      fund: row.fund,
      divisionname: division,
      district: row.district,
      workname: row.workname,
      contractor: row.contractor,
      billtype: row.agrbillstatus,
      billno: row.billno,
      billdate: row.billdate,
      grossamount: 0,
      fileondesk: row.fileondesk,
      // measurementdate: row.measurementdate
    };
    
    acc[key].grossamount += Number(row.grossamount || 0);
    return acc;
  }, {});

  // Grand Total Sorting Logic
  const finalData: any[] = Object.values(groupedData).sort((a: any, b: any) => {
    const sectionOrder: any = {
      'finance': 1,
      'se office': 2,
      'divisional level': 3
    };

    const aSection = a.section?.trim()?.toLowerCase()?.replace(/\s+/g, ' ') || '';
    const bSection = b.section?.trim()?.toLowerCase()?.replace(/\s+/g, ' ') || '';

    const sectionCompare = (sectionOrder[aSection] ?? 99) - (sectionOrder[bSection] ?? 99);
    if (sectionCompare !== 0) {
      return sectionCompare;
    }

    const divisionCompare = a.divisionname.localeCompare(b.divisionname);
    if (divisionCompare !== 0) {
      return divisionCompare;
    }

    const convertFYDate = (dateStr: string) => {
      if (!dateStr) {
        return { fyMonth: 99, day: 99, year: 9999 };
      }
      const separator = dateStr.includes('/') ? '/' : '-';
      const [day, month, year] = dateStr.split(separator).map(Number);
      return {
        fyMonth: month >= 3 ? month : month + 12,
        day,
        year
      };
    };

    const dateA = convertFYDate(a.fileondesk);
    const dateB = convertFYDate(b.fileondesk);

    if (dateA.fyMonth !== dateB.fyMonth) {
      return dateA.fyMonth - dateB.fyMonth;
    }
    if (dateA.day !== dateB.day) {
      return dateA.day - dateB.day;
    }
    return dateA.year - dateB.year;
  });

  const grandTotal = finalData.reduce(
    (sum: number, row: any) => sum + Number(row.grossamount || 0),
    0
  );

  const body = finalData.map((row: any, index: number) => [
    index + 1,
    row.section,
    row.fund,
    row.divisionname,
    row.district,
    row.workname,
    row.contractor,
    row.billtype,
    row.billno,
    row.billdate || '', 
    Number(row.grossamount).toFixed(2),
    row.fileondesk || '',      
    // row.measurementdate || '' 
  ]);

 
  body.push([
    '', // 1. S.No
    '', // 2. Section
    '', // 3. Fund Head
    '', // 4. Division
    '', // 5. District
    '', // 6. Work
    '', // 7. Contractor
    '', // 8. Bill Type
    '',  // 12. Measurement Date Spacer
    'Grand Total', 
    grandTotal.toFixed(2), // 10. Amount
    '', // 11. File On Desk Spacer
  ]);

  autoTable(doc, {
    head,
    body,
    startY: 12,
    theme: 'grid',
    tableWidth: 'wrap',
    margin: { left: 12, right: 12 },
    horizontalPageBreak: true,
    
    /* ================= 12 COLUMNS STYLES ================= */
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' as const },   // S.No
      1: { cellWidth: 22 },                             // Section
      2: { cellWidth: 22 },                             // Fund Head
      3: { cellWidth: 18 },                             // Division
      4: { cellWidth: 20 },                             // District
      5: { cellWidth: 42, overflow: 'ellipsize' },      // Work
      6: { cellWidth: 32, overflow: 'ellipsize' },      // Contractor
      7: { cellWidth: 16, halign: 'center' as const },  // Bill Type
      8: { cellWidth: 14, halign: 'center' as const },  // Bill No
      11: { cellWidth: 24, halign: 'center' as const },  // 12वें कॉलम (Measurement Date) की चौड़ाई
      9: { cellWidth: 22, halign: 'right' as const },   // Amount
      10: { cellWidth: 22, halign: 'center' as const }, // File On Desk
    },

    styles: {
      fontSize: 6.2, 
      cellPadding: 1.2,
      lineWidth: 0.3,
      lineColor: [90,90,90],
      valign: 'middle',
      overflow: 'linebreak'
    },
   
    headStyles: {
      fillColor: [0,150,136],
      textColor: [255,255,255],
      fontStyle: 'bold',
      fontSize: 6.8,
      halign: 'center',
      valign: 'middle',
      minCellHeight: 9,
      lineWidth: 0.5
    },
    
    bodyStyles: {
      fontSize: 6.4,
      lineWidth: 0.3,
      lineColor: [120,120,120],
      minCellHeight: 6
    },

    alternateRowStyles: {
      fillColor: [245,245,245]
    },

    didParseCell: (data) => {
      // Title row style
      if (data.section === 'head' && data.row.index === 0) {
        data.cell.styles.fillColor = [0,150,136];
        data.cell.styles.fontSize = 8;
        data.cell.styles.fontStyle = 'bold';
      }

      // Grand Total Row Style
      if (data.section === 'body' && data.row.index === body.length - 1) {
        data.cell.styles.fillColor = [220,230,240];
        data.cell.styles.fontStyle = 'bold';
        data.cell.styles.fontSize = 7.5;
      }
    }
  });
const formattedDate = this.datePipe.transform(new Date(), 'dd-MMM-yyyy');
doc.save(`NHM_Fund_Bills_Under_Process_${formattedDate}.pdf`);
  // doc.save('NHM_Fund_Construction_Bills_Not_Paid_Under_Process.pdf');
}
exportToPDF_color() {
  const currentDateTime = this.getCurrentDateTime();
  const doc = new jsPDF('l', 'mm', 'a4');

  // यहाँ वेरिएबल को 'any[]' टाइप दिया गया है ताकि कड़े टुपल एरर्स न आएं
  const head: any[] = [
    /* ================= COLOR LEGEND HEADER ROW ================= */
    [
      {
        content: 'Pending Payment Division Wise',
        colSpan: 6, 
        styles: { 
          halign: 'left', 
          fontStyle: 'bold', 
          fontSize: 10, 
          fillColor: [255, 255, 255], 
          textColor: [0, 150, 136] 
        }
      },
      // 0-5 Days Legend
      { content: '', styles: { cellWidth: 6, fillColor: [220, 245, 220], lineWidth: 0.2, lineColor: [150,150,150] } },
      { content: '0-5 Days', styles: { fontSize: 7, fontStyle: 'bold', halign: 'left', fillColor: [255, 255, 255] } },
      
      // 6-10 Days Legend
      { content: '', styles: { cellWidth: 6, fillColor: [255, 255, 204], lineWidth: 0.2, lineColor: [150,150,150] } },
      { content: '6-10 Days', styles: { fontSize: 7, fontStyle: 'bold', halign: 'left', fillColor: [255, 255, 255] } },
      
      // >10 Days Legend
      { content: '', styles: { cellWidth: 6, fillColor: [255, 204, 204], lineWidth: 0.2, lineColor: [150,150,150] } },
      { 
        content: '>10 Days', 
        colSpan: 1, 
        styles: { fontSize: 7, fontStyle: 'bold', halign: 'left', fillColor: [255, 255, 255] } 
      }
    ],
    /* ================= SUB HEADER ROW (PRINT DATE) ================= */
    [
      {
        content: `NHM Fund Construction Bills Not Paid Under Process`,
        colSpan: 10, 
        styles: { 
          halign: 'left', 
          fontSize: 8, 
          fontStyle: 'normal', 
          fillColor: [254, 240, 255], 
          textColor: [0, 0, 0] 
        }
      },
      {
        content: `Pt Date : ${currentDateTime}`,
        colSpan: 2,
        styles: { 
          halign: 'right', 
          fontSize: 7.5, 
          fontStyle: 'normal', 
          fillColor: [254, 240, 255], 
          textColor: [100, 100, 100] 
        }
      },
    ],
    /* ================= TABLE HEADERS ================= */
    [
      'S.No',
      'Section',
      'Fund Head',
      'Division',
      'District',
      'Work',
      'Contractor',
      'Bill Type',
      'BillNo',
      'Bill Date',         
      'Amount\n(In Lacs)', 
      'File On Desk'       
    ]
  ];

  // Group Fund + Division
  const groupedData = this.himis_PendigBill.reduce((acc: any, row: any) => {
    const division = row.divisionname?.replace(/division/gi, '')?.trim();
    const section = row.pedingsection?.trim();
    const key = `${section}_${row.fund}_${division}`;

    acc[key] = {
      sno: Object.keys(acc).length + 1,
      section: row.pedingsection?.trim(),
      fund: row.fund,
      divisionname: division,
      district: row.district,
      workname: row.workname,
      contractor: row.contractor,
      billtype: row.agrbillstatus,
      billno: row.billno,
      billdate: row.billdate,
      grossamount: 0,
      fileondesk: row.fileondesk
    };
    
    acc[key].grossamount += Number(row.grossamount || 0);
    return acc;
  }, {});

  // हेल्पर फ़ंक्शन: तारीख स्ट्रिंग को कनवर्ट करने के लिए
  const parseStringToDate = (dateStr: string): Date | null => {
    if (!dateStr) return null;
    const separator = dateStr.includes('/') ? '/' : '-';
    const parts = dateStr.split(separator).map(Number);
    if (parts.length === 3) {
      if (parts[0] > 31) {
        return new Date(parts[0], parts[1] - 1, parts[2]);
      } else {
        return new Date(parts[2], parts[1] - 1, parts[0]);
      }
    }
    return null;
  };

  // Grand Total Sorting Logic
  const finalData: any[] = Object.values(groupedData).sort((a: any, b: any) => {
    const sectionOrder: any = {
      'finance': 1,
      'se office': 2,
      'divisional level': 3
    };

    const aSection = a.section?.trim()?.toLowerCase()?.replace(/\s+/g, ' ') || '';
    const bSection = b.section?.trim()?.toLowerCase()?.replace(/\s+/g, ' ') || '';

    const sectionCompare = (sectionOrder[aSection] ?? 99) - (sectionOrder[bSection] ?? 99);
    if (sectionCompare !== 0) return sectionCompare;

    const dateA = parseStringToDate(a.billdate);
    const dateB = parseStringToDate(b.billdate);

    if (dateA && dateB) {
      return dateB.getTime() - dateA.getTime(); 
    } else if (dateA) {
      return -1;
    } else if (dateB) {
      return 1;
    }

    return a.divisionname.localeCompare(b.divisionname);
  });

  const grandTotal = finalData.reduce(
    (sum: number, row: any) => sum + Number(row.grossamount || 0),
    0
  );

  const body = finalData.map((row: any, index: number) => [
    index + 1,
    row.section,
    row.fund,
    row.divisionname,
    row.district,
    row.workname,
    row.contractor,
    row.billtype,
    row.billno,
    row.billdate || '', 
    Number(row.grossamount).toFixed(2),
    row.fileondesk || ''
  ]);

  // Grand Total Row
  body.push([
    '', '', '', '', '', '', '', '', '',
    'Grand Total', 
    grandTotal.toFixed(2), 
    ''
  ]);

  autoTable(doc, {
    head,
    body,
    startY: 12,
    theme: 'grid',
    tableWidth: 'wrap',
    margin: { left: 12, right: 12 },
    horizontalPageBreak: true,
    
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },   
      1: { cellWidth: 22 },                             
      2: { cellWidth: 22 },                             
      3: { cellWidth: 18 },                             
      4: { cellWidth: 20 },                             
      5: { cellWidth: 42, overflow: 'ellipsize' },      
      6: { cellWidth: 32, overflow: 'ellipsize' },      
      7: { cellWidth: 16, halign: 'center' },  
      8: { cellWidth: 14, halign: 'center' },  
      9: { cellWidth: 22, halign: 'center' }, 
      10: { cellWidth: 22, halign: 'right' },   
      11: { cellWidth: 22, halign: 'center' }, 
    },

    styles: {
      fontSize: 6.2, 
      cellPadding: 1.2,
      lineWidth: 0.3,
      lineColor: [90,90,90],
      valign: 'middle',
      overflow: 'linebreak'
    },
   
    headStyles: {
      fillColor: [0,150,136],
      textColor: [255,255,255],
      fontStyle: 'bold',
      fontSize: 6.8,
      halign: 'center',
      valign: 'middle',
      minCellHeight: 8,
      lineWidth: 0.5
    },
    
    bodyStyles: {
      fontSize: 6.4,
      lineWidth: 0.3,
      lineColor: [120,120,120],
      minCellHeight: 6
    },

    alternateRowStyles: {
      fillColor: [245,245,245]
    },

    didParseCell: (data) => {
      if (data.section === 'head' && data.row.index === 0) {
        return; 
      }

      if (data.section === 'head' && data.row.index === 1) {
        data.cell.styles.fontSize = 7.5;
        data.cell.styles.lineWidth = 0.3;
      }

      if (data.section === 'head' && data.row.index === 2) {
        data.cell.styles.fillColor = [0,150,136];
        data.cell.styles.fontSize = 6.8;
        data.cell.styles.fontStyle = 'bold';
      }

      if (data.section === 'body' && data.column.index === 9 && data.row.index !== body.length - 1) {
        const cellValue = data.cell.text[0]; 
        const billDateObj = parseStringToDate(cellValue);

        if (billDateObj) {
          const today = new Date();
          const timeDiff = today.getTime() - billDateObj.getTime();
          const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

          if (daysDiff >= 0) {
            if (daysDiff <= 5) {
              data.cell.styles.fillColor = [220, 245, 220]; 
              data.cell.styles.fontStyle = 'bold';
            } else if (daysDiff <= 10) {
              data.cell.styles.fillColor = [255, 255, 204]; 
              data.cell.styles.fontStyle = 'bold';
            } else {
              data.cell.styles.fillColor = [255, 204, 204]; 
              data.cell.styles.textColor = [150, 0, 0]; 
              data.cell.styles.fontStyle = 'bold';
            }
          }
        }
      }

      if (data.section === 'body' && data.row.index === body.length - 1) {
        data.cell.styles.fillColor = [220,230,240];
        data.cell.styles.fontStyle = 'bold';
        data.cell.styles.fontSize = 7.5;
        data.cell.styles.textColor = [0, 0, 0];
      }
    }
  });

  const formattedDate = this.datePipe.transform(new Date(), 'dd-MMM-yyyy');
  doc.save(`NHM_Fund_Bills_Under_Process_${formattedDate}.pdf`);
}
exportToPDF33() {
  const currentDateTime = this.getCurrentDateTime();
  const doc = new jsPDF('l', 'mm', 'a4');

  const head = [
    [
      {
        content: 'Pending Payment Division Wise',
        colSpan: 10, 
        styles: { halign: 'left' as const }
      },
      {
        content: `Pt Date : ${currentDateTime}`,
        colSpan: 2,
        styles: { halign: 'right' as const }
      },
    ],
    [
      'S.No',
      'Section',
      'Fund Head',
      'Division',
      'District',
      'Work',
      'Contractor',
      'Bill Type',
      'BillNo',
      'Bill Date',         // इंडेक्स 9
      'Amount\n(In Lacs)', // इंडेक्स 10
      'File On Desk'       // इंडेक्स 11
    ]
  ];

  // Group Fund + Division
  const groupedData = this.himis_PendigBill.reduce((acc: any, row: any) => {
    const division = row.divisionname?.replace(/division/gi, '')?.trim();
    const section = row.pedingsection?.trim();
    const key = `${section}_${row.fund}_${division}`;

    acc[key] = {
      sno: Object.keys(acc).length + 1,
      section: row.pedingsection?.trim(),
      fund: row.fund,
      divisionname: division,
      district: row.district,
      workname: row.workname,
      contractor: row.contractor,
      billtype: row.agrbillstatus,
      billno: row.billno,
      billdate: row.billdate,
      grossamount: 0,
      fileondesk: row.fileondesk
    };
    
    acc[key].grossamount += Number(row.grossamount || 0);
    return acc;
  }, {});

  // हेल्पर फ़ंक्शन: "DD-MM-YYYY" को सॉर्टिंग और तुलना के लिए वैधानिक Date ऑब्जेक्ट में बदलने के लिए
  const parseStringToDate = (dateStr: string): Date | null => {
    if (!dateStr) return null;
    const separator = dateStr.includes('/') ? '/' : '-';
    const parts = dateStr.split(separator).map(Number);
    if (parts.length === 3) {
      // यदि पहला पार्ट 4 डिजिट का है तो मान लें YYYY-MM-DD है, अन्यथा DD-MM-YYYY
      if (parts[0] > 31) {
        return new Date(parts[0], parts[1] - 1, parts[2]);
      } else {
        return new Date(parts[2], parts[1] - 1, parts[0]);
      }
    }
    return null;
  };

  // Grand Total Sorting Logic (Section Order -> Then Latest Bill Date First)
  const finalData: any[] = Object.values(groupedData).sort((a: any, b: any) => {
    const sectionOrder: any = {
      'finance': 1,
      'se office': 2,
      'divisional level': 3
    };

    const aSection = a.section?.trim()?.toLowerCase()?.replace(/\s+/g, ' ') || '';
    const bSection = b.section?.trim()?.toLowerCase()?.replace(/\s+/g, ' ') || '';

    // 1. पहले सेक्शन के अनुसार सॉर्ट करें
    const sectionCompare = (sectionOrder[aSection] ?? 99) - (sectionOrder[bSection] ?? 99);
    if (sectionCompare !== 0) {
      return sectionCompare;
    }

    // 2. प्रत्येक सेक्शन के अंदर Bill Date के अनुसार लेटेस्ट ऊपर (Top to Down) सॉर्ट करें
    const dateA = parseStringToDate(a.billdate);
    const dateB = parseStringToDate(b.billdate);

    if (dateA && dateB) {
      return dateB.getTime() - dateA.getTime(); // घटते क्रम में (Latest Date First)
    } else if (dateA) {
      return -1;
    } else if (dateB) {
      return 1;
    }

    // 3. यदि बिल डेट भी समान हो तो डिवीजन के नाम से सॉर्ट करें
    return a.divisionname.localeCompare(b.divisionname);
  });

  const grandTotal = finalData.reduce(
    (sum: number, row: any) => sum + Number(row.grossamount || 0),
    0
  );

  const body = finalData.map((row: any, index: number) => [
    index + 1,
    row.section,
    row.fund,
    row.divisionname,
    row.district,
    row.workname,
    row.contractor,
    row.billtype,
    row.billno,
    row.billdate || '', 
    Number(row.grossamount).toFixed(2),
    row.fileondesk || ''
  ]);

  // Grand Total Row
  body.push([
    '', '', '', '', '', '', '', '', '',
    'Grand Total', 
    grandTotal.toFixed(2), 
    ''
  ]);

  autoTable(doc, {
    head,
    body,
    startY: 12,
    theme: 'grid',
    tableWidth: 'wrap',
    margin: { left: 12, right: 12 },
    horizontalPageBreak: true,
    
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' as const },   
      1: { cellWidth: 22 },                             
      2: { cellWidth: 22 },                             
      3: { cellWidth: 18 },                             
      4: { cellWidth: 20 },                             
      5: { cellWidth: 42, overflow: 'ellipsize' },      
      6: { cellWidth: 32, overflow: 'ellipsize' },      
      7: { cellWidth: 16, halign: 'center' as const },  
      8: { cellWidth: 14, halign: 'center' as const },  
      9: { cellWidth: 22, halign: 'center' as const }, // Bill Date एलाइनमेंट सेंटर किया
      10: { cellWidth: 22, halign: 'right' as const },   // Amount
      11: { cellWidth: 22, halign: 'center' as const }, // File On Desk
    },

    styles: {
      fontSize: 6.2, 
      cellPadding: 1.2,
      lineWidth: 0.3,
      lineColor: [90,90,90],
      valign: 'middle',
      overflow: 'linebreak'
    },
   
    headStyles: {
      fillColor: [0,150,136],
      textColor: [255,255,255],
      fontStyle: 'bold',
      fontSize: 6.8,
      halign: 'center',
      valign: 'middle',
      minCellHeight: 9,
      lineWidth: 0.5
    },
    
    bodyStyles: {
      fontSize: 6.4,
      lineWidth: 0.3,
      lineColor: [120,120,120],
      minCellHeight: 6
    },

    alternateRowStyles: {
      fillColor: [245,245,245]
    },

    didParseCell: (data) => {
      // Title row style
      if (data.section === 'head' && data.row.index === 0) {
        data.cell.styles.fillColor = [0,150,136];
        data.cell.styles.fontSize = 8;
        data.cell.styles.fontStyle = 'bold';
      }

      // === मुख्य बदलाव: बिल डेट कॉलम कंडीशनल कलरिंग लॉजिक ===
      if (data.section === 'body' && data.column.index === 9 && data.row.index !== body.length - 1) {
        const cellValue = data.cell.text[0]; // सेल में लिखी तारीख गेट करें
        const billDateObj = parseStringToDate(cellValue);

        if (billDateObj) {
          const today = new Date();
          // तारीखों के बीच का समय (Miliseconds) का अंतर निकालें
          const timeDiff = today.getTime() - billDateObj.getTime();
          // मिलिसेकंड को दिनों (Days) में बदलें
          const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

          if (daysDiff >= 0) {
            if (daysDiff <= 5) {
              // लेटेस्ट 5 दिन - हल्का हरा (Soft Green)
              data.cell.styles.fillColor = [220, 245, 220];
              data.cell.styles.fontStyle = 'bold';
            } else if (daysDiff <= 10) {
              // 5 दिन से बड़े और 10 दिन तक - हल्का पीला (Soft Yellow)
              data.cell.styles.fillColor = [255, 255, 204];
              data.cell.styles.fontStyle = 'bold';
            } else {
              // 10 दिन से बड़े दिन - हल्का लाल/गुलाबी (Soft Red/Pink)
              data.cell.styles.fillColor = [255, 204, 204];
              data.cell.styles.textColor = [150, 0, 0]; // टेक्स्ट डार्क रेड
              data.cell.styles.fontStyle = 'bold';
            }
          }
        }
      }

      // Grand Total Row Style
      if (data.section === 'body' && data.row.index === body.length - 1) {
        data.cell.styles.fillColor = [220,230,240];
        data.cell.styles.fontStyle = 'bold';
        data.cell.styles.fontSize = 7.5;
        data.cell.styles.textColor = [0, 0, 0]; // टोटल रो में डिफ़ॉल्ट कलर रिस्टोर
      }
    }
  });

  const formattedDate = this.datePipe.transform(new Date(), 'dd-MMM-yyyy');
  doc.save(`NHM_Fund_Bills_Under_Process_${formattedDate}.pdf`);
}
exportToPDF3() {
  const currentDateTime = this.getCurrentDateTime();
  const doc = new jsPDF('l', 'mm', 'a4');

 
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(0, 150, 136);
  doc.text('Bill Payment Pending & Aging Analysis-Work wise', 12, 10); 

  doc.setLineWidth(0.2); 
  doc.setDrawColor(90, 90, 90);

  doc.setFillColor(220, 245, 220);
  doc.rect(170, 6, 6, 5, 'FD'); 
  doc.setFontSize(7.5);
  doc.setTextColor(0, 0, 0);
  doc.text('0-5 Days', 178, 9.5);

  doc.setFillColor(255, 255, 204);
  doc.rect(205, 6, 6, 5, 'FD'); 
  doc.text('6-10 Days', 213, 9.5);

  doc.setFillColor(255, 204, 204);
  doc.rect(242, 6, 6, 5, 'FD'); 
  doc.text('>10 Days', 250, 9.5);

  /* ================= 2. टेबल हेडर स्ट्रक्चर (बिल्कुल पहले जैसा परफेक्ट)NHM Fund Construction Bills Not Paid Under Process ================= */
  const head: any[] = [
    [
      {
        content: `Bill Status Under Process (Not Paid) at Various Section Details`,
        colSpan: 10, 
        styles: { halign: 'left', fontSize: 8, fontStyle: 'normal', fillColor: [254, 240, 255], textColor: [0, 0, 0] }
      },
      {
        content: `Print DT : ${currentDateTime}`,
        colSpan: 2,
        styles: { halign: 'right', fontSize: 7.5, fontStyle: 'normal', fillColor: [254, 240, 255], textColor: [100, 100, 100] }
      },
    ],
    [
      'S.No',
      'Section',
      'Fund Head',
      'Division',
      'District',
      'Work',
      'Contractor',
      'Bill Type',
      'BillNo',
      'Bill Date',         
      'Amount\n(In Lacs)', 
      'File On Desk'       
    ]
  ];

  // Group Fund + Division
  const groupedData = this.himis_PendigBill.reduce((acc: any, row: any) => {
    const division = row.divisionname?.replace(/division/gi, '')?.trim();
    const section = row.pedingsection?.trim();
    const key = `${section}_${row.fund}_${division}`;

    acc[key] = {
      sno: Object.keys(acc).length + 1,
      section: row.pedingsection?.trim(),
      fund: row.fund,
      divisionname: division,
      district: row.district,
      workname: row.workname,
      contractor: row.contractor,
      billtype: row.agrbillstatus,
      billno: row.billno,
      billdate: row.billdate,
      grossamount: 0,
      fileondesk: row.fileondesk
    };
    
    acc[key].grossamount += Number(row.grossamount || 0);
    return acc;
  }, {});

  
  const parseStringToDate = (dateStr: string): Date | null => {
    if (!dateStr) return null;
    const separator = dateStr.includes('/') ? '/' : '-';
    const parts = dateStr.split(separator).map(Number);
    if (parts.length === 3) {
      if (parts[0] > 31) {
        return new Date(parts[0], parts[1] - 1, parts[2]);
      } else {
        return new Date(parts[2], parts[1] - 1, parts[0]);
      }
    }
    return null;
  };

  // Grand Total Sorting Logic (Latest Bill Date First)
  const finalData: any[] = Object.values(groupedData).sort((a: any, b: any) => {
    const sectionOrder: any = {
      'finance': 1,
      'se office': 2,
      'divisional level': 3
    };

    const aSection = a.section?.trim()?.toLowerCase()?.replace(/\s+/g, ' ') || '';
    const bSection = b.section?.trim()?.toLowerCase()?.replace(/\s+/g, ' ') || '';

    const sectionCompare = (sectionOrder[aSection] ?? 99) - (sectionOrder[bSection] ?? 99);
    if (sectionCompare !== 0) return sectionCompare;

    const dateA = parseStringToDate(a.billdate);
    const dateB = parseStringToDate(b.billdate);

    if (dateA && dateB) {
      return dateB.getTime() - dateA.getTime(); 
    } else if (dateA) {
      return -1;
    } else if (dateB) {
      return 1;
    }

    return a.divisionname.localeCompare(b.divisionname);
  });

  const grandTotal = finalData.reduce(
    (sum: number, row: any) => sum + Number(row.grossamount || 0),
    0
  );

  const body = finalData.map((row: any, index: number) => [
    index + 1,
    row.section,
    row.fund,
    row.divisionname,
    row.district,
    row.workname,
    row.contractor,
    row.billtype,
    row.billno,
    row.billdate || '', 
    Number(row.grossamount).toFixed(2),
    row.fileondesk || ''
  ]);

  // Grand Total Row
  body.push([
    '', '', '', '', '', '', '', '', '',
    'Grand Total', 
    grandTotal.toFixed(2), 
    ''
  ]);


  autoTable(doc, {
    head,
    body,
    startY: 14, 
    theme: 'grid',
    tableWidth: 'wrap',
    margin: { left: 12, right: 12 },
    horizontalPageBreak: true,
    
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },   
      1: { cellWidth: 22 },                             
      2: { cellWidth: 22 },                             
      3: { cellWidth: 18 },                             
      4: { cellWidth: 20 },                             
      5: { cellWidth: 42, overflow: 'ellipsize' },      
      6: { cellWidth: 32, overflow: 'ellipsize' },      
      7: { cellWidth: 16, halign: 'center' },  
      8: { cellWidth: 14, halign: 'center' },  
      9: { cellWidth: 22, halign: 'center' }, 
      10: { cellWidth: 22, halign: 'right' },   
      11: { cellWidth: 22, halign: 'center' }, 
    },

    styles: {
      fontSize: 6.2, 
      cellPadding: 1.2,
      lineWidth: 0.3,
      lineColor: [90,90,90],
      valign: 'middle',
      overflow: 'linebreak'
    },
   
    headStyles: {
      fillColor: [0,150,136],
      textColor: [255,255,255],
      fontStyle: 'bold',
      fontSize: 6.8,
      halign: 'center',
      valign: 'middle',
      minCellHeight: 8,
      lineWidth: 0.5
    },
    
    bodyStyles: {
      fontSize: 6.4,
      lineWidth: 0.3,
      lineColor: [120,120,120],
      minCellHeight: 6
    },

    alternateRowStyles: {
      fillColor: [245,245,245]
    },

    didParseCell: (data) => {
      // हेडर रो 0 (Sub Header - NHM Fund Construction...)
      if (data.section === 'head' && data.row.index === 0) {
        data.cell.styles.fontSize = 7.5;
        data.cell.styles.lineWidth = 0.3;
      }

      // हेडर रो 1 (एक्चुअल टेबल हेडर - S.No, Section...)
      if (data.section === 'head' && data.row.index === 1) {
        data.cell.styles.fillColor = [0,150,136];
        data.cell.styles.fontSize = 6.8;
        data.cell.styles.fontStyle = 'bold';
      }

      // बिल डेट कॉलम कंडीशनल कलरिंग
      if (data.section === 'body' && data.column.index === 9 && data.row.index !== body.length - 1) {
        const cellValue = data.cell.text[0]; 
        const billDateObj = parseStringToDate(cellValue);

        if (billDateObj) {
          const today = new Date();
          const timeDiff = today.getTime() - billDateObj.getTime();
          const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

          if (daysDiff >= 0) {
            if (daysDiff <= 5) {
              data.cell.styles.fillColor = [220, 245, 220]; 
              data.cell.styles.fontStyle = 'bold';
            } else if (daysDiff <= 10) {
              data.cell.styles.fillColor = [255, 255, 204]; 
              data.cell.styles.fontStyle = 'bold';
            } else {
              data.cell.styles.fillColor = [255, 204, 204]; 
              data.cell.styles.textColor = [150, 0, 0]; 
              data.cell.styles.fontStyle = 'bold';
            }
          }
        }
      }

      // Grand Total Row Style
      if (data.section === 'body' && data.row.index === body.length - 1) {
        data.cell.styles.fillColor = [220,230,240];
        data.cell.styles.fontStyle = 'bold';
        data.cell.styles.fontSize = 7.5;
        data.cell.styles.textColor = [0, 0, 0];
      }
    }
  });

  const formattedDate = this.datePipe.transform(new Date(), 'dd-MMM-yyyy');
  doc.save(`Bill_Pending_Details__${formattedDate}.pdf`);
}
  //#endregion
}
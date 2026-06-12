
import { CommonModule, DatePipe, NgFor, Location } from '@angular/common';
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

import {
  FitUnfitSummary,
  FitUnfit,
  himis_PendigBillSummary,
  himis_PendigBill,
  PaidSummary,
  PaidDetails,
} from 'src/app/Model/DashProgressCount';
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
  selector: 'app-paid-billinfra',
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
  templateUrl: './paid-billinfra.html',
  styleUrl: './paid-billinfra.css',
})
export class PaidBillinfra {
  selectedTabIndex2: number = 0;
mainSchemeID: any = 0;
DId: any = 0; 
fromDate: string = '';
toDate: string = '';
fromdt: string = '0';
todt: string = '0';
totalWorks: number = 0;
totalGrossLacs: number = 0;
dataSource = new MatTableDataSource<any>([]);
PaidSummary: any[] = [];
dataSource1=new MatTableDataSource<any>([]);
dataSource3 = new MatTableDataSource<any>([]);
displayedColumns1: string[] = ['sno', 'division', 'head', 'noofWorks', 'grosspaid'];
  PaidDetails: any[] = [];
  groupedSummaryData: any[] = [];

  displayedColumns2 = [
    'sno',
    // 'division',
    'head',
    'noofWorks',
    'grosspaid'
    ];
  isall: boolean = true;
  mainscheme: any[] = [];
  divisionid:any;
  himisDistrictid=0;
  TimeStatus: any;
  dateRange!: FormGroup;
groupedFundWiseData: any[] = []; 
totalWorksOnlyFundWise: number = 0;
totalGrossLacsOnlyFundWise: number = 0;

groupedWorkWiseData: any[] = [];
totalGrossLacsWorkWise: number = 0;
  // PaidSummary: PaidSummary[] = [];
  // dataSource!: MatTableDataSource<PaidSummary>;
displayedColumns3 = [
  'sno', 'division', 'district', 'worK_ID', 'workname', 'billno',
  'agrbillstatus', 'billdate', 'mesurementDT', 'chequeDT', 'grosspaid', 'dayssincemeasurement'
];
  dataSource2!: MatTableDataSource<PaidSummary>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild('paginator2') paginator2!: MatPaginator;
  @ViewChild('paginator3') paginator3!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;
  @ViewChild('sort1') sort1!: MatSort;
  @ViewChild('sort2') sort2!: MatSort;
  @ViewChild('sort3') sort3!: MatSort;
//   private _paginator3!: MatPaginator;
// private _sort3!: MatSort;
// @ViewChild('paginator3') set paginator3(mp: MatPaginator) {
//   this._paginator3 = mp;
//   if (this.dataSource3) {
//     this.dataSource3.paginator = this._paginator3;
//   }
// }

// @ViewChild('sort3') set sort3(ms: MatSort) {
//   this._sort3 = ms;
//   if (this.dataSource3) {
//     this.dataSource3.sort = this._sort3;
//   }
// }

// // नया इवेंट मेथड जो पेजिनेटर चेंज होने पर UI को तुरंत री-रेंडर करेगा
// onPageChange3() {
//   this.cdr.detectChanges();
// }


  displayedColumns = [
    'sno',
    'name',
    'noofWorks',
    'grossPaidcr',
  ];
// displayedColumns3 = [
//   'sno',
//   'division',
//   'district',
//   'worK_ID',
//   'workname',
//   'billno',
//   'agrbillstatus',
//   'billdate',
//   'mesurementDT',
//   'chequeDT',
//   'grosspaid',
//   'dayssincemeasurement',
//   // 'wrokOrderDT',
//   // 'totalamountofcontract',
//   // 'totalpaidtillinlac'
// ];

  Divisionlist = [
    {
      DId: 'D1017',
      Dname: 'Surguja Division',
    },
    {
      DId: 'D1004',
      Dname: 'Raipur Division',
    },
    {
      DId: 'D1024',
      Dname: 'Bilaspur Division',
    },
    {
      DId: 'D1031',
      Dname: 'Bastar Division',
    },
    {
      DId: 'D1001',
      Dname: 'Durg Division',
    },
  ];
  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    public datePipe: DatePipe,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private location: Location,
    private fb: FormBuilder,
  ) {
    this.dataSource = new MatTableDataSource<any>([]);
    this.dataSource1 = new MatTableDataSource<any>([]);
    this.dataSource2 = new MatTableDataSource<PaidSummary>([]);
    this.dataSource3 = new MatTableDataSource<any>([]);
  }
  ngOnInit() {
  this.getmain_scheme();
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  
  this.fromDate = sevenDaysAgo.toISOString().split('T')[0]; 
  this.toDate = today.toISOString().split('T')[0];

  this.fromdt = this.datePipe.transform(sevenDaysAgo, 'dd-MMM-yyyy') || '0';
  this.todt = this.datePipe.transform(today, 'dd-MMM-yyyy') || '0';
  
  this.GETPaidSummary();
 this.GETPaidDetails();

  }
  selectedTabValue2(event: any): void {
    this.selectedTabIndex2 = event.index;
    if (this.selectedTabIndex2 == 0) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else if (this.selectedTabIndex2 == 1) {
      this.dataSource1.paginator = this.paginator1;
      this.dataSource1.sort = this.sort1;
    } else if (this.selectedTabIndex2 == 2) {
      this.dataSource3.paginator = this.paginator3;
      this.dataSource3.sort = this.sort3;
    }
  }
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
      // this.getPendigBill();
    }
  }
  onselect_division_data(event: any) {
    if (!event) {
      return;
    }

    this.DId = event.DId;

    // this.GETPaidDetails();
  }
  // GETPaidSummary(): void {
  //   // https://cgmsc.gov.in/HIMIS_APIN/api/Payment/PaidSummary?RPType=Division&divisionid=0&districtid=0&mainschemeid=0&fromdt=01-June-2026&todt=09-June-2026
  //   this.spinner.show();
  //   var RPType = 'Division';
  //   // const startDate = this.dateRange.value.start;
  //   // const endDate = this.dateRange.value.end;
  //   // this.fromdt = startDate
  //   //   ? this.datePipe.transform(startDate, 'dd-MMM-yyyy')
  //   //   : '';
  //   // this.todt = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
  //   // console.log('this.fromdt=', this.fromdt, 'this.todt=', this.todt);
  //   this.api
  //     .GETPaidSummary(RPType,this.divisionid,this.himisDistrictid,this.mainSchemeID, this.fromdt, this.todt).subscribe(
  //       (data: any) => {
  //         this.PaidSummary = data.map((item: PaidSummary, index: number) => ({
  //           ...item,
  //           sno: index + 1,
  //         }));
  //         // console.log('PaidDetails total:', res);
  //         console.log('GETPaidSummary =:',  this.PaidSummary);
  //         this.dataSource.data = this.PaidSummary;
  //         this.dataSource.paginator = this.paginator;
  //         this.dataSource.sort = this.sort;
  //         this.cdr.detectChanges();
  //         this.spinner.hide();
  //       },
  //       (error: any) => {
  //         this.spinner.hide();
  //         console.error('Error fetching data', error);
  //       },
  //     );
  // }



onShowClick(): void {

  this.fromdt = this.fromDate ? this.datePipe.transform(this.fromDate, 'dd-MMM-yyyy') || '0' : '0';
  this.todt = this.toDate ? this.datePipe.transform(this.toDate, 'dd-MMM-yyyy') || '0' : '0';

  this.GETPaidSummary();
 this.GETPaidDetails();
 
}

GETPaidSummary(): void {
  this.spinner.show();
const roleName = localStorage.getItem('roleName');
if (roleName === 'Division') {
  this.divisionid = sessionStorage.getItem('divisionID') || 0;
  this.himisDistrictid = 0;
  this.mainSchemeID = this.mainSchemeID ?  this.mainSchemeID:0;
} else {
  this.divisionid = 0;
  this.himisDistrictid = 0;
  this.mainSchemeID = this.mainSchemeID ?  this.mainSchemeID:0;
}

const RPType = 'Division';



let divisionIdToSend = 0;
if (this.DId != 0) {
  divisionIdToSend = this.DId ? this.DId : 0;
} else {
  divisionIdToSend = this.divisionid;
}

const districtIdToSend = this.himisDistrictid ? Number(this.himisDistrictid) : 0;
const schemeIdToSend = this.mainSchemeID ? Number(this.mainSchemeID) : 0;


  // const RPType = 'Division';
  // const divisionIdToSend = this.DId ? this.DId : 0;
  // const districtIdToSend = this.himisDistrictid ? this.himisDistrictid : 0;
  // const schemeIdToSend = this.mainSchemeID ? this.mainSchemeID : 0;

  this.api
    .GETPaidSummary(RPType, divisionIdToSend, districtIdToSend, schemeIdToSend, this.fromdt, this.todt)
    .subscribe(
      (data: any) => {
        if (data && data.length > 0) {
          this.PaidSummary = data.map((item: any, index: number) => {
          
            const lacsValue = item.grossPaidcr ? Number(item.grossPaidcr) * 100 : 0;
            return {
              ...item,
              sno: index + 1,
              grossPaidLacs: lacsValue 
            };
          });

          this.calculateTotals();
        } else {
          this.PaidSummary = [];
          this.totalWorks = 0;
          this.totalGrossLacs = 0;
        }

        this.dataSource.data = this.PaidSummary;
        
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
        
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error: any) => {
        this.spinner.hide();
        console.error('Error fetching data', error);
      }
    );
}


calculateTotals(): void {
  this.totalWorks = this.PaidSummary.reduce((sum, item) => sum + (Number(item.noofWorks) || 0), 0);
  this.totalGrossLacs = this.PaidSummary.reduce((sum, item) => sum + (Number(item.grossPaidcr) || 0), 0);
}


applyTextFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
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
    exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.dataSource.data,
    );

    const workbook: XLSX.WorkBook = {
      Sheets: { Data: worksheet },
      SheetNames: ['Data'],
    };

    XLSX.writeFile(workbook, 'Division_Payment_Summary_report.xlsx');

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

  }
exportToPDF() {
  const currentDateTime = this.getCurrentDateTime();

  const doc = new jsPDF('p', 'mm', 'a4');
  
 
  const bodyData: any[] = [];
  
  this.PaidSummary.forEach((item) => {
    bodyData.push([
      item.sno,
      item.name,
      item.noofWorks,
      Number(item.grossPaidLacs || 0).toFixed(2)
    ]);
  });

  autoTable(doc, {
    startY: 15,
    theme: 'grid',
    
    /* ================= HEADER SECTION ================= */
    head: [
      [
        {
          content: 'Division Payment Summary',
          colSpan: 3,
          styles: {
            halign: 'left',
            fontStyle: 'bold',
            fontSize: 12,
            fillColor: [254, 240, 255], 
            textColor: [0, 0, 0]
          }
        },
        {
          content: `Print Dt: ${currentDateTime}`,
          colSpan: 1,
          styles: {
            halign: 'right',
            fontSize: 9,
            fillColor: [254, 240, 255],
            textColor: [100, 100, 100]
          }
        }
      ],
      [
        {
          content: `Payment From Date : ${this.datePipe.transform(this.fromDate, 'dd-MMM-yyyy')}     To     Payment To Date: ${this.datePipe.transform(this.toDate, 'dd-MMM-yyyy')}`,
          colSpan: 4,
          styles: {
            halign: 'left',
            fontSize: 10,
            fontStyle: 'normal',
            fillColor: [255, 255, 255],
            textColor: [50, 50, 50],
            minCellHeight: 10
          }
        }
      ],
      [
        { content: 's.No', styles: { halign: 'center' } },
        { content: 'Division', styles: { halign: 'left' } },
        { content: 'No of Works', styles: { halign: 'center' } },
        { content: 'Gross Paid (in Lacs)', styles: { halign: 'right' } }
      ]
    ],
    
    /* ================= BODY & TOTAL SECTION ================= */
    body: [
      ...bodyData,
      [
        { content: '', styles: { bgCol: [210, 225, 245] } }, 
        { content: 'Total', styles: { fontStyle: 'bold', halign: 'left' } },
        { content: this.totalWorks, styles: { fontStyle: 'bold', halign: 'center' } },
        { content: Number(this.totalGrossLacs || 0).toFixed(2), styles: { fontStyle: 'bold', halign: 'right' } }
      ]
    ],
    
    /* ================= GLOBAL STYLES ================= */
    styles: {
      fontSize: 10,
      lineWidth: 0.3,
      lineColor: [80, 80, 80], 
      valign: 'middle',
      textColor: [0, 0, 0]
    },
    
    /* ================= COLUMN ALIGNMENT ================= */
    columnStyles: {
      0: { cellWidth: 20, halign: 'center' },  // s.No
      1: { cellWidth: 'auto', halign: 'left' }, // Division
      2: { cellWidth: 35, halign: 'center' },  // No of Works
      3: { cellWidth: 45, halign: 'right' }    // Gross Paid
    },
    
    /* ================= DYNAMIC CELL STYLES ================= */
    didParseCell: (data) => {
      if (data.row.index === data.table.body.length - 1) {
        data.cell.styles.fillColor = [173, 197, 230]; 
        data.cell.styles.lineWidth = 0.5;
        data.cell.styles.fontStyle = 'bold';
        data.cell.styles.textColor = [0, 0, 0];
      }
      
      if (data.section === 'head' && data.row.index === 2) {
        data.cell.styles.fillColor = [142, 171, 219]; 
        data.cell.styles.textColor = [0, 0, 0];
        data.cell.styles.lineWidth = 0.5;
      }
    }
  });
  
  // doc.save('Division_Payment_Summary.pdf');
  const formattedDate = this.datePipe.transform(new Date(), 'dd-MMM-yyyy');

  
  doc.save(`Division_Payment_Summary_${formattedDate}.pdf`);
}
// https://cgmsc.gov.in/HIMIS_APIN/api/Payment/PaidDetails?divisionId=D1017&mainSchemeId=0&distid=0&fromdt=03-June-2026&todt=10-June-2026

GETPaidDetails() {
const roleName = localStorage.getItem('roleName');
if (roleName === 'Division') {
  this.divisionid = sessionStorage.getItem('divisionID') || 0;
  this.himisDistrictid = 0;
  this.mainSchemeID = this.mainSchemeID ?  this.mainSchemeID:0;
} else {
  this.divisionid = 0;
  this.himisDistrictid = 0;
  this.mainSchemeID = this.mainSchemeID ?  this.mainSchemeID:0;
}
let divisionIdToSend = 0;
if (this.DId != 0) {
  divisionIdToSend = this.DId ? this.DId : 0;
} else {
  divisionIdToSend = this.divisionid;
}

const districtIdToSend = this.himisDistrictid ? Number(this.himisDistrictid) : 0;
const schemeIdToSend = this.mainSchemeID ? Number(this.mainSchemeID) : 0;

    this.api
      .GETPaidDetails(divisionIdToSend, schemeIdToSend, districtIdToSend, this.fromdt, this.todt)
      .subscribe({
        next: (res: any[]) => {
          this.PaidDetails = res || [];
          
          this.processAndGroupData();
          this.processOnlyFundWiseData();
          this.processWorkWiseData();
        setTimeout(() => {
          this.dataSource1.paginator = this.paginator1;
          this.dataSource1.sort = this.sort1;

          this.dataSource2.paginator = this.paginator2;
          this.dataSource2.sort = this.sort2;

          this.dataSource3.paginator = this.paginator3;
          this.dataSource3.sort = this.sort3;
     
        });
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        error: (err) => {
          console.error(err);
          this.spinner.hide();
        }
      });
  }

  processAndGroupData() {
    this.PaidDetails.sort((a, b) => (a.division || '').localeCompare(b.division || ''));

    const groupMap = new Map<string, any>();

    this.PaidDetails.forEach(item => {
      const key = `${item.division}_${item.head}`;
      
      
      const currentGross = Number(item.grosspaid) || 0;

      if (!groupMap.has(key)) {
        groupMap.set(key, {
          division: item.division,
          head: item.head,
          noofWorks: 1,               
          grosspaid: currentGross,    
          divisionSpan: 1,           
          headSpan: 1
        });
      } else {
        const existing = groupMap.get(key);
        existing.noofWorks += 1;               
        existing.grosspaid += currentGross;    
      }
    });

    this.groupedSummaryData = Array.from(groupMap.values());

    this.calculateRowSpans();

    this.totalWorks = 0;
    this.totalGrossLacs = 0;

    this.groupedSummaryData.forEach((item, index) => {
      item.sno = index + 1;
      this.totalWorks += item.noofWorks;
      this.totalGrossLacs += item.grosspaid;
    });

    this.dataSource1.data = this.groupedSummaryData;
  }

  calculateRowSpans() {
    for (let i = 0; i < this.groupedSummaryData.length; ) {
      let rowSpan = 1;
      for (let j = i + 1; j < this.groupedSummaryData.length; j++) {
        if (this.groupedSummaryData[i].division === this.groupedSummaryData[j].division) {
          rowSpan++;
        } else {
          break;
        }
      }
      this.groupedSummaryData[i].divisionSpan = rowSpan;
      for (let k = i + 1; k < i + rowSpan; k++) {
        this.groupedSummaryData[k].divisionSpan = 0;
      }
      i += rowSpan;
    }

    for (let i = 0; i < this.groupedSummaryData.length; ) {
      let rowSpan = 1;
      for (let j = i + 1; j < this.groupedSummaryData.length; j++) {
        if (
          this.groupedSummaryData[i].division === this.groupedSummaryData[j].division &&
          this.groupedSummaryData[i].head === this.groupedSummaryData[j].head
        ) {
          rowSpan++;
        } else {
          break;
        }
      }
      this.groupedSummaryData[i].headSpan = rowSpan;
      for (let k = i + 1; k < i + rowSpan; k++) {
        this.groupedSummaryData[k].headSpan = 0;
      }
      i += rowSpan;
    }
  }
processOnlyFundWiseData() {
  if (!this.PaidDetails || this.PaidDetails.length === 0) {
    this.groupedFundWiseData = [];
    this.dataSource2.data = [];
    this.totalWorksOnlyFundWise = 0;
    this.totalGrossLacsOnlyFundWise = 0;
    return;
  }

  this.PaidDetails.sort((a, b) => (a.head || '').localeCompare(b.head || ''));

  const fundMap = new Map<string, any>();

  this.PaidDetails.forEach(item => {
    const key = item.head ? item.head.trim() : 'Unknown';
    const currentGross = Number(item.grosspaid) || 0;
    const currentWorks = Number(item.noofWorks || 1); 

    if (!fundMap.has(key)) {
      fundMap.set(key, {
        head: key,
        noofWorks: currentWorks,
        grosspaid: currentGross,
        headSpan: 1
      });
    } else {
      const existing = fundMap.get(key);
      existing.noofWorks += currentWorks;
      existing.grosspaid += currentGross;
    }
  });

  this.groupedFundWiseData = Array.from(fundMap.values());

  this.calculateOnlyFundRowSpans();

  this.totalWorksOnlyFundWise = 0;
  this.totalGrossLacsOnlyFundWise = 0;

  this.groupedFundWiseData.forEach((item, index) => {
    item.sno = index + 1;
    this.totalWorksOnlyFundWise += item.noofWorks;
    this.totalGrossLacsOnlyFundWise += item.grosspaid;
  });

  this.dataSource2.data = this.groupedFundWiseData;
}

calculateOnlyFundRowSpans() {
  for (let i = 0; i < this.groupedFundWiseData.length; ) {
    let rowSpan = 1;
    for (let j = i + 1; j < this.groupedFundWiseData.length; j++) {
      if (this.groupedFundWiseData[i].head === this.groupedFundWiseData[j].head) {
        rowSpan++;
      } else {
        break;
      }
    }
    this.groupedFundWiseData[i].headSpan = rowSpan;
    for (let k = i + 1; k < i + rowSpan; k++) {
      this.groupedFundWiseData[k].headSpan = 0;
    }
    i += rowSpan;
  }
}



parseDDMMYYYY(dateStr: any): any {
  if (!dateStr) return null;
  if (dateStr instanceof Date) return dateStr;
  
  if (typeof dateStr === 'string' && dateStr.includes('-')) {
    const parts = dateStr.split('-');
    if (parts.length === 3 && parts[0].length === 2 && parts[2].length === 4) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`; 
    }
  }
  return dateStr;
}

processWorkWiseData() {
  if (!this.PaidDetails || this.PaidDetails.length === 0) {
    this.groupedWorkWiseData = [];
    this.dataSource3.data = [];
    this.totalGrossLacsWorkWise = 0;
    return;
  }

  this.groupedWorkWiseData = this.PaidDetails.map((item, index) => {
    return {
      ...item,
      sno: index + 1,
      billdate: this.parseDDMMYYYY(item.billdate),
      mesurementDT: this.parseDDMMYYYY(item.mesurementDT),
      chequeDT: this.parseDDMMYYYY(item.chequeDT)
    };
  });

  this.totalGrossLacsWorkWise = 0;
  this.groupedWorkWiseData.forEach(item => {
    this.totalGrossLacsWorkWise += Number(item.grosspaid || 0);
  });

  this.dataSource3.data = this.groupedWorkWiseData;
  
  this.cdr.detectChanges();
}


Workwisepdf() {
  const currentDateTime = this.getCurrentDateTime();
  const doc = new jsPDF('l', 'mm', 'a4'); 
  const bodyData: any[] = [];
  const sourceData = this.groupedWorkWiseData;

  if (!sourceData || sourceData.length === 0) {
    this.toastr.warning('डाउनलोड करने के लिए कोई डेटा उपलब्ध नहीं है।');
    return;
  }

  sourceData.forEach((item) => {
    const row: any[] = [];
    row.push(item.sno);
    row.push(item.division || '');
    row.push(item.district || '');
    row.push(item.worK_ID || '');
    row.push(item.workname || '');
    row.push(item.billno || '');
    row.push(item.agrbillstatus || '');
    
    const safeBillDate = this.parseDDMMYYYY(item.billdate);
    const safeMeasurementDate = this.parseDDMMYYYY(item.mesurementDT);
    const safeChequeDate = this.parseDDMMYYYY(item.chequeDT);

    row.push(safeBillDate ? (this.datePipe.transform(safeBillDate, 'dd-MMM-yyyy') || '') : '');
    row.push(safeMeasurementDate ? (this.datePipe.transform(safeMeasurementDate, 'dd-MMM-yyyy') || '') : '');
    row.push(safeChequeDate ? (this.datePipe.transform(safeChequeDate, 'dd-MMM-yyyy') || '') : '');
    
    row.push(Number(item.grosspaid || 0).toFixed(2));
    row.push(item.dayssincemeasurement ? `${item.dayssincemeasurement} Days` : '0 Days');
    
    bodyData.push(row);
  });

  autoTable(doc, {
    startY: 15,
    theme: 'grid',
    styles: {
      fontSize: 7.5,
      lineWidth: 0.2,
      lineColor: [100, 100, 100],
      valign: 'middle',
      textColor: [0, 0, 0]
    },
    
    /* ================= HEADER SECTION ================= */
    head: [
      [
        {
          content: 'Work wise Payment Summary',
          colSpan: 10, 
          styles: { halign: 'left', fontStyle: 'bold', fontSize: 11, fillColor: [254, 240, 255], textColor: [0, 0, 0] }
        },
        {
          content: `Print Dt: ${currentDateTime}`,
          colSpan: 2,
          styles: { halign: 'right', fontSize: 8, fillColor: [254, 240, 255], textColor: [100, 100, 100] }
        }
      ],
      [
        {
          content: `Payment From Date : ${this.datePipe.transform(this.fromDate, 'dd-MMM-yyyy')}     To     Payment To Date: ${this.datePipe.transform(this.toDate, 'dd-MMM-yyyy')}`,
          colSpan: 12, 
          styles: { halign: 'left', fontSize: 9, fontStyle: 'normal', fillColor: [255, 255, 255], textColor: [50, 50, 50] }
        }
      ],
      [
        { content: 's.No', styles: { halign: 'center' } },
        { content: 'Division', styles: { halign: 'left' } },
        { content: 'District', styles: { halign: 'left' } },
        { content: 'Workcode', styles: { halign: 'center' } },
        { content: 'Work name', styles: { halign: 'left' } },
        { content: 'Bill no', styles: { halign: 'center' } },
        { content: 'Billtype', styles: { halign: 'center' } },
        { content: 'bill Date', styles: { halign: 'center' } },
        { content: 'Measurement Date (A)', styles: { halign: 'center' } },
        { content: 'Paid Date (B)', styles: { halign: 'center' } },
        { content: 'Gross Paid (in Lacs)', styles: { halign: 'right' } },
        { content: 'Time Taken Since Measurement (B-A)', styles: { halign: 'center' } }
      ]
    ],
    
    /* ================= BODY SECTION ================= */
    body: bodyData, 

    /* ================= TOTAL FOOTER SECTION ================= */
    foot: [
      [
        { content: 'Total', colSpan: 10, styles: { fontStyle: 'bold', halign: 'right' } }, 
        { content: Number(this.totalGrossLacsWorkWise || 0).toFixed(2), styles: { fontStyle: 'bold', halign: 'right' } },
        { content: '', styles: { fillColor: [210, 225, 245] } }
      ]
    ],
    
    /* ================= COLUMN WIDTHS ================= */
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },   
      1: { cellWidth: 25, halign: 'left' },     
      2: { cellWidth: 22, halign: 'left' },     
      3: { cellWidth: 18, halign: 'center' },   
      4: { cellWidth: 55, halign: 'left' },     
      5: { cellWidth: 15, halign: 'center' },   
      6: { cellWidth: 18, halign: 'center' },   
      7: { cellWidth: 22, halign: 'center' },   
      8: { cellWidth: 24, halign: 'center' },   
      9: { cellWidth: 24, halign: 'center' },   
      10: { cellWidth: 24, halign: 'right' },   
      11: { cellWidth: 20, halign: 'center' }   
    },
    
    didParseCell: (data) => {
      if (data.section === 'foot') {
        data.cell.styles.fillColor = [173, 197, 230]; 
        data.cell.styles.lineWidth = 0.5;
        data.cell.styles.fontStyle = 'bold';
      }
      if (data.section === 'head' && data.row.index === 2) {
        data.cell.styles.fillColor = [142, 171, 219]; 
        data.cell.styles.lineWidth = 0.5;
      }
    }
  });
  
  // doc.save('Workwise_Payment_Summary.pdf');
      const formattedDate = this.datePipe.transform(new Date(), 'dd-MMM-yyyy');

  
  doc.save(`Workwise_Payment_Summary_${formattedDate}.pdf`);
}


applyTextFilter3(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource3.filter = filterValue.trim().toLowerCase();
}










  applyTextFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }
    exportToExcelpaiddetail(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.dataSource1.data,
    );

    const workbook: XLSX.WorkBook = {
      Sheets: { Data: worksheet },
      SheetNames: ['Data'],
    };

    XLSX.writeFile(workbook, 'Division_Payment_Summaryfundwise_report.xlsx');

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

  }
    exportToExcelfundwise(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.dataSource2.data,
    );

    const workbook: XLSX.WorkBook = {
      Sheets: { Data: worksheet },
      SheetNames: ['Data'],
    };

    XLSX.writeFile(workbook, 'Division_Payment_Summaryfundwise_report.xlsx');

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

  }
    exportToExcelworkwise(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.dataSource3.data,
    );

    const workbook: XLSX.WorkBook = {
      Sheets: { Data: worksheet },
      SheetNames: ['Data'],
    };

    XLSX.writeFile(workbook, ' Work_wise_Payment_Summary_report.xlsx');

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

  }

  generateStrictlyFundWisepdf() {
  const currentDateTime = this.getCurrentDateTime();
  const doc = new jsPDF('p', 'mm', 'a4');
  const bodyData: any[] = [];


  const sourceData = this.groupedSummaryData;

  if (!sourceData || sourceData.length === 0) {
    this.toastr.warning('डाउनलोड करने के लिए कोई डेटा उपलब्ध नहीं है।');
    return;
  }


  sourceData.forEach((item) => {
    const row: any[] = [];

    // 1. S.No Column
    row.push(item.sno);


    if (item.divisionSpan > 0) {
      row.push({
        content: item.division || '',
        rowSpan: item.divisionSpan,
        styles: { fontStyle: 'bold', fillColor: [255, 255, 255], halign: 'left' }
      });
    }

 
    if (item.headSpan > 0) {
      row.push({
        content: item.head || '',
        rowSpan: item.headSpan,
        styles: { fillColor: [255, 255, 255], halign: 'left' }
      });
    }

    // 4. No of Works
    row.push({
      content: (item.noofWorks || 0).toString(),
      styles: { halign: 'center' }
    });

    // 5. Gross Paid (in Lacs)
    row.push({
      content: Number(item.grosspaid || 0).toFixed(2),
      styles: { halign: 'right' }
    });

    bodyData.push(row);
  });

  autoTable(doc, {
    startY: 15,
    theme: 'grid',
    
    /* ================= HEADER SECTION ================= */
    head: [
      [
        {
          content: 'Division Payment Summary Fund wise',
          colSpan: 4, 
          styles: {
            halign: 'left',
            fontStyle: 'bold',
            fontSize: 12,
            fillColor: [254, 240, 255], 
            textColor: [0, 0, 0]
          }
        },
        {
          content: `Print Dt: ${currentDateTime}`,
          colSpan: 1,
          styles: {
            halign: 'right',
            fontSize: 9,
            fillColor: [254, 240, 255],
            textColor: [100, 100, 100]
          }
        }
      ],
      [
        {
          content: `Payment From Date : ${this.datePipe.transform(this.fromDate, 'dd-MMM-yyyy')}     To     Payment To Date: ${this.datePipe.transform(this.toDate, 'dd-MMM-yyyy')}`,
          colSpan: 5, 
          styles: {
            halign: 'left',
            fontSize: 10,
            fontStyle: 'normal',
            fillColor: [255, 255, 255],
            textColor: [50, 50, 50]
          }
        }
      ],
      [
        { content: 's.No', styles: { halign: 'center' } },
        { content: 'Division', styles: { halign: 'left' } },
        { content: 'Fund Head', styles: { halign: 'left' } },
        { content: 'No of Works', styles: { halign: 'center' } },
        { content: 'Gross Paid (in Lacs)', styles: { halign: 'right' } }
      ]
    ],
    
    /* ================= BODY SECTION ================= */
    body: bodyData, 

    /* ================= TOTAL FOOTER SECTION ================= */
    foot: [
      [
        { content: '', styles: { fillColor: [210, 225, 245] } }, 
        { content: 'Total', colSpan: 2, styles: { fontStyle: 'bold', halign: 'left' } }, 
        { content: this.totalWorks.toString(), styles: { fontStyle: 'bold', halign: 'center' } },
        { content: Number(this.totalGrossLacs || 0).toFixed(2), styles: { fontStyle: 'bold', halign: 'right' } }
      ]
    ],

    /* ================= GLOBAL STYLES ================= */
    styles: {
      fontSize: 10,
      lineWidth: 0.3,
      lineColor: [80, 80, 80], 
      valign: 'middle',
      textColor: [0, 0, 0]
    },
    
    /* ================= COLUMN WIDTHS ================= */
    columnStyles: {
      0: { cellWidth: 15 },  
      1: { cellWidth: 45 },  
      2: { cellWidth: 45 },  
      3: { cellWidth: 30 },  
      4: { cellWidth: 40 }   
    },
    
    /* ================= DYNAMIC CELL STYLES ================= */
    didParseCell: (data) => {
      if (data.section === 'foot') {
        data.cell.styles.fillColor = [173, 197, 230]; 
        data.cell.styles.lineWidth = 0.5;
        data.cell.styles.fontStyle = 'bold';
        data.cell.styles.textColor = [0, 0, 0];
      }
      
      if (data.section === 'head' && data.row.index === 2) {
        data.cell.styles.fillColor = [142, 171, 219]; 
        data.cell.styles.lineWidth = 0.5;
      }
    }
  });
    const formattedDate = this.datePipe.transform(new Date(), 'dd-MMM-yyyy');

  
  doc.save(`Division_Fundwise_Payment_Summary_${formattedDate}.pdf`);
}


FundWisepdf() {
  const currentDateTime = this.getCurrentDateTime();
  const doc = new jsPDF('p', 'mm', 'a4');
  const bodyData: any[] = [];
  const sourceData = this.groupedFundWiseData;

  if (!sourceData || sourceData.length === 0) {
    this.toastr.warning('डाउनलोड करने के लिए कोई डेटा उपलब्ध नहीं है।');
    return;
  }

  sourceData.forEach((item) => {
    const row: any[] = [];

    // 1. S.No Column
    row.push(item.sno);

    // 2. Fund Head Column (Rowspan मर्जिंग चेक के साथ)
    if (item.headSpan > 0) {
      row.push({
        content: item.head || '',
        rowSpan: item.headSpan,
        styles: { fontStyle: 'bold', fillColor: [255, 255, 255], halign: 'left' }
      });
    }

    // 3. No of Works
    row.push({
      content: (item.noofWorks || 0).toString(),
      styles: { halign: 'center' }
    });

    // 4. Gross Paid (in Lacs)
    row.push({
      content: Number(item.grosspaid || 0).toFixed(2),
      styles: { halign: 'right' }
    });

    bodyData.push(row);
  });

  autoTable(doc, {
    startY: 15,
    theme: 'grid',
    
    /* ================= HEADER SECTION (4 COLUMNS) ================= */
    head: [
      [
        {
          content: 'Fund wise Payment Summary',
          colSpan: 3, 
          styles: { halign: 'left', fontStyle: 'bold', fontSize: 12, fillColor: [254, 240, 255], textColor: [0, 0, 0] }
        },
        {
          content: `Print Dt: ${currentDateTime}`,
          colSpan: 1,
          styles: { halign: 'right', fontSize: 9, fillColor: [254, 240, 255], textColor: [100, 100, 100] }
        }
      ],
      [
        {
          content: `Payment From Date : ${this.datePipe.transform(this.fromDate, 'dd-MMM-yyyy')}     To     Payment To Date: ${this.datePipe.transform(this.toDate, 'dd-MMM-yyyy')}`,
          colSpan: 4, 
          styles: { halign: 'left', fontSize: 10, fontStyle: 'normal', fillColor: [255, 255, 255], textColor: [50, 50, 50] }
        }
      ],
      [
        { content: 's.No', styles: { halign: 'center' } },
        { content: 'Fund Head', styles: { halign: 'left' } },
        { content: 'No of Works', styles: { halign: 'center' } },
        { content: 'Gross Paid (in Lacs)', styles: { halign: 'right' } }
      ]
    ],
    
    /* ================= BODY SECTION ================= */
    body: bodyData, 

    /* ================= TOTAL FOOTER SECTION ================= */
    foot: [
      [
        { content: '', styles: { fillColor: [210, 225, 245] } }, 
        { content: 'Total', colSpan: 1, styles: { fontStyle: 'bold', halign: 'left' } }, 
        { content: this.totalWorksOnlyFundWise.toString(), styles: { fontStyle: 'bold', halign: 'center' } },
        { content: Number(this.totalGrossLacsOnlyFundWise || 0).toFixed(2), styles: { fontStyle: 'bold', halign: 'right' } }
      ]
    ],

    /* ================= GLOBAL STYLES ================= */
    styles: {
      fontSize: 10,
      lineWidth: 0.3,
      lineColor: [80, 80, 80], 
      valign: 'middle',
      textColor: [0, 0, 0]
    },
    
    /* ================= COLUMN WIDTHS (TOTAL 175mm A4) ================= */
    columnStyles: {
      0: { cellWidth: 20 },  // s.No
      1: { cellWidth: 75 },  // Fund Head (अब इसे चौड़ा कर दिया है)
      2: { cellWidth: 35 },  // No of Works
      3: { cellWidth: 45 }   // Gross Paid
    },
    
    /* ================= DYNAMIC CELL STYLES ================= */
    didParseCell: (data) => {
      if (data.section === 'foot') {
        data.cell.styles.fillColor = [173, 197, 230]; 
        data.cell.styles.lineWidth = 0.5;
        data.cell.styles.fontStyle = 'bold';
      }
      if (data.section === 'head' && data.row.index === 2) {
        data.cell.styles.fillColor = [142, 171, 219]; 
        data.cell.styles.lineWidth = 0.5;
      }
    }
  });
     const formattedDate = this.datePipe.transform(new Date(), 'dd-MMM-yyyy');

  
  doc.save(`Fundwise_Payment_Summary_${formattedDate}.pdf`);
}
//   Workwisepdf() {
//   const currentDateTime = this.getCurrentDateTime();
//   const doc = new jsPDF('p', 'mm', 'a4');
//   const bodyData: any[] = [];


//   const sourceData = this.groupedSummaryData;

//   if (!sourceData || sourceData.length === 0) {
//     this.toastr.warning('डाउनलोड करने के लिए कोई डेटा उपलब्ध नहीं है।');
//     return;
//   }


//   sourceData.forEach((item) => {
//     const row: any[] = [];

//     // 1. S.No Column
//     row.push(item.sno);


//     if (item.divisionSpan > 0) {
//       row.push({
//         content: item.division || '',
//         rowSpan: item.divisionSpan,
//         styles: { fontStyle: 'bold', fillColor: [255, 255, 255], halign: 'left' }
//       });
//     }

 
//     if (item.headSpan > 0) {
//       row.push({
//         content: item.head || '',
//         rowSpan: item.headSpan,
//         styles: { fillColor: [255, 255, 255], halign: 'left' }
//       });
//     }

//     // 4. No of Works
//     row.push({
//       content: (item.noofWorks || 0).toString(),
//       styles: { halign: 'center' }
//     });

//     // 5. Gross Paid (in Lacs)
//     row.push({
//       content: Number(item.grosspaid || 0).toFixed(2),
//       styles: { halign: 'right' }
//     });

//     bodyData.push(row);
//   });

//   autoTable(doc, {
//     startY: 15,
//     theme: 'grid',
    
//     /* ================= HEADER SECTION ================= */
//     head: [
//       [
//         {
//           content: 'Division Payment Summary Fund wise',
//           colSpan: 4, 
//           styles: {
//             halign: 'left',
//             fontStyle: 'bold',
//             fontSize: 12,
//             fillColor: [254, 240, 255], 
//             textColor: [0, 0, 0]
//           }
//         },
//         {
//           content: `Print Dt: ${currentDateTime}`,
//           colSpan: 1,
//           styles: {
//             halign: 'right',
//             fontSize: 9,
//             fillColor: [254, 240, 255],
//             textColor: [100, 100, 100]
//           }
//         }
//       ],
//       [
//         {
//           content: `Payment From Date : ${this.datePipe.transform(this.fromDate, 'dd-MMM-yyyy')}     To     Payment To Date: ${this.datePipe.transform(this.toDate, 'dd-MMM-yyyy')}`,
//           colSpan: 5, 
//           styles: {
//             halign: 'left',
//             fontSize: 10,
//             fontStyle: 'normal',
//             fillColor: [255, 255, 255],
//             textColor: [50, 50, 50]
//           }
//         }
//       ],
//       [
//         { content: 's.No', styles: { halign: 'center' } },
//         { content: 'Division', styles: { halign: 'left' } },
//         { content: 'Fund Head', styles: { halign: 'left' } },
//         { content: 'No of Works', styles: { halign: 'center' } },
//         { content: 'Gross Paid (in Lacs)', styles: { halign: 'right' } }
//       ]
//     ],
    
//     /* ================= BODY SECTION ================= */
//     body: bodyData, 

//     /* ================= TOTAL FOOTER SECTION ================= */
//     foot: [
//       [
//         { content: '', styles: { fillColor: [210, 225, 245] } }, 
//         { content: 'Total', colSpan: 2, styles: { fontStyle: 'bold', halign: 'left' } }, 
//         { content: this.totalWorks.toString(), styles: { fontStyle: 'bold', halign: 'center' } },
//         { content: Number(this.totalGrossLacs || 0).toFixed(2), styles: { fontStyle: 'bold', halign: 'right' } }
//       ]
//     ],

//     /* ================= GLOBAL STYLES ================= */
//     styles: {
//       fontSize: 10,
//       lineWidth: 0.3,
//       lineColor: [80, 80, 80], 
//       valign: 'middle',
//       textColor: [0, 0, 0]
//     },
    
//     /* ================= COLUMN WIDTHS ================= */
//     columnStyles: {
//       0: { cellWidth: 15 },  
//       1: { cellWidth: 45 },  
//       2: { cellWidth: 45 },  
//       3: { cellWidth: 30 },  
//       4: { cellWidth: 40 }   
//     },
    
//     /* ================= DYNAMIC CELL STYLES ================= */
//     didParseCell: (data) => {
//       if (data.section === 'foot') {
//         data.cell.styles.fillColor = [173, 197, 230]; 
//         data.cell.styles.lineWidth = 0.5;
//         data.cell.styles.fontStyle = 'bold';
//         data.cell.styles.textColor = [0, 0, 0];
//       }
      
//       if (data.section === 'head' && data.row.index === 2) {
//         data.cell.styles.fillColor = [142, 171, 219]; 
//         data.cell.styles.lineWidth = 0.5;
//       }
//     }
//   });
  
//   doc.save('Division_Fundwise_Payment_Summary.pdf');
// }

  formatDate(date: Date): string {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return `${date.getDate().toString().padStart(2, '0')}-${months[date.getMonth()]}-${date.getFullYear()}`;
  }


}

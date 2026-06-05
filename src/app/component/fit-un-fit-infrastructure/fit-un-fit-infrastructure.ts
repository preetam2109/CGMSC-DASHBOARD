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
import { FitUnfitSummary, FitUnfit,himis_PendigBillSummary,himis_PendigBill } from 'src/app/Model/DashProgressCount';
import { ApiService } from 'src/app/service/api.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
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
  isall: boolean = true;
  mainscheme: any[] = [];
  selectedTabIndex2: number = 0;
  himis_PendigBillSummary: himis_PendigBillSummary[] = [];
  himis_PendigBill: himis_PendigBill[] = [];
  dataSource!: MatTableDataSource<himis_PendigBillSummary>;
  dataSource1!: MatTableDataSource<himis_PendigBill>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;
  @ViewChild('sort1') sort1!: MatSort;
  displayedColumns: string[] = [
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
    'totalgross',
  ];
  displayedColumns1: string[] = [
    'sno',
    'fund',
    'pedingsection',
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
    'dayssincefile',
    // 'officeorder',
    // 'mainschemeid',
  ];

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
    private location: Location,
  ) {
    this.pageName = this.location.path();
    this.fullUrl = window.location.href;
    this.dataSource = new MatTableDataSource<himis_PendigBillSummary>([]);
    this.dataSource1 = new MatTableDataSource<himis_PendigBill>([]);
  }
  ngOnInit() {
    // this.getCurrentDateTime();
    this.getmain_scheme();
    this.getPendigBillSummary();
    this.getPendigBill();
    this.InsertUserPageViewLog();
  }
  InsertUserPageViewLog() {
    try {
      //
      const roleIdName = localStorage.getItem('roleName') || '';
      const userId = Number(sessionStorage.getItem('userid') || 0);
      const roleId = Number(sessionStorage.getItem('roleId') || 0);
      // const userName = sessionStorage.getItem('firstname') || '';
      const ipAddress = sessionStorage.getItem('ipAddress') || '';
      const userAgent = navigator.userAgent;
      this.InsertUserPageViewLogdata.logId = 0;
      this.InsertUserPageViewLogdata.userId = userId;
      this.InsertUserPageViewLogdata.roleId = roleId;
      this.InsertUserPageViewLogdata.roleIdName = roleIdName;
      this.InsertUserPageViewLogdata.pageName = this.pageName;
      this.InsertUserPageViewLogdata.pageUrl = this.fullUrl;
      this.InsertUserPageViewLogdata.viewTime = new Date().toISOString();
      this.InsertUserPageViewLogdata.ipAddress = ipAddress;
      this.InsertUserPageViewLogdata.userAgent = userAgent;
      // console.log('InsertUserPageViewLogdata=',this.InsertUserPageViewLogdata);
      // if(localStorage.getItem('Log Saved')|| ''!){

      // }
      // API call
      this.api
        .InsertUserPageViewLogPOST(this.InsertUserPageViewLogdata)
        .subscribe({
          next: (res: any) => {
            console.log('Page View Log Saved:', res);
            // const LogSaved='Log Saved'
            // localStorage.setItem('Log Saved', LogSaved);
          },
          error: (err: any) => {
            console.error('Backend Error:', JSON.stringify(err.message));
          },
        });
    } catch (err: any) {
      console.error('Error:', err.message);
    }
  }
  getCurrentDateTime(): string {
    const now = new Date();

    const date = now.toLocaleDateString('en-GB');
    // 22/01/2025

    const time = now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
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
    // ;
    // return;
    this.spinner.show();
    this.api.getPendigBillSummary().subscribe(
      (res) => {
        this.himis_PendigBillSummary = res.map(
          (item: himis_PendigBillSummary, index: number) => ({
            ...item,
            sno: index + 1,
          }),
        );
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
  getPendigBill() {
    // ;
    // return;
    this.spinner.show();
    this.api.getPendigBill(this.mainSchemeID, this.officeorderid).subscribe(
      (res) => {
        this.himis_PendigBill = res.map(
          (item: himis_PendigBill, index: number) => ({
            ...item,
            sno: index + 1,
          }),
        );
        this.dataSource1.data = this.himis_PendigBill;
        // console.log('himis_PendigBill= ', this.himis_PendigBill);
        this.dataSource1.paginator = this.paginator1;
        this.dataSource1.sort = this.sort1;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        console.error('Error fetching data', error);
      },
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
        totalgross: 0,
      },
    );
  }


  exportToPDF22() {
    const currentDateTime = this.getCurrentDateTime();
    const doc = new jsPDF('l', 'mm', 'a4');
    autoTable(doc, {
      startY: 10,
      theme: 'grid',

      head: [
        [
          {
            content:
              'Pending Bills (Unpaid) Under Process at Various Level\n' +
              `Source HIMIS : ${currentDateTime}`,
            colSpan: 8,
            styles: {
              halign: 'center',
              fillColor: [254, 240, 255],
              fontStyle: 'bold',
              textColor: [0, 0, 0],
            },
          },
        ],
        [
          { content: 'Fund', rowSpan: 2 },
          { content: 'Division Level', colSpan: 2 },
          { content: 'SE Office', colSpan: 2 },
          { content: 'Finance-HO', colSpan: 2 },
          { content: 'Total Gross (In Lacs)', rowSpan: 2 },
        ],
        [
          'No of Bills',
          'Gross to be Paid (In Lacs)',
          'No of Bills',
          'Gross to be Paid (In Lacs)',
          'No of Bills',
          'Gross to be Paid (In Lacs)',
        ],
      ],

      body: this.himis_PendigBillSummary.map((r) => [
        // r.fund,
        // r.billdiv, r.divgrossamt,
        // r.billse, r.segrossamt,
        // r.billfin, r.fingrossamt,
        // r.totalgross
        r.fund, // 0
        r.billdiv, // 1
        r.divgrossamt, // 2
        r.billse, // 3
        r.segrossamt, // 4
        r.billfin, // 5
        r.fingrossamt, // 6
        r.totalgross, // 7
      ]),

      styles: {
        fontSize: 8,

        // halign: 'center'
      },
      columnStyles: {
        0: { halign: 'left' }, // Fund → RIGHT

        1: { halign: 'center' }, // Bill Division No
        3: { halign: 'center' }, // Bill Section No
        5: { halign: 'center' }, // Bill Finance No

        2: { halign: 'right' }, // Division Gross
        4: { halign: 'right' }, // Section Gross
        6: { halign: 'right' }, // Finance Gross
        7: { halign: 'right' }, // Total Gross
      },
    });

    doc.save('Construction_Pay_Pending_Fundwise.pdf');
  }
  exportToPDF2() {
    const currentDateTime = this.getCurrentDateTime();
    const total = this.getTotals();
    const doc = new jsPDF('l', 'mm', 'a4');

    autoTable(doc, {
      startY: 10,
      theme: 'grid',

      /* ================= HEADER ================= */
      head: [
        [
          // {
          //   content:
          //     'Pending Bills (Unpaid) Under Process at Various Level | ' +
          //     `Date : ${currentDateTime}`,
          //   colSpan: 8,
          //   styles: {
          //     halign: 'center',
          //     fontStyle: 'bold',
          //     fontSize: 11,
          //     // fillColor: [255, 255, 255],
          //     fillColor: [254, 240, 255],
          //     textColor: [0, 0, 0],
          //     lineWidth: 0.8,
          //     lineColor: [0, 0, 0]
          //   }
          // }
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
              lineColor: [0, 0, 0],
            },
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
              lineColor: [0, 0, 0],
            },
          },
        ],
        [
          { content: 'Fund', rowSpan: 2 },
          {
            content: 'Division Level',
            colSpan: 2,
            styles: {
              halign: 'center',
              // fontStyle: 'bold',
              // fillColor: [255, 255, 255],
            },
          },
          {
            content: 'SE Office',
            colSpan: 2,
            styles: {
              halign: 'center',
              // fontStyle: 'bold',
              // fillColor: [255, 255, 255],
            },
          },
          {
            content: 'Finance-HO',
            colSpan: 2,
            styles: {
              halign: 'center',
              // fontStyle: 'bold',
              // fillColor: [255, 255, 255],
            },
          },
          { content: 'Total Gross to be Paid\n(In Lacs)', rowSpan: 2 },
        ],
        [
          'No of Bills',
          'Gross to be Paid\n(In Lacs)',
          'No of Bills',
          'Gross to be Paid\n(In Lacs)',
          'No of Bills',
          'Gross to be Paid\n(In Lacs)',
        ],
      ],

      /* ================= BODY ================= */
      body: [
  ...this.himis_PendigBillSummary.map((r) => [
    r.fund,
    r.billdiv,
    Number(r.divgrossamt).toFixed(2),
    r.billse,
    Number(r.segrossamt).toFixed(2),
    r.billfin,
    Number(r.fingrossamt).toFixed(2),
    Number(r.totalgross).toFixed(2),
  ]),

      // body: [
      //   ...this.himis_PendigBillSummary.map((r) => [
      //     r.fund,
      //     r.billdiv,
      //     r.divgrossamt,
      //     r.billse,
      //     r.segrossamt,
      //     r.billfin,
      //     r.fingrossamt,
      //     r.totalgross,
      //   ]),

        /* ===== TOTAL ROW ===== */
        // [
        //   { content: 'Total', styles: { fontStyle: 'bold' } },
        //   { content: 458, styles: { fontStyle: 'bold' } },
        //   { content: 5684.78, styles: { fontStyle: 'bold' } },
        //   { content: 23, styles: { fontStyle: 'bold' } },
        //   { content: 733.77, styles: { fontStyle: 'bold' } },
        //   { content: 40, styles: { fontStyle: 'bold' } },
        //   { content: 1538.35, styles: { fontStyle: 'bold' } },
        //   { content: 7956.9, styles: { fontStyle: 'bold' } }
        // ]
        [
          { content: 'Total', styles: { fontStyle: 'bold' } },
          { content: total.billdiv, styles: { fontStyle: 'bold' } },
          {
            content: total.divgrossamt.toFixed(2),
            styles: { fontStyle: 'bold' },
          },
          { content: total.billse, styles: { fontStyle: 'bold' } },
          {
            content: total.segrossamt.toFixed(2),
            styles: { fontStyle: 'bold' },
          },
          { content: total.billfin, styles: { fontStyle: 'bold' } },
          {
            content: total.fingrossamt.toFixed(2),
            styles: { fontStyle: 'bold' },
          },
          {
  content: Number(total.totalgross).toFixed(2),
  styles: { fontStyle: 'bold' },
}
          // {
            
          //   content: total.totalgross.toFixed(2),
          //   styles: { fontStyle: 'bold' },
          // },
        ],
      ],

      /* ================= GLOBAL STYLES ================= */
      styles: {
        fontSize: 8,
        lineWidth: 0.6,
        lineColor: [0, 0, 0],
        valign: 'middle',
      },

      /* ================= COLUMN ALIGNMENT ================= */
      columnStyles: {
        0: { halign: 'left' }, // Fund
        1: { halign: 'center' },
        3: { halign: 'center' },
        5: { halign: 'center' },
        2: { halign: 'right', fontStyle: 'bold' },
        4: { halign: 'right', fontStyle: 'bold' },
        6: { halign: 'right', fontStyle: 'bold' },
        7: { halign: 'right', fontStyle: 'bold' },
      },

      /* ================= ROW STYLES ================= */
      didParseCell: function (data) {
        // TOTAL ROW STYLE
        if (data.row.index === data.table.body.length - 1) {
          data.cell.styles.fillColor = [254, 240, 255];
          data.cell.styles.textColor = [0, 0, 0];
          data.cell.styles.lineWidth = 0.8;
        }

        // HEADER GRID DARK
        if (data.section === 'head') {
          data.cell.styles.lineWidth = 0.8;
          data.cell.styles.lineColor = [0, 0, 0];
          data.cell.styles.fontStyle = 'bold';
        }
      },
    });

    doc.save('Construction_Pay_Pending_Fundwise.pdf');
  }

  exportToPDF33() {
        const currentDateTime = this.getCurrentDateTime();
    const total = this.getTotals();
    const doc = new jsPDF('l', 'mm', 'a4');
 const head = [
  [
    {
      content: 'Pending payment Division wise',
      colSpan: 9, // total columns cover karo
      // styles: {
      //   halign: 'center',
      //   fontStyle: 'bold',
      //   fontSize: 11,
      //   fillColor: [254, 240, 255],
      //   textColor: [0, 0, 0],
      //   lineWidth: 0.8,
      //   lineColor: [0, 0, 0],
      // },
    },
    {
      content: `Pt Date : ${currentDateTime}`,
      colSpan: 2,
      // styles: {
      //   halign: 'right',
      //   valign: 'top',
      //   fontSize: 9,
      //   fillColor: [254, 240, 255],
      //   textColor: [0, 0, 0],
      //   lineWidth: 0.8,
      //   lineColor: [0, 0, 0],
      // },
    },
  ],
  [
    'S.No',
    'Fund Head',
    'Section',
    'Division',
    'District',
    'Work',
    'Contractor',
    'Agreement Bill Status',
    'Gross Amount',
    'File On Desk',
    // 'Days Since File',
  ]
];
    // const head = [
    //   // [
    //   //   'S.No',
    //   //   'Fund Hed',
    //   //   'Section',
    //   //   // 'Pending Section',
    //   //   'Division',
    //   //   'District',
    //   //   'Work',
    //   //   'Contractor',
    //   //   'Agreement Bill Status',
    //   //   // 'Bill No',
    //   //   // 'Bill Date',
    //   //   // 'Measurement Date',
    //   //   'Gross Amount',
    //   //   'File On Desk',
    //   //   'Days Since File',
    //   //   // 'Office Order'
    //   // ],
    //          {
    //         content: 'Pending payment Divesion wies',
    //         colSpan: 6,
    //         styles: {
    //           halign: 'center',
    //           fontStyle: 'bold',
    //           fontSize: 11,
    //           fillColor: [254, 240, 255],
    //           textColor: [0, 0, 0],
    //           lineWidth: 0.8,
    //           lineColor: [0, 0, 0],
    //         },
    //       },
    //       {
    //         content: `Date : ${currentDateTime}`,
    //         colSpan: 2,
    //         styles: {
    //           halign: 'right',
    //           valign: 'top',
    //           fontSize: 9,
    //           fillColor: [254, 240, 255],
    //           textColor: [0, 0, 0],
    //           lineWidth: 0.8,
    //           lineColor: [0, 0, 0],
    //         },
    //       },
    // ];

    const body = this.himis_PendigBill.map((row) => [
      row.sno,
      row.fund,
      row.pedingsection,
      // row.divisionname,
      row.divisionname?.replace(/ division/i, ''),
      row.district,
      row.workname,
      row.contractor,
      row.agrbillstatus,
      // row.billno,
      // row.billdate,
      // row.measurementdate,
      row.grossamount,
      row.fileondesk,
      // row.dayssincefile,
      // row.officeorder
    ]);

    // autoTable(doc, {
    //   head: head,
    //   body: body,
    //   startY: 15,
    //   theme: 'grid',
    //   styles: {
    //     fontSize: 7,
    //   },
    //   headStyles: {
    //     halign: 'center',
    //   },
    // });
    autoTable(doc, {
  head: head,
  body: body,
  startY: 15,
  theme: 'grid',

  styles: {
    fontSize: 7,
    lineWidth: 0.5,
    lineColor: [0, 0, 0],
    valign: 'middle',
    cellPadding: 2,
  },

  headStyles: {
    halign: 'center',
    fontStyle: 'bold',
    fillColor: [230, 230, 230],
    textColor: [0, 0, 0],
    lineWidth: 0.8,
    lineColor: [0, 0, 0],
  },

  bodyStyles: {
    lineWidth: 0.4,
    lineColor: [120, 120, 120],
  },

  didParseCell: function (data) {

    // First Title Row Boxing
    if (data.section === 'head' && data.row.index === 0) {
      data.cell.styles.fillColor = [254, 240, 255];
      data.cell.styles.fontSize = 10;
      data.cell.styles.fontStyle = 'bold';
      data.cell.styles.lineWidth = 1;
      data.cell.styles.lineColor = [0, 0, 0];
    }

    // Column Header Row Boxing
    if (data.section === 'head' && data.row.index === 1) {
      data.cell.styles.fillColor = [240, 240, 240];
      data.cell.styles.lineWidth = 0.8;
      data.cell.styles.lineColor = [0, 0, 0];
    }
  }
});
// autoTable(doc, {
//   head: head,
//   body: body,
//   startY: 15,
//   theme: 'grid',
//   styles: {
//     fontSize: 7,
//   },
//   headStyles: {
//     halign: 'center',
//     fontStyle: 'bold'
//   }
// });
    doc.save('NHM_Fund_Construction_Bills_Under_Process.pdf');
  }







  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.dataSource.data,
    );

    const workbook: XLSX.WorkBook = {
      Sheets: { Data: worksheet },
      SheetNames: ['Data'],
    };

    XLSX.writeFile(workbook, 'report.xlsx');

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    this.saveExcelFile(excelBuffer, 'Data_Table');
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

    XLSX.writeFile(workbook, 'report.xlsx');

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    this.saveExcelFile1(excelBuffer, 'Data_Table');
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



//  exportToPDF03() {
//         const currentDateTime = this.getCurrentDateTime();
//     const total = this.getTotals();
//     const doc = new jsPDF('l', 'mm', 'a4');
//  const head = [
//   [
//     {
//       content: 'Pending payment Division wise',
//       colSpan: 9, 
  
//     },
//     {
//       content: `Pt Date : ${currentDateTime}`,
//       colSpan: 2,
   
//     },
//   ],
//   [
//     'S.No',
//     'Fund Head',
//     'Section',
//     'Division',
//     'District',
//     'Work',
//     'Contractor',
//     'Agreement Bill Status',
//     'Gross Amount\n(In Lacs)',
//     'File On Desk',
//     // 'Days Since File',
//   ]
// ];

//     // const body = this.himis_PendigBill.map((row) => [
//     //   row.sno,
//     //   row.fund,
//     //   row.pedingsection,
//     //   // row.divisionname,
//     //   row.divisionname?.replace(/ division/i, ''),
//     //   row.district,
//     //   row.workname,
//     //   row.contractor,
//     //   row.agrbillstatus,
//     //   // row.billno,
//     //   // row.billdate,
//     //   // row.measurementdate,
//     //   row.grossamount,
//     //   row.fileondesk,
//     //   // row.dayssincefile,
//     //   // row.officeorder
//     // ]);
// const body = finalData.map((row: any) => [
//   row.sno,
//   row.fund,
//   row.pedingsection,
//   row.divisionname,
//   row.district,
//   row.workname,
//   row.contractor,
//   row.agrbillstatus,
//   Number(row.grossamount).toFixed(2),
//   row.fileondesk,
// ]);
 
//     autoTable(doc, {
//   head: head,
//   body: body,
//   startY: 15,
//   theme: 'grid',

//   styles: {
//     fontSize: 7,
//     lineWidth: 0.5,
//     lineColor: [0, 0, 0],
//     valign: 'middle',
//     cellPadding: 2,
//   },

//   headStyles: {
//     halign: 'center',
//     fontStyle: 'bold',
//     fillColor: [230, 230, 230],
//     textColor: [0, 0, 0],
//     lineWidth: 0.8,
//     lineColor: [0, 0, 0],
//   },

//   bodyStyles: {
//     lineWidth: 0.4,
//     lineColor: [120, 120, 120],
//   },

//   didParseCell: function (data) {

//     // First Title Row Boxing
//     if (data.section === 'head' && data.row.index === 0) {
//       data.cell.styles.fillColor = [254, 240, 255];
//       data.cell.styles.fontSize = 10;
//       data.cell.styles.fontStyle = 'bold';
//       data.cell.styles.lineWidth = 1;
//       data.cell.styles.lineColor = [0, 0, 0];
//     }

//     // Column Header Row Boxing
//     if (data.section === 'head' && data.row.index === 1) {
//       data.cell.styles.fillColor = [240, 240, 240];
//       data.cell.styles.lineWidth = 0.8;
//       data.cell.styles.lineColor = [0, 0, 0];
//     }
//   }
// });

//     doc.save('NHM_Fund_Construction_Bills_Under_Process.pdf');
//   }
// exportToPDF3() {

//   const currentDateTime = this.getCurrentDateTime();
//   const doc = new jsPDF('l', 'mm', 'a4');

//   // Group data first
//   const groupedData = this.himis_PendigBill.reduce((acc: any, row: any) => {

//     const division = row.divisionname
//       ?.replace(/division/gi, '')
//       ?.trim();

//     const key = `${row.fund}_${division}`;

//     if (!acc[key]) {
//       acc[key] = {
//         sno: Object.keys(acc).length + 1,
//         fund: row.fund,
//         pedingsection: row.pedingsection,
//         divisionname: division,
//         district: row.district,
//         workname: row.workname,
//         contractor: row.contractor,
//         agrbillstatus: row.agrbillstatus,
//         grossamount: 0,
//         fileondesk: row.fileondesk,
//       };
//     }

//     acc[key].grossamount += Number(row.grossamount || 0);

//     return acc;

//   }, {});

//   // Convert object → array
//   const finalData: any[] = Object.values(groupedData);

//   // Create body
//   const body = finalData.map((row: any) => [
//     row.sno,
//     row.fund,
//     row.pedingsection,
//     row.divisionname,
//     row.district,
//     row.workname,
//     row.contractor,
//     row.agrbillstatus,
//     Number(row.grossamount).toFixed(2),
//     row.fileondesk
//   ]);

//   console.log(body);

//   autoTable(doc, {
//     head: head,
//     body: body,
//     startY: 15,
//     theme: 'grid'
//   });
// //       autoTable(doc, {
// //   head: head,
// //   body: body,
// //   startY: 15,
// //   theme: 'grid',

// //   styles: {
// //     fontSize: 7,
// //     lineWidth: 0.5,
// //     lineColor: [0, 0, 0],
// //     valign: 'middle',
// //     cellPadding: 2,
// //   },

// //   headStyles: {
// //     halign: 'center',
// //     fontStyle: 'bold',
// //     fillColor: [230, 230, 230],
// //     textColor: [0, 0, 0],
// //     lineWidth: 0.8,
// //     lineColor: [0, 0, 0],
// //   },

// //   bodyStyles: {
// //     lineWidth: 0.4,
// //     lineColor: [120, 120, 120],
// //   },

// //   didParseCell: function (data) {

// //     // First Title Row Boxing
// //     if (data.section === 'head' && data.row.index === 0) {
// //       data.cell.styles.fillColor = [254, 240, 255];
// //       data.cell.styles.fontSize = 10;
// //       data.cell.styles.fontStyle = 'bold';
// //       data.cell.styles.lineWidth = 1;
// //       data.cell.styles.lineColor = [0, 0, 0];
// //     }

// //     // Column Header Row Boxing
// //     if (data.section === 'head' && data.row.index === 1) {
// //       data.cell.styles.fillColor = [240, 240, 240];
// //       data.cell.styles.lineWidth = 0.8;
// //       data.cell.styles.lineColor = [0, 0, 0];
// //     }
// //   }
// // });
// }
exportToPDFw3() {

  const currentDateTime = this.getCurrentDateTime();
  const doc = new jsPDF('l', 'mm', 'a4');

  // Header
  const head = [
    [
      {
        content: 'Pending payment Division wise',
        colSpan: 9,
      },
      {
        content: `Pt Date : ${currentDateTime}`,
        colSpan: 2,
      },
    ],
    [
      'S.No',
      'Fund Head',
      'Section',
      'Division',
      'District',
      'Work',
      'Contractor',
      'Agreement Bill Status',
      'Gross Amount\n(In Lacs)',
      'File On Desk',
    ]
  ];

  // Group data
  const groupedData = this.himis_PendigBill.reduce((acc: any, row: any) => {

    const division = row.divisionname
      ?.replace(/division/gi, '')
      ?.trim();

    const key = `${row.fund}_${division}`;

    if (!acc[key]) {
      acc[key] = {
        sno: Object.keys(acc).length + 1,
        fund: row.fund,
        pedingsection: row.pedingsection,
        divisionname: division,
        district: row.district,
        workname: row.workname,
        contractor: row.contractor,
        agrbillstatus: row.agrbillstatus,
        grossamount: 0,
        fileondesk: row.fileondesk,
      };
    }

    acc[key].grossamount += Number(row.grossamount || 0);

    return acc;

  }, {});

  const finalData: any[] = Object.values(groupedData);

  const body = finalData.map((row: any) => [
    row.sno,
    row.fund,
    row.pedingsection,
    row.divisionname,
    row.district,
    row.workname,
    row.contractor,
    row.agrbillstatus,
    Number(row.grossamount).toFixed(2),
    row.fileondesk,
  ]);

  autoTable(doc, {
    head: head,
    body: body,
    startY: 15,
    theme: 'grid'
  });

  doc.save('NHM_Fund_Construction_Bills_Under_Process.pdf');
}
exportToPDF3() {

  const currentDateTime = this.getCurrentDateTime();
  const doc = new jsPDF('l', 'mm', 'a4');

  const head = [
    [
      {
        content: 'Pending Payment Division Wise',
        colSpan: 4,
      },
      {
        content: `Pt Date : ${currentDateTime}`,
        colSpan: 1,
      },
    ],
    [
      'S.No',
      'Fund Head',
      'Division',
      'Amount\n(In Lacs)',
      'File On Desk'
    ]
  ];

  // Group Fund + Division
  const groupedData = this.himis_PendigBill.reduce((acc: any, row: any) => {

    const division = row.divisionname
      ?.replace(/division/gi, '')
      ?.trim();

    const key = `${row.fund}_${division}`;

    if (!acc[key]) {
      acc[key] = {
        sno: Object.keys(acc).length + 1,
        fund: row.fund,
        divisionname: division,
        grossamount: 0,
        fileondesk: row.fileondesk
      };
    }

    acc[key].grossamount += Number(row.grossamount || 0);

    return acc;

  }, {});

  // const finalData: any[] = Object.values(groupedData);
// const finalData: any[] = Object.values(groupedData).sort(
//   (a: any, b: any) => {

//     // First sort by Division
//     const divisionCompare =
//       a.divisionname.localeCompare(b.divisionname);

//     if (divisionCompare !== 0) {
//       return divisionCompare;
//     }

//     // Then sort by Fund inside Division
//     return a.fund.localeCompare(b.fund);
//   }
// );
const finalData: any[] = Object.values(groupedData).sort(
  (a: any, b: any) => {

    // Division wise sorting first
    const divisionCompare =
      a.divisionname.localeCompare(b.divisionname);

    if (divisionCompare !== 0) {
      return divisionCompare;
    }

    const convertFYDate = (dateStr: string) => {

      if (!dateStr) {
        return {
          fyMonth: 99,
          day: 99,
          year: 9999
        };
      }

      const separator =
        dateStr.includes('/') ? '/' : '-';

      const [day, month, year] =
        dateStr.split(separator).map(Number);

      return {
        fyMonth: month >= 3 ? month : month + 12,
        day,
        year
      };
    };

    const dateA = convertFYDate(a.fileondesk);
    const dateB = convertFYDate(b.fileondesk);

    // Month compare (March first)
    if (dateA.fyMonth !== dateB.fyMonth) {
      return dateA.fyMonth - dateB.fyMonth;
    }

    // Same month -> compare date
    if (dateA.day !== dateB.day) {
      return dateA.day - dateB.day;
    }

    // Same date -> compare year
    return dateA.year - dateB.year;
  }
);
  // Grand Total
  const grandTotal = finalData.reduce(
    (sum: number, row: any) => sum + Number(row.grossamount || 0),
    0
  );
  let previousDivision = '';

// const body = finalData.map((row: any) => {

//   const showDivision =
//     previousDivision === row.divisionname
//       ? ''
//       : row.divisionname;

//   previousDivision = row.divisionname;

//   return [
//     row.sno,
//     row.fund,
//     showDivision,
//     Number(row.grossamount).toFixed(2),
//     row.fileondesk,
//   ];
// });


 // Add total row
  const body = finalData.map((row: any, index: number) => [

  // Proper sequence
  index + 1,

  row.fund,

  // Show division every row
  row.divisionname,

  Number(row.grossamount).toFixed(2),

  row.fileondesk,
]);
// let previousDivision = '';

// const body = finalData.map((row: any) => {

//   const showDivision =
//     previousDivision === row.divisionname
//       ? ''
//       : row.divisionname;

//   previousDivision = row.divisionname;

//   return [
//     row.sno,
//     row.fund,
//     showDivision,
//     Number(row.grossamount).toFixed(2),
//     row.fileondesk,
//   ];
// });
  // const body = finalData.map((row: any) => [
  //   row.sno,
  //   row.fund,
  //   row.divisionname,
  //   Number(row.grossamount).toFixed(2),
  //   row.fileondesk,
  // ]);

 
  body.push([
    '',
    '',
    'Grand Total',
    grandTotal.toFixed(2),
    ''
  ]);
// autoTable(doc, {
//   head,
//   body,
//   startY: 15,
//   theme: 'grid',

//   tableWidth: 'auto',

// margin: {
//   left: 18,
//   right: 18
// },

// columnStyles: {
//   0: { cellWidth: 20, halign: 'center' }, // S.No
//   1: { cellWidth: 70 },                   // Fund Head
//   2: { cellWidth: 70 },                   // Division
//   3: { cellWidth: 45, halign: 'right' }, // Amount
//   4: { cellWidth: 40, halign: 'center' } // File On Desk
// },
// styles: {
//   fontSize: 8.5,
//   lineWidth: 0.4,
//   lineColor: [80,80,80],
//   cellPadding: 3,
//   valign: 'middle'
// },

// headStyles: {
//   fontStyle: 'bold',
//   halign: 'center',
//   fillColor: [32, 178, 170], // attractive teal
//   textColor: [255,255,255],
//   lineWidth: 0.8,
//   minCellHeight: 10
// },

// bodyStyles: {
//   lineWidth: 0.3,
//   lineColor: [150,150,150],
//   minCellHeight: 7
// }
//  });
autoTable(doc, {
  head,
  body,
  startY: 15,
  theme: 'grid',

  tableWidth: 'auto',

  margin: {
    left: 16,
    right: 16
  },

  columnStyles: {
    0: { cellWidth: 18, halign: 'center' },
    1: { cellWidth: 72 },
    2: { cellWidth: 65 },
    3: { cellWidth: 45, halign: 'right' },
    4: { cellWidth: 38, halign: 'center' }
  },

  styles: {
    fontSize: 8.5,
    cellPadding: 3,
    lineWidth: 0.6,
    lineColor: [90,90,90],
    valign: 'middle',
    overflow: 'linebreak'
  },

  headStyles: {
    fillColor: [32,178,170],
    textColor: [255,255,255],
    fontStyle: 'bold',
    fontSize: 9,
    halign: 'center',
    valign: 'middle',
    lineWidth: 1,
    lineColor: [0,0,0],
    minCellHeight: 10
  },

  bodyStyles: {
    lineWidth: 0.5,
    lineColor: [120,120,120],
    minCellHeight: 8
  },

  alternateRowStyles: {
    fillColor: [245,245,245]   // zebra effect
  },

  didParseCell: (data) => {

    // Title Row
    if (data.section === 'head' && data.row.index === 0) {
      data.cell.styles.fillColor = [0,150,136];
      data.cell.styles.fontSize = 10;
      data.cell.styles.fontStyle = 'bold';
      data.cell.styles.lineWidth = 1.2;
      data.cell.styles.lineColor = [0,0,0];
    }

    // Grand Total Row
    if (
      data.section === 'body' &&
      data.row.index === body.length - 1
    ) {
      data.cell.styles.fillColor = [220,230,240];
      data.cell.styles.fontStyle = 'bold';
      data.cell.styles.fontSize = 9;
      data.cell.styles.lineWidth = 1;
      data.cell.styles.lineColor = [0,0,0];
    }
  }
});
  // autoTable(doc, {
  //     head,
  // body,
  // startY: 15,
  // theme: 'grid',

  // // columnStyles: {
  // //   0: { cellWidth: 15 },
  // //   1: { cellWidth: 50 },
  // //   2: { cellWidth: 55 },
  // //   3: { cellWidth: 35, halign: 'right' },
  // //   4: { cellWidth: 30 }, // File On Desk smaller
  // // },

  // // styles: {
  // //   fontSize: 8,
  // //   lineWidth: 0.5,
  // //   lineColor: [0,0,0],
  // //   cellPadding: 2,
  // //   valign: 'middle'
  // // },

  // tableWidth: 'wrap', // content ke according width
  // margin: {
  //   left: 20,
  //   right: 20
  // },

  // columnStyles: {
  //   0: { cellWidth: 15 },
  //   1: { cellWidth: 40 },
  //   2: { cellWidth: 55 },
  //   3: { cellWidth: 35, halign: 'right' },
  //   4: { cellWidth: 25 }
  // },

  // styles: {
  //   fontSize: 8,
  //   lineWidth: 0.5,
  //   lineColor: [0,0,0],
  //   cellPadding: 2,
  //   valign: 'middle'
  // },
  //   // head,
  //   // body,
  //   // startY: 15,
  //   // theme: 'grid',

  //   // styles: {
  //   //   fontSize: 8,
  //   //   lineWidth: 0.5,
  //   //   lineColor: [0, 0, 0],
  //   //   cellPadding: 2,
  //   //   valign: 'middle'
  //   // },

  //   headStyles: {
  //     fontStyle: 'bold',
  //     halign: 'center',
  //     fillColor: [230, 230, 230],
  //     textColor: [0, 0, 0],
  //     lineWidth: 0.8
  //   },

  //   bodyStyles: {
  //     lineWidth: 0.4,
  //     lineColor: [120, 120, 120]
  //   },

  //   didParseCell: function (data) {

  //     // Title row styling
  //     if (data.section === 'head' && data.row.index === 0) {
  //       data.cell.styles.fillColor = [254, 240, 255];
  //       data.cell.styles.fontStyle = 'bold';
  //       data.cell.styles.fontSize = 10;
  //       data.cell.styles.lineWidth = 1;
  //     }

  //     // Grand total row
  //     if (
  //       data.section === 'body' &&
  //       data.row.index === body.length - 1
  //     ) {
  //       data.cell.styles.fillColor = [220, 220, 220];
  //       data.cell.styles.fontStyle = 'bold';
  //       data.cell.styles.lineWidth = 0.8;
  //     }
  //   }
  // });

  doc.save('NHM_Fund_Construction_Bills_Under_Process.pdf');
}
  //#endregion
}

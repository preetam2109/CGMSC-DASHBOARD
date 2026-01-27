import { CommonModule, DatePipe, NgFor } from '@angular/common';
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

@Component({
  selector: 'app-fit-un-fit-infrastructure',
   standalone: true,
   imports: [
     MatSortModule,FormsModule,
     MatPaginatorModule,
     MatTableModule,
     MatTableExporterModule,
     MatInputModule,
     MatDialogModule,
     NgbModule,
     MatMenuModule,
     CommonModule,
     MatIconModule,MatTabsModule,NgSelectModule
   ],
  templateUrl: './fit-un-fit-infrastructure.html',
  styleUrl: './fit-un-fit-infrastructure.css'
})
export class FitUnFitInfrastructure {
  isall: boolean = true;
  mainscheme:any []=[];
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
 
  mainSchemeID=0;
  officeorderid=0;
  officeorder=[
    { "pedingsection": "Finance","officeorderid": 1},
    { "pedingsection": "SE Office","officeorderid": 2 },
    { "pedingsection": "Divisional Level","officeorderid": 3 }
  ]
  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    public datePipe: DatePipe,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.dataSource = new MatTableDataSource<himis_PendigBillSummary>([]);
    this.dataSource1 = new MatTableDataSource<himis_PendigBill>([]);
  }
  ngOnInit() {
    // this.getCurrentDateTime();
    this.getmain_scheme();
    this.getPendigBillSummary();
    this.getPendigBill();

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
    } else if(this.selectedTabIndex2 == 1){
      this.dataSource1.paginator = this.paginator1;
      this.dataSource1.sort = this.sort1;
    }

  }
   //#region Infrastructure
   getmain_scheme() {
    try {
      // 
      this.api.getMainScheme(this.isall).subscribe((res:any)=>{
        if (res && res.length > 0) {
        this.mainscheme = res.map((item: { mainSchemeID: any; name: any; }) => ({
          mainSchemeID: item.mainSchemeID, // Adjust key names if needed
          name : item.name,  
        }));
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
    // debugger;
    // return;
    this.spinner.show();
    this.api.getPendigBillSummary().subscribe(
      (res) => {
        this.himis_PendigBillSummary = res.map((item: himis_PendigBillSummary, index: number) => ({
          ...item,
          sno: index + 1,
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
      }
    );
  }
  getPendigBill() {
    // debugger;
    // return;
    this.spinner.show();
    this.api.getPendigBill(this.mainSchemeID,this.officeorderid).subscribe(
      (res) => {
        this.himis_PendigBill = res.map(
          (item: himis_PendigBill, index: number) => ({
            ...item,
            sno: index + 1,
          })
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
  

  // exportToPDF2() {

  //   const doc = new jsPDF('l', 'mm', 'a4');
  
  //   const head = [[
  //     'S.No',
  //     'Fund',
  //     'Bill Division',
  //     'Division Gross Amount (In Lacs)',
  //     'Bill Section',
  //     'Section Gross Amount (In Lacs)',
  //     'Bill Finance',
  //     'Finance Gross Amount (In Lacs)',
  //     'Total Gross (In Lacs)',
  //     'Office Order'
  //   ]];
  
  //   const body = this.himis_PendigBillSummary.map(row => [
  //     row.sno,
  //     row.fund,
  //     row.billdiv,
  //     row.divgrossamt,
  //     row.billse,
  //     row.segrossamt,
  //     row.billfin,
  //     row.fingrossamt,
  //     row.totalgross,
  //     row.officeorder
  //   ]);
  
  //   autoTable(doc, {
  //     head: head,
  //     body: body,
  //     startY: 20,
  //     theme: 'grid',
  //     styles: {
  //       fontSize: 8
  //     },
  //     headStyles: {
  //       halign: 'center'
  //     }
  //   });
  
  //   doc.save('Pending_Bill_Summary.pdf');
  // }
  exportToPDF22() {
    const currentDateTime = this.getCurrentDateTime();
    const doc = new jsPDF('l', 'mm', 'a4');
    autoTable(doc, {
      startY: 10,
      theme: 'grid',
  
      head: [
        [
          {
            content:  'Pending Bills (Unpaid) Under Process at Various Level\n' + `Source HIMIS : ${currentDateTime}`,
            colSpan: 8,
            styles: { halign: 'center',  fillColor: [254, 240, 255], fontStyle: 'bold',
              textColor: [0, 0, 0] }
          }

        ],
        [
          { content: 'Fund', rowSpan: 2 },
          { content: 'Division Level', colSpan: 2 },
          { content: 'SE Office', colSpan: 2 },
          { content: 'Finance-HO', colSpan: 2 },
          { content: 'Total Gross (In Lacs)', rowSpan: 2 }
        ],
        [
          'No of Bills', 'Gross to be Paid (In Lacs)',
          'No of Bills', 'Gross to be Paid (In Lacs)',
          'No of Bills', 'Gross to be Paid (In Lacs)'
        ]
      ],
  
      body: this.himis_PendigBillSummary.map(r => ([
        // r.fund,
        // r.billdiv, r.divgrossamt,
        // r.billse, r.segrossamt,
        // r.billfin, r.fingrossamt,
        // r.totalgross
        r.fund,              // 0
        r.billdiv,           // 1
        r.divgrossamt,       // 2
        r.billse,            // 3
        r.segrossamt,        // 4
        r.billfin,           // 5
        r.fingrossamt,       // 6
        r.totalgross         // 7
      ])),
  
      styles: {
        fontSize: 8,

        // halign: 'center'
      },
      columnStyles: {
        0: { halign: 'left' },   // Fund → RIGHT
    
        1: { halign: 'center' },  // Bill Division No
        3: { halign: 'center' },  // Bill Section No
        5: { halign: 'center' },  // Bill Finance No
    
        2: { halign: 'right' },    // Division Gross
        4: { halign: 'right' },    // Section Gross
        6: { halign: 'right' },    // Finance Gross
        7: { halign: 'right' }     // Total Gross
      }
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
  
      /* ================= BODY ================= */
      body: [
        ...this.himis_PendigBillSummary.map(r => ([
          r.fund,
          r.billdiv,
          r.divgrossamt,
          r.billse,
          r.segrossamt,
          r.billfin,
          r.fingrossamt,
          r.totalgross
        ])),
  
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
          { content: 'Total', styles:  { fontStyle: 'bold' } },
          { content: total.billdiv, styles:  { fontStyle: 'bold' } },
          { content: total.divgrossamt.toFixed(2), styles:  { fontStyle: 'bold' } },
          { content: total.billse, styles:  { fontStyle: 'bold' } },
          { content: total.segrossamt.toFixed(2), styles:  { fontStyle: 'bold' } },
          { content: total.billfin, styles:  { fontStyle: 'bold' } },
          { content: total.fingrossamt.toFixed(2), styles:  { fontStyle: 'bold' } },
          { content: total.totalgross.toFixed(2), styles:  { fontStyle: 'bold' } }
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
      }
    });
  
    doc.save('Construction_Pay_Pending_Fundwise.pdf');
  }
  
  exportToPDF3() {

    const doc = new jsPDF('l', 'mm', 'a4');
  
    const head = [[
      'S.No',
      'Fund',
      'Pending Section',
      'Division Name',
      'District',
      'Work Name',
      'Contractor',
      'Agreement Bill Status',
      'Bill No',
      'Bill Date',
      'Measurement Date',
      'Gross Amount',
      'File On Desk',
      'Days Since File',
      // 'Office Order'
    ]];
  
    const body = this.himis_PendigBill.map(row => [
      row.sno,
      row.fund,
      row.pedingsection,
      row.divisionname,
      row.district,
      row.workname,
      row.contractor,
      row.agrbillstatus,
      row.billno,
      row.billdate,
      row.measurementdate,
      row.grossamount,
      row.fileondesk,
      row.dayssincefile,
      // row.officeorder
    ]);
  
    autoTable(doc, {
      head: head,
      body: body,
      startY: 15,
      theme: 'grid',
      styles: {
        fontSize: 7
      },
      headStyles: {
        halign: 'center'
      }
    });
  
    doc.save('NHM_Fund_Construction_Bills_Under_Process.pdf');
  }
  
    //#endregion
}

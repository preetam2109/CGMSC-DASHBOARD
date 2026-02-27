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
import { FitUnFitInfrastructure } from '../fit-un-fit-infrastructure/fit-un-fit-infrastructure';
import { InsertUserPageViewLogmodal } from 'src/app/Model/DashLoginDDL';
@Component({
  selector: 'app-fit-un-fit',
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
    MatIconModule,MatTabsModule,NgSelectModule,FitUnFitInfrastructure
  ],
  templateUrl: './fit-un-fit.html',
  styleUrl: './fit-un-fit.css',
})
export class FitUnFit {
  // database table
  selectedTabIndex: number = 0;
  selectedTabIndex1: number = 0;
  selectedStatus: string = 'Fit';
  selectedStatus1: string = 'Fit';
  FitUnfitSummary: FitUnfitSummary[] = [];
  FitUnfit: FitUnfit[] = [];
  dataSource1!: MatTableDataSource<FitUnfit>;
  dataSource!: MatTableDataSource<FitUnfitSummary>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;
  @ViewChild('sort1') sort1!: MatSort;
  displayedColumns: string[] = [
    'sno',
    'sectionname',
    'fundhead',
    'nospo',
    'recvaluelacs',
  ];
  displayedColumns1: string[] = [
    'sno',
    'sectionname',
    'presentfile',
    'fundHead',
    'suppliername',
    'poYear',
    'pono',
    'podate',
    'mcategory',
    'itemcode',
    'itemname',
    'strengtH1',
    'poqty',
    'totalpovalue',
    'receiptqty',
    'receiptvalue',
    'mrcdate',
    'sddate',
    'validity',
    // 'fmrcode',
    // 'program',
    // 'unit',
    // 'qcpasseddt',
    // 'fitunfit',
    // 'nsqstock',
    // 'holdstock',
    // 'suppenindsd',
    // 'ponoid',
    // 'itemid',
    // 'supplierid',
  ];
  roleName:any;
      InsertUserPageViewLogdata: InsertUserPageViewLogmodal = new InsertUserPageViewLogmodal();
        pageName: string = '';
    fullUrl: string = '';
  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    public datePipe: DatePipe,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private location: Location) {
    this.pageName = this.location.path();
    this.fullUrl = window.location.href;
    this.dataSource1 = new MatTableDataSource<FitUnfit>([]);
    this.dataSource = new MatTableDataSource<FitUnfitSummary>([]);
  }
  ngOnInit() {
   this.roleName= localStorage.getItem("roleName");

    this.getFitUnfitSummary();
    this.getFitUnfit();
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
    this.api.InsertUserPageViewLogPOST(this.InsertUserPageViewLogdata).subscribe({
      next: (res: any) => {
        console.log('Page View Log Saved:',res);
        // const LogSaved='Log Saved'
        // localStorage.setItem('Log Saved', LogSaved);
      },
      error: (err: any) => {
        console.error('Backend Error:', JSON.stringify(err.message));
      }
    });

  } catch (err: any) {
    console.error('Error:', err.message);
  }
}
  selectedTabValue(event: any): void {
    this.selectedTabIndex = event.index;
    if (this.selectedTabIndex == 0) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }else if(this.selectedTabIndex == 1){
    
    }
  }
  selectedTabValue1(event: any): void {
    this.selectedTabIndex1= event.index;
    if (this.selectedTabIndex1 == 0) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else if(this.selectedTabIndex1==1){
      this.dataSource1.paginator = this.paginator1;
      this.dataSource1.sort = this.sort1;
    }
  }

  onStatusChange() {
    if(this.selectedStatus=='Fit'){
      this.getFitUnfit();
    }else if(this.selectedStatus=='Not Fit'){
      this.getFitUnfit();
    }else{
      this.getFitUnfit();
    }
  }
  onStatusChange1() {
    if(this.selectedStatus1=='Fit'){
      this.getFitUnfitSummary();
    }else if(this.selectedStatus1=='Not Fit'){
      this.getFitUnfitSummary();
    }else{
      this.getFitUnfitSummary();
    }
  }
  getFitUnfit() {
    // ;
    // return;
    this.spinner.show();
    this.api.getfitunfit(this.selectedStatus).subscribe(
      (res) => {
        this.FitUnfit = res.map((item: FitUnfit, index: number) => ({
          ...item,
          sno: index + 1,
        }));
        this.dataSource1.data = this.FitUnfit;
        // console.log('FitUnfit= ', this.FitUnfit);
        this.dataSource1.paginator = this.paginator;
        this.dataSource1.sort = this.sort;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        console.error('Error fetching data', error);
      }
    );
  }
  getFitUnfitSummary() {
    // ;
    // return;
    this.spinner.show();
    this.api.getFitUnfitSummary(this.selectedStatus1).subscribe(
      (res) => {
        this.FitUnfitSummary = res.map(
          (item: FitUnfitSummary, index: number) => ({
            ...item,
            sno: index + 1,
          })
        );
        this.dataSource.data = this.FitUnfitSummary;
        // console.log('FitUnfitSummary= ', this.FitUnfitSummary);
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

  applyTextFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
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
  exportToPDF11() {
    const currentDateTime = this.getCurrentDateTime();
  
    // ✅ A3 landscape (VERY IMPORTANT)
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a3'
    });
  
    // autoTable(doc, {
    //   startY: 10,
    //   theme: 'grid',
  
    //   // ✅ MUST for many columns
    //   tableWidth: 'auto',
    //   horizontalPageBreak: true,
    //   showHead: 'everyPage',
  
    //   head: [
    //     [
    //       {
    //         content:
    //           'Fit/UnFit Files at Finance & Technical Section in DPDMIS (Drugs, Consumables)',
    //         colSpan: 19,
    //         styles: {
    //           halign: 'center',
    //           fontStyle: 'bold',
    //           fontSize: 12
    //         }
    //       }
    //     ],
    //     [
    //       {
    //         content: `Date : ${currentDateTime}`,
    //         colSpan: 19,
    //         styles: {
    //           halign: 'right',
    //           fontSize: 9
    //         }
    //       }
    //     ],
    //     [
    //       'S.No','Section Name','Present File','Fund Head','Supplier Name',
    //       'PO Year','PO No','PO Date','M Category','Item Code','Item Name',
    //       'Strength','PO Qty','Total PO Value','Receipt Qty','Receipt Value',
    //       'MRC Date','SD Date','Validity'
    //     ]
    //   ],
  
    //   body: this.FitUnfit.map(r => ([
    //     r.sno,
    //     r.sectionname,
    //     r.presentfile,
    //     r.fundHead,
    //     r.suppliername,
    //     r.poYear,
    //     r.pono,
    //     r.podate,
    //     r.mcategory,
    //     r.itemcode,
    //     r.itemname,
    //     r.strengtH1,
    //     r.poqty,
    //     r.totalpovalue,
    //     r.receiptqty,
    //     r.receiptvalue,
    //     r.mrcdate,
    //     r.sddate,
    //     r.validity
    //   ])),
  
    //   // ✅ TEXT WRAP + SHRINK
    //   styles: {
    //     fontSize: 7,
    //     cellPadding: 2,
    //     overflow: 'linebreak',
    //     cellWidth: 'wrap',
    //     valign: 'middle'
    //   },
  
    //   // ✅ COLUMN WIDTH CONTROL (IMPORTANT)
    //   columnStyles: {
    //     0: { cellWidth: 12 },  // S.No
    //     1: { cellWidth: 25 },  // Section
    //     2: { cellWidth: 22 },  // Present File
    //     4: { cellWidth: 40 },  // Supplier Name
    //     10:{ cellWidth: 45 },  // Item Name
    //     18:{ cellWidth: 18 }   // Validity
    //   }
    // });
    autoTable(doc, {
      startY: 10,
      theme: 'grid',
      tableWidth: 'auto',
    
      horizontalPageBreak: true,
      horizontalPageBreakRepeat: 0,
      pageBreak: 'auto',
      showHead: 'everyPage',
    
      head: [
        [
          {
            content:
              'Fit/UnFit Files at Finance & Technical Section in DPDMIS (Drugs, Consumables)',
            colSpan: 19,
            styles: { halign: 'center', fontStyle: 'bold', fontSize: 12 }
          }
        ],
        [
          {
            content: `Date : ${currentDateTime}`,
            colSpan: 19,
            styles: { halign: 'right', fontSize: 9 }
          }
        ],
        [
          'S.No','Section Name','Present File','Fund Head','Supplier Name',
          'PO Year','PO No','PO Date','M Category','Item Code','Item Name',
          'Strength','PO Qty','Total PO Value','Receipt Qty','Receipt Value',
          'MRC Date','SD Date','Validity'
        ]
      ],
    
      body: this.FitUnfit.map(r => ([
        r.sno,
        r.sectionname,
        r.presentfile,
        r.fundHead,
        r.suppliername,
        r.poYear,
        r.pono,
        r.podate,
        r.mcategory,
        r.itemcode,
        r.itemname,
        r.strengtH1,
        r.poqty,
        r.totalpovalue,
        r.receiptqty,
        r.receiptvalue,
        r.mrcdate,
        r.sddate,
        r.validity
      ])),
    
      styles: {
        fontSize: 6.5,
        cellPadding: 1.5,
        overflow: 'linebreak',
        valign: 'middle'
      }
    });
    
    
    doc.save('FitUnfitFiles_DETAILS.pdf');
  } 
   exportToPDF12() {
      const currentDateTime = this.getCurrentDateTime();
      const doc = new jsPDF('l', 'mm', 'a4');
      autoTable(doc, {
        startY: 10,
        theme: 'grid',
        tableWidth: 'auto',
        horizontalPageBreak: true,
      
        head: [
          [
            {
              content:
                'Fit/UnFit Files at Finance & Technical Section in DPDMIS (Drugs, Consumables)',
              colSpan: 19,
              styles: { halign: 'center', fontStyle: 'bold', fontSize: 11 }
            }
          ],
          [
            {
              content: `Date : ${currentDateTime}`,
              colSpan: 19,
              styles: { halign: 'right', fontSize: 9 }
            }
          ],
          [
            'S.No','Section Name','Present File','Fund Head','Supplier Name',
            'PO Year','PO No','PO Date','M Category','Item Code','Item Name',
            'Strength','PO Qty','Total PO Value','Receipt Qty','Receipt Value',
            'MRC Date','SD Date','Validity'
          ]
        ],
      
        body: this.FitUnfit.map(r => ([
          r.sno, r.sectionname, r.presentfile, r.fundHead, r.suppliername,
          r.poYear, r.pono, r.podate, r.mcategory, r.itemcode, r.itemname,
          r.strengtH1, r.poqty, r.totalpovalue, r.receiptqty, r.receiptvalue,
          r.mrcdate, r.sddate, r.validity
        ])),
      
        styles: {
          fontSize: 7,
          cellPadding: 2,
          overflow: 'linebreak',
          cellWidth: 'wrap'
        }
      });
      
    
      doc.save('FitUnfitFiles_DETAILS.pdf');
    }
  exportToPDF1() {
    const doc = new jsPDF('l', 'mm', 'a4');
  
    const head = [[
      'S.No',
      'Section Name',
      'Present File',
      'Fund Head',
      'Supplier Name',
      'PO Year',
      'PO No',
      'PO Date',
      // 'M Category',
      'Item Code',
      'Item Name',
      'Strength',
      'PO Qty',
      'Total PO Value',
      'Receipt Qty',
      'Receipt Value',
      // 'MRC Date',
      // 'SD Date',
      'Validity'
    ]];
  
    const body = this.FitUnfit.map(row => [
      row.sno,
      row.sectionname,
      row.presentfile,
      row.fundHead,
      row.suppliername,
      row.poYear,
      row.pono,
      row.podate,
      // row.mcategory,
      row.itemcode,
      row.itemname,
      row.strengtH1,
      row.poqty,
      row.totalpovalue,
      row.receiptqty,
      row.receiptvalue,
      // row.mrcdate,
      // row.sddate,
      row.validity
    ]);
  
  
    autoTable(doc, {
      startY: 20,
      theme: 'grid',
      tableWidth: 'auto',
      showHead: 'everyPage',
    // 'MRC Date','SD Date',
    // 'M Category',
      head: [[
        'S.No','Section Name','Present File','Fund Head','Supplier Name',
        'PO Year','PO No','PO Date','Item Code','Item Name',
        'Strength','PO Qty','Total PO Value','Receipt Qty','Receipt Value',
        'Validity'
      ]],
    
      body: this.FitUnfit.map(r => ([
        r.sno,
        r.sectionname,
        r.presentfile,
        r.fundHead,
        r.suppliername,
        r.poYear,
        r.pono,
        r.podate,
        // r.mcategory,
        r.itemcode,
        r.itemname,
        r.strengtH1,
        r.poqty,
        r.totalpovalue,
        r.receiptqty,
        r.receiptvalue,
        // r.mrcdate,
        // r.sddate,
        r.validity
      ])),
    
      styles: {
        fontSize: 7,
        cellPadding: 2,
        overflow: 'linebreak',
        valign: 'middle'
      },
    
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        halign: 'center',
        fontSize: 8
      },
    
      columnStyles: {
        0: { cellWidth: 10 },   // S.No
        1: { cellWidth: 24 },   // Section Name
        2: { cellWidth: 22 },   // Present File
        3: { cellWidth: 20 },   // Fund Head
        4: { cellWidth: 40 },   // Supplier Name
        9: { cellWidth: 22 },   // Item Code
        10:{ cellWidth: 45 },   // Item Name
        18:{ cellWidth: 18 }    // Validity
      }
    });
    
    doc.save('FitUnfitFiles_DETAILS.pdf');
  }
  exportToPDF123() {
 
    const doc = new jsPDF('l', 'mm', 'a4');
  
    const head = [[
      'S.No',
      'Section Name',
      'Fund Head',
      'No. of PO',
      'Receipt Value (Lacs)'
    ]];
  
    const body = this.FitUnfitSummary.map(row => [
      row.sno,
      row.sectionname,
      row.fundhead,
      row.nospo,
      row.recvaluelacs
    ]);
  
    autoTable(doc, {
      head: head,
      body: body,
      startY: 20,
      theme: 'striped',
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: 255,
        halign: 'center'
      },
      styles: {
        fontSize: 9
      }
    });
  
    doc.save('Section_FundHead_Summary.pdf');
  }
    exportToPDF() {
      const currentDateTime = this.getCurrentDateTime();
      const total = this.getTotals();
      const doc = new jsPDF('l', 'mm', 'a4');
   
    if(this.selectedStatus1 == '0'){
       this.selectedStatus1= 'All';
    }
   
      autoTable(doc, {
        startY: 10,
        theme: 'grid',

        head: [
          [
            {
              content: `Fit/UnFit Files Payment Pending at Section (${this.selectedStatus1})`,
              colSpan: 4,
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
              colSpan: 1,
              styles: {
                halign: 'right',
                fontSize: 9,
                fillColor: [254, 240, 255],
                textColor: [0, 0, 0],
                lineWidth: 0.8,
                lineColor: [0, 0, 0],
              },
            },
          ],
          // [
          //   'S.No',
          //   'Section Name',
          //   'Pending Fund Name',
          //   'No. of PO',
          //   'Receipt Value (Lacs)',
          // ],
          [
  { content: 'S.No', styles: { halign: 'center' } },
  { content: 'Section Name', styles: { halign: 'center' } },
  { content: 'Pending Fund Name', styles: { halign: 'center' } },
  { content: 'No. of POs', styles: { halign: 'center' } },
  { content: 'Receipt Value (Lacs)', styles: { halign: 'center' } },
],

        ],

        body: [
          ...this.FitUnfitSummary.map((row) => [
            row.sno,
            row.sectionname,
            row.fundhead,
            row.nospo,
            row.recvaluelacs,
          ]),
          [
            { content: 'Total', styles: { fontStyle: 'bold' } },
            { content: '-', styles: { fontStyle: 'bold' } },
            { content: '-', styles: { fontStyle: 'bold' } },
            { content: total.nospo.toFixed(2), styles: { fontStyle: 'bold' } },
            {
              content: total.recvaluelacs.toFixed(2), 
              styles: { fontStyle: 'bold' },
            },
          ],
        ],
        styles: {
          fontSize: 8,
          lineWidth: 0.6,
          lineColor: [0, 0, 0],
          valign: 'middle',
        },
        columnStyles: {
          0: { halign: 'left' },
          1: { halign: 'center' },
          2: { halign: 'center' },
          3: { halign: 'right', fontStyle: 'bold'  },
          4: { halign: 'right', fontStyle: 'bold' },
        },
        didParseCell: function (data) {
          if (data.row.index === data.table.body.length - 1) {
            data.cell.styles.fillColor = [254, 240, 255];
            data.cell.styles.textColor = [0, 0, 0];
            data.cell.styles.lineWidth = 0.8;
          }
          if (data.section === 'head') {
            data.cell.styles.lineWidth = 0.8;
            data.cell.styles.lineColor = [0, 0, 0];
            data.cell.styles.fontStyle = 'bold';
          }
        },
      });
    
      doc.save('Section_FundHead_Summary.pdf');
    }
    getTotals() {
  return this.FitUnfitSummary.reduce(
    (acc, r) => {
      acc.nospo += Number(r.nospo) || 0;
      acc.recvaluelacs += Number(r.recvaluelacs) || 0;
      return acc;
    },
    {
      nospo: 0,
      recvaluelacs: 0
    }
  );
}
}

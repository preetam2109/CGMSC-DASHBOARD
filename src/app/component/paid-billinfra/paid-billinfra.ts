
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
displayedColumns1: string[] = ['sno', 'division', 'head', 'noofWorks','noofbill', 'grosspaid','netAmtLacs'];
  PaidDetails: any[] = [];
  groupedSummaryData: any[] = [];

  displayedColumns2 = [
    'sno',
    // 'division',
    'head',
    'noofWorks',
    'noofbill',
    'grosspaid','netAmtLacs'
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
totalnetAmtLacsWorkWise: number = 0;

displayedColumns3 = [
  'sno', 'division', 'district', 'worK_ID', 'workname','contractor' ,'mobNo','billno',
  'agrbillstatus', 'billdate', 'mesurementDT', 'chequeDT', 'grosspaid','netAmtLacs', 'dayssincemeasurement'
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



  displayedColumns = [
    'sno', 'division', 'noofWorks','noofbill', 'grosspaid','netAmtLacs'
  
  
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
      DId: '0',
      Dname: 'All',
    },
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


  groupedDivisionData: any[] = [];
  totalDistinctWorksDivisionWise: number = 0;
  totalBillsDivisionWise: number = 0;
  totalGrossLacsDivisionWise: number = 0;
  totalNetAmtLacsDivisionWise: number = 0;



  totalDistinctWorksOverall: number = 0;
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
    this.dataSource2 = new MatTableDataSource<any>([]);
    this.dataSource3 = new MatTableDataSource<any>([]);
  }
  ngOnInit() {
  this.getmain_scheme();
  const today = new Date();
const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);


this.fromDate = this.datePipe.transform(firstDayOfMonth, 'yyyy-MM-dd') || ''; 
this.toDate = this.datePipe.transform(today, 'yyyy-MM-dd') || '';

this.fromdt = this.datePipe.transform(firstDayOfMonth, 'dd-MMM-yyyy') || '0';
this.todt = this.datePipe.transform(today, 'dd-MMM-yyyy') || '0';
 this.GETPaidDetails();

  }

  getmain_scheme() {
    try {
      //
      this.api.getMainScheme(this.isall).subscribe((res: any) => {
        if (res && res.length > 0) {
          this.mainscheme = res.map(
            (item: { mainSchemeID: any; name: any }) => ({
              mainSchemeID: item.mainSchemeID,
              name: item.name,
            }),
          );
          // console.log('mainscheme :', this.mainscheme);
        } else {
          console.error('No name found or incorrect structure:', res);
        }
      });
  
    } catch (ex: any) {
      // alert(ex.message);
      alert(`API Error: ${JSON.stringify(ex.message)}`);
    }
  }

  
  onselect_mainscheme_data(event: any): void {
    if (event) {
      this.mainSchemeID = event.mainSchemeID;
    } 
    else {
      this.mainSchemeID = 0; 
    }
  }
  onselect_division_data(event: any) {
    if (!event) {
      return;
    }

    this.DId = event.DId;

    // this.GETPaidDetails();
  }




onShowClick(): void {

  this.fromdt = this.fromDate ? this.datePipe.transform(this.fromDate, 'dd-MMM-yyyy') || '0' : '0';
  this.todt = this.toDate ? this.datePipe.transform(this.toDate, 'dd-MMM-yyyy') || '0' : '0';

 this.GETPaidDetails();
 
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
// exportToPDF() {
//   const currentDateTime = this.getCurrentDateTime();

//   const doc = new jsPDF('p', 'mm', 'a4');
  
 
//   const bodyData: any[] = [];
  
//   this.PaidSummary.forEach((item) => {
//     bodyData.push([
//       item.sno,
//       item.name,
//       item.noofWorks,
//       Number(item.grossPaidLacs || 0).toFixed(2)
//     ]);
//   });

//   autoTable(doc, {
//     startY: 15,
//     theme: 'grid',
    
//     /* ================= HEADER SECTION ================= */
//     head: [
//       [
//         {
//           content: 'Division Payment Summary',
//           colSpan: 3,
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
//           colSpan: 4,
//           styles: {
//             halign: 'left',
//             fontSize: 10,
//             fontStyle: 'normal',
//             fillColor: [255, 255, 255],
//             textColor: [50, 50, 50],
//             minCellHeight: 10
//           }
//         }
//       ],
//       [
//         { content: 's.No', styles: { halign: 'center' } },
//         { content: 'Division', styles: { halign: 'left' } },
//         { content: 'No of Works', styles: { halign: 'center' } },
//         { content: 'Gross Paid (in Lacs)', styles: { halign: 'right' } }
//       ]
//     ],
    
//     /* ================= BODY & TOTAL SECTION ================= */
//     body: [
//       ...bodyData,
//       [
//         { content: '', styles: { bgCol: [210, 225, 245] } }, 
//         { content: 'Total', styles: { fontStyle: 'bold', halign: 'left' } },
//         { content: this.totalWorks, styles: { fontStyle: 'bold', halign: 'center' } },
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
    
//     /* ================= COLUMN ALIGNMENT ================= */
//     columnStyles: {
//       0: { cellWidth: 20, halign: 'center' },  // s.No
//       1: { cellWidth: 'auto', halign: 'left' }, // Division
//       2: { cellWidth: 35, halign: 'center' },  // No of Works
//       3: { cellWidth: 45, halign: 'right' }    // Gross Paid
//     },
    
//     /* ================= DYNAMIC CELL STYLES ================= */
//     didParseCell: (data) => {
//       if (data.row.index === data.table.body.length - 1) {
//         data.cell.styles.fillColor = [173, 197, 230]; 
//         data.cell.styles.lineWidth = 0.5;
//         data.cell.styles.fontStyle = 'bold';
//         data.cell.styles.textColor = [0, 0, 0];
//       }
      
//       if (data.section === 'head' && data.row.index === 2) {
//         data.cell.styles.fillColor = [142, 171, 219]; 
//         data.cell.styles.textColor = [0, 0, 0];
//         data.cell.styles.lineWidth = 0.5;
//       }
//     }
//   });
  
//   // doc.save('Division_Payment_Summary.pdf');
//   const formattedDate = this.datePipe.transform(new Date(), 'dd-MMM-yyyy');

  
//   doc.save(`Division_Payment_Summary_${formattedDate}.pdf`);
// }
exportToPDF() {
  const currentDateTime = this.getCurrentDateTime();
  const doc = new jsPDF('p', 'mm', 'a4');

  const bodyData = this.groupedDivisionData.map((item) => [
    item.sno,
    item.division,
    item.noofWorks,
    item.noofbill,
    Number(item.grosspaid || 0).toFixed(2),
    Number(item.netAmtLacs || 0).toFixed(2)
  ]);

  autoTable(doc, {
    startY: 20,
    theme: 'grid',
    head: [
      [
        { content: 'Division-wise Consolidated Payment ', colSpan: 6, styles: { halign: 'center', fontSize: 14, fillColor: [240, 240, 240] ,  textColor: [0, 0, 0] } }
      ],
      [
        { content: `Report Generated: ${currentDateTime}`, colSpan: 6, styles: { halign: 'right', fontSize: 8 } }
      ],
      ['S.No', 'Division', 'No of Works', 'No of Bills', 'Gross Paid (Lacs)', 'Net Amount (Lacs)']
    ],
    body: [
      ...bodyData,
      [
        { content: 'Total', colSpan: 1, styles: { fontStyle: 'bold' } },
        { content: '', styles: {} },
        { content: this.totalDistinctWorksDivisionWise, styles: { fontStyle: 'bold', halign: 'center' } },
        { content: this.totalBillsDivisionWise, styles: { fontStyle: 'bold', halign: 'center' } },
        { content: Number(this.totalGrossLacsDivisionWise || 0).toFixed(2), styles: { fontStyle: 'bold', halign: 'right' } },
        { content: Number(this.totalNetAmtLacsDivisionWise || 0).toFixed(2), styles: { fontStyle: 'bold', halign: 'right' } }
      ]
    ],
    columnStyles: {
      0: { halign: 'center', cellWidth: 15 },
      1: { halign: 'left' },
      2: { halign: 'center' },
      3: { halign: 'center' },
      4: { halign: 'right' },
      5: { halign: 'right' }
    },
    didParseCell: (data) => {
      if (data.row.index === data.table.body.length - 1) {
        data.cell.styles.fillColor = [230, 230, 230];
        data.cell.styles.fontStyle = 'bold';
      }
      if (data.section === 'head' && data.row.index === 2) {
        data.cell.styles.fillColor = [200, 200, 200];
        data.cell.styles.textColor = [0, 0, 0];
      }
    }
  });

  const formattedDate = this.datePipe.transform(new Date(), 'dd-MMM-yyyy');
  doc.save(`Division_Summary_${formattedDate}.pdf`);
}
processDivisionWiseData() {
    if (!this.PaidDetails || this.PaidDetails.length === 0) {
      this.groupedDivisionData = [];
      this.dataSource.data = [];
      return;
    }

    const divMap = new Map<string, any>();
    const overallWorksSet = new Set<string>(); // Footer ग्रांड टोटल के लिए

    this.PaidDetails.forEach(item => {
      const key = item.division ? item.division.trim() : 'Unknown';
      const currentGross = Number(item.grosspaid) || 0;
      const currentBills = Number(item.noofWorks || 1); // No of bills के लिए
      const currentNet = Number(item.netAmtLacs) || 0;

      // ग्रांड टोटल (Distinct Work IDs) के लिए
      if (item.worK_ID) {
        overallWorksSet.add(item.worK_ID);
      }

      if (!divMap.has(key)) {
        divMap.set(key, {
          division: key,
          workIds: new Set(item.worK_ID ? [item.worK_ID] : []), // Distinct works के लिए Set
          noofbill: currentBills,
          grosspaid: currentGross,
          netAmtLacs: currentNet
        });
      } else {
        const existing = divMap.get(key);
        if (item.worK_ID) {
          existing.workIds.add(item.worK_ID);
        }
        existing.noofbill += currentBills;
        existing.grosspaid += currentGross;
        existing.netAmtLacs += currentNet;
      }
    });

    this.groupedDivisionData = Array.from(divMap.values());
    this.groupedDivisionData.sort((a, b) => a.division.localeCompare(b.division));

    // Totals को 0 से रीसेट करें
    this.totalDistinctWorksDivisionWise = overallWorksSet.size;
    this.totalBillsDivisionWise = 0;
    this.totalGrossLacsDivisionWise = 0;
    this.totalNetAmtLacsDivisionWise = 0;

    this.groupedDivisionData.forEach((item, index) => {
      item.sno = index + 1;
      item.noofWorks = item.workIds.size; // Distinct Count यहाँ सेट हो रहा है

      this.totalBillsDivisionWise += item.noofbill;
      this.totalGrossLacsDivisionWise += item.grosspaid;
      this.totalNetAmtLacsDivisionWise += item.netAmtLacs;
    });

    this.dataSource.data = this.groupedDivisionData;
  }
// https://cgmsc.gov.in/HIMIS_APIN/api/Payment/PaidDetails?divisionId=D1017&mainSchemeId=0&distid=0&fromdt=03-June-2026&todt=10-June-2026

GETPaidDetails() {
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
          this.processDivisionWiseData();
          this.processAndGroupData();
          this.processOnlyFundWiseData();
          this.processWorkWiseData();
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

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

  // processAndGroupData() {
  //   this.PaidDetails.sort((a, b) => (a.division || '').localeCompare(b.division || ''));

  //   const groupMap = new Map<string, any>();

  //   this.PaidDetails.forEach(item => {
  //     const key = `${item.division}_${item.head}`;
      
      
  //     const currentGross = Number(item.grosspaid) || 0;
  //     const currentnet = Number(item.netAmtLacs) || 0;

  //     if (!groupMap.has(key)) {
  //       groupMap.set(key, {
  //         division: item.division,
  //         head: item.head,
  //         noofWorks: 1,               
  //         grosspaid: currentGross,    
  //         netAmtLacs: currentnet,    
  //         divisionSpan: 1,           
  //         headSpan: 1
  //       });
  //     } else {
  //       const existing = groupMap.get(key);
  //       existing.noofWorks += 1;               
  //       existing.grosspaid += currentGross;    
  //       existing.netAmtLacs += currentnet;    
  //     }
  //   });

  //   this.groupedSummaryData = Array.from(groupMap.values());

  //   this.calculateRowSpans();

  //   // this.totalWorks = 0;
  //  this.totalWorksOnlyFundWise=0;
  //   // this.totalGrossLacs = 0;
  //   this.totalGrossLacsOnlyFundWise=0;
  //   this.totalnetAmtLacsWorkWise = 0;
  //   this.groupedSummaryData.forEach((item, index) => {
  //     item.sno = index + 1;
  //     // this.totalWorks += item.noofWorks;
  //     // this.totalGrossLacs += item.grosspaid;
  //     this.totalWorksOnlyFundWise+= item.noofWorks;
  //      this.totalGrossLacsOnlyFundWise+= item.grosspaid;
  //     this.totalnetAmtLacsWorkWise += item.netAmtLacs;
  //   });

  //   this.dataSource1.data = this.groupedSummaryData;
  //   // console.log('datasource1=',this.groupedSummaryData);
  // }



  // processAndGroupData() {
  //   this.PaidDetails.sort((a, b) => (a.division || '').localeCompare(b.division || ''));

  //   const groupMap = new Map<string, any>();
  //   const overallWorksSet = new Set<string>(); // Footer के ग्रांड टोटल के लिए Set

  //   this.PaidDetails.forEach(item => {
  //     // हर work_id को ग्रांड टोटल वाले Set में डालें (डुप्लीकेट अपने आप इग्नोर हो जाएंगे)
  //     if (item.worK_ID) {
  //       overallWorksSet.add(item.worK_ID);
  //     }

  //     const key = `${item.division}_${item.head}`;
  //     const currentGross = Number(item.grosspaid) || 0;
  //     const currentnet = Number(item.netAmtLacs) || 0;

  //     if (!groupMap.has(key)) {
  //       groupMap.set(key, {
  //         division: item.division,
  //         head: item.head,
  //         // यहाँ हम array की जगह Set का इस्तेमाल कर रहे हैं
  //         workIds: new Set(item.worK_ID ? [item.worK_ID] : []), 
  //         noofWorks: 1,               
  //         grosspaid: currentGross,    
  //         netAmtLacs: currentnet,    
  //         divisionSpan: 1,           
  //         headSpan: 1
  //       });
  //     } else {
  //       const existing = groupMap.get(key);
  //       // अगर work_id है, तो उसे Set में जोड़ दें
  //       if (item.worK_ID) {
  //         existing.workIds.add(item.worK_ID);
  //       }
  //       existing.noofWorks = existing.workIds.size; // Distinct काउंट अपडेट करें             
  //       existing.grosspaid += currentGross;    
  //       existing.netAmtLacs += currentnet;    
  //     }
  //   });

  //   this.groupedSummaryData = Array.from(groupMap.values());
    
  //   // ग्रांड टोटल Distinct वर्क्स की गिनती यहाँ सेव करें
  //   this.totalDistinctWorksOverall = overallWorksSet.size;

  //   this.calculateRowSpans();

  //   this.totalWorksOnlyFundWise = 0;
  //   this.totalGrossLacsOnlyFundWise = 0;
  //   this.totalnetAmtLacsWorkWise = 0;
    
  //   this.groupedSummaryData.forEach((item, index) => {
  //     item.sno = index + 1;
  //     this.totalWorksOnlyFundWise += item.noofWorks;
  //     this.totalGrossLacsOnlyFundWise += item.grosspaid;
  //     this.totalnetAmtLacsWorkWise += item.netAmtLacs;
  //   });

  //   this.dataSource1.data = this.groupedSummaryData;
  // }
  processAndGroupData() {
    this.PaidDetails.sort((a, b) => (a.division || '').localeCompare(b.division || ''));

    const groupMap = new Map<string, any>();
    const overallWorksSet = new Set<string>(); // Footer के ग्रांड टोटल के लिए Set

    this.PaidDetails.forEach(item => {
      // हर work_id को ग्रांड टोटल वाले Set में डालें (डुप्लीकेट अपने आप इग्नोर हो जाएंगे)
      if (item.worK_ID) {
        overallWorksSet.add(item.worK_ID);
      }

      const key = `${item.division}_${item.head}`;
      const currentGross = Number(item.grosspaid) || 0;
      const currentnet = Number(item.netAmtLacs) || 0;

      if (!groupMap.has(key)) {
        groupMap.set(key, {
          division: item.division,
          head: item.head,
          // यहाँ हम array की जगह Set का इस्तेमाल कर रहे हैं
          workIds: new Set(item.worK_ID ? [item.worK_ID] : []), 
          noofWorks: item.worK_ID ? 1 : 0, // शुरुआत में 1 काउंट 
          grosspaid: currentGross,    
          netAmtLacs: currentnet,    
          divisionSpan: 1,           
          headSpan: 1
        });
      } else {
        const existing = groupMap.get(key);
        // अगर work_id है, तो उसे Set में जोड़ दें
        if (item.worK_ID) {
          existing.workIds.add(item.worK_ID);
        }
        // Distinct काउंट अपडेट करें
        existing.noofWorks = existing.workIds.size;             
        existing.grosspaid += currentGross;    
        existing.netAmtLacs += currentnet;    
      }
    });

    this.groupedSummaryData = Array.from(groupMap.values());
    
    // ग्रांड टोटल Distinct वर्क्स की गिनती यहाँ सेव करें
    this.totalDistinctWorksOverall = overallWorksSet.size;

    this.calculateRowSpans();

    this.totalWorksOnlyFundWise = 0;
    this.totalGrossLacsOnlyFundWise = 0;
    this.totalnetAmtLacsWorkWise = 0;
    
    this.groupedSummaryData.forEach((item, index) => {
      item.sno = index + 1;
      
      // (यहाँ से स्ट्रिंग बनाने वाला कोड हटा दिया गया है)
      
      this.totalWorksOnlyFundWise += item.noofWorks;
      this.totalGrossLacsOnlyFundWise += item.grosspaid;
      this.totalnetAmtLacsWorkWise += item.netAmtLacs;
    });

    this.dataSource1.data = this.groupedSummaryData;
  }
  processAndGroupData1() {
    this.PaidDetails.sort((a, b) => (a.division || '').localeCompare(b.division || ''));

    const groupMap = new Map<string, any>();
    const overallWorksSet = new Set<string>(); // Footer के ग्रांड टोटल के लिए Set

    this.PaidDetails.forEach(item => {
      // हर work_id को ग्रांड टोटल वाले Set में डालें (डुप्लीकेट अपने आप इग्नोर हो जाएंगे)
      if (item.worK_ID) {
        overallWorksSet.add(item.worK_ID);
      }

      const key = `${item.division}_${item.head}`;
      const currentGross = Number(item.grosspaid) || 0;
      const currentnet = Number(item.netAmtLacs) || 0;

      if (!groupMap.has(key)) {
        groupMap.set(key, {
          division: item.division,
          head: item.head,
          // यहाँ हम array की जगह Set का इस्तेमाल कर रहे हैं
          workIds: new Set(item.worK_ID ? [item.worK_ID] : []), 
          noofWorks: 1,               
          grosspaid: currentGross,    
          netAmtLacs: currentnet,    
          divisionSpan: 1,           
          headSpan: 1
        });
      } else {
        const existing = groupMap.get(key);
        // अगर work_id है, तो उसे Set में जोड़ दें
        if (item.worK_ID) {
          existing.workIds.add(item.worK_ID);
        }
        existing.noofWorks = existing.workIds.size; // Distinct काउंट अपडेट करें             
        existing.grosspaid += currentGross;    
        existing.netAmtLacs += currentnet;    
      }
    });

    this.groupedSummaryData = Array.from(groupMap.values());
    
    // ग्रांड टोटल Distinct वर्क्स की गिनती यहाँ सेव करें
    this.totalDistinctWorksOverall = overallWorksSet.size;

    this.calculateRowSpans();

    this.totalWorksOnlyFundWise = 0;
    this.totalGrossLacsOnlyFundWise = 0;
    this.totalnetAmtLacsWorkWise = 0;
    
    this.groupedSummaryData.forEach((item, index) => {
      item.sno = index + 1;
      
      // *** यहाँ नया बदलाव किया गया है ***
      // Set को Array में बदलकर कॉमा (,) के साथ स्ट्रिंग बना रहे हैं
      item.rowWorkIdsString = Array.from(item.workIds).join(', ');

      this.totalWorksOnlyFundWise += item.noofWorks;
      this.totalGrossLacsOnlyFundWise += item.grosspaid;
      this.totalnetAmtLacsWorkWise += item.netAmtLacs;
    });

    this.dataSource1.data = this.groupedSummaryData;
  }
  // calculateRowSpans() {
  //   for (let i = 0; i < this.groupedSummaryData.length; ) {
  //     let rowSpan = 1;
  //     for (let j = i + 1; j < this.groupedSummaryData.length; j++) {
  //       if (this.groupedSummaryData[i].division === this.groupedSummaryData[j].division) {
  //         rowSpan++;
  //       } else {
  //         break;
  //       }
  //     }
  //     this.groupedSummaryData[i].divisionSpan = rowSpan;
  //     for (let k = i + 1; k < i + rowSpan; k++) {
  //       this.groupedSummaryData[k].divisionSpan = 0;
  //     }
  //     i += rowSpan;
  //   }

  //   for (let i = 0; i < this.groupedSummaryData.length; ) {
  //     let rowSpan = 1;
  //     for (let j = i + 1; j < this.groupedSummaryData.length; j++) {
  //       if (
  //         this.groupedSummaryData[i].division === this.groupedSummaryData[j].division &&
  //         this.groupedSummaryData[i].head === this.groupedSummaryData[j].head
  //       ) {
  //         rowSpan++;
  //       } else {
  //         break;
  //       }
  //     }
  //     this.groupedSummaryData[i].headSpan = rowSpan;
  //     for (let k = i + 1; k < i + rowSpan; k++) {
  //       this.groupedSummaryData[k].headSpan = 0;
  //     }
  //     i += rowSpan;
  //   }
  // }

  calculateRowSpans() {
  for (let i = 0; i < this.groupedSummaryData.length; ) {
      let rowSpan = 1;
      let divisionWorksSet = new Set(this.groupedSummaryData[i].workIds);

      for (let j = i + 1; j < this.groupedSummaryData.length; j++) {
        if (this.groupedSummaryData[i].division === this.groupedSummaryData[j].division) {
          rowSpan++;
          this.groupedSummaryData[j].workIds.forEach((id: string) => {
            divisionWorksSet.add(id);
          });
        } else {
          break;
        }
      }
      
      this.groupedSummaryData[i].divisionSpan = rowSpan;
      
      // *** नया बदलाव ***
      // Set को Array में बदलकर कॉमा (,) के साथ जोड़ दें
      this.groupedSummaryData[i].divisionWorkIdsString = Array.from(divisionWorksSet).join(', '); 
      
      for (let k = i + 1; k < i + rowSpan; k++) {
        this.groupedSummaryData[k].divisionSpan = 0;
      }
      i += rowSpan;
    }
    // 2. Head Span calculation (इसमें कोई बदलाव नहीं)
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
  calculateRowSpans1() {
    for (let i = 0; i < this.groupedSummaryData.length; ) {
      let rowSpan = 1;
      let divisionWorksSet = new Set(this.groupedSummaryData[i].workIds);

      for (let j = i + 1; j < this.groupedSummaryData.length; j++) {
        if (this.groupedSummaryData[i].division === this.groupedSummaryData[j].division) {
          rowSpan++;
          this.groupedSummaryData[j].workIds.forEach((id: string) => {
            divisionWorksSet.add(id);
          });
        } else {
          break;
        }
      }
      
      this.groupedSummaryData[i].divisionSpan = rowSpan;
      
      // *** नया बदलाव ***
      // स्ट्रिंग (.join) की जगह .size का इस्तेमाल करके Distinct Count निकाल रहे हैं
      this.groupedSummaryData[i].divisionDistinctWorkCount = divisionWorksSet.size; 
      
      for (let k = i + 1; k < i + rowSpan; k++) {
        this.groupedSummaryData[k].divisionSpan = 0;
      }
      i += rowSpan;
    }
    
    // 2. Head Span calculation (नीचे का कोड वैसा ही रहेगा)
    for (let i = 0; i < this.groupedSummaryData.length; ) {
       // ... (बाकी का Head Span कोड)
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
    const overallFundWorksSet = new Set<string>(); // Footer के ग्रांड टोटल के लिए

    this.PaidDetails.forEach(item => {
      const key = item.head ? item.head.trim() : 'Unknown';
      const currentGross = Number(item.grosspaid) || 0;
      
      // यह आपका बिल काउंट के लिए काम आ रहा है
      const currentBills = Number(item.noofWorks || 1); 
      const currentnet = Number(item.netAmtLacs || 0); 

      // ग्रांड टोटल के लिए Work ID सेट में डालें
      if (item.worK_ID) {
        overallFundWorksSet.add(item.worK_ID);
      }

      if (!fundMap.has(key)) {
        fundMap.set(key, {
          head: key,
          // Fund Head के हिसाब से Work ID स्टोर करने के लिए Set
          workIds: new Set(item.worK_ID ? [item.worK_ID] : []), 
          noofWorks: currentBills, // यह No of Bills के लिए काम आएगा
          grosspaid: currentGross,
          netAmtLacs: currentnet,
          headSpan: 1
        });
      } else {
        const existing = fundMap.get(key);
        // अगर work_id है, तो उसे Set में जोड़ दें
        if (item.worK_ID) {
          existing.workIds.add(item.worK_ID);
        }
        existing.noofWorks += currentBills; // बिल काउंट बढ़ाएँ
        existing.grosspaid += currentGross;
        existing.netAmtLacs += currentnet;
      }
    });

    this.groupedFundWiseData = Array.from(fundMap.values());

    this.calculateOnlyFundRowSpans();

    this.totalWorksOnlyFundWise = 0;
    this.totalGrossLacsOnlyFundWise = 0;
    this.totalnetAmtLacsWorkWise = 0;
    
    // ग्रांड टोटल Distinct Work IDs की गिनती अपडेट करें
    this.totalDistinctWorksOverall = overallFundWorksSet.size;

    this.groupedFundWiseData.forEach((item, index) => {
      item.sno = index + 1;
      
      // *** नया बदलाव ***
      // Set का साइज़ निकालकर अलग वेरिएबल में स्टोर कर रहे हैं (यूनिक गिनती)
      item.distinctWorkCount = item.workIds.size;

      this.totalWorksOnlyFundWise += item.noofWorks; // No of Bills का टोटल
      this.totalGrossLacsOnlyFundWise += item.grosspaid;
      this.totalnetAmtLacsWorkWise += item.netAmtLacs;
    });

    this.dataSource2.data = this.groupedFundWiseData;
  }
processOnlyFundWiseData1() {
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
    const currentnet = Number(item.netAmtLacs || 0); 

    if (!fundMap.has(key)) {
      fundMap.set(key, {
        head: key,
        noofWorks: currentWorks,
        grosspaid: currentGross,
        netAmtLacs: currentnet,
        headSpan: 1
      });
    } else {
      const existing = fundMap.get(key);
      existing.noofWorks += currentWorks;
      existing.grosspaid += currentGross;
      existing.netAmtLacs += currentnet;
    }
  });

  this.groupedFundWiseData = Array.from(fundMap.values());

  this.calculateOnlyFundRowSpans();

  this.totalWorksOnlyFundWise = 0;
  this.totalGrossLacsOnlyFundWise = 0;
 this.totalnetAmtLacsWorkWise = 0;
  this.groupedFundWiseData.forEach((item, index) => {
    item.sno = index + 1;
    this.totalWorksOnlyFundWise += item.noofWorks;
    this.totalGrossLacsOnlyFundWise += item.grosspaid;
    this.totalnetAmtLacsWorkWise += item.netAmtLacs;
  });

  this.dataSource2.data = this.groupedFundWiseData;
    // console.log('dataSource2=',this.groupedFundWiseData);

}
processOnlyFundWiseData3() {
    if (!this.PaidDetails || this.PaidDetails.length === 0) {
      this.groupedFundWiseData = [];
      this.dataSource2.data = [];
      this.totalWorksOnlyFundWise = 0;
      this.totalGrossLacsOnlyFundWise = 0;
      return;
    }

    this.PaidDetails.sort((a, b) => (a.head || '').localeCompare(b.head || ''));

    const fundMap = new Map<string, any>();
    const overallFundWorksSet = new Set<string>(); // Footer के ग्रांड टोटल के लिए

    this.PaidDetails.forEach(item => {
      const key = item.head ? item.head.trim() : 'Unknown';
      const currentGross = Number(item.grosspaid) || 0;
      // हर रिकॉर्ड को एक बिल (bill) मान रहे हैं
      const currentWorks = Number(item.noofWorks || 1); 
      const currentnet = Number(item.netAmtLacs || 0); 

      // ग्रांड टोटल के लिए Work ID सेट में डालें
      if (item.worK_ID) {
        overallFundWorksSet.add(item.worK_ID);
      }

      if (!fundMap.has(key)) {
        fundMap.set(key, {
          head: key,
          // Fund Head के हिसाब से Work ID स्टोर करने के लिए Set
          workIds: new Set(item.worK_ID ? [item.worK_ID] : []), 
          noofWorks: currentWorks, // यह No of Bills के लिए काम आएगा
          grosspaid: currentGross,
          netAmtLacs: currentnet,
          headSpan: 1
        });
      } else {
        const existing = fundMap.get(key);
        // अगर work_id है, तो उसे Set में जोड़ दें
        if (item.worK_ID) {
          existing.workIds.add(item.worK_ID);
        }
        existing.noofWorks += currentWorks; // बिल काउंट बढ़ाएँ
        existing.grosspaid += currentGross;
        existing.netAmtLacs += currentnet;
      }
    });

    this.groupedFundWiseData = Array.from(fundMap.values());

    this.calculateOnlyFundRowSpans();

    this.totalWorksOnlyFundWise = 0;
    this.totalGrossLacsOnlyFundWise = 0;
    this.totalnetAmtLacsWorkWise = 0;
    
    // ग्रांड टोटल Distinct Work IDs की गिनती अपडेट करें
    this.totalDistinctWorksOverall = overallFundWorksSet.size;

    this.groupedFundWiseData.forEach((item, index) => {
      item.sno = index + 1;
      
      // *** नया बदलाव ***
      // Set को Array में बदलकर कॉमा (,) के साथ स्ट्रिंग बना रहे हैं
      item.rowWorkIdsString = Array.from(item.workIds).join(', ');

      this.totalWorksOnlyFundWise += item.noofWorks; // No of Bills का टोटल
      this.totalGrossLacsOnlyFundWise += item.grosspaid;
      this.totalnetAmtLacsWorkWise += item.netAmtLacs;
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
    this.totalnetAmtLacsWorkWise = 0;
    
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
  this.totalnetAmtLacsWorkWise = 0;
  this.groupedWorkWiseData.forEach(item => {
    this.totalGrossLacsWorkWise += Number(item.grosspaid || 0);
  });
  this.groupedWorkWiseData.forEach(item => {
    this.totalnetAmtLacsWorkWise += Number(item.netAmtLacs || 0);
  });

  this.dataSource3.data = this.groupedWorkWiseData;
  
  this.cdr.detectChanges();
}


// Workwisepdf() {
//   const currentDateTime = this.getCurrentDateTime();
//   const doc = new jsPDF('l', 'mm', 'a4'); 
//   const bodyData: any[] = [];
//   const sourceData = this.groupedWorkWiseData;

//   if (!sourceData || sourceData.length === 0) {
//     this.toastr.warning('डाउनलोड करने के लिए कोई डेटा उपलब्ध नहीं है।');
//     return;
//   }

//   sourceData.forEach((item) => {
//     const row: any[] = [];
//     row.push(item.sno);
//     row.push(item.division || '');
//     row.push(item.district || '');
//     row.push(item.worK_ID || '');
//     row.push(item.workname || '');
//     row.push(item.contractor || '');
//     row.push(item.mobNo || '');
//     row.push(item.billno || '');
//     row.push(item.agrbillstatus || '');
    
//     const safeBillDate = this.parseDDMMYYYY(item.billdate);
//     const safeMeasurementDate = this.parseDDMMYYYY(item.mesurementDT);
//     const safeChequeDate = this.parseDDMMYYYY(item.chequeDT);

//     row.push(safeBillDate ? (this.datePipe.transform(safeBillDate, 'dd-MMM-yyyy') || '') : '');
//     row.push(safeMeasurementDate ? (this.datePipe.transform(safeMeasurementDate, 'dd-MMM-yyyy') || '') : '');
//     row.push(safeChequeDate ? (this.datePipe.transform(safeChequeDate, 'dd-MMM-yyyy') || '') : '');
    
//     row.push(Number(item.grosspaid || 0).toFixed(2));
//     row.push(Number(item.netAmtLacs || 0).toFixed(2));
//     row.push(item.dayssincemeasurement ? `${item.dayssincemeasurement} Days` : '0 Days');
    
//     bodyData.push(row);
//   });

//   autoTable(doc, {
//     startY: 15,
//     theme: 'grid',
//     styles: {
//       fontSize: 7.5,
//       lineWidth: 0.2,
//       lineColor: [100, 100, 100],
//       valign: 'middle',
//       textColor: [0, 0, 0]
//     },
    
//     /* ================= HEADER SECTION ================= */
//     head: [
//       [
//         {
//           content: 'Work wise Payment Summary',
//           colSpan: 10, 
//           styles: { halign: 'left', fontStyle: 'bold', fontSize: 11, fillColor: [254, 240, 255], textColor: [0, 0, 0] }
//         },
//         {
//           content: `Print Dt: ${currentDateTime}`,
//           colSpan: 2,
//           styles: { halign: 'right', fontSize: 8, fillColor: [254, 240, 255], textColor: [100, 100, 100] }
//         }
//       ],
//       [
//         {
//           content: `Payment From Date : ${this.datePipe.transform(this.fromDate, 'dd-MMM-yyyy')}     To     Payment To Date: ${this.datePipe.transform(this.toDate, 'dd-MMM-yyyy')}`,
//           colSpan: 12, 
//           styles: { halign: 'left', fontSize: 9, fontStyle: 'normal', fillColor: [255, 255, 255], textColor: [50, 50, 50] }
//         }
//       ],
//       [
//         { content: 's.No', styles: { halign: 'center' } },
//         { content: 'Division', styles: { halign: 'left' } },
//         { content: 'District', styles: { halign: 'left' } },
//         { content: 'Workcode', styles: { halign: 'center' } },
//         { content: 'Work name', styles: { halign: 'left' } },
//         { content: 'Contractor', styles: { halign: 'left' } },
//         { content: 'Mobile No', styles: { halign: 'left' } },
//         { content: 'Bill no', styles: { halign: 'center' } },
//         { content: 'Billtype', styles: { halign: 'center' } },
//         { content: 'bill Date', styles: { halign: 'center' } },
//         { content: 'Measurement Date (A)', styles: { halign: 'center' } },
//         { content: 'Paid Date (B)', styles: { halign: 'center' } },
//         { content: 'Gross Paid (in Lacs)', styles: { halign: 'right' } },
//         { content: 'Net Amount (in Lacs)', styles: { halign: 'right' } },
//         { content: 'Time Taken Since Measurement (B-A)', styles: { halign: 'center' } }
//       ]
//     ],
    
//     /* ================= BODY SECTION ================= */
//     body: bodyData, 

//     /* ================= TOTAL FOOTER SECTION ================= */
//     foot: [
//       [
//         { content: 'Total', colSpan: 10, styles: { fontStyle: 'bold', halign: 'right' } }, 
//         { content: Number(this.totalGrossLacsWorkWise || 0).toFixed(2), styles: { fontStyle: 'bold', halign: 'right' } },
//         { content: Number(this.totalnetAmtLacsWorkWise || 0).toFixed(2), styles: { fontStyle: 'bold', halign: 'right' } }
//         // { content: '', styles: { fillColor: [210, 225, 245] } }
//       ]
//     ],
    
//     /* ================= COLUMN WIDTHS ================= */
//     columnStyles: {
//       0: { cellWidth: 10, halign: 'center' },   
//       1: { cellWidth: 25, halign: 'left' },     
//       2: { cellWidth: 22, halign: 'left' },     
//       3: { cellWidth: 18, halign: 'center' },   
//       4: { cellWidth: 30, halign: 'left' },     
//       5: { cellWidth: 15, halign: 'center' },   
//       6: { cellWidth: 15, halign: 'center' },   
//       7: { cellWidth: 15, halign: 'center' },   
//       8: { cellWidth: 18, halign: 'center' },   
//       9: { cellWidth: 22, halign: 'center' },   
//       10: { cellWidth: 24, halign: 'center' },   
//       11: { cellWidth: 24, halign: 'center' },   
//       12: { cellWidth: 24, halign: 'right' },   
//       13: { cellWidth: 20, halign: 'center' }, 
//       14: { cellWidth: 20, halign: 'center' } , 
//       15: { cellWidth: 20, halign: 'center' } , 
//     },
    
//     didParseCell: (data) => {
//       if (data.section === 'foot') {
//         data.cell.styles.fillColor = [173, 197, 230]; 
//         data.cell.styles.lineWidth = 0.5;
//         data.cell.styles.fontStyle = 'bold';
//       }
//       if (data.section === 'head' && data.row.index === 2) {
//         data.cell.styles.fillColor = [142, 171, 219]; 
//         data.cell.styles.lineWidth = 0.5;
//       }
//     }
//   });
  
//   // doc.save('Workwise_Payment_Summary.pdf');
//       const formattedDate = this.datePipe.transform(new Date(), 'dd-MMM-yyyy');

  
//   doc.save(`Workwise_Payment_Summary_${formattedDate}.pdf`);
// }
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
    row.push(item.contractor || '');
    row.push(item.mobNo || '');
    row.push(item.billno || '');
    row.push(item.agrbillstatus || '');
    
    const safeBillDate = this.parseDDMMYYYY(item.billdate);
    const safeMeasurementDate = this.parseDDMMYYYY(item.mesurementDT);
    const safeChequeDate = this.parseDDMMYYYY(item.chequeDT);

    row.push(safeBillDate ? (this.datePipe.transform(safeBillDate, 'dd-MMM-yyyy') || '') : '');
    row.push(safeMeasurementDate ? (this.datePipe.transform(safeMeasurementDate, 'dd-MMM-yyyy') || '') : '');
    row.push(safeChequeDate ? (this.datePipe.transform(safeChequeDate, 'dd-MMM-yyyy') || '') : '');
    
    row.push(Number(item.grosspaid || 0).toFixed(2));
    row.push(Number(item.netAmtLacs || 0).toFixed(2));
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
          content: 'Work wise Payment Detail',
          colSpan: 11, // UPDATE: Adjusted to match total 15 columns (11 + 4)
          styles: { halign: 'left', fontStyle: 'bold', fontSize: 11, fillColor: [254, 240, 255], textColor: [0, 0, 0] }
        },
        {
          content: `Print Dt: ${currentDateTime}`,
          colSpan: 4, // UPDATE
          styles: { halign: 'right', fontSize: 8, fillColor: [254, 240, 255], textColor: [100, 100, 100] }
        }
      ],
      [
        {
          content: `Payment From Date : ${this.datePipe.transform(this.fromDate, 'dd-MMM-yyyy')}    To    Payment To Date: ${this.datePipe.transform(this.toDate, 'dd-MMM-yyyy')}`,
          colSpan: 15, // UPDATE: Total columns are 15 now
          styles: { halign: 'left', fontSize: 9, fontStyle: 'normal', fillColor: [255, 255, 255], textColor: [50, 50, 50] }
        }
      ],
      [
        { content: 'S.No', styles: { halign: 'center' } },
        { content: 'Division', styles: { halign: 'left' } },
        { content: 'District', styles: { halign: 'left' } },
        { content: 'Workcode', styles: { halign: 'center' } },
        { content: 'Work name', styles: { halign: 'left' } },
        { content: 'Contractor', styles: { halign: 'left' } },
        { content: 'Mobile No', styles: { halign: 'left' } },
        { content: 'Bill no', styles: { halign: 'center' } },
        { content: 'Billtype', styles: { halign: 'center' } },
        { content: 'Bill Date', styles: { halign: 'center' } },
        { content: 'Meas. Date (A)', styles: { halign: 'center' } }, // Thoda text chhota kiya jagah bachane ke liye
        { content: 'Paid Date (B)', styles: { halign: 'center' } },
        { content: 'Gross (Lacs)', styles: { halign: 'right' } },
        { content: 'Net (Lacs)', styles: { halign: 'right' } },
        { content: 'Time Taken (B-A)', styles: { halign: 'center' } }
      ]
    ],
    
    /* ================= BODY SECTION ================= */
    body: bodyData, 

    /* ================= TOTAL FOOTER SECTION ================= */
    foot: [
      [
        // UPDATE: Colspan 12 kyu? S.No se Paid Date tak 12 columns hote hain (Index 0 to 11)
        { content: 'Total', colSpan: 12, styles: { fontStyle: 'bold', halign: 'right' } }, 
        
        // Index 12: Gross Paid Total
        { content: Number(this.totalGrossLacsWorkWise || 0).toFixed(2), styles: { fontStyle: 'bold', halign: 'right' } },
        
        // Index 13: Net Amount Total
        { content: Number(this.totalnetAmtLacsWorkWise || 0).toFixed(2), styles: { fontStyle: 'bold', halign: 'right' } },
        
        // Index 14: Time Taken (Iske niche total nahi aayega, blank box banega)
        { content: '', styles: { fontStyle: 'bold', halign: 'center' } }
      ]
    ],
    
    /* ================= COLUMN WIDTHS ================= */
    columnStyles: {
      0: { cellWidth: 8, halign: 'center' },   // sno
      1: { cellWidth: 18, halign: 'left' },    // division
      2: { cellWidth: 18, halign: 'left' },    // district
      3: { cellWidth: 15, halign: 'center' },  // workcode
      4: { cellWidth: 26, halign: 'left' },    // workname
      5: { cellWidth: 16, halign: 'center' },  // contractor
      6: { cellWidth: 18, halign: 'center' },  // mobile
      7: { cellWidth: 14, halign: 'center' },  // billno
      8: { cellWidth: 14, halign: 'center' },  // billtype
      9: { cellWidth: 18, halign: 'center' },  // billdate
      10: { cellWidth: 20, halign: 'center' }, // measurement
      11: { cellWidth: 20, halign: 'center' }, // paid date
      12: { cellWidth: 20, halign: 'right' },  // gross
      13: { cellWidth: 20, halign: 'right' },  // net
      14: { cellWidth: 20, halign: 'center' }  // time taken
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
  const doc = new jsPDF('p', 'mm', 'a4'); // 'p' for Portrait
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

    // 2. Division Column
    if (item.divisionSpan > 0) {
      row.push({
        content: item.division || '',
        rowSpan: item.divisionSpan,
        styles: { fontStyle: 'bold', fillColor: [255, 255, 255], halign: 'left' }
      });
    }

    // 3. Fund Head Column
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
    
    // 6. Net Amount (in Lacs)
    row.push({
      content: Number(item.netAmtLacs || 0).toFixed(2),
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
          content: '  Division & Fund-wise Consolidated Payments',
          colSpan: 5, // UPDATE: Total 6 columns (5 + 1)
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
          content: `Payment From Date : ${this.datePipe.transform(this.fromDate, 'dd-MMM-yyyy')}    To    Payment To Date: ${this.datePipe.transform(this.toDate, 'dd-MMM-yyyy')}`,
          colSpan: 6, // UPDATE: Total 6 columns now
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
        { content: 'S.No', styles: { halign: 'center' } },
        { content: 'Division', styles: { halign: 'left' } },
        { content: 'Fund Head', styles: { halign: 'left' } },
        { content: 'No of Works', styles: { halign: 'center' } },
        { content: 'Gross Paid (in Lacs)', styles: { halign: 'right' } },
        { content: 'Net Amount (in Lacs)', styles: { halign: 'right' } } // 6th Column Header
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
        { content: Number(this.totalGrossLacs || 0).toFixed(2), styles: { fontStyle: 'bold', halign: 'right' } },
        { content: Number(this.totalnetAmtLacsWorkWise || 0).toFixed(2), styles: { fontStyle: 'bold', halign: 'right' } }
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
    
    /* ================= COLUMN WIDTHS (TOTAL ~185mm) ================= */
    columnStyles: {
      0: { cellWidth: 12, halign: 'center' }, // S.No
      1: { cellWidth: 35, halign: 'left' },   // Division
      2: { cellWidth: 43, halign: 'left' },   // Fund Head
      3: { cellWidth: 25, halign: 'center' }, // No of Works
      4: { cellWidth: 35, halign: 'right' },  // Gross Paid
      5: { cellWidth: 35, halign: 'right' }   // Net Amount (UPDATE: Added missing width)
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
  const doc = new jsPDF('p', 'mm', 'a4'); // 'p' matlab Portrait (Sidha page)
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

    // 2. Fund Head Column
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
row.push({
  content: (item.noofbill || 0).toString(),
  styles: { halign: 'center' }
});
    // 4. Gross Paid (in Lacs)
    row.push({
      content: Number(item.grosspaid || 0).toFixed(2),
      styles: { halign: 'right' }
    });
    
    // 5. Net Amount (in Lacs) - Naya Add Kiya Hua
    row.push({
      content: Number(item.netAmtLacs || 0).toFixed(2),
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
          content: '  Division & Fund-wise Consolidated Payments',
          colSpan: 4, // UPDATE: 3 se 4 kar diya (Total 5 columns = 4 + 1)
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
          content: `Payment From Date : ${this.datePipe.transform(this.fromDate, 'dd-MMM-yyyy')}    To    Payment To Date: ${this.datePipe.transform(this.toDate, 'dd-MMM-yyyy')}`,
          colSpan: 5, // UPDATE: 4 se 5 kar diya kyunki ab total 5 columns hain
          styles: { halign: 'left', fontSize: 10, fontStyle: 'normal', fillColor: [255, 255, 255], textColor: [50, 50, 50] }
        }
      ],
      [
        { content: 'S.No', styles: { halign: 'center' } },
        { content: 'Fund Head', styles: { halign: 'left' } },
        { content: 'No of Works', styles: { halign: 'center' } },
          { content: 'No of Bills', styles: { halign: 'center' } }, // NEW
        { content: 'Gross Paid (in Lacs)', styles: { halign: 'right' } },
        { content: 'Net Amount (in Lacs)', styles: { halign: 'right' } } // 5th Column Header
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
          { content: this.totalWorksOnlyFundWise.toString(), styles: { halign: 'center' } }, // NEW
        { content: Number(this.totalGrossLacsOnlyFundWise || 0).toFixed(2), styles: { fontStyle: 'bold', halign: 'right' } },
        { content: Number(this.totalnetAmtLacsWorkWise || 0).toFixed(2), styles: { fontStyle: 'bold', halign: 'right' } }
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
    
    /* ================= COLUMN WIDTHS (TOTAL 180mm FOR PORTRAIT A4) ================= */
    columnStyles: {
      0: { cellWidth: 15, halign: 'center' },  // S.No
      1: { cellWidth: 70, halign: 'left' },    // Fund Head
      2: { cellWidth: 25, halign: 'center' },  // No of Works
      3: { cellWidth: 25, halign: 'center' },  // No of Works
      4: { cellWidth: 35, halign: 'right' },   // Gross Paid
      5: { cellWidth: 35, halign: 'right' }    // Net Amount
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


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
import * as FileSaver from 'file-saver';
import { InsertUserPageViewLogmodal } from 'src/app/Model/DashLoginDDL';

@Component({
  selector: 'app-fund-release-management',
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
  templateUrl: './fund-release-management.html',
  styleUrl: './fund-release-management.css',
})
export class FundReleaseManagement {
  dashname: any;
  nosworks: any;
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
  LimitStatus = [
    { sname: 'All' },
    { sname: 'Pending at SE Office' },
    { sname: 'Pending at Finance' },
    { sname: 'Limit Approved' },
  ];

  dataSource = new MatTableDataSource<any>([]);
  dataSource1 = new MatTableDataSource<any>([]);
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild('paginator3') paginator3!: MatPaginator;

  @ViewChild('sort') sort!: MatSort;
  @ViewChild('sort1') sort1!: MatSort;
  @ViewChild('sort3') sort3!: MatSort;
  mainscheme: any[] = [];
  LimitSummary: any[] = [];
  mainSchemeID: any = 0;
  DId: any = 0;
  sname: any = 'All';
  divisionid: any;
  himisDistrictid: any;
  totalDocuments: number = 0;
  totalAmountInCr: number = 0;
  totalSEAmountInCr: number = 0;
  totalLimitAmountInCr: number = 0;
  displayedColumns = [
    'sno',
    'divName_En',
    'No_of_document',
    'value_in_cr',
    'Seamtincr',
    'limitamtincr',
  ];

  dataSourceScheme = new MatTableDataSource<any>([]);
  displayedColumnsScheme = [
    'sno',
    'divName_En',
    'mainschemanme',
    'demandno',
    'noofworks',
    'demanddate',
    'value_in_cr',
    'seForwardDateddmmyy',

    'value_in_crSEAMT',
    'finApprovedDateddmmyy',

    'value_in_crLimitAMT',
    'finalstatus',
    'action',
  ];

  totalSchemeDocs: number = 0;
  totalSchemeWorks: number = 0;
  totalSchemeAmtCr: number = 0;
  totalSchemeAmtCrSE: number = 0;
  totalSchemeAmtCrLiMIT: number = 0;

  displayedColumns3: string[] = [
  'sno',
  // 'demanddetailid',
  'divName_En',
  'head',

  'demandno',
    'demandValue',
  'seApprovedAmt',
  'finApprovedAmt',
  'finalStatus',
  'demandDateddMMYY',
  'seForwardDateddmmyy',
  'finApprovedDateddmmyy',
  // 'mainSchemeID',
  'district',
  'block_Name_En',
  'work_id',
  'workName',
  'aadT_DDMMYY',
  'tsdT_DDMMYY',
  'asAmt',
  'tsAmt',
  // 'tType',
  'letterNo',
  'nitno',
  'acceptDT_DDMMYY',
  'wrokOrderDT_DDMMYY',
  'totalAmountOfContract_Lacs',
  'totalExpLacs',
  // 'divisionID',
  'contrctorName',
  'cid',

  // 'name',
  // 'asFundRecv',

  // 'daysTaken',
  // 'demandDate'
];
  dataSource2 = new MatTableDataSource<any>([]);
  isLoading: boolean = true;
  @ViewChild('itemDetailsModal') itemDetailsModal: any;
  finalstatus = 0;
  DEMANDID = 0;
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
  }
  ngOnInit() {
    this.getmain_scheme();
    this.GetLimitSummary();
    // this.getLimitDetails();
  }

  onselect_division_data(id: any) {

    this.DId = id.DId;
  }
  onselect_mainscheme_data(id: any) {
    this.mainSchemeID = id.mainSchemeID;
  }

  onselect_limitstatus(event: any) {
    if (event) {
      this.sname = event.sname;
    } else {
      this.sname = 0;
    }

    console.log('Current Value of sname:', this.sname);
  }
  getmain_scheme() {
    try {
      this.api.LimitSummary(0, 0, 0, 0, 0).subscribe((res: any[]) => {
        if (res && res.length > 0) {
          const uniqueSchemes = new Map();

          res.forEach((item: any) => {
            if (item.mainschemeid != null && item.mainschemanme != null) {
              if (!uniqueSchemes.has(item.mainschemeid)) {
                uniqueSchemes.set(item.mainschemeid, {
                  mainSchemeID: item.mainschemeid,
                  name: item.mainschemanme.trim(),
                });
              }
            }
          });

          this.mainscheme = [
            { mainSchemeID: 0, name: 'All' },
            ...Array.from(uniqueSchemes.values()),
          ];

          // this.mainSchemeID = 0;
        } else {
          console.error('No data found or empty array:', res);
          this.mainscheme = [{ mainSchemeID: 0, name: 'All' }];
        }
      });
    } catch (ex: any) {
      alert(`API Error: ${ex.message || JSON.stringify(ex)}`);
    }
  }

  //https://cgmsc.gov.in/HIMIS_APIN/api/Payment/LimitSummary?divisionId=0&districtid=0&mainSchemeId=0&finalstatus=0&DEMANDID=0

  GetLimitSummary() {
    this.spinner.show();
    // debugger;
    const roleName = localStorage.getItem('roleName');
    if (roleName === 'Division') {
      this.DId = sessionStorage.getItem('divisionID') || 0;
      this.himisDistrictid = 0;
      this.mainSchemeID = this.mainSchemeID ? this.mainSchemeID : 0;
    }
    // else {
    //   this.DId = 0;
    //   this.himisDistrictid = 0;
    //   this.mainSchemeID = this.mainSchemeID ? this.mainSchemeID : 0;
    // }
    // this.sname = this.sname ? this.sname : 0;
    let finalStatusToSend =
      this.sname === 'All' ? 0 : this.sname ? this.sname : 0;

    this.api
      .LimitSummary(
        this.DId,
        this.himisDistrictid,
        this.mainSchemeID,
        finalStatusToSend,
        this.DEMANDID,
      )
      .subscribe({
        next: (res: any[]) => {
          if (res && res.length > 0) {
            //#region TABLE 1 LOGIC
            const groupedData = new Map<string, any>();

            res.forEach((item: any) => {
              const divName = item.divName_En || 'Unknown';

              if (!groupedData.has(divName)) {
                groupedData.set(divName, {
                  divName_En: divName,
                  seAmt: 0,
                  limitamount: 0,
                  No_of_document: 0,
                  totalAmountRaw: 0,
                });
              }

              const divRecord = groupedData.get(divName);
              divRecord.No_of_document += 1; // Count documents (1 row = 1 document)
              divRecord.totalAmountRaw += item.totalamount || 0; // Amount sum karna
              divRecord.seAmt += item.seAmt || 0; // Amount sum karna
              divRecord.limitamount += item.limitamount || 0; // Amount sum karna
            });

            let snoCounter = 1;
            this.totalDocuments = 0;
            this.totalAmountInCr = 0;
            this.totalSEAmountInCr = 0;
            this.totalLimitAmountInCr = 0;

            const finalTableData = Array.from(groupedData.values()).map(
              (div) => {
                const amountInCrore = div.totalAmountRaw / 100;
                const amtsecrore = div.seAmt / 100;
                const limitamtcrore = div.limitamount / 100;

                this.totalDocuments += div.No_of_document;
                this.totalAmountInCr += amountInCrore;
                this.totalSEAmountInCr += amtsecrore;
                this.totalLimitAmountInCr += limitamtcrore;

                return {
                  sno: snoCounter++,
                  divName_En: div.divName_En,
                  No_of_document: div.No_of_document,
                  value_in_cr: amountInCrore,
                  Seamtincr: amtsecrore,
                  limitamtincr: limitamtcrore,
                };
              },
            );

            // 3. Final grouped data ko MatTableDataSource me dena
            console.log('res 1=', finalTableData);
            this.dataSource.data = finalTableData;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            //#endregion Table 1

            //#region TABLE 2 LOGIC
            const groupedScheme = new Map<string, any>();

            // 1. Grouping Data (Ab sirf Division aur Scheme ke aadhar par)
            res.forEach((item: any) => {
              const divName = item.divName_En || 'Unknown';
              const scheme = item.mainschemanme || 'Unknown';
              // const demandno = item.demandno || 'Unknown';

              // Unique Key
              const key = `${divName}_${scheme}`;

              if (!groupedScheme.has(key)) {
                groupedScheme.set(key, {
                  // NAYE FIELDS YAHAN ADD KIYE GAYE HAIN
                  divisionID: item.divisionID,
                  mainschemeid: item.mainschemeid,
                  finalstatus: item.finalstatus,
                  demandid: item.demandid,
                  fileNameNew: item.fileNameNew,
                  filePathNew: item.filePathNew,

                  divName_En: divName,
                  mainschemanme: scheme.trim(),
                  demandno: item.demandno,
                  demanddate: item.demanddate,
                  seForwardDateddmmyy: item.seForwardDateddmmyy,
                  finApprovedDateddmmyy: item.finApprovedDateddmmyy,
                  No_of_document: 0,
                  nosworks: 0,
                  totalAmountRaw: 0,
                  totalAmountSEAMT: 0,
                  totalAmountLimitAMT: 0,
                });
              }

              const record = groupedScheme.get(key);

              // Counts aur Amounts ko add karna
              record.No_of_document += 1;
              record.nosworks += item.nosworks || 0;
              record.totalAmountRaw += item.totalamount || 0;
              record.totalAmountSEAMT += item.seAmt || 0;
              record.totalAmountLimitAMT += item.limitamount || 0;

              if (
                item.demanddate &&  new Date(item.demanddate) > new Date(record.demanddate),
                item.seForwardDateddmmyy && new Date(item.seForwardDateddmmyy) > new Date(record.seForwardDateddmmyy),
                item.finApprovedDateddmmyy &&new Date(item.finApprovedDateddmmyy) > new Date(record.finApprovedDateddmmyy)
              ) {
                record.demanddate = item.demanddate;
                record.seForwardDateddmmyy = item.seForwardDateddmmyy;
                record.finApprovedDateddmmyy = item.finApprovedDateddmmyy;
                // Agar naya bill aata h toh uski details update kar lo
                record.demandid = item.demandid;
                record.finalstatus = item.finalstatus;
              }
            });

            // 2. Converting amount to Crore
            let schemeTableData = Array.from(groupedScheme.values()).map(
              (x) => {
                return {
                  ...x,
                  value_in_cr: x.totalAmountRaw / 100, // Amount converted to Cr
                  value_in_crSEAMT: x.totalAmountSEAMT / 100, // Amount converted to Cr
                  value_in_crLimitAMT: x.totalAmountLimitAMT / 100, // Amount converted to Cr
                };
              },
            );

            // 3. Sorting (Pehle Division, Fir Latest Demand Date)
            schemeTableData.sort((a, b) => {
              const divA = a.divName_En.toLowerCase();
              const divB = b.divName_En.toLowerCase();
              if (divA < divB) return -1;
              if (divA > divB) return 1;

              const dateA = new Date(a.demanddate).getTime();
              const dateB = new Date(b.demanddate).getTime();
              return dateB - dateA;
            });

            // 4. Calculating Totals & Applying RowSpan (Cell Merge)
            this.totalSchemeDocs = 0;
            this.totalSchemeWorks = 0;
            this.totalSchemeAmtCr = 0;
            let schemeSno = 1;

            for (let i = 0; i < schemeTableData.length; i++) {
              schemeTableData[i].sno = schemeSno++;

              this.totalSchemeDocs += schemeTableData[i].No_of_document;
              this.totalSchemeWorks += schemeTableData[i].nosworks;
              this.totalSchemeAmtCr += schemeTableData[i].value_in_cr;
              this.totalSchemeAmtCrSE += schemeTableData[i].value_in_crSEAMT;
              this.totalSchemeAmtCrLiMIT += schemeTableData[i].value_in_crLimitAMT;

              if (
                i === 0 ||
                schemeTableData[i].divName_En !==
                  schemeTableData[i - 1].divName_En
              ) {
                let count = 1;
                for (let j = i + 1; j < schemeTableData.length; j++) {
                  if (
                    schemeTableData[j].divName_En ===
                    schemeTableData[i].divName_En
                  ) {
                    count++;
                  } else {
                    break;
                  }
                }
                schemeTableData[i].rowSpan = count;
              } else {
                schemeTableData[i].rowSpan = 0;
              }
            }

            this.dataSourceScheme.data = schemeTableData;
            console.log('res schema ==', this.dataSourceScheme.data); // Ab aapko console me naye fields mil jayenge
        //#endregion Table 2
            setTimeout(() => {
              this.dataSourceScheme.paginator = this.paginator1;
              this.dataSourceScheme.sort = this.sort1;
            });
          }
         
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        error: (err) => {
          console.error(err);
          this.spinner.hide();
        },
      });
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

  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  exportToExcel1(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.dataSourceScheme.data,
    );

    const workbook: XLSX.WorkBook = {
      Sheets: { Data: worksheet },
      SheetNames: ['Data'],
    };

    XLSX.writeFile(workbook, 'Division&FundWiseLimitSummary_report.xlsx');

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
  }

  applyTextFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceScheme.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceScheme.paginator) {
      this.dataSourceScheme.paginator.firstPage();
    }
  }

  getLimitDetails(data: any) {
    debugger;
    this.spinner.show();

    //   const roleName = localStorage.getItem('roleName');
    // if (roleName === 'Division') {
    //   this.DId = sessionStorage.getItem('divisionID') || 0;
    //   this.himisDistrictid = 0;
    //   this.mainSchemeID = this.mainSchemeID ? this.mainSchemeID : 0;
    // }
    // else {
    //   this.DId = 0;
    //   this.himisDistrictid = 0;
    //   this.mainSchemeID = this.mainSchemeID ? this.mainSchemeID : 0;
    // } 

    this.dashname = data.divName_En;
    this.nosworks = data.mainschemanme;
    this.isLoading = true;
    let divisionId = data.divisionID;
    let districtid = 0;
    let mainSchemeId = data.mainschemeid;
    let finalstatus = data.finalStatus;
    let DEMANDID = data.demanddetailid;
    const divName_En = data.divName_En;
    const demandid = data.demandid;

    // https://cgmsc.gov.in/HIMIS_APIN/api/Payment/LimitDetails?divisionId=D1001&districtid=0&mainSchemeId=0&finalstatus=0&DEMANDID=0

    // this.api.LimitDetails(divisionId,districtid,mainSchemeId,finalstatus,DEMANDID)
    // this.sname = this.sname ? this.sname : 0;
    // this.api.LimitDetails(divisionId,0,mainSchemeId,this.sname,demandid)
    this.api.LimitDetails(0, 0, 0, 0, demandid).subscribe({
      next: (res: any[]) => {
        if (res && res.length > 0) {
          this.dataSource2.data = res;
          console.log('responce=', this.dataSource2);
        } else {
          this.dataSource2.data = [];
        }

        this.dataSource2.paginator = this.paginator3;
        this.dataSource2.sort = this.sort3;
        this.cdr.detectChanges();
        this.spinner.hide();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching details', err);
        this.isLoading = false;
      },
    });
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(this.itemDetailsModal, {
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      // panelClass: 'full-screen-dialog',
      panelClass: 'full-screen-modal',
      data: {},
    });
    dialogRef.afterClosed().subscribe(() => {});
  }



  applyTextFilter3(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }
  exportToExcel3(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.dataSource2.data,
    );

    const workbook: XLSX.WorkBook = {
      Sheets: { Data: worksheet },
      SheetNames: ['Data'],
    };

    XLSX.writeFile(workbook, 'DivFundLimitSummary_report.xlsx');

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
  }

  openPDF(values: any) {
    const fileName=values.fileNameNew;
    const fileName1=values.filePathNew;
  if (fileName) {
    const baseUrl = 'https://cgmsc.gov.in/HIMISR/FundPDFFiles/'; 
    const fullUrl = baseUrl + fileName;
    
    window.open(fullUrl, '_blank');
  } else {
    alert("File name not found!");
  }
}

  exportToPDF() {
  const currentDateTime = this.getCurrentDateTime();
  const doc = new jsPDF('p', 'mm', 'a4'); // Portrait A4
  const bodyData: any[] = [];
  
  const sourceData = this.dataSource.data;

  if (!sourceData || sourceData.length === 0) {
    alert('डाउनलोड करने के लिए कोई डेटा उपलब्ध नहीं है।');
    return;
  }

  // PDF ke body ka data tayar karna
  sourceData.forEach((item: any) => {
    const row: any[] = [];

    // 1. S.No Column
    row.push({ content: item.sno.toString(), styles: { halign: 'center' } });

    // 2. Division Name
    row.push({ content: item.divName_En || '-', styles: { halign: 'left' } });

    // 3. No of Limit Demanded
    row.push({ content: (item.No_of_document || 0).toString(), styles: { halign: 'center' } });

    // 4. SE Office Approved Amount (In Cr)
    row.push({ content: Number(item.Seamtincr || 0).toFixed(2), styles: { halign: 'right' } });
    
    // 5. Limit Demanded Amount (in Cr)
    row.push({ content: Number(item.limitamtincr || 0).toFixed(2), styles: { halign: 'right' } });
    
    // 6. Total Amount (in Cr)
    row.push({ content: Number(item.value_in_cr || 0).toFixed(2), styles: { halign: 'right' } });

    bodyData.push(row);
  });

  autoTable(doc, {
    startY: 15,
    theme: 'grid',
    
    /* ================= HEADER SECTION ================= */
    head: [
      [
        {
          content: 'Limit Demand /Release Limit Summary',
          colSpan: 4, // Total 6 cols = 4 here + 2 in date
          styles: { halign: 'left', fontStyle: 'bold', fontSize: 12, fillColor: [254, 240, 255], textColor: [0, 0, 0] }
        },
        {
          content: `Print Dt: ${currentDateTime}`,
          colSpan: 2, 
          styles: { halign: 'right', fontSize: 9, fillColor: [254, 240, 255], textColor: [100, 100, 100] }
        }
      ],
      // Main Column Headers
      [
        { content: 'S.No', styles: { halign: 'center' } },
        { content: 'Division', styles: { halign: 'center' } },
        { content: 'No of Limit Demanded', styles: { halign: 'center' } },
        { content: 'SE Office Approved Amount(In Cr)', styles: { halign: 'right' } },
        { content: 'Limit Demanded Amount (in Cr)', styles: { halign: 'right' } },
        { content: 'Total Amount (in Cr)', styles: { halign: 'right' } } 
      ]
    ],
    
    /* ================= BODY SECTION ================= */
    body: bodyData, 

    /* ================= TOTAL FOOTER SECTION ================= */
    foot: [
      [
        { content: '', styles: { fillColor: [210, 225, 245] } }, 
        { content: 'Total', styles: { fontStyle: 'bold', halign: 'left' } }, 
        
        // Document Total
        { content: this.totalDocuments.toString(), styles: { fontStyle: 'bold', halign: 'center' } },
        
        // SE Amount Total
        { content: Number(this.totalSEAmountInCr || 0).toFixed(2), styles: { fontStyle: 'bold', halign: 'right' } },
        
        // Limit Amount Total
        { content: Number(this.totalLimitAmountInCr || 0).toFixed(2), styles: { fontStyle: 'bold', halign: 'right' } },
        
        // Grand Total Amount
        { content: Number(this.totalAmountInCr || 0).toFixed(2), styles: { fontStyle: 'bold', halign: 'right' } }
      ]
    ],

    /* ================= GLOBAL STYLES ================= */
    styles: {
      fontSize: 9, // Font chota rakha h taaki lambe headers fit ho sakein
      lineWidth: 0.3,
      lineColor: [80, 80, 80], 
      valign: 'middle',
      textColor: [0, 0, 0]
    },
    
    /* ================= COLUMN WIDTHS (TOTAL 180mm FOR PORTRAIT A4) ================= */
    columnStyles: {
      0: { cellWidth: 12, halign: 'center' },  // S.No
      1: { cellWidth: 43, halign: 'left' },    // Division Name
      2: { cellWidth: 25, halign: 'center' },  // No of Limit Demanded
      3: { cellWidth: 35, halign: 'right' },   // SE Amt
      4: { cellWidth: 35, halign: 'right' },   // Limit Amt
      5: { cellWidth: 30, halign: 'right' }    // Total Amt
    },
    
    /* ================= DYNAMIC CELL STYLES ================= */
    didParseCell: (data) => {
      // Footer styling
      if (data.section === 'foot') {
        data.cell.styles.fillColor = [173, 197, 230]; 
        data.cell.styles.lineWidth = 0.5;
        data.cell.styles.fontStyle = 'bold';
      }
      // Header styling (index 1 = column names array)
      if (data.section === 'head' && data.row.index === 1) {
        data.cell.styles.fillColor = [142, 171, 219]; 
        data.cell.styles.lineWidth = 0.5;
      }
    }
  });
  
  // Safe File Name (slashes/colons hata kar)
  const safeDateString = currentDateTime.replace(/[\/:\s]/g, '_');
  doc.save(`Division_Limit_Summary_${safeDateString}.pdf`);
}

getCurrentDateTime(): string {
  const now = new Date();
  const date = now.toLocaleDateString('en-GB'); 
  const time = now.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  return `${date} ${time}`;
}
exportToPDF1() {
  const currentDateTime = this.getCurrentDateTime();
  const doc = new jsPDF('l', 'mm', 'a4'); 
  const bodyData: any[] = [];
  
  const sourceData = this.dataSourceScheme.data;

  if (!sourceData || sourceData.length === 0) {
    alert('डाउनलोड करने के लिए कोई डेटा उपलब्ध नहीं है।');
    return;
  }

  // PDF ke body ka data tayar karna
  sourceData.forEach((item: any) => {
    const row: any[] = [];

    // 1. S.No
    row.push({ content: item.sno.toString(), styles: { halign: 'center' } });

    if (item.rowSpan > 0) {
      row.push({ 
        content: item.divName_En || '-', 
        rowSpan: item.rowSpan, 
        styles: { halign: 'left', valign: 'middle', fontStyle: 'bold', fillColor: [255, 255, 255] } 
      });
    }

    // 3. Fund Head
    row.push({ content: item.mainschemanme || '-', styles: { halign: 'left' } });

    // 4. Demand Number
    row.push({ content: item.demandno || '-', styles: { halign: 'center' } });

    // 5. SE Office Forward Date
    row.push({ content: item.seForwardDateddmmyy || '-', styles: { halign: 'center' } });

    // 6. Release Date
    row.push({ content: item.finApprovedDateddmmyy || '-', styles: { halign: 'center' } });


    let dDate = item.demanddate ? item.demanddate.split('T')[0] : '-';
    if(dDate !== '-') {
       const parts = dDate.split('-');
       if(parts.length === 3) dDate = `${parts[2]}-${parts[1]}-${parts[0]}`; // Convert yyyy-mm-dd to dd-mm-yyyy
    }
    row.push({ content: dDate, styles: { halign: 'center' } });

    // 8. Status
    row.push({ content: item.finalstatus || '-', styles: { halign: 'center' } });

    // 9. No of Works
    row.push({ content: (item.nosworks || 0).toString(), styles: { halign: 'center' } });

    // 10. SE Office Approved Amount (In Cr)
    row.push({ content: Number(item.value_in_crSEAMT || 0).toFixed(2), styles: { halign: 'right' } });
    
    // 11. Limit Demanded Amount (in Cr)
    row.push({ content: Number(item.value_in_crLimitAMT || 0).toFixed(2), styles: { halign: 'right' } });
    
    // 12. Total Release Amt (in Cr)
    row.push({ content: Number(item.value_in_cr || 0).toFixed(2), styles: { halign: 'right' } });

    bodyData.push(row);
  });

  autoTable(doc, {
    startY: 15,
    theme: 'grid',
    
    /* ================= HEADER SECTION ================= */
    head: [
      [
        {
          content: ' Division & Fund Wise Limit Summary',
          colSpan: 9, // Total 12 cols = 9 here + 3 in date
          styles: { halign: 'left', fontStyle: 'bold', fontSize: 13, fillColor: [254, 240, 255], textColor: [0, 0, 0] }
        },
        {
          content: `Print Dt: ${currentDateTime}`,
          colSpan: 3, 
          styles: { halign: 'right', fontSize: 9, fillColor: [254, 240, 255], textColor: [100, 100, 100] }
        }
      ],
      // Main Column Headers (12 Columns)
      [
        { content: 'S.No', styles: { halign: 'center' } },
        { content: 'Division', styles: { halign: 'center' } },
        { content: 'Fund Head', styles: { halign: 'center' } },
        { content: 'Demand Number', styles: { halign: 'center' } },
        { content: 'SE Forward Dt.', styles: { halign: 'center' } },
        { content: 'Release Dt.', styles: { halign: 'center' } },
        { content: 'Demand Dt.', styles: { halign: 'center' } },
        { content: 'Status', styles: { halign: 'center' } },
        { content: 'No of\nWorks', styles: { halign: 'center' } },
        { content: 'SE Appr. Amt\n(In Cr)', styles: { halign: 'right' } },
        { content: 'Limit Demand\n(In Cr)', styles: { halign: 'right' } },
        { content: 'Total Release\n(In Cr)', styles: { halign: 'right' } } 
      ]
    ],
    
    /* ================= BODY SECTION ================= */
    body: bodyData, 

    /* ================= TOTAL FOOTER SECTION ================= */
    foot: [
      [
          { content: 'Grand Total', colSpan: 8, styles: { fontStyle: 'bold', halign: 'right', fillColor: [210, 225, 245]} }, 
        
        // Works Total
        { content: this.totalSchemeWorks.toString(), styles: { fontStyle: 'bold', halign: 'center' } },
        
        // SE Amount Total
        { content: Number(this.totalSchemeAmtCrSE || 0).toFixed(2), styles: { fontStyle: 'bold', halign: 'right' } },
        
        // Limit Amount Total
        { content: Number(this.totalSchemeAmtCrLiMIT || 0).toFixed(2), styles: { fontStyle: 'bold', halign: 'right' } },
        
        // Release Amount Total
        { content: Number(this.totalSchemeAmtCr || 0).toFixed(2), styles: { fontStyle: 'bold', halign: 'right' } }
      ]
    ],

    /* ================= GLOBAL STYLES ================= */
    styles: {
      fontSize: 8, // Font chota rakha hai taaki landscape me sab fit ho
      lineWidth: 0.2,
      lineColor: [80, 80, 80], 
      valign: 'middle',
      textColor: [0, 0, 0]
    },
    
    /* ================= DYNAMIC CELL STYLES ================= */
    didParseCell: (data) => {
      // Footer styling
      if (data.section === 'foot') {
        data.cell.styles.fillColor = [173, 197, 230]; 
        data.cell.styles.lineWidth = 0.5;
        data.cell.styles.fontStyle = 'bold';
      }
      // Header styling
      if (data.section === 'head' && data.row.index === 1) {
        data.cell.styles.fillColor = [142, 171, 219]; 
        data.cell.styles.lineWidth = 0.5;
      }
    }
  });
  
  // PDF Download Trigger
  const safeDateString = currentDateTime.replace(/[\/:\s]/g, '_');
  doc.save(`Division_FundWise_Limit_${safeDateString}.pdf`);
}


exportToPDF3() {
  const currentDateTime = this.getCurrentDateTime();
  
  
  const doc = new jsPDF('l', 'mm', 'a1'); 
  const bodyData: any[] = [];
  
  const sourceData = this.dataSource2.data;

  if (!sourceData || sourceData.length === 0) {
    alert('डाउनलोड करने के लिए कोई डेटा उपलब्ध नहीं है।');
    return;
  }

  sourceData.forEach((item: any, index: number) => {
    const row: any[] = [];

    // 1. S.No
    row.push({ content: (index + 1).toString(), styles: { halign: 'center' } });
    // 2. Demand Detail ID
    row.push({ content: item.demanddetailid?.toString() || '-', styles: { halign: 'center' } });
    // 3. Division
    row.push({ content: item.divName_En || '-', styles: { halign: 'left' } });
    // 4. Demand No
    row.push({ content: item.demandno || '-', styles: { halign: 'center' } });
    // 5. Work ID
    row.push({ content: item.work_id || '-', styles: { halign: 'center' } });
    // 6. Head
    row.push({ content: item.head || '-', styles: { halign: 'left' } });
    // 7. Scheme ID
    row.push({ content: item.mainSchemeID?.toString() || '-', styles: { halign: 'center' } });
    // 8. District
    row.push({ content: item.district || '-', styles: { halign: 'left' } });
    // 9. Block Name
    row.push({ content: item.block_Name_En || '-', styles: { halign: 'left' } });
    // 10. Work Name
    row.push({ content: item.workName || '-', styles: { halign: 'left', cellWidth: 70 } }); // Iski thodi width zyada rakhi h
    
    // 11. AA Date
    row.push({ content: item.aadT_DDMMYY || '-', styles: { halign: 'center' } });
    // 12. TS Date
    row.push({ content: item.tsdT_DDMMYY || '-', styles: { halign: 'center' } });
    
    // 13. AS Amount
    row.push({ content: Number(item.asAmt || 0).toFixed(2), styles: { halign: 'right' } });
    // 14. TS Amount
    row.push({ content: Number(item.tsAmt || 0).toFixed(2), styles: { halign: 'right' } });
    
    // 15. Type
    row.push({ content: item.tType || '-', styles: { halign: 'center' } });
    // 16. Letter No
    row.push({ content: item.letterNo || '-', styles: { halign: 'left' } });
    // 17. CID
    row.push({ content: item.cid || '-', styles: { halign: 'center' } });
    // 18. NIT No
    row.push({ content: item.nitno || '-', styles: { halign: 'left' } });
    
    // 19. Accept Date
    row.push({ content: item.acceptDT_DDMMYY || '-', styles: { halign: 'center' } });
    // 20. Work Order Date
    row.push({ content: item.wrokOrderDT_DDMMYY || '-', styles: { halign: 'center' } });
    
    // 21. Contract Amount (Lacs)
    row.push({ content: Number(item.totalAmountOfContract_Lacs || 0).toFixed(2), styles: { halign: 'right' } });
    // 22. Total Exp (Lacs)
    row.push({ content: item.totalExpLacs != null ? Number(item.totalExpLacs).toFixed(2) : '-', styles: { halign: 'right' } });
    
    // 23. Div ID
    row.push({ content: item.divisionID || '-', styles: { halign: 'center' } });
    // 24. Contractor
    row.push({ content: item.contrctorName || '-', styles: { halign: 'left' } });
    // 25. Name
    row.push({ content: item.name?.trim() || '-', styles: { halign: 'left' } });
    
    // 26. AS Fund Recv
    row.push({ content: Number(item.asFundRecv || 0).toFixed(2), styles: { halign: 'right' } });
    // 27. Demand Value
    row.push({ content: Number(item.demandValue || 0).toFixed(2), styles: { halign: 'right', textColor: [0, 128, 0], fontStyle: 'bold' } }); // Green color
    // 28. SE Approved Amt
    row.push({ content: Number(item.seApprovedAmt || 0).toFixed(2), styles: { halign: 'right' } });
    // 29. Fin Approved Amt
    row.push({ content: Number(item.finApprovedAmt || 0).toFixed(2), styles: { halign: 'right' } });
    
    // 30. Final Status
    row.push({ content: item.finalStatus || '-', styles: { halign: 'center' } });
    
    // 31. Demand Date
    row.push({ content: item.demandDateddMMYY || '-', styles: { halign: 'center' } });
    // 32. SE Forward Date
    row.push({ content: item.seForwardDateddmmyy || '-', styles: { halign: 'center' } });
    // 33. Fin Approved Date
    row.push({ content: item.finApprovedDateddmmyy || '-', styles: { halign: 'center' } });
    // 34. Days Taken
    row.push({ content: item.daysTaken?.toString() || '-', styles: { halign: 'center' } });
    
    // 35. Demand Date (Full Date)
    let fullDDate = item.demandDate ? item.demandDate.split('T')[0] : '-';
    if(fullDDate !== '-') {
       const parts = fullDDate.split('-');
       if(parts.length === 3) fullDDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    row.push({ content: fullDDate, styles: { halign: 'center' } });

    bodyData.push(row);
  });

  autoTable(doc, {
    startY: 15,
    theme: 'grid',
    
    /* ================= HEADER SECTION ================= */
    head: [
      [
        {
          content: 'Detailed Work Demand & Limit Summary',
          colSpan: 20, // Title ke liye 20 columns ka span
          styles: { halign: 'left', fontStyle: 'bold', fontSize: 16, fillColor: [254, 240, 255], textColor: [0, 0, 0] }
        },
        {
          content: `Print Dt: ${currentDateTime}`,
          colSpan: 15, // Date ke liye baaki 15 columns
          styles: { halign: 'right', fontSize: 12, fillColor: [254, 240, 255], textColor: [100, 100, 100] }
        }
      ],
      // 35 Column Headers
      [
        'S.No', 'Detail ID', 'Division', 'Demand No', 'Work ID', 'Head', 'Scheme ID', 'District', 'Block', 'Work Name',
        'AA Date', 'TS Date', 'AS Amt', 'TS Amt', 'Type', 'Letter No', 'CID', 'NIT No', 'Accept Date', 'Work Order Dt',
        'Contract\n(Lacs)', 'Total Exp\n(Lacs)', 'Div ID', 'Contractor', 'Name', 'AS Fund\nRecv', 'Demand\nValue', 'SE Appr\nAmt', 'Fin Appr\nAmt', 'Final Status',
        'Demand Dt', 'SE Forward Dt', 'Fin Appr Dt', 'Days\nTaken', 'Demand Dt\n(Full)'
      ]
    ],
    
    /* ================= BODY SECTION ================= */
    body: bodyData, 

    /* ================= GLOBAL STYLES ================= */
    styles: {
      fontSize: 9, // A1 page pe 9 fontsize aasaani se padha jayega
      lineWidth: 0.2,
      lineColor: [80, 80, 80], 
      valign: 'middle',
      textColor: [0, 0, 0],
      overflow: 'linebreak'
    },
    
    /* ================= DYNAMIC CELL STYLES ================= */
    didParseCell: (data) => {
      // Header styling
      if (data.section === 'head' && data.row.index === 1) {
        data.cell.styles.fillColor = [142, 171, 219]; 
        data.cell.styles.lineWidth = 0.5;
        data.cell.styles.halign = 'center';
      }
    }
  });
  
  // PDF Download Trigger
  const safeDateString = currentDateTime.replace(/[\/:\s]/g, '_');
  doc.save(`Work_Demand_Details_${safeDateString}.pdf`);
}
}

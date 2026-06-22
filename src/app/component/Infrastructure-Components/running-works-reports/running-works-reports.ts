import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/api.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { forkJoin } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';

@Component({
  selector: 'app-running-works-reports',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatDialogModule,
    NgbModule,
    MatMenuModule,
    CommonModule,
    MatIconModule,
    MatTabsModule,
    NgSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableExporterModule,
  ],
  providers: [DatePipe],
  templateUrl: './running-works-reports.html',
  styleUrl: './running-works-reports.css',
})
export class RunningWorksReports implements OnInit {
  runningWorkSummaryValue: any[] = [];
  filteredRunningWorkSummaryValue: any[] = [];

  dataSource!: MatTableDataSource<any>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;
  @ViewChild('itemDetailsModal') itemDetailsModal: any;

  dispatchData: any[] = [];
  selectedParameter: any;
  selectname: any;
  selectedvalue: any;
  divisionid: any;
  himisDistrictid: any;
  mainschemeid: any;
  ASFileData: any[] = [];

  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    public datePipe: DatePipe,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>([]);
    this.getRunningWorkSummaryValue();
  }

  getRunningWorkSummaryValue(): void {
    this.spinner.show();
    forkJoin({
      values: this.api.GETRunningWorkSummaryValue(),
      delays: this.api.GETRunningWorkSummaryDelay('Division', 0, 0, 0, 0)
    }).subscribe({
      next: ({ values, delays }) => {
        if (values && delays) {
          this.runningWorkSummaryValue = values.map((val: any, index: number) => {
            const delayItem: any = delays.find((d: any) => d.id === val.divisionID) || {};
            
            const medicollege = Number(val.medicollege) || 0;
            const medicollegeworkvalue = Number(val.medicollegeworkvalue) || 0;
            const nosabove90 = Number(val.nosabove90) || 0;
            const above90Valuecr = Number(val.above90Valuecr) || 0;
            const below90 = Number(val.below90) || 0;
            const below90valuecr = Number(val.below90valuecr) || 0;

            const totalNos = medicollege + nosabove90 + below90;
            const totalValue = medicollegeworkvalue + above90Valuecr + below90valuecr;

            return {
              ...val,
              sno: index + 1,
              totalNos,
              totalValue,
              morethanSixMonth: Number(delayItem.morethanSixMonth) || 0,
              timeValid: Number(delayItem.timeValid) || 0,
              d_91_180Days: Number(delayItem.d_91_180Days) || 0
            };
          });

          this.filteredRunningWorkSummaryValue = [...this.runningWorkSummaryValue];
          this.cdr.detectChanges();
        }
        this.spinner.hide();
      },
      error: (err) => {
        console.error('Error loading running work summary value:', err);
        this.spinner.hide();
      }
    });
  }

  applyTextFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredRunningWorkSummaryValue = this.runningWorkSummaryValue.filter(row => 
      row.divName_En.toLowerCase().includes(filterValue)
    );
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

  getTotals() {
    return this.filteredRunningWorkSummaryValue.reduce(
      (acc, r) => {
        acc.medicollege += Number(r.medicollege) || 0;
        acc.medicollegeworkvalue += Number(r.medicollegeworkvalue) || 0;

        acc.nosabove90 += Number(r.nosabove90) || 0;
        acc.above90Valuecr += Number(r.above90Valuecr) || 0;

        acc.below90 += Number(r.below90) || 0;
        acc.below90valuecr += Number(r.below90valuecr) || 0;

        acc.totalNos += Number(r.totalNos) || 0;
        acc.totalValue += Number(r.totalValue) || 0;

        acc.morethanSixMonth += Number(r.morethanSixMonth) || 0;
        acc.timeValid += Number(r.timeValid) || 0;
        acc.d_91_180Days += Number(r.d_91_180Days) || 0;
        
        return acc;
      },
      {
        medicollege: 0,
        medicollegeworkvalue: 0,
        nosabove90: 0,
        above90Valuecr: 0,
        below90: 0,
        below90valuecr: 0,
        totalNos: 0,
        totalValue: 0,
        morethanSixMonth: 0,
        timeValid: 0,
        d_91_180Days: 0
      }
    );
  }

  exportToExcel(): void {
    const excelData = this.filteredRunningWorkSummaryValue.map((r: any) => ({
      'Division': r.divName_En,
      'Medical College - कुल कार्य': r.medicollege,
      'Medical College - कुल वैल्यू (In cr)': r.medicollegeworkvalue,
      '90 लाख से ऊपर के कार्य - कुल कार्य': r.nosabove90,
      '90 लाख से ऊपर के कार्य - कुल वैल्यू (In cr)': r.above90Valuecr,
      '90 लाख से नीचे के कार्य - कुल कार्य': r.below90,
      '90 लाख से नीचे के कार्य - कुल वैल्यू (In cr)': r.below90valuecr,
      'कुल - कुल कार्य': r.totalNos,
      'कुल - कुल वैल्यू (In cr)': r.totalValue,
      // 'Delayed Work (>6 month)': r.morethanSixMonth,
      // 'Otime': r.timeValid,
      // '3-6 month': r.d_91_180Days
    }));

    const totals = this.getTotals();
    excelData.push({
      'Division': 'Total',
      'Medical College - कुल कार्य': totals.medicollege,
      'Medical College - कुल वैल्यू (In cr)': Number(totals.medicollegeworkvalue.toFixed(2)),
      '90 लाख से ऊपर के कार्य - कुल कार्य': totals.nosabove90,
      '90 लाख से ऊपर के कार्य - कुल वैल्यू (In cr)': Number(totals.above90Valuecr.toFixed(2)),
      '90 लाख से नीचे के कार्य - कुल कार्य': totals.below90,
      '90 लाख से नीचे के कार्य - कुल वैल्यू (In cr)': Number(totals.below90valuecr.toFixed(2)),
      'कुल - कुल कार्य': totals.totalNos,
      'कुल - कुल वैल्यू (In cr)': Number(totals.totalValue.toFixed(2)),
      // 'Delayed Work (>6 month)': totals.morethanSixMonth,
      // 'Otime': totals.timeValid,
      // '3-6 month': totals.d_91_180Days
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);
    const workbook: XLSX.WorkBook = {
      Sheets: { Data: worksheet },
      SheetNames: ['Data'],
    };

    XLSX.writeFile(workbook, 'Running_Works_Summary_Value_Report.xlsx');
  }

  exportToPDF(): void {
    const currentDateTime = this.getCurrentDateTime();
    const total = this.getTotals();
    const doc = new jsPDF('l', 'mm', 'a4');

    const bodyData: any[] = this.filteredRunningWorkSummaryValue.map((r: any) => [
      r.divName_En,
      r.medicollege,
      Number(r.medicollegeworkvalue).toFixed(2),
      r.nosabove90,
      Number(r.above90Valuecr).toFixed(2),
      r.below90,
      Number(r.below90valuecr).toFixed(2),
      r.totalNos,
      Number(r.totalValue).toFixed(2),
      // r.morethanSixMonth,
      // r.timeValid,
      // r.d_91_180Days
    ]);

    bodyData.push([
      'Total',
      total.medicollege,
      total.medicollegeworkvalue.toFixed(2),
      total.nosabove90,
      total.above90Valuecr.toFixed(2),
      total.below90,
      total.below90valuecr.toFixed(2),
      total.totalNos,
      total.totalValue.toFixed(2),
      // total.morethanSixMonth,
      // total.timeValid,
      // total.d_91_180Days
    ]);

    autoTable(doc, {
      startY: 10,
      theme: 'grid',
      head: [
        [
          {
            content: 'Running Works Summary Value (Division Wise)',
            colSpan: 7,
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
          { content: 'Division', rowSpan: 2 },
          { content: 'Medical College', colSpan: 2, styles: { halign: 'center', textColor: [150, 0, 0], fontStyle: 'bold' } },
          { content: 'Above 90 Lakhs\n(Excl. Medical College)', colSpan: 2, styles: { halign: 'center', textColor: [150, 0, 0], fontStyle: 'bold' } },
          { content: 'Below 90 Lakhs', colSpan: 2, styles: { halign: 'center', textColor: [150, 0, 0], fontStyle: 'bold' } },
          { content: 'Total', colSpan: 2, styles: { halign: 'center', textColor: [150, 0, 0], fontStyle: 'bold' } },
          // { content: 'Delayed Work\n(>6 month)', rowSpan: 2, styles: { halign: 'center' } },
          // { content: 'Otime', rowSpan: 2, styles: { halign: 'center' } },
          // { content: '3-6 month', rowSpan: 2, styles: { halign: 'center' } }
        ],
        [
          'Total Works', 'Total Value\n(In Cr)',
          'Total Works', 'Total Value\n(In Cr)',
          'Total Works', 'Total Value\n(In Cr)',
          'Total Works', 'Total Value\n(In Cr)'
        ]
      ],
      body: bodyData,
      styles: {
        fontSize: 8,
        lineWidth: 0.6,
        lineColor: [0, 0, 0],
        valign: 'middle'
      },
      columnStyles: {
        0: { halign: 'left', fontStyle: 'bold' },
        1: { halign: 'center' },
        2: { halign: 'right' },
        3: { halign: 'center' },
        4: { halign: 'right' },
        5: { halign: 'center' },
        6: { halign: 'right' },
        7: { halign: 'center', fontStyle: 'bold', textColor: [0, 51, 153] },
        8: { halign: 'right', fontStyle: 'bold', textColor: [0, 51, 153] },
        // 9: { halign: 'center' },
        // 10: { halign: 'center' },
        // 11: { halign: 'center' }
      },
      didParseCell: (data) => {
        if (data.section === 'head' && (data.row.index === 1 || data.row.index === 2)) {
          data.cell.styles.fillColor = [252, 228, 214];
          data.cell.styles.textColor = [0, 0, 0];
        }
        if (data.row.index === data.table.body.length - 1) {
          data.cell.styles.fillColor = [254, 240, 255];
          data.cell.styles.lineWidth = 0.8;
          data.cell.styles.fontStyle = 'bold';
        }
        if (data.section === 'body' && data.row.index < data.table.body.length - 1) {
          if (data.column.index === 1 || data.column.index === 2) {
            const rawVal = parseFloat(data.cell.raw as string);
            if (rawVal === 0) {
              data.cell.styles.fillColor = [255, 0, 0];
              data.cell.styles.textColor = [255, 255, 255];
              data.cell.styles.fontStyle = 'bold';
            }
          }
        }
      }
    });

    const formattedDate = this.datePipe.transform(new Date(), 'dd-MMM-yyyy');
    doc.save(`Running_Works_Summary_Value_${formattedDate}.pdf`);
  }

  fetchDetails(divisionID: any, isMedicalCollege: string, isabove90: string, count: number, colName: string): void {
    if (count === 0) return;

    this.selectedParameter = 'RunningWorkDetail';
    this.selectname = colName;
    this.selectedvalue = count;

    const roleName = localStorage.getItem('roleName');
    if (roleName === 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.himisDistrictid = 0;
    } else if (roleName === 'Collector') {
      this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
      this.divisionid = 0;
    } else {
      this.divisionid = divisionID;
      this.himisDistrictid = 0;
    }

    const mainSchemeId = 0;
    const contractid = 0;
    const delayTime = '0';
    const parameter = '0';

    this.spinner.show();
    debugger
    this.api.GETRunningDelayWorksDetailsReport(
      delayTime,
      parameter,
      this.divisionid,
      this.himisDistrictid,
      mainSchemeId,
      contractid,
      isMedicalCollege,
      isabove90
    ).subscribe({
      next: (res) => {
        this.dispatchData = res.map((item: any, index: number) => ({
          ...item,
          sno: index + 1
        }));
        console.log('dispatchData11:', this.dispatchData);
        this.dataSource.data = this.dispatchData;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.cdr.detectChanges();
        this.spinner.hide();
        this.openDialog();
      },
      error: (error) => {
        console.error('Error fetching data', error);
        this.spinner.hide();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(this.itemDetailsModal, {
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      panelClass: 'full-screen-dialog',
      data: {}
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed');
    });
  }

  applyDetailFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exportDetailToPDF(): void {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      { header: 'S.No', dataKey: 'sno' },
      { header: 'Head', dataKey: 'head' },
      { header: 'Division', dataKey: 'divName_En' },
      { header: 'District', dataKey: 'district' },
      { header: 'Block', dataKey: 'blockname' },
      { header: 'AS Letter No', dataKey: 'letterNo' },
      { header: 'Approver', dataKey: 'approver' },
      { header: 'Work', dataKey: 'work' },
      { header: 'TS Date', dataKey: 'tsDate' },
      { header: 'TS Amount(in Lacs)', dataKey: 'tsamt' },
      { header: 'Tender Type', dataKey: 'tType' },
      { header: 'NIT Reference', dataKey: 'tenderReference' },
      { header: 'NIT/Sanction DT', dataKey: 'dateOfIssueNIT' },
      { header: 'Acceptance Letter RefNo', dataKey: 'acceptanceLetterRefNo' },
      { header: 'Accepted DT', dataKey: 'acceptLetterDT' },
      { header: 'Time Allowed', dataKey: 'timeAllowed' },
      { header: 'Due DT Time PerAdded', dataKey: 'dueDTTimePerAdded' },
      { header: 'Delay/On Time Days', dataKey: 'delayDays' },
      { header: 'Contractor ID/Class', dataKey: 'cid' },
      { header: 'Contractor', dataKey: 'contractorNAme' },
      { header: 'Contractor Mobile No', dataKey: 'mobNo' },
      { header: 'Last Progress', dataKey: 'lProgress' },
      { header: 'Progress DT', dataKey: 'progressDT' },
      { header: 'Exp.Comp DT', dataKey: 'expcompdt' },
      { header: 'Delay Reason', dataKey: 'delayreason' },
      { header: 'Sub Engineer', dataKey: 'subengname' },
      { header: 'Asst.Eng', dataKey: 'aeName' },
      { header: 'Work ID', dataKey: 'work_id' },
    ];
    const rows = this.dispatchData.map((row) => ({
      sno: row.sno,
      head: row.head,
      divName_En: row.divName_En,
      district: row.district,
      blockname: row.blockname,
      letterNo: row.letterNo,
      approver: row.approver,
      work: row.work,
      aaDate: row.aaDate,
      aaamt: row.aaamt,
      tsDate: row.tsDate,
      tsamt: row.tsamt,
      tType: row.tType,
      tenderReference: row.tenderReference,
      dateOfIssueNIT: row.dateOfIssueNIT,
      acceptanceLetterRefNo: row.acceptanceLetterRefNo,
      acceptLetterDT: row.acceptLetterDT,
      workorderDT: row.workorderDT,
      timeAllowed: row.timeAllowed,
      dueDTTimePerAdded: row.dueDTTimePerAdded,
      delayDays: row.delayDays,
      cid: row.cid,
      contractorNAme: row.contractorNAme,
      mobNo: row.mobNo,
      lProgress: row.lProgress,
      progressDT: row.progressDT,
      expcompdt: row.expcompdt,
      delayreason: row.delayreason,
      subengname: row.subengname,
      aeName: row.aeName,
      work_id: row.work_id,
    }));

    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save('LandIssue_Detail.pdf');
  }

  onButtonClick2(ASID: any, workid: any): void {
    this.spinner.show();
    this.api.GETASFile(ASID, workid).subscribe({
      next: (res) => {
        const filename = res[0]?.filename;
        const URL = res[0]?.asLetterName;

        if (filename) {
          window.open(URL, '_blank');
        } else {
          alert("⚠️ Alert: AS Letter Not Found!\n\nThe requested document is missing.\nPlease try again later or contact support.");
        }
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
        alert(`Error fetching data: ${error.message}`);
      }
    });
  }
}

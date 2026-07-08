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
  @ViewChild('paginator') set matPaginator(mp: MatPaginator) {
    if (mp) {
      this.dataSource.paginator = mp;
    }
  }
  @ViewChild('sort') set matSort(ms: MatSort) {
    if (ms) {
      this.dataSource.sort = ms;
    }
  }
  @ViewChild('itemDetailsModal') itemDetailsModal: any;

  dispatchData: any[] = [];
  selectedParameter: any;
  selectname: any;
  selectedvalue: any;
  // divisionid: any;
   divisionid: any = sessionStorage.getItem("divisionID")?.match(/^D\d+$/) ? sessionStorage.getItem("divisionID") : 0;
  himisDistrictid: any;
  mainschemeid: any;
  ASFileData: any[] = [];

  selectedDivisionName: string = '';

  expenditureGridDivisions: any[] = [];
  expenditureGridTotal: any = {};

  defaultColumns: string[] = [
    'sno', 'work_id', 'head', 'divName_En', 'district', 'blockname', 'work', 'contractorNAme', 'mobNo',
    'aaDate', 'aaamt', 'sanctionRate', 'sanctionDetail', 'workorderDT', 'timeAllowed', 'dueDTTimePerAdded', 'tvc', 'paidTillLacs', 'financialProgress',
    'lProgress', 'progressDT', 'delayDays', 'delayreason', 'PRemarks', 'expcompdt', 'subengname',
    'aeName', 'tType', 'tenderReference', 'dateOfIssueNIT', 'tsDate', 'tsamt', 'acceptanceLetterRefNo', 'acceptLetterDT',
    'letterNo', 'approver', 'cid', 'action'
  ];

  displayedColumns: string[] = [...this.defaultColumns];

  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    public datePipe: DatePipe,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
   
    this.dataSource = new MatTableDataSource<any>([]);
    this.getRunningWorkSummaryValue();
  }

  getRunningWorkSummaryValue(): void {
    this.spinner.show();
    forkJoin({
      values: this.api.GETRunningWorkSummaryValue(this.divisionid || 0, this.himisDistrictid || 0, this.mainschemeid || 0),
      delays: this.api.GETRunningWorkSummaryDelay('Division', 0, 0, 0, 0),
      medCollegeDetails: this.api.GETRunningDelayWorksDetailsReport('0', '0', 0, 0, 0, 0, 'Y', 'NA'),
      above90Details: this.api.GETRunningDelayWorksDetailsReport('0', '0', 0, 0, 0, 0, 'NA', 'Y'),
      below90Details: this.api.GETRunningDelayWorksDetailsReport('0', '0', 0, 0, 0, 0, 'NA', 'NA')
    }).subscribe({
      next: ({ values, delays, medCollegeDetails, above90Details, below90Details }) => {
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

          // Classify delays helper
          const classifyDetails = (list: any[]) => {
            const map: { [key: string]: { SixMonth: number, Between3_6: number, Between1_3: number, TimeValid: number } } = {};
            if (list) {
              list.forEach((item: any) => {
                const divId = item.divisionID;
                if (!map[divId]) {
                  map[divId] = { SixMonth: 0, Between3_6: 0, Between1_3: 0, TimeValid: 0 };
                }
                const dDays = Number(item.delayDays) || 0;
                if (dDays > 180) {
                  map[divId].SixMonth++;
                } else if (dDays >= 91 && dDays <= 180) {
                  map[divId].Between3_6++;
                } else if (dDays >= 1 && dDays <= 90) {
                  map[divId].Between1_3++;
                } else {
                  map[divId].TimeValid++;
                }
              });
            }
            return map;
          };

          const medCollegeDelayMap = classifyDetails(medCollegeDetails);
          const above90DelayMap = classifyDetails(above90Details);
          const below90DelayMap = classifyDetails(below90Details);

          this.expenditureGridDivisions = values.map((val: any) => {
            const divId = val.divisionID;
            const medDelays = medCollegeDelayMap[divId] || { SixMonth: 0, Between3_6: 0, Between1_3: 0, TimeValid: 0 };
            const ab90Delays = above90DelayMap[divId] || { SixMonth: 0, Between3_6: 0, Between1_3: 0, TimeValid: 0 };
            const bel90Delays = below90DelayMap[divId] || { SixMonth: 0, Between3_6: 0, Between1_3: 0, TimeValid: 0 };

            const medValue = Number(val.medicollegeworkvalue) || 0;
            const medPaid = Number(val.medicalCollegePaidcr) || 0;
            const medPercent = medValue > 0 ? (medPaid / medValue) * 100 : 0;

            const ab90Value = Number(val.above90Valuecr) || 0;
            const ab90Paid = Number(val.above90Paidcr) || 0;
            const ab90Percent = ab90Value > 0 ? (ab90Paid / ab90Value) * 100 : 0;

            const bel90Value = Number(val.below90valuecr) || 0;
            const bel90Paid = Number(val.below90Paidcr) || 0;
            const bel90Percent = bel90Value > 0 ? (bel90Paid / bel90Value) * 100 : 0;

            const totWorks = (Number(val.medicollege) || 0) + (Number(val.nosabove90) || 0) + (Number(val.below90) || 0);
            const totValue = medValue + ab90Value + bel90Value;
            const totPaid = medPaid + ab90Paid + bel90Paid;
            const totPercent = totValue > 0 ? (totPaid / totValue) * 100 : 0;

            const totDelSix = medDelays.SixMonth + ab90Delays.SixMonth + bel90Delays.SixMonth;
            const totDelThreeSix = medDelays.Between3_6 + ab90Delays.Between3_6 + bel90Delays.Between3_6;
            const totDelLessThree = medDelays.Between1_3 + ab90Delays.Between1_3 + bel90Delays.Between1_3;
            const totOnTime = medDelays.TimeValid + ab90Delays.TimeValid + bel90Delays.TimeValid;

            return {
              divisionID: divId,
              divName_En: val.divName_En,
              med: {
                works: Number(val.medicollege) || 0,
                value: medValue,
                paid: medPaid,
                percent: medPercent,
                delaySix: medDelays.SixMonth,
                delayThreeSix: medDelays.Between3_6,
                delayLessThree: medDelays.Between1_3,
                onTime: medDelays.TimeValid
              },
              above90: {
                works: Number(val.nosabove90) || 0,
                value: ab90Value,
                paid: ab90Paid,
                percent: ab90Percent,
                delaySix: ab90Delays.SixMonth,
                delayThreeSix: ab90Delays.Between3_6,
                delayLessThree: ab90Delays.Between1_3,
                onTime: ab90Delays.TimeValid
              },
              below90: {
                works: Number(val.below90) || 0,
                value: bel90Value,
                paid: bel90Paid,
                percent: bel90Percent,
                delaySix: bel90Delays.SixMonth,
                delayThreeSix: bel90Delays.Between3_6,
                delayLessThree: bel90Delays.Between1_3,
                onTime: bel90Delays.TimeValid
              },
              total: {
                works: totWorks,
                value: totValue,
                paid: totPaid,
                percent: totPercent,
                delaySix: totDelSix,
                delayThreeSix: totDelThreeSix,
                delayLessThree: totDelLessThree,
                onTime: totOnTime
              }
            };
          });

          // Calculate Grand Totals
          const medValueTotal = this.expenditureGridDivisions.reduce((sum, d) => sum + d.med.value, 0);
          const medPaidTotal = this.expenditureGridDivisions.reduce((sum, d) => sum + d.med.paid, 0);
          const above90ValueTotal = this.expenditureGridDivisions.reduce((sum, d) => sum + d.above90.value, 0);
          const above90PaidTotal = this.expenditureGridDivisions.reduce((sum, d) => sum + d.above90.paid, 0);
          const below90ValueTotal = this.expenditureGridDivisions.reduce((sum, d) => sum + d.below90.value, 0);
          const below90PaidTotal = this.expenditureGridDivisions.reduce((sum, d) => sum + d.below90.paid, 0);
          const totalValueTotal = this.expenditureGridDivisions.reduce((sum, d) => sum + d.total.value, 0);
          const totalPaidTotal = this.expenditureGridDivisions.reduce((sum, d) => sum + d.total.paid, 0);

          this.expenditureGridTotal = {
            med: {
              works: this.expenditureGridDivisions.reduce((sum, d) => sum + d.med.works, 0),
              value: medValueTotal,
              paid: medPaidTotal,
              percent: medValueTotal > 0 ? (medPaidTotal / medValueTotal) * 100 : 0,
              delaySix: this.expenditureGridDivisions.reduce((sum, d) => sum + d.med.delaySix, 0),
              delayThreeSix: this.expenditureGridDivisions.reduce((sum, d) => sum + d.med.delayThreeSix, 0),
              delayLessThree: this.expenditureGridDivisions.reduce((sum, d) => sum + d.med.delayLessThree, 0),
              onTime: this.expenditureGridDivisions.reduce((sum, d) => sum + d.med.onTime, 0)
            },
            above90: {
              works: this.expenditureGridDivisions.reduce((sum, d) => sum + d.above90.works, 0),
              value: above90ValueTotal,
              paid: above90PaidTotal,
              percent: above90ValueTotal > 0 ? (above90PaidTotal / above90ValueTotal) * 100 : 0,
              delaySix: this.expenditureGridDivisions.reduce((sum, d) => sum + d.above90.delaySix, 0),
              delayThreeSix: this.expenditureGridDivisions.reduce((sum, d) => sum + d.above90.delayThreeSix, 0),
              delayLessThree: this.expenditureGridDivisions.reduce((sum, d) => sum + d.above90.delayLessThree, 0),
              onTime: this.expenditureGridDivisions.reduce((sum, d) => sum + d.above90.onTime, 0)
            },
            below90: {
              works: this.expenditureGridDivisions.reduce((sum, d) => sum + d.below90.works, 0),
              value: below90ValueTotal,
              paid: below90PaidTotal,
              percent: below90ValueTotal > 0 ? (below90PaidTotal / below90ValueTotal) * 100 : 0,
              delaySix: this.expenditureGridDivisions.reduce((sum, d) => sum + d.below90.delaySix, 0),
              delayThreeSix: this.expenditureGridDivisions.reduce((sum, d) => sum + d.below90.delayThreeSix, 0),
              delayLessThree: this.expenditureGridDivisions.reduce((sum, d) => sum + d.below90.delayLessThree, 0),
              onTime: this.expenditureGridDivisions.reduce((sum, d) => sum + d.below90.onTime, 0)
            },
            total: {
              works: this.expenditureGridDivisions.reduce((sum, d) => sum + d.total.works, 0),
              value: totalValueTotal,
              paid: totalPaidTotal,
              percent: totalValueTotal > 0 ? (totalPaidTotal / totalValueTotal) * 100 : 0,
              delaySix: this.expenditureGridDivisions.reduce((sum, d) => sum + d.total.delaySix, 0),
              delayThreeSix: this.expenditureGridDivisions.reduce((sum, d) => sum + d.total.delayThreeSix, 0),
              delayLessThree: this.expenditureGridDivisions.reduce((sum, d) => sum + d.total.delayLessThree, 0),
              onTime: this.expenditureGridDivisions.reduce((sum, d) => sum + d.total.onTime, 0)
            }
          };

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
      'Medical College - Total Works': r.medicollege,
      'Medical College - Total Value (In cr)': r.medicollegeworkvalue,
      'Works > 90 Lakhs - Total Works': r.nosabove90,
      'Works > 90 Lakhs - Total Value (In cr)': r.above90Valuecr,
      'Works < 90 Lakhs - Total Works': r.below90,
      'Works < 90 Lakhs - Total Value (In cr)': r.below90valuecr,
      'Total - Total Works': r.totalNos,
      'Total - Total Value (In cr)': r.totalValue,
      // 'Delayed Work (>6 month)': r.morethanSixMonth,
      // 'Otime': r.timeValid,
      // '3-6 month': r.d_91_180Days
    }));

    const totals = this.getTotals();
    excelData.push({
      'Division': 'Total',
      'Medical College - Total Works': totals.medicollege,
      'Medical College - Total Value (In cr)': Number(totals.medicollegeworkvalue.toFixed(2)),
      'Works > 90 Lakhs - Total Works': totals.nosabove90,
      'Works > 90 Lakhs - Total Value (In cr)': Number(totals.above90Valuecr.toFixed(2)),
      'Works < 90 Lakhs - Total Works': totals.below90,
      'Works < 90 Lakhs - Total Value (In cr)': Number(totals.below90valuecr.toFixed(2)),
      'Total - Total Works': totals.totalNos,
      'Total - Total Value (In cr)': Number(totals.totalValue.toFixed(2)),
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
            content: 'Running Works Financial and Physical Status',
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

  exportExpenditureToExcel(): void {
    const excelData: any[] = [];

    const categories = [
      { key: 'med', label: 'Medical College' },
      { key: 'above90', label: 'Works > 90 Lakhs' },
      { key: 'below90', label: 'Works < 90 Lakhs' },
      { key: 'total', label: 'Total' }
    ];

    const parameters = [
      { prop: 'works', label: 'Total Works', type: 'number' },
      { prop: 'value', label: 'Total Value (In cr)', type: 'number' },
      { prop: 'paid', label: 'Expenditure (Paid in Cr)', type: 'number' },
      { prop: 'percent', label: 'Expenditure %', type: 'percent' },
      { prop: 'delaySix', label: 'Delay > 6Month', type: 'number' },
      { prop: 'delayThreeSix', label: 'Delay 3-6 Month', type: 'number' },
      { prop: 'delayLessThree', label: 'Delay<3', type: 'number' },
      { prop: 'onTime', label: 'Ontime', type: 'number' }
    ];

    categories.forEach(cat => {
      parameters.forEach(param => {
        const row: any = {
          'Category': cat.label,
          'Parameter': param.label
        };

        this.expenditureGridDivisions.forEach(div => {
          let val = div[cat.key][param.prop];
          if (param.type === 'percent') {
            row[div.divName_En] = val.toFixed(2) + '%';
          } else if (param.type === 'number' && param.prop !== 'works' && param.prop.indexOf('delay') === -1 && param.prop !== 'onTime') {
            row[div.divName_En] = Number(val.toFixed(2));
          } else {
            row[div.divName_En] = val;
          }
        });

        let totVal = this.expenditureGridTotal[cat.key][param.prop];
        if (param.type === 'percent') {
          row['Total'] = totVal.toFixed(2) + '%';
        } else if (param.type === 'number' && param.prop !== 'works' && param.prop.indexOf('delay') === -1 && param.prop !== 'onTime') {
          row['Total'] = Number(totVal.toFixed(2));
        } else {
          row['Total'] = totVal;
        }

        excelData.push(row);
      });
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);
    const workbook: XLSX.WorkBook = {
      Sheets: { Data: worksheet },
      SheetNames: ['Data'],
    };

    XLSX.writeFile(workbook, 'Running_Works_With_Expenditure_Report.xlsx');
  }

  exportExpenditureToPDF(): void {
    const currentDateTime = this.getCurrentDateTime();
    const doc = new jsPDF('l', 'mm', 'a4');

    const headers = [['Category', 'Parameter', ...this.expenditureGridDivisions.map(d => d.divName_En), 'Total']];
    const bodyData: any[] = [];

    const categories = [
      { key: 'med', label: 'Medical College' },
      { key: 'above90', label: 'Works > 90 Lakhs' },
      { key: 'below90', label: 'Works < 90 Lakhs' },
      { key: 'total', label: 'Total' }
    ];

    const parameters = [
      { prop: 'works', label: 'Total Works', type: 'number' },
      { prop: 'value', label: 'Total Value (In cr)', type: 'number' },
      { prop: 'paid', label: 'Expenditure (Paid in Cr)', type: 'number' },
      { prop: 'percent', label: 'Expenditure %', type: 'percent' },
      { prop: 'delaySix', label: 'Delay > 6Month', type: 'number' },
      { prop: 'delayThreeSix', label: 'Delay 3-6 Month', type: 'number' },
      { prop: 'delayLessThree', label: 'Delay<3', type: 'number' },
      { prop: 'onTime', label: 'Ontime', type: 'number' }
    ];

    categories.forEach(cat => {
      parameters.forEach(param => {
        const row: any[] = [cat.label, param.label];

        this.expenditureGridDivisions.forEach(div => {
          let val = div[cat.key][param.prop];
          if (param.type === 'percent') {
            row.push(val.toFixed(2) + '%');
          } else if (param.type === 'number' && param.prop !== 'works' && param.prop.indexOf('delay') === -1 && param.prop !== 'onTime') {
            row.push(Number(val.toFixed(2)));
          } else {
            row.push(val);
          }
        });

        let totVal = this.expenditureGridTotal[cat.key][param.prop];
        if (param.type === 'percent') {
          row.push(totVal.toFixed(2) + '%');
        } else if (param.type === 'number' && param.prop !== 'works' && param.prop.indexOf('delay') === -1 && param.prop !== 'onTime') {
          row.push(Number(totVal.toFixed(2)));
        } else {
          row.push(totVal);
        }

        bodyData.push(row);
      });
    });

    autoTable(doc, {
      startY: 10,
      theme: 'grid',
      head: [
        [
          {
            content: 'Running Works Financial and Physical Status',
            colSpan: headers[0].length - 2,
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
        headers[0]
      ],
      body: bodyData,
      styles: {
        fontSize: 8,
        lineWidth: 0.6,
        lineColor: [0, 0, 0],
        valign: 'middle'
      },
      didParseCell: (data) => {
        if (data.section === 'body') {
          const category = data.row.cells[0].raw as string;
          if (category === 'Medical College') {
            data.cell.styles.fillColor = [226, 239, 218]; // soft green
          } else if (category === 'Works > 90 Lakhs') {
            data.cell.styles.fillColor = [221, 235, 247]; // soft blue
          } else if (category === 'Works < 90 Lakhs') {
            data.cell.styles.fillColor = [252, 228, 214]; // soft peach
          } else if (category === 'Total') {
            data.cell.styles.fillColor = [255, 242, 204]; // soft yellow/gold
            data.cell.styles.fontStyle = 'bold';
          }

          if (data.column.index === 0 || data.column.index === 1) {
            data.cell.styles.fontStyle = 'bold';
          }
          if (data.column.index === headers[0].length - 1) {
            data.cell.styles.fontStyle = 'bold';
          }
        }
      }
    });

    const formattedDate = this.datePipe.transform(new Date(), 'dd-MMM-yyyy');
    doc.save(`Running_Works_With_Expenditure_${formattedDate}.pdf`);
  }

  fetchDetails(divisionID: any, isMedicalCollege: string, isabove90: string, count: number, colName: string, divName: string = '', delayTime: string = '0', parameter: string = '0'): void {
    if (count === 0) return;

    this.selectedDivisionName = divName;
    this.selectedParameter = delayTime === '0' ? 'RunningWorkDetail' : delayTime;
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

    if (this.divisionid !== 0 && this.divisionid !== '0') {
      this.displayedColumns = this.defaultColumns.filter(col => col !== 'divName_En');
    } else {
      this.displayedColumns = [...this.defaultColumns];
    }

    const mainSchemeId = 0;
    const contractid = 0;

    const processResults = (res: any[]) => {
      this.dispatchData = res.map((item: any, index: number) => {
        const tvcVal = Number(item.tvc) || 0;
        const paidVal = Number(item.paidTillLacs) || 0;
        let finProgress = '0%';
        if (paidVal > 0) {
          if (tvcVal === 0) {
            finProgress = '100%';
          } else {
            const percentage = (paidVal / tvcVal) * 100;
            if (percentage > 100) {
              finProgress = '100%';
            } else {
              finProgress = percentage.toFixed(2) + '%';
            }
          }
        }
        return {
          ...item,
          sno: index + 1,
          financialProgress: finProgress
        };
      });
      console.log('dispatchData11:', this.dispatchData);
      this.dataSource.data = this.dispatchData;
      this.cdr.detectChanges();
      this.spinner.hide();
      this.openDialog();
    };

    if (isMedicalCollege === 'ALL' && isabove90 === 'ALL') {
      this.spinner.show();
      forkJoin({
        med: this.api.GETRunningDelayWorksDetailsReport(delayTime, parameter, this.divisionid, this.himisDistrictid, mainSchemeId, contractid, 'Y', 'NA'),
        above: this.api.GETRunningDelayWorksDetailsReport(delayTime, parameter, this.divisionid, this.himisDistrictid, mainSchemeId, contractid, 'NA', 'Y'),
        below: this.api.GETRunningDelayWorksDetailsReport(delayTime, parameter, this.divisionid, this.himisDistrictid, mainSchemeId, contractid, 'NA', 'NA')
      }).subscribe({
        next: ({ med, above, below }) => {
          const combined = [...(med || []), ...(above || []), ...(below || [])];
          processResults(combined);
        },
        error: (error) => {
          console.error('Error fetching data', error);
          this.spinner.hide();
        }
      });
    } else {
      this.spinner.show();
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
          processResults(res);
        },
        error: (error) => {
          console.error('Error fetching data', error);
          this.spinner.hide();
        }
      });
    }
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

    const allPDFColumns: { [key: string]: { header: string, dataKey: string } } = {
      sno: { header: 'S.No', dataKey: 'sno' },
      work_id: { header: 'Work ID', dataKey: 'work_id' },
      head: { header: 'Head', dataKey: 'head' },
      divName_En: { header: 'Division', dataKey: 'divName_En' },
      district: { header: 'District', dataKey: 'district' },
      blockname: { header: 'Block', dataKey: 'blockname' },
      work: { header: 'Work', dataKey: 'work' },
      contractorNAme: { header: 'Contractor', dataKey: 'contractorNAme' },
      mobNo: { header: 'Cont. Mob.', dataKey: 'mobNo' },
      aaDate: { header: 'AS Date', dataKey: 'aaDate' },
      aaamt: { header: 'AS Amt(L)', dataKey: 'aaamt' },
      sanctionRate: { header: 'Rate', dataKey: 'sanctionRate' },
      sanctionDetail: { header: 'Sanction', dataKey: 'sanctionDetail' },
      workorderDT: { header: 'WO Date', dataKey: 'workorderDT' },
      timeAllowed: { header: 'Time Allowed', dataKey: 'timeAllowed' },
      dueDTTimePerAdded: { header: 'Due Date', dataKey: 'dueDTTimePerAdded' },
      tvc: { header: 'TVC(L)', dataKey: 'tvc' },
      paidTillLacs: { header: 'Paid(L)', dataKey: 'paidTillLacs' },
      financialProgress: { header: 'Fin. Prog', dataKey: 'financialProgress' },
      lProgress: { header: 'Phys. Prog', dataKey: 'lProgress' },
      progressDT: { header: 'Prog Date', dataKey: 'progressDT' },
      delayDays: { header: 'Delay Days', dataKey: 'delayDays' },
      delayreason: { header: 'Delay Reason', dataKey: 'delayreason' },
      PRemarks: { header: 'Remarks', dataKey: 'PRemarks' },
      expcompdt: { header: 'Exp. Comp DT', dataKey: 'expcompdt' },
      subengname: { header: 'Sub Eng', dataKey: 'subengname' },
      aeName: { header: 'Asst.Eng', dataKey: 'aeName' },
      tType: { header: 'Tender Type', dataKey: 'tType' },
      tenderReference: { header: 'NIT Ref', dataKey: 'tenderReference' },
      dateOfIssueNIT: { header: 'NIT/Sanction DT', dataKey: 'dateOfIssueNIT' },
      tsDate: { header: 'TS Date', dataKey: 'tsDate' },
      tsamt: { header: 'TS Amt(L)', dataKey: 'tsamt' },
      acceptanceLetterRefNo: { header: 'Acceptance RefNo', dataKey: 'acceptanceLetterRefNo' },
      acceptLetterDT: { header: 'Accepted DT', dataKey: 'acceptLetterDT' },
      letterNo: { header: 'AS Letter', dataKey: 'letterNo' },
      approver: { header: 'Approver', dataKey: 'approver' },
      cid: { header: 'Cont. ID/Class', dataKey: 'cid' }
    };

    const columnWidths: { [key: string]: number } = {
      sno: 3,
      work_id: 7,
      head: 7,
      divName_En: 8,
      district: 8,
      blockname: 8,
      work: 15,
      contractorNAme: 12,
      mobNo: 8,
      aaDate: 7,
      aaamt: 6,
      sanctionRate: 5,
      sanctionDetail: 7,
      workorderDT: 7,
      timeAllowed: 5,
      dueDTTimePerAdded: 7,
      tvc: 6,
      paidTillLacs: 6,
      financialProgress: 6,
      lProgress: 8,
      progressDT: 7,
      delayDays: 5,
      delayreason: 15,
      PRemarks: 10,
      expcompdt: 7,
      subengname: 8,
      aeName: 8,
      tType: 6,
      tenderReference: 10,
      dateOfIssueNIT: 10,
      tsDate: 7,
      tsamt: 6,
      acceptanceLetterRefNo: 10,
      acceptLetterDT: 7,
      letterNo: 10,
      approver: 8,
      cid: 10
    };

    const columns = this.displayedColumns
      .filter(col => col !== 'action')
      .map(col => allPDFColumns[col])
      .filter(col => col !== undefined);

    const colStyles: { [key: string]: { cellWidth: number } } = {};
    columns.forEach((col) => {
      colStyles[col.dataKey] = { cellWidth: columnWidths[col.dataKey] || 8 };
    });

    const rows = this.dispatchData.map((row) => ({
      sno: row.sno,
      work_id: row.work_id,
      head: row.head,
      divName_En: row.divName_En,
      district: row.district,
      blockname: row.blockname,
      work: row.work,
      contractorNAme: row.contractorNAme,
      mobNo: row.mobNo,
      aaDate: row.aaDate,
      aaamt: row.aaamt,
      sanctionRate: row.sanctionRate,
      sanctionDetail: row.sanctionDetail,
      workorderDT: row.workorderDT,
      timeAllowed: row.timeAllowed,
      dueDTTimePerAdded: row.dueDTTimePerAdded,
      tvc: row.tvc,
      paidTillLacs: row.paidTillLacs,
      financialProgress: row.financialProgress,
      lProgress: row.lProgress,
      progressDT: row.progressDT,
      delayDays: row.delayDays,
      delayreason: row.delayreason,
      PRemarks: `${row.PRemarks || ''}/${row.Remarks || ''}`,
      expcompdt: row.expcompdt,
      subengname: row.subengname,
      aeName: row.aeName,
      tType: row.tType,
      tenderReference: row.tenderReference,
      dateOfIssueNIT: `${row.dateOfIssueNIT || ''}/${row.dateOfSanction || ''}`,
      tsDate: row.tsDate,
      tsamt: row.tsamt,
      acceptanceLetterRefNo: row.acceptanceLetterRefNo,
      acceptLetterDT: row.acceptLetterDT,
      letterNo: row.letterNo,
      approver: row.approver,
      cid: `${row.cid || ''}/${row.regType || ''}`,
    }));

    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'grid',
      margin: { left: 5, right: 5, top: 15, bottom: 10 },
      styles: {
        fontSize: 3.5,
        cellPadding: 0.3,
        overflow: 'linebreak'
      },
      columnStyles: colStyles,
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: [255, 255, 255],
        fontSize: 3.5,
        fontStyle: 'bold'
      },
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

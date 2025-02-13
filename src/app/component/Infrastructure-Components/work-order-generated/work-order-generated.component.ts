import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexLegend,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  ASFile,
  WorkGenDetails,
  WorkOrderIssued,
} from 'src/app/Model/DashProgressCount';
import { ApiService } from 'src/app/service/api.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
};
@Component({
  selector: 'app-work-order-generated',
  standalone: true,
  imports: [
    NgApexchartsModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatTableExporterModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    NgFor,
    CommonModule,
  ],
  templateUrl: './work-order-generated.component.html',
  styleUrl: './work-order-generated.component.css',
})
export class WorkOrderGeneratedComponent {
  //#region chart
  @ViewChild('chart') chart: ChartComponent | undefined;
  @ViewChild('itemDetailsModal') itemDetailsModal: any;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions!: ChartOptions; // For bar chart
  chartOptions2!: ChartOptions; // For bar charta
  chartOptionsLine!: ChartOptions; // For line chart
  chartOptionsLine2!: ChartOptions; // For line chart
  //#endregion
  //#region DataBase Table
  dataSource!: MatTableDataSource<WorkGenDetails>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dispatchPending: WorkGenDetails[] = [];
  ASFileData: ASFile[] = [];
  //#endregion
  WoIssuedTotal: WorkOrderIssued[] = [];
  wOIssuedGTotal: WorkOrderIssued[] = [];
  wOIssuedDistrict: WorkOrderIssued[] = [];
  wOIssuedScheme: WorkOrderIssued[] = [];
  divisionid: any;
  himisDistrictid: any;
  dateRange!: FormGroup;
  fromdt: any;
  todt: any;
  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private fb: FormBuilder,
    public datePipe: DatePipe
  ) {
    this.dataSource = new MatTableDataSource<WorkGenDetails>([]);
  }
  ngOnInit() {
    const today = new Date();
    const firstDayOfMonthLastYear = new Date(
      today.getFullYear() - 1,
      today.getMonth(),
      1
    );

    this.dateRange = this.fb.group({
      start: [firstDayOfMonthLastYear],
      end: [today],
    });
    this.dateRange.valueChanges.subscribe(() => {
      this.GetWOIssueTotal();
      this.GetWOIssueDistrict();
      this.GetWOIssueScheme();
      // this.GetWOIssueContractor();
    });
    this.initializeChartOptions();
    this.GetWOIssueTotal();
    this.GetWOIssueDistrict();
    this.GetWOIssueScheme();
    this.GetWOIssueGTotal();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  initializeChartOptions() {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        stacked: true,
        // height: 'auto',
        // height:400,
        // height: 200,
        // width:600,
        events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            const selectedCategory =
              this.chartOptions?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
            const selectedSeries =
              this.chartOptions?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.WoIssuedTotal; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry

                this.fetchDataBasedOnChartSelectionTotal(id, selectedSeries);
              } else {
                console.log(
                  `No data found for selected category: ${selectedCategory}`
                );
              }
            } else {
              console.log('Selected category or series is invalid.');
            }
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          // colors: ['#FF0000']
          colors: ['#000'],
        },
      },
      stroke: {
        width: 1,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        text: 'Division-wise Works Order Issued',
        align: 'center',
        style: {
          fontSize: '12px',
          // color: '#000'
          color: '#6e0d25',
        },
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val.toString();
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 40,
      },
    };
    this.chartOptions2 = {
      series: [],
      chart: {
        type: 'bar',
        stacked: true,
        // height: 'auto',
        // height:400,
        // height: 200,
        // width:600,
        events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            const selectedCategory =
              this.chartOptions2?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
            const selectedSeries =
              this.chartOptions2?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            ;
            if (selectedCategory && selectedSeries) {
              const apiData = this.wOIssuedDistrict; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry

                this.fetchDataBasedOnChartSelectionDistrict(id, selectedSeries);
              } else {
                console.log(
                  `No data found for selected category: ${selectedCategory}`
                );
              }
            } else {
              console.log('Selected category or series is invalid.');
            }
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          // colors: ['#FF0000']
          colors: ['#000'],
        },
      },
      stroke: {
        width: 1,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        text: 'District-wise Work Order Issued',
        align: 'center',
        style: {
          fontSize: '12px',
          // color: '#000'
          color: '#6e0d25',
        },
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val.toString();
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 40,
      },
    };
    this.chartOptionsLine = {
      series: [],
      chart: {
        type: 'bar',
        stacked: true,
        // height: 'auto',
        // height:400,
        // height: 200,
        // width:600,
        events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            const selectedCategory =
              this.chartOptionsLine?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
            const selectedSeries =
              this.chartOptionsLine?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.wOIssuedScheme; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry

                this.fetchDataBasedOnChartSelectionScheme(id, selectedSeries);
              } else {
                console.log(
                  `No data found for selected category: ${selectedCategory}`
                );
              }
            } else {
              console.log('Selected category or series is invalid.');
            }
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          // colors: ['#FF0000']
          colors: ['#000'],
        },
      },
      stroke: {
        width: 1,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        text: 'Scheme-wise Work Order Issued',
        align: 'center',
        style: {
          fontSize: '12px',
          // color: '#000'
          color: '#6e0d25',
        },
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val.toString();
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 40,
      },
    };
    this.chartOptionsLine2 = {
      series: [],
      chart: {
        type: 'bar',
        stacked: false,
        // height: 'auto',
        // height:400,
        // height: 200,
        // width:600,
        events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            const selectedCategory =
              this.chartOptionsLine2?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
            const selectedSeries =
              this.chartOptionsLine2?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            ;
            if (selectedCategory && selectedSeries) {
              const apiData = this.wOIssuedGTotal; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry

                this.fetchDataBasedOnChartSelection(0, selectedSeries);
              } else {
                console.log(
                  `No data found for selected category: ${selectedCategory}`
                );
              }
            } else {
              console.log('Selected category or series is invalid.');
            }
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      xaxis: {
        categories: [],
        // position: 'top',
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          // colors: ['#FF0000']
          colors: ['#000'],
        },
      },
      stroke: {
        width: 1,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        text: 'Work Order Issued',
        align: 'center',
        style: {
          fontSize: '12px',
          // color: '#000'
          color: '#6e0d25',
        },
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val.toString();
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 40,
      },
    };
  }
  //#region Get API data
  GetWOIssueTotal(): void {
    this.spinner.show();
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.chartOptions.chart.height = '200px';
      this.himisDistrictid = 0;
    } else if (roleName == 'Collector') {
      this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
      this.divisionid = 0;
      this.chartOptions.chart.height = '400px';
    } else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.chartOptions.chart.height = 'auto';
    }
    const startDate = this.dateRange.value.start;
    const endDate = this.dateRange.value.end;
    this.fromdt = startDate
      ? this.datePipe.transform(startDate, 'dd-MMM-yyyy')
      : '';
    this.todt = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
    var RPType = 'Total';
    // console.log('fromdt=',this.fromdt,'todt=',this.todt)
    // this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
    // https://cgmsc.gov.in/HIMIS_APIN/api/WorkOrder/WorkOrderGenerated?RPType=Total&divisionid=0&districtid=0&fromdt=01-01-2024&todt=0
    if (this.fromdt && this.todt) {
      this.api
        .GETWorkOrderGenerated(
          RPType,
          this.divisionid,
          this.himisDistrictid,
          this.fromdt,
          this.todt
        )
        .subscribe(
          (data: any) => {
            this.WoIssuedTotal = data;
            // console.log('API Response total:', this.WoIssuedTotal);
            // console.log('API Response data:', data);
            const id: string[] = [];
            const name: string[] = [];
            const totalWorks: any[] = [];
            const totalTVC: number[] = [];
            const avgDaysSinceAcceptance: number[] = [];
            const zonalWorks: number[] = [];
            const tenderWorks: number[] = [];
            const totalZonalTVC: number[] = [];
            const totalNormalTVC: number[] = [];

            data.forEach(
              (item: {
                name: string;
                id: any;
                totalWorks: any;
                totalTVC: number;
                avgDaysSinceAcceptance: any;
                zonalWorks: any;
                tenderWorks: any;
                totalZonalTVC: any;
                totalNormalTVC: any;
              }) => {
                id.push(item.id);
                name.push(item.name);
                totalWorks.push(item.totalWorks);
                totalTVC.push(item.totalTVC);
                avgDaysSinceAcceptance.push(item.avgDaysSinceAcceptance);
                zonalWorks.push(item.zonalWorks);
                tenderWorks.push(item.tenderWorks);
                totalZonalTVC.push(item.totalZonalTVC);
                totalNormalTVC.push(item.totalNormalTVC);
              }
            );
            
            this.chartOptions.series = [
              {
                name: 'No of Works',
                data: totalWorks,
                color: '#eeba0b',
              },
              {
                name: 'Contract Value (in Cr)',
                data: totalTVC,
                color: 'rgba(93, 243, 174, 0.85)' ,
              },
              {
                name: 'Avg Days Since Acceptance',
                data: avgDaysSinceAcceptance,
                color:  'rgba(250, 199, 161, 0.85)',
              },
              // { name: 'Avg Days Since Acceptance', data: avgDaysSinceAcceptance, color:' rgba(181, 7, 212, 0.85)' },
              // { name: 'Zonal Works', data: zonalWorks,color:'#fae4e4'},
              // {
              //   name: 'Zonal Works',
              //   data: zonalWorks,
              //   color: 'rgba(31, 225, 11, 0.85)',
              // },
              // {
              //   name: 'Tender Works',
              //   data: tenderWorks,
              //   color: 'rgba(2, 202, 227, 0.85)',
              // },
              // {
              //   name: 'Zonal Tender Value',
              //   data: totalZonalTVC,
              //   color: 'rgba(172, 5, 26, 0.85)',
              // },
              // {
              //   name: 'Works Tender Value',
              //   data: totalNormalTVC,
              //   color: 'rgba(250, 199, 161, 0.85)',
              // },
              // { name: 'Works Tender Value', data: totalNormalTVC,color:'rgba(208, 156, 205, 0.85)'  },
            ];
            this.chartOptions.xaxis = { categories: name };
            this.cO = this.chartOptions;
            this.cdr.detectChanges();

            this.spinner.hide();
          },
          (error: any) => {
            console.error('Error fetching data', error);
          }
        );
    }
  }
  GetWOIssueDistrict(): void {
    this.spinner.show();
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.chartOptions2.chart.height = '400';
      this.himisDistrictid = 0;
    } else if (roleName == 'Collector') {
      this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
      this.divisionid = 0;
      this.chartOptions2.chart.height = '400';
    } else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.chartOptions2.chart.height = '900';
    }
    const startDate = this.dateRange.value.start;
    const endDate = this.dateRange.value.end;
    this.fromdt = startDate
      ? this.datePipe.transform(startDate, 'dd-MMM-yyyy')
      : '';
    this.todt = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
    var RPType = 'District';
    // console.log('fromdt=',this.fromdt,'todt=',this.todt)
    // this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
    // https://cgmsc.gov.in/HIMIS_APIN/api/WorkOrder/WorkOrderGenerated?RPType=Total&divisionid=0&districtid=0&fromdt=01-01-2024&todt=0
    if (this.fromdt && this.todt) {
      this.api
        .GETWorkOrderGenerated(
          RPType,
          this.divisionid,
          this.himisDistrictid,
          this.fromdt,
          this.todt
        )
        .subscribe(
          (data: any) => {
            this.wOIssuedDistrict = data;
            // console.log('API Response total:', this.WoIssuedTotal);
            // console.log('API Response data:', data);
            const id: string[] = [];
            const name: string[] = [];
            const totalWorks: any[] = [];
            const totalTVC: number[] = [];
            const avgDaysSinceAcceptance: number[] = [];
            const zonalWorks: number[] = [];
            const tenderWorks: number[] = [];
            const totalZonalTVC: number[] = [];
            const totalNormalTVC: number[] = [];

            data.forEach(
              (item: {
                name: string;
                id: any;
                totalWorks: any;
                totalTVC: number;
                avgDaysSinceAcceptance: any;
                zonalWorks: any;
                tenderWorks: any;
                totalZonalTVC: any;
                totalNormalTVC: any;
              }) => {
                id.push(item.id);
                name.push(item.name);
                totalWorks.push(item.totalWorks);
                totalTVC.push(item.totalTVC);
                avgDaysSinceAcceptance.push(item.avgDaysSinceAcceptance);
                zonalWorks.push(item.zonalWorks);
                tenderWorks.push(item.tenderWorks);
                totalZonalTVC.push(item.totalZonalTVC);
                totalNormalTVC.push(item.totalNormalTVC);
              }
            );

            this.chartOptions2.series = [
              {
                name: 'No of Works',
                data: totalWorks,
                color: '#eeba0b',
              },
              {
                name: 'Contract Value (in Cr)',
                data: totalTVC,
                color: 'rgba(93, 243, 174, 0.85)'  ,
              },
              {
                name: 'Avg Days Since Acceptance',
                data: avgDaysSinceAcceptance,
                color:'rgba(250, 199, 161, 0.85)' ,
              },
              // { name: 'Avg Days Since Acceptance', data: avgDaysSinceAcceptance, color:' rgba(181, 7, 212, 0.85)' },
              // { name: 'Zonal Works', data: zonalWorks,color:'#fae4e4'},
              // {
              //   name: 'Zonal Works',
              //   data: zonalWorks,
              //   color: 'rgba(31, 225, 11, 0.85)',
              // },
              // {
              //   name: 'Tender Works',
              //   data: tenderWorks,
              //   color: 'rgba(2, 202, 227, 0.85)',
              // },
              // {
              //   name: 'Zonal Tender Value',
              //   data: totalZonalTVC,
              //   color: 'rgba(172, 5, 26, 0.85)',
              // },
              // {
              //   name: 'Works Tender Value',
              //   data: totalNormalTVC,
              //   color: 'rgba(250, 199, 161, 0.85)',
              // },
            ];
            this.chartOptions2.xaxis = { categories: name };
            this.cO = this.chartOptions2;
            this.cdr.detectChanges();

            this.spinner.hide();
          },
          (error: any) => {
            console.error('Error fetching data', error);
          }
        );
    }
  }
  GetWOIssueScheme(): void {
    this.spinner.show();
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.chartOptionsLine.chart.height = '400';
      this.himisDistrictid = 0;
    } else if (roleName == 'Collector') {
      this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
      this.divisionid = 0;
      this.chartOptionsLine.chart.height = '400';
    } else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.chartOptionsLine.chart.height = '900';
    }
    const startDate = this.dateRange.value.start;
    const endDate = this.dateRange.value.end;
    this.fromdt = startDate
      ? this.datePipe.transform(startDate, 'dd-MMM-yyyy')
      : '';
    this.todt = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
    var RPType = 'Scheme';
    console.log('fromdt=', this.fromdt, 'todt=', this.todt);
    // this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
    // https://cgmsc.gov.in/HIMIS_APIN/api/WorkOrder/WorkOrderGenerated?RPType=Total&divisionid=0&districtid=0&fromdt=01-01-2024&todt=0
    if (this.fromdt && this.todt) {
      this.api
        .GETWorkOrderGenerated(
          RPType,
          this.divisionid,
          this.himisDistrictid,
          this.fromdt,
          this.todt
        )
        .subscribe(
          (data: any) => {
            this.wOIssuedScheme = data;
            // console.log('API Response Scheme:', this.WoIssuedTotal);
            // console.log('API Response data:', data);
            const id: string[] = [];
            const name: string[] = [];
            const totalWorks: any[] = [];
            const totalTVC: number[] = [];
            const avgDaysSinceAcceptance: number[] = [];
            const zonalWorks: number[] = [];
            const tenderWorks: number[] = [];
            const totalZonalTVC: number[] = [];
            const totalNormalTVC: number[] = [];

            data.forEach(
              (item: {
                name: string;
                id: any;
                totalWorks: any;
                totalTVC: number;
                avgDaysSinceAcceptance: any;
                zonalWorks: any;
                tenderWorks: any;
                totalZonalTVC: any;
                totalNormalTVC: any;
              }) => {
                id.push(item.id);
                name.push(item.name);
                totalWorks.push(item.totalWorks);
                totalTVC.push(item.totalTVC);
                avgDaysSinceAcceptance.push(item.avgDaysSinceAcceptance);
                zonalWorks.push(item.zonalWorks);
                tenderWorks.push(item.tenderWorks);
                totalZonalTVC.push(item.totalZonalTVC);
                totalNormalTVC.push(item.totalNormalTVC);
              }
            );

            this.chartOptionsLine.series = [
              {
                name: 'No of Works',
                data: totalWorks,
                color: '#eeba0b',
              },
              {
                name: 'Contract Value (in Cr)',
                data: totalTVC,
                color: 'rgba(93, 243, 174, 0.85)'  ,
              },
              {
                name: 'Avg Days Since Acceptance',
                data: avgDaysSinceAcceptance,
                color:'rgba(250, 199, 161, 0.85)' ,
              },
              // { name: 'Zonal Works', data: zonalWorks,color:'#fae4e4'},
              // {
              //   name: 'Zonal Works',
              //   data: zonalWorks,
              //   color: 'rgba(31, 225, 11, 0.85)',
              // },
              // {
              //   name: 'Tender Works',
              //   data: tenderWorks,
              //   color: 'rgba(2, 202, 227, 0.85)',
              // },
              // {
              //   name: 'Zonal Tender Value',
              //   data: totalZonalTVC,
              //   color: 'rgba(172, 5, 26, 0.85)',
              // },
              // {
              //   name: 'Works Tender Value',
              //   data: totalNormalTVC,
              //   color: 'rgba(250, 199, 161, 0.85)',
              // },
            ];
            this.chartOptionsLine.xaxis = { categories: name };
            this.cO = this.chartOptionsLine;
            this.cdr.detectChanges();

            this.spinner.hide();
          },
          (error: any) => {
            console.error('Error fetching data', error);
          }
        );
    }
  }
  GetWOIssueGTotal(): void {
    this.spinner.show();
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.chartOptionsLine2.chart.height = '300';
      this.himisDistrictid = 0;
    } else if (roleName == 'Collector') {
      this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
      this.divisionid = 0;
      this.chartOptionsLine2.chart.height = '300';
    } else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.chartOptionsLine2.chart.height = '300';
    }
    const startDate = this.dateRange.value.start;
    const endDate = this.dateRange.value.end;
    this.fromdt = startDate
      ? this.datePipe.transform(startDate, 'dd-MMM-yyyy')
      : '';
    this.todt = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
    var RPType = 'GTotal';
    // console.log('fromdt=',this.fromdt,'todt=',this.todt)
    // this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
    // https://cgmsc.gov.in/HIMIS_APIN/api/WorkOrder/WorkOrderGenerated?RPType=Total&divisionid=0&districtid=0&fromdt=01-01-2024&todt=0
    if (this.fromdt && this.todt) {
      this.api
        .GETWorkOrderGenerated(
          RPType,
          this.divisionid,
          this.himisDistrictid,
          this.fromdt,
          this.todt
        )
        .subscribe(
          (data: any) => {
            this.wOIssuedGTotal = data;
            // console.log('API Response total:', this.WoIssuedTotal);
            // console.log('API Response data:', data);
            const id: string[] = [];
            const name: string[] = [];
            const totalWorks: any[] = [];
            const totalTVC: number[] = [];
            const avgDaysSinceAcceptance: number[] = [];
            const zonalWorks: number[] = [];
            const tenderWorks: number[] = [];
            const totalZonalTVC: number[] = [];
            const totalNormalTVC: number[] = [];

            data.forEach(
              (item: {
                name: string;
                id: any;
                totalWorks: any;
                totalTVC: number;
                avgDaysSinceAcceptance: any;
                zonalWorks: any;
                tenderWorks: any;
                totalZonalTVC: any;
                totalNormalTVC: any;
              }) => {
                id.push(item.id);
                name.push(item.name);
                totalWorks.push(item.totalWorks);
                totalTVC.push(item.totalTVC);
                avgDaysSinceAcceptance.push(item.avgDaysSinceAcceptance);
                zonalWorks.push(item.zonalWorks);
                tenderWorks.push(item.tenderWorks);
                totalZonalTVC.push(item.totalZonalTVC);
                totalNormalTVC.push(item.totalNormalTVC);
              }
            );
            this.chartOptionsLine2.series = [
              {
                name: 'No of Works',
                data: totalWorks,
                color: '#eeba0b',
              },
              {
                name: 'Contract Value (in Cr)',
                data: totalTVC,
                color: 'rgba(93, 243, 174, 0.85)'  ,
              },
              {
                name: 'Avg Days Since Acceptance',
                data: avgDaysSinceAcceptance,
                color:'rgba(250, 199, 161, 0.85)' ,
              },
              // { name: 'Zonal Works', data: zonalWorks,color:'#fae4e4'},
              // {
              //   name: 'Zonal Works',
              //   data: zonalWorks,
              //   color: 'rgba(31, 225, 11, 0.85)',
              // },
              // {
              //   name: 'Tender Works',
              //   data: tenderWorks,
              //   color: 'rgba(2, 202, 227, 0.85)',
              // },
              // {
              //   name: 'Zonal Tender Value',
              //   data: totalZonalTVC,
              //   color: 'rgba(172, 5, 26, 0.85)',
              // },
              // {
              //   name: 'Works Tender Value',
              //   data: totalNormalTVC,
              //   color: 'rgba(250, 199, 161, 0.85)',
              // },
            ];
            this.chartOptionsLine2.xaxis = { categories: name };
            this.cO = this.chartOptionsLine2;
            this.cdr.detectChanges();

            this.spinner.hide();
          },
          (error: any) => {
            console.error('Error fetching data', error);
          }
        );
    }
  }
  // #endregion
  //#region Fetch database in table form
  fetchDataBasedOnChartSelectionTotal(
    divisionID: any,
    seriesName: string
  ): void {
    console.log(`Selected ID: ${divisionID}, Series: ${seriesName}`);
    const distid = 0;
    const mainSchemeId = 0;
    const contractid = 0;
    const work_id = 0;
    // const fromdt="01-jan-2024";
    // const todt="01-jan-2025";
    //     this.fromdt = startDate ? this.datePipe.transform(startDate, 'dd-MMM-yyyy') : '';
    // this.todt  = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
    this.spinner.show();
    // divisionId: any,mainSchemeId:any,distid: any,work_id:any,fromdt: any,todt: any
    this.api
      .GETWorkGenDetails(
        divisionID,
        mainSchemeId,
        distid,
        work_id,
        this.fromdt,
        this.todt
      )
      .subscribe(
        (res) => {
          this.dispatchPending = res.map(
            (item: WorkGenDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          console.log('res:', res);
          this.dataSource.data = this.dispatchPending;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    this.openDialog();
  }
  fetchDataBasedOnChartSelectionDistrict(
    distid: any,
    seriesName: string
  ): void {
    console.log(`Selected ID: ${distid}, Series: ${seriesName}`);
    const divisionID = 0;
    const mainSchemeId = 0;
    const contractid = 0;
    const work_id = 0;
    const fromdt = '01-jan-2024';
    const todt = '01-jan-2025';
    this.spinner.show();
    // divisionId: any,mainSchemeId:any,distid: any,work_id:any,fromdt: any,todt: any
    this.api
      .GETWorkGenDetails(
        divisionID,
        mainSchemeId,
        distid,
        work_id,
        this.fromdt,
        this.todt
      )
      .subscribe(
        (res) => {
          this.dispatchPending = res.map(
            (item: WorkGenDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          console.log('res:', res);
          this.dataSource.data = this.dispatchPending;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    this.openDialog();
  }

  fetchDataBasedOnChartSelectionScheme(
    mainSchemeId: any,
    seriesName: string
  ): void {
    console.log(`Selected ID: ${mainSchemeId}, Series: ${seriesName}`);
    const distid = 0;
    const divisionID = 0;
    const contractid = 0;
    const work_id = 0;
    const fromdt = '01-jan-2024';
    const todt = '01-jan-2025';
    this.spinner.show();
    // divisionId: any,mainSchemeId:any,distid: any,work_id:any,fromdt: any,todt: any
    this.api
      .GETWorkGenDetails(
        divisionID,
        mainSchemeId,
        distid,
        work_id,
        this.fromdt,
        this.todt
      )
      .subscribe(
        (res) => {
          this.dispatchPending = res.map(
            (item: WorkGenDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          console.log('res:', res);
          this.dataSource.data = this.dispatchPending;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    this.openDialog();
  }
  fetchDataBasedOnChartSelection(id: any, seriesName: string): void {
    console.log(`Selected ID: ${id}, Series: ${seriesName}`);
    const distid = 0;
    // const  distid=0;
    const mainSchemeId = 0;
    const contractid = 0;
    const work_id = 0;
    const fromdt = '01-jan-2024';
    const todt = '01-jan-2025';
    this.spinner.show();
    // divisionId: any,mainSchemeId:any,distid: any,work_id:any,fromdt: any,todt: any
    this.api
      .GETWorkGenDetails(
        id,
        mainSchemeId,
        distid,
        work_id,
        this.fromdt,
        this.todt
      )
      .subscribe(
        (res) => {
          this.dispatchPending = res.map(
            (item: WorkGenDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          console.log('res:', res);
          this.dataSource.data = this.dispatchPending;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    this.openDialog();
  }
  // #endregion
  // data filter
  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  exportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      // ['sno','letterNo', 'head','acceptLetterDT','totalAmountOfContract','district','work','contractorNAme','work_id',];
      { title: 'S.No', dataKey: 'sno' },
      { title: 'letterNo', dataKey: 'letterNo' },
      { title: 'head', dataKey: 'head' },
      { title: 'acceptLetterDT', dataKey: 'acceptLetterDT' },
      { title: 'totalAmountOfContract', dataKey: 'totalAmountOfContract' },
      { title: 'district', dataKey: 'district' },
      { title: 'work', dataKey: 'work' },
      { title: 'contractorNAme', dataKey: 'contractorNAme' },
      { title: 'work_id', dataKey: 'work_id' },
    ];
    const rows = this.dispatchPending.map((row) => ({
      sno: row.sno,
      letterNo: row.letterNo,
      head: row.head,
      acceptLetterDT: row.acceptLetterDT,
      totalAmountOfContract: row.totalAmountOfContract,
      district: row.district,
      work: row.work,
      contractorNAme: row.contractorNAme,
      work_id: row.work_id,
    }));

    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save('WorkOrderIssued.pdf');
  }
  // mat-dialog box
  openDialog() {
    const dialogRef = this.dialog.open(this.itemDetailsModal, {
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      panelClass: 'full-screen-dialog', // Optional for additional styling
      data: {
        /* pass any data here */
      },
      // width: '100%',
      // maxWidth: '100%', // Override default maxWidth
      // maxHeight: '100%', // Override default maxHeight
      // panelClass: 'full-screen-dialog' ,// Optional: Custom class for additional styling
      // height: 'auto',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed');
    });
  }
  onButtonClick2(ASID: any, workid: any): void {
    //  this.value='Active';
    // window.open('https://cgmsc.gov.in/himisr/Upload/W3900002AS2.pdf', '_blank');
    // alert(ASID);
    // alert(this.value);
    // return;
    // asLetterName
    // filename
    this.spinner.show();
    this.api.GETASFile(ASID, workid).subscribe(
      (res) => {
        // this.ASFileData=res;
        const filename = res[0]?.filename; // Ensure `res[0]` exists
        const URL = res[0]?.asLetterName;
  
        if (filename) {
          window.open(URL, '_blank');
        } else {
          alert(
            '⚠️ Alert: AS Letter Not Found!\n\nThe requested document is missing.\nPlease try again later or contact support.'
          );
          // alert("⚠️ Alert: AS Letter Not Found!\n\nThe requested document (AS Letter) is not available at this moment.\nPlease check again later or contact support for further assistance.");
        }
        //  const URL =this.ASFileData[0].asLetterName;
        // window.open('https://cgmsc.gov.in/himisr/Upload/W3900002AS2.pdf', '_blank');
  
        // console.log('res:', res);
        console.log('ASFileData:', this.ASFileData);
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        alert(`Error fetching data: ${error.message}`);
      }
    );
  }
}

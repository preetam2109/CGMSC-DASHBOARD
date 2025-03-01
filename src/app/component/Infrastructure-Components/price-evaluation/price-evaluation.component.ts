import { NgFor, CommonModule, DatePipe, NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/api.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { LiveTenderdata, PaidDetails, PaidSummary, TenderDetails, UnPaidDetails, UnPaidSummary ,ASFile} from 'src/app/Model/DashProgressCount';
import { FormBuilder,FormGroup, FormsModule, ReactiveFormsModule,} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
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
  selector: 'app-price-evaluation',
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
    NgFor,
    CommonModule,
    NgFor,
    NgStyle,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    FormsModule,
  ],
  templateUrl: './price-evaluation.component.html',
  styleUrl: './price-evaluation.component.css',
})
export class PriceEvaluationComponent {
  //#region chart
  @ViewChild('chart') chart: ChartComponent | undefined;
  @ViewChild('itemDetailsModal') itemDetailsModal: any;
  @ViewChild('itemDetailsModal1') itemDetailsModal1: any;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions!: ChartOptions; // For bar chart
  chartOptions2!: ChartOptions; // For bar charta
  chartOptionsLine!: ChartOptions; // For line chart
  chartOptionsLine2!: ChartOptions; // For line chart
  chartOptions1!: ChartOptions; // For bar chart
  chartOptionss!: ChartOptions; // For bar charta
  chartOptionsLine1!: ChartOptions; // For line chart
  chartOptionsLinee!: ChartOptions; // For line chart
  //#endregion
  //#region DataBase Table
  dataSource!: MatTableDataSource<PaidDetails>;
  dataSource1!: MatTableDataSource<UnPaidDetails>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;
  @ViewChild('sort1') sort1!: MatSort;
  dispatchData: PaidDetails[] = [];
  dispatchData1: UnPaidDetails[] = [];
ASFileData: ASFile[] = [];
  //#endregion
  PaidSummaryTotal: PaidSummary[] = [];
  PaidSummaryDivision: PaidSummary[] = [];
  PaidSummaryScheme: PaidSummary[] = [];
  PaidSummaryDistrict: PaidSummary[] = [];

  UnPaidSummaryTotal: UnPaidSummary[] = [];
  UnPaidSummaryDivision: UnPaidSummary[] = [];
  UnPaidSummaryScheme: UnPaidSummary[] = [];
  UnPaidSummaryDesignation: UnPaidSummary[] = [];
  selectedTabIndex: number = 0;
  divisionid: any;
  himisDistrictid: any;
  TimeStatus: any;
  mainschemeid: any;
  dateRange!: FormGroup;
  fromdt: any;
  todt: any;
  name:any;
  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    public datePipe: DatePipe,
    private fb: FormBuilder
  ) {
    this.dataSource = new MatTableDataSource<PaidDetails>([]);
    this.dataSource1 = new MatTableDataSource<UnPaidDetails>([]);
  }

  ngOnInit() {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth()-1, 1);
    // const tomorrow = new Date(today);
    // tomorrow.setDate(today.getDate() + 1);
    // alert(firstDayOfMonth);

    this.dateRange = this.fb.group({
      start: [firstDayOfMonth],
      // end: [tomorrow],
      end: [today],
    });

    // const today = new Date();
    // const firstDayOfMonthLastYear = new Date( today.getFullYear() - 1,today.getMonth(),1 );

    // this.dateRange = this.fb.group({
    //   start: [firstDayOfMonthLastYear],
    //   end: [today],
    // });
    this.dateRange.valueChanges.subscribe(() => {
      this.GETPaidSummaryTotal();
      this.GETPaidSummaryDivision();
      this.GETPaidSummaryScheme();
    });
    this.initializeChartOptions();
    this.initializeChartOptions2();

    if (this.selectedTabIndex == 0) {
      this.GETPaidSummaryTotal();
      this.GETPaidSummaryDivision();
      this.GETPaidSummaryScheme();
      // this.GETLiveTenderDistrict();
    }
  }

  initializeChartOptions() {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        stacked: true,
        // height: 'auto',
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
              const apiData = this.PaidSummaryDivision; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry
                this.name = selectedData.name; 
                this.fetchDataBasedOnChartSelectionDivision(id, selectedSeries);
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
        text: 'Division-wise',
        align: 'center',
        style: {
          fontSize: '15px',
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
              const apiData = this.PaidSummaryScheme; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry
                this.name = selectedData.name; 
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
        text: 'Scheme-wise',
        align: 'center',
        style: {
          fontSize: '15px',
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
              const apiData = this.PaidSummaryDistrict; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry
                this.name = selectedData.name; 
                // this.fetchDataBasedOnChartSelectionDistrict(id, selectedSeries);
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
        text: 'Total Live Tender District wise Progress',
        align: 'center',
        style: {
          fontSize: '15px',
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
            if (selectedCategory && selectedSeries) {
              const apiData = this.PaidSummaryTotal; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry
                this.name = selectedData.name; 
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
        text: 'Summary: Payment Completed',
        align: 'center',
        style: {
          fontSize: '15px',
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
  initializeChartOptions2() {
    this.chartOptions1 = {
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
              this.chartOptions1?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
            const selectedSeries =
              this.chartOptions1?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.UnPaidSummaryDivision; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry
                this.name = selectedData.name; 
                this.fetchDataBasedOnChartSelectiondivisionUNP(id, selectedSeries);
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
        text: 'Division-wise Payment Due',
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
    this.chartOptionss = {
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
              this.chartOptionss?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
            const selectedSeries =
              this.chartOptionss?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.UnPaidSummaryScheme; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry
                this.name = selectedData.name; 
                this.fetchDataBasedOnChartSelectionmainSchemeUNP(id, selectedSeries);
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
        text: 'Scheme-wise Payment Due',
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
    this.chartOptionsLine1 = {
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
            // ;
            const selectedCategory =
              this.chartOptionsLine1?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
            const selectedSeries =
              this.chartOptionsLine1?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.UnPaidSummaryDesignation; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry
                this.name = selectedData.name; 
                this.fetchDataBasedOnChartSelectionmainDesignationUNP(id, selectedSeries);
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
        text: 'Designation-wise Payment Due',
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
    this.chartOptionsLinee = {
      series: [],
      chart: {
        type: 'bar',
        stacked: false,
        // height: 'auto',
        // height:400,
        // height: 200,
        // width:500,
        events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            const selectedCategory =
              this.chartOptionsLinee?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
            const selectedSeries =
              this.chartOptionsLinee?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.UnPaidSummaryTotal; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry
                this.name = selectedData.name; // Extract the id from the matching entry

                this.fetchDataBasedOnChartSelectionTotalUNP(0, selectedSeries);
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
        // text: 'Total Payment Pending',
        text: 'Payment Due Summary',
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
  selectedTabValue(event: any): void {
    this.selectedTabIndex = event.index;
    if (this.selectedTabIndex == 0) {
      // this.GETLiveTenderTotal();
      // this.GETLiveTenderDivision();
      // this.GETLiveTenderScheme();
      // this.GETLiveTenderDistrict();
    } else {
      
      this.GETUnPaidSummaryTotal();
      this.GETUnPaidSummaryDivision();
      this.GETUnPaidSummaryScheme();
      this.GETUnPaidSummaryDesignation();
    }
  }
  
  //#region Get API data in PaidSummary
  GETPaidSummaryTotal(): void {
    this.spinner.show();
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      var RPType = 'GTotal';
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
      this.chartOptionsLine2.chart.height = '200px';
    }
    // else if (roleName == 'Collector') {
    //  this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
    // var RPType="District";
    //  this.divisionid = 0;
    //  this.mainschemeid=0;
    //  this.chartOptionsLine2.chart.height = '400px';
    // }
    else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
      var RPType = 'GTotal';

      this.chartOptionsLine2.chart.height = '300';
    }
    const startDate = this.dateRange.value.start;
    const endDate = this.dateRange.value.end;
    this.fromdt = startDate
      ? this.datePipe.transform(startDate, 'dd-MMM-yyyy')
      : '';
    this.todt = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
    // console.log('this.fromdt=', this.fromdt, 'this.todt=', this.todt);
    // ?RPType=Division&divisionid=0&districtid=0&mainschemeid=0&fromdt=01-Dec-2023&todt=31-Dec-2023
    // RPType=Total&divisionid=0&districtid=0&mainschemeid=0&TimeStatus=0
    this.api
      .GETPaidSummary(
        RPType,
        this.divisionid,
        this.himisDistrictid,
        this.mainschemeid,
        this.fromdt,
        this.todt
      )
      .subscribe(
        (data: any) => {
          this.PaidSummaryTotal = data;
          // console.log('API Response total:', this.PaidSummaryTotal);
          //  console.log('API Response data:', data);

          // const id: string[] = [];
          // const name: string[] = [];
          // const avgDaysSinceMeasurement: any[] = [];
          // const grossPaidcr: number[] = [];

          // data.forEach(
          //   (item: {
          //     name: string;
          //     id: any;
          //     avgDaysSinceMeasurement: any;
          //     grossPaidcr: any;
          //   }) => {
          //     id.push(item.id);
          //     name.push(item.name);
          //     avgDaysSinceMeasurement.push(item.avgDaysSinceMeasurement);
          //     grossPaidcr.push(item.grossPaidcr);
          //   }
          // );
          const id: string[] = [];
          const name: string[] = [];
          const noofWorks: number[] = [];
          const avgDaysSinceMeasurement: any[] = [];
          const grossPaidcr: number[] = [];

          data.forEach(
            (item: {
              name: string;
              id: any;
              avgDaysSinceMeasurement: any;
              grossPaidcr: any;noofWorks:number
            }) => {
              id.push(item.id);
              name.push(item.name);
              avgDaysSinceMeasurement.push(item.avgDaysSinceMeasurement);
              grossPaidcr.push(item.grossPaidcr);
              noofWorks.push(item.noofWorks);
            }
          );
          this.chartOptionsLine2.series = [
            {
              name: 'No. of Works',
              data: noofWorks,
              color: '#eeba0b',
            },
            // {
            //   name: 'No. of Works',
            //   data: avgDaysSinceMeasurement,
            //   color: '#eeba0b',
            // },
            {
              name: 'Paid Value(in Cr)',
              data: grossPaidcr,
              color: 'rgb(0, 143, 251)',
            },
            //  {
            //    name: 'Total Value in Cr',
            //    data: totalValuecr,
            //    color: 'rgba(93, 243, 174, 0.85)',
            //  },
            //  { name: 'Avg Days Since', data: avgDaysSince, color:' rgba(181, 7, 212, 0.85)' },
            //  { name: 'Avg Days Since', data: avgDaysSince,color:'rgba(250, 199, 161, 0.85)'},
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
  GETPaidSummaryDivision(): void {
    this.spinner.show();
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      var RPType = 'Division';
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
      this.chartOptions.chart.height = '200px';
    }
    // else if (roleName == 'Collector') {
    //  this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
    // var RPType="District";
    //  this.divisionid = 0;
    //  this.mainschemeid=0;
    //  this.chartOptions.chart.height = '400px';
    // }
    else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
      var RPType = 'Division';
      this.chartOptions.chart.height = '300';
    }
    const startDate = this.dateRange.value.start;
    const endDate = this.dateRange.value.end;
    this.fromdt = startDate
      ? this.datePipe.transform(startDate, 'dd-MMM-yyyy')
      : '';
    this.todt = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
    // console.log('this.fromdt=', this.fromdt, 'this.todt=', this.todt);

    // RPType=Total&divisionid=0&districtid=0&mainschemeid=0&TimeStatus=0
    this.api
      .GETPaidSummary(
        RPType,
        this.divisionid,
        this.himisDistrictid,
        this.mainschemeid,
        this.fromdt,
        this.todt
      )
      .subscribe(
        (data: any) => {
          this.PaidSummaryDivision = data;
          // console.log('API Response total:', this.PaidSummaryDivision);
          // console.log('API Response data:', data);

          const id: string[] = [];
          const name: string[] = [];
          const noofWorks: number[] = [];
          const avgDaysSinceMeasurement: any[] = [];
          const grossPaidcr: number[] = [];

          data.forEach(
            (item: {
              name: string;
              id: any;
              avgDaysSinceMeasurement: any;
              grossPaidcr: any;noofWorks:number
            }) => {
              id.push(item.id);
              name.push(item.name);
              avgDaysSinceMeasurement.push(item.avgDaysSinceMeasurement);
              grossPaidcr.push(item.grossPaidcr);
              noofWorks.push(item.noofWorks);
            }
          );

          this.chartOptions.series = [
            {
              name: 'No. of Works',
              data: noofWorks,
              color: '#eeba0b',
            },
            // {
            //   name: 'No. of Works',
            //   data: avgDaysSinceMeasurement,
            //   color: '#eeba0b',
            // },
            {
              name: 'Paid Value(in Cr)',
              data: grossPaidcr,
              color: 'rgb(0, 143, 251)',
            },
            // {
            //   name: 'Total Numbers of Works',
            //   data: avgDaysSinceMeasurement,
            //   color: '#eeba0b',
            // },
            // {
            //   name: 'Total Numbers of Tender',
            //   data: grossPaidcr,
            //   color: 'rgb(0, 143, 251)',
            // },
            //  { name: 'Avg Days Since', data: avgDaysSince,color:'rgba(250, 199, 161, 0.85)'},

            //  { name: 'Avg Days Since', data: avgDaysSince, color:' rgba(181, 7, 212, 0.85)' },
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
  GETPaidSummaryScheme(): void {
    this.spinner.show();
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      var RPType = 'Scheme';
      this.chartOptions2.chart.height = '400';
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
    }
    //  else if (roleName == 'Collector') {
    //  this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
    // var RPType="District";
    //  this.divisionid = 0;
    //  this.mainschemeid=0;
    //  this.chartOptions2.chart.height = '400px';
    // }
    else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.mainschemeid = 0;

      this.chartOptions2.chart.height = '500';
      var RPType = 'Scheme';
    }
    const startDate = this.dateRange.value.start;
    const endDate = this.dateRange.value.end;
    this.fromdt = startDate
      ? this.datePipe.transform(startDate, 'dd-MMM-yyyy')
      : '';
    this.todt = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
    // console.log('this.fromdt=', this.fromdt, 'this.todt=', this.todt);
    // alert( this.TimeStatus)
    // RPType=Total&divisionid=0&districtid=0&mainschemeid=0&TimeStatus=0
    this.api
      .GETPaidSummary(
        RPType,
        this.divisionid,
        this.himisDistrictid,
        this.mainschemeid,
        this.fromdt,
        this.todt
      )
      .subscribe(
        (data: any) => {
          this.PaidSummaryScheme = data;
          // console.log('API Response PaidSummaryScheme:', this.PaidSummaryScheme);
          // console.log('API Response data:', data);

          // const id: string[] = [];
          // const name: string[] = [];
          // const avgDaysSinceMeasurement: any[] = [];
          // const grossPaidcr: number[] = [];

          // data.forEach(
          //   (item: {
          //     name: string;
          //     id: any;
          //     avgDaysSinceMeasurement: any;
          //     grossPaidcr: any;
          //   }) => {
          //     id.push(item.id);
          //     name.push(item.name);
          //     avgDaysSinceMeasurement.push(item.avgDaysSinceMeasurement);
          //     grossPaidcr.push(item.grossPaidcr);
          //   }
          // );
          const id: string[] = [];
          const name: string[] = [];
          const noofWorks: number[] = [];
          const avgDaysSinceMeasurement: any[] = [];
          const grossPaidcr: number[] = [];

          data.forEach(
            (item: {
              name: string;
              id: any;
              avgDaysSinceMeasurement: any;
              grossPaidcr: any;noofWorks:number
            }) => {
              id.push(item.id);
              name.push(item.name);
              avgDaysSinceMeasurement.push(item.avgDaysSinceMeasurement);
              grossPaidcr.push(item.grossPaidcr);
              noofWorks.push(item.noofWorks);
            }
          );
          this.chartOptions2.series = [
            {
              name: 'No. of Works',
              data: noofWorks,
              color: '#eeba0b',
            },
            // {
            //   name: 'No. of Works',
            //   data: avgDaysSinceMeasurement,
            //   color: '#eeba0b',
            // },
            {
              name: 'Paid Value(in Cr)',
              data: grossPaidcr,
              color: 'rgb(0, 143, 251)',
            },
            // {
            //   name: 'Total Numbers of Works',
            //   data: avgDaysSinceMeasurement,
            //   color: '#eeba0b',
            // },
            // {
            //   name: 'Total Numbers of Tender',
            //   data: grossPaidcr,
            //   color: 'rgb(0, 143, 251)',
            // },

            //  { name: 'Avg Days Since', data: avgDaysSince, color:' rgba(181, 7, 212, 0.85)' },
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
  GETTenderEvaluationDistrict(): void {
    this.spinner.show();
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      var RPType = 'Division';
      this.chartOptionsLine.chart.height = '200px';
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
    }
    //  else if (roleName == 'Collector') {
    //   this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
    //   var RPType = 'District';
    //   this.divisionid = 0;
    //   this.mainschemeid = 0;
    //   this.chartOptionsLine.chart.height = '400px';
    // }
     else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
      this.chartOptionsLine.chart.height = 'auto';
    }
    this.TimeStatus = this.selectedTabIndex == 0 ? 'Live' : 'Timeover';
    // alert( this.TimeStatus)
    var RPType = 'District';
    // RPType=Total&divisionid=0&districtid=0&mainschemeid=0&TimeStatus=0
    this.api
      .GETTenderEvaluation(
        RPType,
        this.divisionid,
        this.himisDistrictid,
        this.mainschemeid
      )
      .subscribe(
        (data: any) => {
          this.PaidSummaryDistrict = data;
          // console.log('API Response total:', this.PaidSummaryDistrict);
          // console.log('API Response data:', data);

          const id: string[] = [];
          const name: string[] = [];
          const nosWorks: any[] = [];
          const nosTender: number[] = [];
          const totalValuecr: number[] = [];
          const avgDaysSince: number[] = [];

          data.forEach(
            (item: {
              name: string;
              id: any;
              nosWorks: any;
              nosTender: number;
              totalValuecr: any;
              avgDaysSince: any;
            }) => {
              id.push(item.id);
              name.push(item.name);
              nosWorks.push(item.nosWorks);
              nosTender.push(item.nosTender);
              totalValuecr.push(item.totalValuecr);
              avgDaysSince.push(item.avgDaysSince);
            }
          );

          this.chartOptionsLine.series = [
            // {
            //   name: 'No. of Works',
            //   data: avgDaysSinceMeasurement,
            //   color: '#eeba0b',
            // },
            // {
            //   name: 'Paid Value(in Cr)',
            //   data: grossPaidcr,
            //   color: 'rgb(0, 143, 251)',
            // },

            {
              name: 'Total Numbers of Works',
              data: nosWorks,
              color: '#eeba0b',
            },
            {
              name: 'Total Numbers of Tender',
              data: nosTender,
              color: 'rgb(0, 143, 251)',
            },
            {
              name: 'Total Value in Cr',
              data: totalValuecr,
              color: 'rgba(93, 243, 174, 0.85)',
            },
            {
              name: 'Avg Days Since',
              data: avgDaysSince,
              color: 'rgba(250, 199, 161, 0.85)',
            },

            //  { name: 'Avg Days Since', data: avgDaysSince, color:' rgba(181, 7, 212, 0.85)' },
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
  // #endregion
  //#region dataTable  in PaidSummary
 fetchDataBasedOnChartSelectionTotal(
    divisionID: any,
    seriesName: string
  ): void {
    // console.log(`Selected ID: ${divisionID}, Series: ${seriesName}`);
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
    }
     else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
    }
    this.spinner.show();
    // t/PaidDetails?divisionId=0&mainSchemeId=0&distid=0&fromdt=0&todt=0
    this.api
      .GETPaidDetails(
        this.divisionid,
       this. mainschemeid,
       this.himisDistrictid,
        this.fromdt,
        this.todt
      )
      .subscribe(
        (res) => {
          this.dispatchData = res.map(
            (item: PaidDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // console.log('PaidDetails total:', res);
          // console.log('PaidDetails2=:',  this.dispatchData);
          this.dataSource.data = this.dispatchData;
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
  fetchDataBasedOnChartSelectionDivision(
    divisionID: any,
    seriesName: string
  ): void {
    // console.log(`Selected ID: ${divisionID}, Series: ${seriesName}`);
    const distid = 0;
    const mainSchemeId = 0;
    const contractid = 0;
    // const fromdt="01-jan-2024";
    // const todt="01-jan-2025";
    //     this.fromdt = startDate ? this.datePipe.transform(startDate, 'dd-MMM-yyyy') : '';
    // this.todt  = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
    this.spinner.show();
    // t/PaidDetails?divisionId=0&mainSchemeId=0&distid=0&fromdt=0&todt=0
    this.api
      .GETPaidDetails(
        divisionID,
        mainSchemeId,
        distid,
        this.fromdt,
        this.todt
      )
      .subscribe(
        (res) => {
          this.dispatchData = res.map(
            (item: PaidDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // console.log('PaidDetails:', res);
          // console.log('PaidDetails2=:',  this.dispatchData);
          this.dataSource.data = this.dispatchData;
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
    // ;
    // console.log(`Selected ID: ${mainSchemeId}, Series: ${seriesName}`);
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.himisDistrictid = 0;
      // this.mainschemeid = 0;
    }
     else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      // this.mainschemeid = 0;
    }
    // const fromdt="01-jan-2024";
    // const todt="01-jan-2025";
    //     this.fromdt = startDate ? this.datePipe.transform(startDate, 'dd-MMM-yyyy') : '';
    // this.todt  = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
    this.spinner.show();
    // t/PaidDetails?divisionId=0&mainSchemeId=0&distid=0&fromdt=0&todt=0
    this.api
      .GETPaidDetails(this.divisionid,mainSchemeId,this.himisDistrictid,this.fromdt,this.todt)
      .subscribe(
        (res) => {
          this.dispatchData = res.map(
            (item: PaidDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // console.log('PaidDetails:', res);
          // console.log('PaidDetails2=:',  this.dispatchData);
          this.dataSource.data = this.dispatchData;
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

  // UnPaidSummary
  //#region Get API data in UnPaidSummary
  GETUnPaidSummaryTotal(): void {
    this.spinner.show();
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      var RPType = 'GTotal';

      this.himisDistrictid = 0;
      this.mainschemeid = 0;
      this.chartOptionsLinee.chart.height = '200px';
    }
    // else if (roleName == 'Collector') {
    //  this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
    // var RPType="District";
    //  this.divisionid = 0;
    //  this.mainschemeid=0;
    //  this.chartOptionsLine2.chart.height = '400px';
    // }
    else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
      var RPType = 'GTotal';

      this.chartOptionsLinee.chart.height = '300';
    }
   
    this.api.GETUnPaidSummary(
        RPType,
        this.divisionid,
        this.himisDistrictid,
        this.mainschemeid,
      )
      .subscribe(
        (data: any) => {
          this.UnPaidSummaryTotal = data;
          // console.log('API Response total:', this.UnPaidSummaryTotal);
          //  console.log('API Response data:', data);

          const id: string[] = [];
          const name: string[] = [];
          const noofWorks: any[] = [];
          const unpaidcr: number[] = [];
          const avgDaySinceM: number[] = [];

          data.forEach(
            (item: {
              name: string;
              id: any;
              noofWorks: any;
              unpaidcr: number;
              avgDaySinceM: any;
            }) => {
              id.push(item.id);
              name.push(item.name);
              noofWorks.push(item.noofWorks);
              unpaidcr.push(item.unpaidcr);
              avgDaySinceM.push(item.avgDaySinceM);
            }
          );

          this.chartOptionsLinee.series = [
            {
              name: 'No of Works',
              data: noofWorks,
              color: '#eeba0b',
            },
            {
              name: 'Un-paid Value(in Cr),',
              data: unpaidcr,
              color:'rgb(0, 227, 150)',
              // color: 'rgb(0, 143, 251)',
            },
            // {
            //   name: 'Total Value in Cr',
            //   data: avgDaySinceM,
            //   color: 'rgba(93, 243, 174, 0.85)',
            // },
            {
              name: 'Avg Days Pending Since Measurement',
              data: avgDaySinceM,
              color: 'rgba(250, 199, 161, 0.85)',
            },
            //  {
            //    name: 'Total Value in Cr',
            //    data: totalValuecr,
            //    color: 'rgba(93, 243, 174, 0.85)',
            //  },
            //  { name: 'Avg Days Since', data: avgDaysSince, color:' rgba(181, 7, 212, 0.85)' },
            //  { name: 'Avg Days Since', data: avgDaysSince,color:'rgba(250, 199, 161, 0.85)'},
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
          this.chartOptionsLinee.xaxis = { categories: name };
          this.cO = this.chartOptionsLinee;
          this.cdr.detectChanges();

          this.spinner.hide();
        },
        (error: any) => {
          console.error('Error fetching data', error);
        }
      );
  }
  GETUnPaidSummaryDivision(): void {
    this.spinner.show();
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      var RPType = 'Division';
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
      this.chartOptions1.chart.height = '200px';
    }
    // else if (roleName == 'Collector') {
    //  this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
    // var RPType="District";
    //  this.divisionid = 0;
    //  this.mainschemeid=0;
    //  this.chartOptions.chart.height = '400px';
    // }
    else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
      var RPType = 'Division';
      this.chartOptions1.chart.height = '300';
    }
   
    this.api
      .GETUnPaidSummary(
        RPType,
        this.divisionid,
        this.himisDistrictid,
        this.mainschemeid,
      )
      .subscribe(
        (data: any) => {
          this.UnPaidSummaryDivision = data;
          // console.log('API Response total:', this.PaidSummaryDivision);
          // console.log('API Response data:', data);

          const id: string[] = [];
          const name: string[] = [];
          const noofWorks: any[] = [];
          const unpaidcr: number[] = [];
          const avgDaySinceM: number[] = [];

          data.forEach(
            (item: {
              name: string;
              id: any;
              noofWorks: any;
              unpaidcr: number;
              avgDaySinceM: any;
            }) => {
              id.push(item.id);
              name.push(item.name);
              noofWorks.push(item.noofWorks);
              unpaidcr.push(item.unpaidcr);
              avgDaySinceM.push(item.avgDaySinceM);
            }
          );

          this.chartOptions1.series = [
            {
              name: 'No of Works',
              data: noofWorks,
              color: '#eeba0b',
            },
            {
              name: 'Un-paid Value(in Cr),',
              data: unpaidcr,
              color:'rgb(0, 227, 150)',
              // color: 'rgb(0, 143, 251)',
            },
            // {
            //   name: 'Total Value in Cr',
            //   data: avgDaySinceM,
            //   color: 'rgba(93, 243, 174, 0.85)',
            // },
            {
              name: 'Avg Days Pending Since Measurement',
              data: avgDaySinceM,
              color: 'rgba(250, 199, 161, 0.85)',
            },
            // {
            //   name: 'Total Value in Cr',
            //   data: avgDaySinceM,
            //   color: 'rgba(93, 243, 174, 0.85)',
            // },
            
            //  { name: 'Avg Days Since', data: avgDaysSince,color:'rgba(250, 199, 161, 0.85)'},

            //  { name: 'Avg Days Since', data: avgDaysSince, color:' rgba(181, 7, 212, 0.85)' },
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
          this.chartOptions1.xaxis = { categories: name };
          this.cO = this.chartOptions1;
          this.cdr.detectChanges();

          this.spinner.hide();
        },
        (error: any) => {
          console.error('Error fetching data', error);
        }
      );
  }
  GETUnPaidSummaryScheme(): void {
    this.spinner.show();
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      var RPType = 'Scheme';
      this.chartOptionss.chart.height = '600';
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
    }
    //  else if (roleName == 'Collector') {
    //  this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
    // var RPType="District";
    //  this.divisionid = 0;
    //  this.mainschemeid=0;
    //  this.chartOptions2.chart.height = '400px';
    // }
    else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
      var RPType = 'Scheme';
      this.chartOptionss.chart.height = '600';
    }
    this.api
      .GETUnPaidSummary(
        RPType,
        this.divisionid,
        this.himisDistrictid,
        this.mainschemeid,
      )
      .subscribe(
        (data: any) => {
          this.UnPaidSummaryScheme = data;
          // console.log('API Response total:', this.WoIssuedTotal);
          // console.log('API Response data:', data);

          const id: string[] = [];
          const name: string[] = [];
          const noofWorks: any[] = [];
          const unpaidcr: number[] = [];
          const avgDaySinceM: number[] = [];

          data.forEach(
            (item: {
              name: string;
              id: any;
              noofWorks: any;
              unpaidcr: number;
              avgDaySinceM: any;
            }) => {
              id.push(item.id);
              name.push(item.name);
              noofWorks.push(item.noofWorks);
              unpaidcr.push(item.unpaidcr);
              avgDaySinceM.push(item.avgDaySinceM);
            }
          );

          this.chartOptionss.series = [
            {
              name: 'No of Works',
              data: noofWorks,
              color: '#eeba0b',
            },
            {
              name: 'Un-paid Value(in Cr),',
              data: unpaidcr,
              color:'rgb(0, 227, 150)',
              // color: 'rgb(0, 143, 251)',
            },
            // {
            //   name: 'Total Value in Cr',
            //   data: avgDaySinceM,
            //   color: 'rgba(93, 243, 174, 0.85)',
            // },
            {
              name: 'Avg Days Pending Since Measurement',
              data: avgDaySinceM,
              color: 'rgba(250, 199, 161, 0.85)',
            },
            // {
            //   name: 'Total Value in Cr',
            //   data: avgDaySinceM,
            //   color: 'rgba(93, 243, 174, 0.85)',
            // },
         

            //  { name: 'Avg Days Since', data: avgDaysSince, color:' rgba(181, 7, 212, 0.85)' },
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
          this.chartOptionss.xaxis = { categories: name };
          this.cO = this.chartOptionss;
          this.cdr.detectChanges();

          this.spinner.hide();
        },
        (error: any) => {
          console.error('Error fetching data', error);
        }
      );
  }
  GETUnPaidSummaryDesignation(): void {
    this.spinner.show();
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      var RPType = 'Designation';
      this.chartOptionsLine1.chart.height = '200px';
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
    }
    //  else if (roleName == 'Collector') {
    //   this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
    //   var RPType = 'District';
    //   this.divisionid = 0;
    //   this.mainschemeid = 0;
    //   this.chartOptionsLine.chart.height = '400px';
    // }
     else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
      var RPType = 'Designation';
      this.chartOptionsLine1.chart.height = 'auto';
    }
  
    // UnPaidSummary?RPType=GTotal&divisionid=0&districtid=0&mainschemeid=0
    this.api
      .GETUnPaidSummary(
        RPType,
        this.divisionid,
        this.himisDistrictid,
        this.mainschemeid
      )
      .subscribe(
        (data: any) => {
          this.UnPaidSummaryDesignation = data;
          // console.log('UnPaidSummaryDesignation:', this.UnPaidSummaryDesignation);
          // console.log('API Response data:', data);

          const id: string[] = [];
          const name: string[] = [];
          const noofWorks: any[] = [];
          const unpaidcr: number[] = [];
          const avgDaySinceM: number[] = [];

          data.forEach(
            (item: {
              name: string;
              id: any;
              noofWorks: any;
              unpaidcr: number;
              avgDaySinceM: any;
            }) => {
              id.push(item.id);
              name.push(item.name);
              noofWorks.push(item.noofWorks);
              unpaidcr.push(item.unpaidcr);
              avgDaySinceM.push(item.avgDaySinceM);
            }
          );

          this.chartOptionsLine1.series = [
            {
              name: 'No of Works',
              data: noofWorks,
              color: '#eeba0b',
            },
            {
              name: 'Un-paid Value(in Cr),',
              data: unpaidcr,
              color:'rgb(0, 227, 150)',
              // color: 'rgb(0, 143, 251)',
            },
            // {
            //   name: 'Total Value in Cr',
            //   data: avgDaySinceM,
            //   color: 'rgba(93, 243, 174, 0.85)',
            // },
            {
              name: 'Avg Days Pending Since Measurement',
              data: avgDaySinceM,
              color: 'rgba(250, 199, 161, 0.85)',
            },
            // {
            //   name: 'Total Value in Cr',
            //   data: avgDaySinceM,
            //   color: 'rgba(93, 243, 174, 0.85)',
            // },

            //  { name: 'Avg Days Since', data: avgDaysSince, color:' rgba(181, 7, 212, 0.85)' },
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
          this.chartOptionsLine1.xaxis = { categories: name };
          this.cO = this.chartOptionsLine1;
          this.cdr.detectChanges();

          this.spinner.hide();
        },
        (error: any) => {
          console.error('Error fetching data', error);
        }
      );
  }
  // #endregion
   //#region dataTable  in UNPaidSummary
   fetchDataBasedOnChartSelectionTotalUNP(divisionID: any,seriesName: string): void {
    // ;
    // console.log(`Selected ID: ${divisionID}, Series: ${seriesName}`);
    // var roleName = localStorage.getItem('roleName');
    // if (roleName == 'Division') {
    //   this.divisionid = sessionStorage.getItem('divisionID');
    //   this.himisDistrictid = 0;
    //   this.mainschemeid = 0;
    // }
    //  else {
    //   this.divisionid = 0;
    //   this.himisDistrictid = 0;
    //   this.mainschemeid = 0;
    // }
    this.himisDistrictid = 0;
      this.mainschemeid = 0;
    const designame=0;
    const OfficerID=0;
    this.spinner.show();
    // Payment/UnPaidDetails?divisionId=D1004&mainSchemeId=0&distid=0
    this.api.GETUnPaidDetails(divisionID ,this.mainschemeid,this.himisDistrictid,designame,OfficerID).subscribe(
        (res) => {
          this.dispatchData1 = res.map(
            (item: UnPaidDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // console.log('PaidDetailsTotal:', res);
          // console.log('PaidDetails2=:',  this.dispatchData);
          this.dataSource1.data = this.dispatchData1;
          this.dataSource1.paginator = this.paginatorPageSize;
          this.dataSource1.sort = this.sort1;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    this.openDialog1();
  }
   fetchDataBasedOnChartSelectiondivisionUNP(divisionID: any,seriesName: string): void {
    // console.log(`Selected ID: ${divisionID}, Series: ${seriesName}`);
    const distid = 0;
    const mainSchemeId = 0;
    const contractid = 0;
    const designame=0;
    const OfficerID=0;
    // const fromdt="01-jan-2024";
    // const todt="01-jan-2025";
    //     this.fromdt = startDate ? this.datePipe.transform(startDate, 'dd-MMM-yyyy') : '';
    // this.todt  = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
    this.spinner.show();
    // Payment/UnPaidDetails?divisionId=D1004&mainSchemeId=0&distid=0
    this.api.GETUnPaidDetails(divisionID,mainSchemeId,distid,designame,OfficerID).subscribe(
        (res) => {
          this.dispatchData1 = res.map(
            (item: UnPaidDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // console.log('UNDetails:', res);
          // console.log('PaidDetails2=:',  this.dispatchData);
          this.dataSource1.data = this.dispatchData1;
          this.dataSource1.paginator = this.paginatorPageSize;
          this.dataSource1.sort = this.sort1;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    this.openDialog1();
  }
   fetchDataBasedOnChartSelectionmainSchemeUNP(mainSchemeId: any,seriesName: string): void {
    // console.log(`Selected ID: ${mainSchemeId}, Series: ${seriesName}`);
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.himisDistrictid = 0;
      // this.mainschemeid = 0;
    }
     else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      // this.mainschemeid = 0;
    }
    const designame=0;
    const OfficerID=0;
    this.spinner.show();
    // Payment/UnPaidDetails?divisionId=D1004&mainSchemeId=0&distid=0
    // console.log('this.divisionid=',this.divisionid,'mainSchemeId=',mainSchemeId,'this.himisDistrictid=',this.himisDistrictid)
    this.api.GETUnPaidDetails(this.divisionid,mainSchemeId,this.himisDistrictid,designame,OfficerID).subscribe(
        (res) => {
          this.dispatchData1 = res.map(
            (item: UnPaidDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // console.log('UNDetails:', res);
          // console.log('PaidDetails2=:',  this.dispatchData);
          this.dataSource1.data = this.dispatchData1;
          this.dataSource1.paginator = this.paginatorPageSize;
          this.dataSource1.sort = this.sort1;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    this.openDialog1();
  }
   fetchDataBasedOnChartSelectionmainDesignationUNP(designame: any,seriesName: string): void {
    // console.log(`Selected ID: ${designame}, Series: ${seriesName}`);
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
    }
     else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
    }
  
    const OfficerID=0;
    this.spinner.show();
    // Payment/UnPaidDetails?divisionId=D1004&mainSchemeId=0&distid=0
    this.api.GETUnPaidDetails(this.divisionid, this.mainschemeid,this.himisDistrictid,designame,OfficerID).subscribe(
        (res) => {
          this.dispatchData1 = res.map(
            (item: UnPaidDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // console.log('UNDetails:', res);
          // console.log('PaidDetails2=:',  this.dispatchData);
          this.dataSource1.data = this.dispatchData1;
          this.dataSource1.paginator = this.paginatorPageSize;
          this.dataSource1.sort = this.sort1;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    this.openDialog1();
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
UNapplyTextFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource1.filter = filterValue.trim().toLowerCase();
  if (this.dataSource1.paginator) {
    this.dataSource1.paginator.firstPage();
  }
}
exportToPDF() {
  const doc = new jsPDF('l', 'mm', 'a4');
  const columns = [
    // 'sno', 'head','district','division','workname','wrokOrderDT','billno','agrbillstatus',
    // 'totalamountofcontract','grosspaid','totalpaidtillinlac','chequeDT','mesurementDT','worK_ID'
    { title: 'S.No', dataKey: 'sno' },
    // { title: 'letterno', dataKey: 'letterno' },
    { title: 'Head', dataKey: 'head' },
    { title: 'Division', dataKey: 'division' },
    { title: 'District', dataKey: 'district' },
    { title: 'Work', dataKey: 'workname' },
    { title: 'Work Order DT', dataKey: 'wrokOrderDT' },
    { title: 'Bill No.', dataKey: 'billno' },
    { title: 'AGR Bill Status', dataKey: 'agrbillstatus' },
    { title: 'Contract Value (In lacs)', dataKey: 'totalamountofcontract' },
    { title: 'Gross Paid Value (In lacs)', dataKey: 'grosspaid' },
    { title: 'Total Paid Till(In lacs)', dataKey: 'totalpaidtillinlac' },
    { title: 'Cheque DT.', dataKey: 'chequeDT' },
    { title: 'Measurement DT', dataKey: 'mesurementDT' },
    { title: 'WorK ID', dataKey: 'worK_ID' },
  ];
  const rows = this.dispatchData.map((row) => ({
    sno: row.sno,
    head: row.head,
    district: row.district,
    division: row.division,
    workname: row.workname,
    wrokOrderDT: row.wrokOrderDT,
    billno: row.billno,
    agrbillstatus: row.agrbillstatus,
    totalamountofcontract: row.totalamountofcontract,
    grosspaid: row.grosspaid,
    totalpaidtillinlac: row.totalpaidtillinlac,
    chequeDT: row.chequeDT,
    mesurementDT: row.mesurementDT,
    worK_ID: row.worK_ID,
  }));

  autoTable(doc, {
    columns: columns,
    body: rows,
    startY: 20,
    theme: 'striped',
    headStyles: { fillColor: [22, 160, 133] },
  });

  doc.save('PaymentDetail.pdf');
}
UNexportToPDF() {
  const doc = new jsPDF('l', 'mm', 'a4');
  const columns = [
    { title: 'S.No', dataKey: 'sno' },
    // { title: 'letterno', dataKey: 'letterno' },
    { title: 'Head', dataKey: 'head' },
    { title: 'Division', dataKey: 'division' },
    { title: 'District', dataKey: 'district' },
    { title: 'Work', dataKey: 'workname' },
    { title: 'Wrok Order DT', dataKey: 'wrokOrderDT' },
    { title: 'Bill No.', dataKey: 'billno' },
    { title: 'Bill Type', dataKey: 'agrbillstatus' },
    { title: 'Contract Value (In lacs)', dataKey: 'totalamountofcontract' },
    { title: 'Gross Amount Due(In lacs)', dataKey: 'grossAmtNew' },
    { title: 'Total Paid Till(In lacs)', dataKey: 'totalpaidtillinlac' },
    // { title: 'ChequeDT', dataKey: 'chequeDT' },
    { title: 'Measurement DT', dataKey: 'mesurementDT' },
    { title: 'WorK ID', dataKey: 'worK_ID' },
  ];
  const rows = this.dispatchData1.map((row) => ({
    sno: row.sno,
    // letterno: row.letterno,
    head: row.head,
    division: row.division,
    district: row.district,
    workname: row.workname,
    wrokOrderDT: row.wrokOrderDT,
    billno: row.billno,
    // billdate:row.billdate,
    agrbillstatus: row.agrbillstatus,
    totalamountofcontract: row.totalamountofcontract,
    grossAmtNew: row.grossAmtNew,
    totalpaidtillinlac: row.totalpaidtillinlac,
    // chequeDT: row.chequeDT,
    mesurementDT: row.mesurementDT,
    // dayssincemeasurement: row.dayssincemeasurement,
    // workStatus: row.workStatus,
    worK_ID: row.worK_ID,
    // designation: row.designation,
    // engName: row.engName,
  }));

  autoTable(doc, {
    columns: columns,
    body: rows,
    startY: 20,
    theme: 'striped',
    headStyles: { fillColor: [22, 160, 133] },
  });

  doc.save('UnPaidDetails.pdf');
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
openDialog1() {

  const dialogRef = this.dialog.open(this.itemDetailsModal1, {
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


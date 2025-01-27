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
import { LiveTenderdata, PaidSummary, TenderDetails, UnPaidSummary } from 'src/app/Model/DashProgressCount';
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
  public cO: Partial<ChartOptions> | undefined;
  chartOptions!: ChartOptions; // For bar chart
  chartOptions2!: ChartOptions; // For bar charta
  chartOptionsLine!: ChartOptions; // For line chart
  chartOptionsLine2!: ChartOptions; // For line chart
  //#endregion
  //#region DataBase Table
  dataSource!: MatTableDataSource<TenderDetails>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dispatchData: TenderDetails[] = [];

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
  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    public datePipe: DatePipe,
    private fb: FormBuilder
  ) {
    this.dataSource = new MatTableDataSource<TenderDetails>([]);
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
              const apiData = this.PaidSummaryDivision; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry

                // this.fetchDataBasedOnChartSelectionDivision(id, selectedSeries);
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
        text: 'Total Live Tender  Division wise Progress',
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
            debugger;
            if (selectedCategory && selectedSeries) {
              const apiData = this.PaidSummaryScheme; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry

                // this.fetchDataBasedOnChartSelectionScheme(id, selectedSeries);
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
        text: 'Total Live Tender Scheme wise Progress',
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
              const apiData = this.PaidSummaryDistrict; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry

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
        // width:500,
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

                // this.fetchDataBasedOnChartSelectionTotal(0, selectedSeries);
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
        text: 'Total Live Tender ',
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
  initializeChartOptions2() {
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
              const apiData = this.UnPaidSummaryDivision; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry

                // this.fetchDataBasedOnChartSelectionDivision(id, selectedSeries);
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
        text: 'Total Live Tender  Division wise Progress',
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
            if (selectedCategory && selectedSeries) {
              const apiData = this.UnPaidSummaryScheme; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry

                // this.fetchDataBasedOnChartSelectionScheme(id, selectedSeries);
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
        text: 'Total Live Tender Scheme wise Progress',
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
              const apiData = this.UnPaidSummaryDesignation; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry

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
        // width:500,
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
              const apiData = this.UnPaidSummaryTotal; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry

                // this.fetchDataBasedOnChartSelectionTotal(0, selectedSeries);
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
        text: 'Total Live Tender ',
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
  // ,GTotal,Division,Scheme
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
    console.log('this.fromdt=', this.fromdt, 'this.todt=', this.todt);
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
          console.log('API Response total:', this.PaidSummaryTotal);
          //  console.log('API Response data:', data);

          const id: string[] = [];
          const name: string[] = [];
          const avgDaysSinceMeasurement: any[] = [];
          const grossPaidcr: number[] = [];

          data.forEach(
            (item: {
              name: string;
              id: any;
              avgDaysSinceMeasurement: any;
              grossPaidcr: any;
            }) => {
              id.push(item.id);
              name.push(item.name);
              avgDaysSinceMeasurement.push(item.avgDaysSinceMeasurement);
              grossPaidcr.push(item.grossPaidcr);
            }
          );

          this.chartOptionsLine2.series = [
            {
              name: 'Total Numbers of Works',
              data: avgDaysSinceMeasurement,
              color: '#eeba0b',
            },
            {
              name: 'Total Numbers of Tender',
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
    console.log('this.fromdt=', this.fromdt, 'this.todt=', this.todt);

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
          console.log('API Response total:', this.PaidSummaryDivision);
          // console.log('API Response data:', data);

          const id: string[] = [];
          const name: string[] = [];
          const avgDaysSinceMeasurement: any[] = [];
          const grossPaidcr: number[] = [];

          data.forEach(
            (item: {
              name: string;
              id: any;
              avgDaysSinceMeasurement: any;
              grossPaidcr: any;
            }) => {
              id.push(item.id);
              name.push(item.name);
              avgDaysSinceMeasurement.push(item.avgDaysSinceMeasurement);
              grossPaidcr.push(item.grossPaidcr);
            }
          );

          this.chartOptions.series = [
            {
              name: 'Total Numbers of Works',
              data: avgDaysSinceMeasurement,
              color: '#eeba0b',
            },
            {
              name: 'Total Numbers of Tender',
              data: grossPaidcr,
              color: 'rgb(0, 143, 251)',
            },
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
      this.chartOptions2.chart.height = '200px';
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
    console.log('this.fromdt=', this.fromdt, 'this.todt=', this.todt);
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
          // console.log('API Response total:', this.WoIssuedTotal);
          // console.log('API Response data:', data);

          const id: string[] = [];
          const name: string[] = [];
          const avgDaysSinceMeasurement: any[] = [];
          const grossPaidcr: number[] = [];

          data.forEach(
            (item: {
              name: string;
              id: any;
              avgDaysSinceMeasurement: any;
              grossPaidcr: any;
            }) => {
              id.push(item.id);
              name.push(item.name);
              avgDaysSinceMeasurement.push(item.avgDaysSinceMeasurement);
              grossPaidcr.push(item.grossPaidcr);
            }
          );

          this.chartOptions2.series = [
            {
              name: 'Total Numbers of Works',
              data: avgDaysSinceMeasurement,
              color: '#eeba0b',
            },
            {
              name: 'Total Numbers of Tender',
              data: grossPaidcr,
              color: 'rgb(0, 143, 251)',
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
    } else if (roleName == 'Collector') {
      this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
      var RPType = 'District';
      this.divisionid = 0;
      this.mainschemeid = 0;
      this.chartOptionsLine.chart.height = '400px';
    } else {
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
          // console.log('API Response total:', this.WoIssuedTotal);
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
   
    this.api
      .GETUnPaidSummary(
        RPType,
        this.divisionid,
        this.himisDistrictid,
        this.mainschemeid,
      )
      .subscribe(
        (data: any) => {
          this.UnPaidSummaryTotal = data;
          console.log('API Response total:', this.UnPaidSummaryTotal);
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

          this.chartOptionsLine2.series = [
            {
              name: 'Numbers of Works',
              data: noofWorks,
              color: '#eeba0b',
            },
            {
              name: 'Un Paid (in Cr)',
              data: unpaidcr,
              color: 'rgb(0, 143, 251)',
            },
            // {
            //   name: 'Total Value in Cr',
            //   data: avgDaySinceM,
            //   color: 'rgba(93, 243, 174, 0.85)',
            // },
            {
              name: 'Avg Days Since M',
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
  GETUnPaidSummaryDivision(): void {
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

          this.chartOptions.series = [
            {
              name: 'Numbers of Works',
              data: noofWorks,
              color: '#eeba0b',
            },
            {
              name: 'Un Paid (in Cr)',
              data: unpaidcr,
              color: 'rgb(0, 143, 251)',
            },
            // {
            //   name: 'Total Value in Cr',
            //   data: avgDaySinceM,
            //   color: 'rgba(93, 243, 174, 0.85)',
            // },
            {
              name: 'Avg Days Since M',
              data: avgDaySinceM,
              color: 'rgba(250, 199, 161, 0.85)',
            },
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
  GETUnPaidSummaryScheme(): void {
    this.spinner.show();
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      var RPType = 'Scheme';
      this.chartOptions2.chart.height = '200px';
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
      this.chartOptions2.chart.height = '500';
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

          this.chartOptions2.series = [
            {
              name: 'Numbers of Works',
              data: noofWorks,
              color: '#eeba0b',
            },
            {
              name: 'Un Paid (in Cr)',
              data: unpaidcr,
              color: 'rgb(0, 143, 251)',
            },
            // {
            //   name: 'Total Value in Cr',
            //   data: avgDaySinceM,
            //   color: 'rgba(93, 243, 174, 0.85)',
            // },
            {
              name: 'Avg Days Since M',
              data: avgDaySinceM,
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
  GETUnPaidSummaryDesignation(): void {
    this.spinner.show();
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      var RPType = 'Designation';
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
      var RPType = 'Designation';
      this.chartOptionsLine.chart.height = 'auto';
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

          this.chartOptionsLine.series = [
            {
              name: 'Numbers of Works',
              data: noofWorks,
              color: '#eeba0b',
            },
            {
              name: 'Un Paid (in Cr)',
              data: unpaidcr,
              color: 'rgb(0, 143, 251)',
            },
            // {
            //   name: 'Total Value in Cr',
            //   data: avgDaySinceM,
            //   color: 'rgba(93, 243, 174, 0.85)',
            // },
            {
              name: 'Avg Days Since M',
              data: avgDaySinceM,
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
  // GETUnPaidSummary  GTotal,Division,Designation,Scheme
}

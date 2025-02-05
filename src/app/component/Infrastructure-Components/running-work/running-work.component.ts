import { NgFor, CommonModule, NgStyle, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgApexchartsModule, ChartComponent, ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis } from 'ng-apexcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { RunningWork, RunningWorkDelay } from 'src/app/Model/DashProgressCount';
import { ApiService } from 'src/app/service/api.service';
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
  selector: 'app-running-work',
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
  ],
  templateUrl: './running-work.component.html',
  styleUrl: './running-work.component.css'
})
export class RunningWorkComponent {
   //#region chart
   @ViewChild('chart') chart: ChartComponent | undefined;
   @ViewChild('itemDetailsModal') itemDetailsModal: any;
   @ViewChild('itemDetailsModal1') itemDetailsModal1: any;
   public cO: Partial<ChartOptions> | undefined;
   chartOptions!: ChartOptions; // For bar chart
   chartOptions1!: ChartOptions; // For line chart
   chartOptions2!: ChartOptions; // For bar charta
   chartOptions3!: ChartOptions; // For line chart
   chartOptions4!: ChartOptions; // For line chart
  
   chartOptions_I!: ChartOptions; // For bar chart
   chartOptions_II!: ChartOptions; // For bar charta
   chartOptions_III!: ChartOptions; // For line chart
   chartOptions_IV!: ChartOptions; // For line chart
   chartOptions_V!: ChartOptions; // For line chart
   //#endregion
  //  GTotal,Division,Scheme,District,Contractor
  // Running Works 
   RunningWorkDataGTotal:RunningWork[]=[];
   RunningWorkDataDivision:RunningWork[]=[];
   RunningWorkDataScheme:RunningWork[]=[];
   RunningWorkDataDistrict:RunningWork[]=[];
   RunningWorkDataContractor:RunningWork[]=[];
// Running Works Delay
   RunningWorkDelayDataGTotal:RunningWorkDelay[]=[];
   RunningWorkDelayDataDivision:RunningWorkDelay[]=[];
   RunningWorkDelayDataScheme:RunningWorkDelay[]=[];
   RunningWorkDelayDataDistrict:RunningWorkDelay[]=[];
   RunningWorkDelayDataContractor:RunningWorkDelay[]=[];



  selectedTabIndex: number=0;
 divisionid: any;
 himisDistrictid: any;
 TimeStatus:any;
 mainschemeid:any;
 name:any;
 constructor(
  public api: ApiService,
  public spinner: NgxSpinnerService,
  private cdr: ChangeDetectorRef,
  private dialog: MatDialog,
  public datePipe: DatePipe
 ) {
  // this.dataSource = new MatTableDataSource<TenderEvaluationDetails>([]);
  // this.dataSource1 = new MatTableDataSource<PriceEvaluationDetails>([]);
 }
 
 ngOnInit() {
  this.initializeChartOptions();
  this.initializeChartOptions2();
  
 if(this.selectedTabIndex == 0){
    //  this.name="Technical Evaluation Details"
   this.GETRunningWorkTotal();
    this.GETRunningWorksDivision();
    this.GETRunningWorkScheme();
    this.GETRunningWorkDistrict();
    this.GETRunningWorkContractor();
 
 }
 }
 initializeChartOptions() {
 this.chartOptions = {
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
          const selectedCategory = this.chartOptions?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
          const selectedSeries =this.chartOptions?.series?.[seriesIndex]?.name;
          // Ensure the selectedCategory and selectedSeries are valid
          if (selectedCategory && selectedSeries) {
            const apiData = this.RunningWorkDataGTotal; // Replace with the actual data source or API response
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
      text: 'Running Works Summary',
      align: 'center',
      style: {
        fontSize: '14px',
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
          const selectedCategory = this.chartOptions1?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
          const selectedSeries = this.chartOptions1?.series?.[seriesIndex]?.name;
          // Ensure the selectedCategory and selectedSeries are valid
          if (selectedCategory && selectedSeries) {
            const apiData = this.RunningWorkDataDivision; // Replace with the actual data source or API response
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
      text: 'Division-wise Running Works',
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
      // height:400,
      // height: 200,
      // width:600,
      events: {
        dataPointSelection: (
          event,
          chartContext,
          { dataPointIndex, seriesIndex }
        ) => {
          const selectedCategory = this.chartOptions2?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
          const selectedSeries =  this.chartOptions2?.series?.[seriesIndex]?.name;
          if (selectedCategory && selectedSeries) {
            const apiData = this.RunningWorkDataScheme; // Replace with the actual data source or API response
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
      text: 'Scheme-wise Running Works',
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
  this.chartOptions3 = {
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
          const selectedCategory = this.chartOptions3?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
          const selectedSeries =  this.chartOptions3?.series?.[seriesIndex]?.name;
          if (selectedCategory && selectedSeries) {
            const apiData = this.RunningWorkDataDistrict; // Replace with the actual data source or API response
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
      text: 'District-wise Running Works',
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
  this.chartOptions4 = {
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
          const selectedCategory = this.chartOptions4?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
          const selectedSeries =  this.chartOptions4?.series?.[seriesIndex]?.name;
          if (selectedCategory && selectedSeries) {
            const apiData = this.RunningWorkDataContractor; // Replace with the actual data source or API response
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
      text: 'Contractor-wise Running Works',
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
  this.chartOptions_I = {
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
            this.chartOptions_I?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
          const selectedSeries =
            this.chartOptions_I?.series?.[seriesIndex]?.name;
          if (selectedCategory && selectedSeries) {
            const apiData = this.RunningWorkDelayDataGTotal;
            const selectedData = apiData.find(
              (data) => data.name === selectedCategory
            );
            if (selectedData) {
              const id = selectedData.id; // Extract the id from the matching entry
              this.name = selectedData.name; // Extract the id from the matching entry

              // this.fetchDataBasedOnChartSelectionTotalUNP(0, selectedSeries);
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
      text: 'Running Work Summary Delay ',
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
  this.chartOptions_II = {
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
            this.chartOptions_II?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
          const selectedSeries =
            this.chartOptions_II?.series?.[seriesIndex]?.name;
          if (selectedCategory && selectedSeries) {
            const apiData = this.RunningWorkDelayDataDivision; 
            const selectedData = apiData.find(
              (data) => data.name === selectedCategory
            );
            // console.log("selectedData chart1",selectedData)
            if (selectedData) {
              const id = selectedData.id; // Extract the id from the matching entry

              // this.fetchDataBasedOnChartSelectiondivisionUNP(id, selectedSeries);
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
      text: 'Division-wise Running Work Delay',
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
  this.chartOptions_III = {
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
            this.chartOptions_III?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
          const selectedSeries =
            this.chartOptions_III?.series?.[seriesIndex]?.name;
          if (selectedCategory && selectedSeries) {
            const apiData = this.RunningWorkDelayDataScheme;
            const selectedData = apiData.find(
              (data) => data.name === selectedCategory
            );
            if (selectedData) {
              const id = selectedData.id; // Extract the id from the matching entry

              // this.fetchDataBasedOnChartSelectionmainSchemeUNP(id, selectedSeries);
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
      text: 'Scheme-wise Running Work Delay',
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
  this.chartOptions_IV = {
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
            this.chartOptions_IV?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
          const selectedSeries =
            this.chartOptions_IV?.series?.[seriesIndex]?.name;
          if (selectedCategory && selectedSeries) {
            const apiData = this.RunningWorkDelayDataDistrict;
            const selectedData = apiData.find(
              (data) => data.name === selectedCategory
            );
            if (selectedData) {
              const id = selectedData.id; // Extract the id from the matching entry

              // this.fetchDataBasedOnChartSelectionmainDesignationUNP(id, selectedSeries);
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
      text: 'District-wise Running Work Delay',
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
  this.chartOptions_V = {
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
            this.chartOptions_V?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
          const selectedSeries =
            this.chartOptions_V?.series?.[seriesIndex]?.name;
          if (selectedCategory && selectedSeries) {
            const apiData = this.RunningWorkDelayDataContractor;
            const selectedData = apiData.find(
              (data) => data.name === selectedCategory
            );
            if (selectedData) {
              const id = selectedData.id; // Extract the id from the matching entry

              // this.fetchDataBasedOnChartSelectionmainDesignationUNP(id, selectedSeries);
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
      text: 'Contractor-wise Running Work Delay',
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
    if(this.selectedTabIndex == 0){
    //  this.name="Technical Evaluation Details"
   
     this.GETRunningWorkTotal();
    this.GETRunningWorksDivision();
    this.GETRunningWorkScheme();
    this.GETRunningWorkDistrict();
    this.GETRunningWorkContractor();
    }else{
    //  this.name="Price Evaluation Details"
   
     this.GETRunningWorkDelayTotal();
      this.GETRunningWorksDelayDivision();
      this.GETRunningWorkDelayScheme();
      this.GETRunningWorkDelayDistrict();
      this.GETRunningWorkDelayContractor();
    
    }
   }

//#region Get API data Running Works
GETRunningWorkTotal(): void {
  this.spinner.show();
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
   this.divisionid = sessionStorage.getItem('divisionID');
  // var RPType ='Division';
   this.chartOptions.chart.height = '200px';
   this.himisDistrictid = 0;
   this.mainschemeid=0;
  } else if (roleName == 'Collector') {
   this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
  // var RPType="District";
   this.divisionid = 0;
   this.mainschemeid=0;
   this.chartOptions.chart.height = '400px';
  } else {
   this.divisionid = 0;
   this.himisDistrictid = 0;
   this.mainschemeid=0;
   this.chartOptions.chart.height = '300';
  }
  var RPType = 'GTotal';
const contractid=0;
  // ?RPType=GTotal&divisionid=0&districtid=0&mainSchemeId=0&contractid=0
   this.api.GETRunningWorkSummary( RPType, this.divisionid,this.himisDistrictid,this.mainschemeid,contractid)
     .subscribe(
       (data: any) => {
         this.RunningWorkDataGTotal = data;
         console.log('API Response total:', this.RunningWorkDataGTotal);
         const id: string[] = [];
         const name: string[] = [];
         const totalWorks: any[] = [];
         const tvcValuecr: number[] = [];
         const paidTillcr: number[] = [];
         const grossPendingcr: number[] = [];
  
         data.forEach(
           (item: {
             name: string;
             id: any;
             totalWorks: any;
             tvcValuecr: number;
             paidTillcr: any;grossPendingcr:any
           }) => {
             id.push(item.id);
             name.push(item.name);
             totalWorks.push(item.totalWorks);
             tvcValuecr.push(item.tvcValuecr);
             paidTillcr.push(item.paidTillcr);
             grossPendingcr.push(item.grossPendingcr);
           }
         );
  
         this.chartOptions.series = [
          {
            name: 'No. of Works',
            data: totalWorks,
            color: '#eeba0b',
          },
          {
            name: 'Value(in Cr)',
            data: tvcValuecr,
           color: '#6a6afd',
          },
          {
            name: 'Paid-Till(in Cr)',
            data: paidTillcr,
            color: 'rgba(93, 243, 174, 0.85)',
          },
          { name: 'Gross Due(in Cr)', data: grossPendingcr,color:'rgba(250, 199, 161, 0.85)'},
          
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
  GETRunningWorksDivision(): void {
  this.spinner.show();
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
   this.divisionid = sessionStorage.getItem('divisionID');
  // var RPType ='Division';
   this.chartOptions1.chart.height = '200px';
   this.himisDistrictid = 0;
   this.mainschemeid=0;
  } else if (roleName == 'Collector') {
   this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
  // var RPType="District";
   this.divisionid = 0;
   this.mainschemeid=0;
   this.chartOptions1.chart.height = '400px';
  } else {
   this.divisionid = 0;
   this.himisDistrictid = 0;
   this.mainschemeid=0;
   this.chartOptions1.chart.height = '300';
  }
  var RPType = 'Division';
  const contractid=0;

   this.api.GETRunningWorkSummary(RPType,this.divisionid,this.himisDistrictid,this.mainschemeid,contractid)
     .subscribe(
       (data: any) => {
         this.RunningWorkDataDivision = data;
         console.log('API Response total:', this.RunningWorkDataDivision);
         const id: string[] = [];
         const name: string[] = [];
         const totalWorks: any[] = [];
         const tvcValuecr: number[] = [];
         const paidTillcr: number[] = [];
         const grossPendingcr: number[] = [];
  
         data.forEach(
           (item: {
             name: string;
             id: any;
             totalWorks: any;
             tvcValuecr: number;
             paidTillcr: any;grossPendingcr:any
           }) => {
             id.push(item.id);
             name.push(item.name);
             totalWorks.push(item.totalWorks);
             tvcValuecr.push(item.tvcValuecr);
             paidTillcr.push(item.paidTillcr);
             grossPendingcr.push(item.grossPendingcr);
           }
         );
  
         this.chartOptions1.series = [
          {
            name: 'No. of Works',
            data: totalWorks,
            color: '#eeba0b',
          },
          {
            name: 'Value(in Cr)',
            data: tvcValuecr,
           color: '#6a6afd',
          },
          {
            name: 'Paid-Till(in Cr)',
            data: paidTillcr,
            color: 'rgba(93, 243, 174, 0.85)',
          },
          { name: 'Gross Due(in Cr)', data: grossPendingcr,color:'rgba(250, 199, 161, 0.85)'},
          
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
  GETRunningWorkScheme(): void {
  this.spinner.show();
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
   this.divisionid = sessionStorage.getItem('divisionID');
   this.chartOptions2.chart.height = '200px';
   this.himisDistrictid = 0;
   this.mainschemeid=0;
  } else if (roleName == 'Collector') {
   this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
   this.divisionid = 0;
   this.mainschemeid=0;
   this.chartOptions2.chart.height = '400px';
  } else {
   this.divisionid = 0;
   this.himisDistrictid = 0;
   this.mainschemeid=0;
   this.chartOptions2.chart.height = '600';
  }
  var RPType = 'Scheme';
  const contractid=0;
  this.api.GETRunningWorkSummary(RPType,this.divisionid,this.himisDistrictid,this.mainschemeid,contractid)
     .subscribe(
       (data: any) => {
         this.RunningWorkDataScheme = data;
         console.log('API Response total:', this.RunningWorkDataScheme);
         const id: string[] = [];
         const name: string[] = [];
         const totalWorks: any[] = [];
         const tvcValuecr: number[] = [];
         const paidTillcr: number[] = [];
         const grossPendingcr: number[] = [];
  
         data.forEach(
           (item: {
             name: string;
             id: any;
             totalWorks: any;
             tvcValuecr: number;
             paidTillcr: any;grossPendingcr:any
           }) => {
             id.push(item.id);
             name.push(item.name);
             totalWorks.push(item.totalWorks);
             tvcValuecr.push(item.tvcValuecr);
             paidTillcr.push(item.paidTillcr);
             grossPendingcr.push(item.grossPendingcr);
           }
         );
  
         this.chartOptions2.series = [
          {
            name: 'No. of Works',
            data: totalWorks,
            color: '#eeba0b',
          },
          {
            name: 'Value(in Cr)',
            data: tvcValuecr,
           color: '#6a6afd',
          },
          {
            name: 'Paid-Till(in Cr)',
            data: paidTillcr,
            color: 'rgba(93, 243, 174, 0.85)',
          },
          { name: 'Gross Due(in Cr)', data: grossPendingcr,color:'rgba(250, 199, 161, 0.85)'},
          
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
  GETRunningWorkDistrict(): void {
  this.spinner.show();
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
   this.divisionid = sessionStorage.getItem('divisionID');
  // var RPType ='Division';
   this.chartOptions3.chart.height = '200px';
   this.himisDistrictid = 0;
   this.mainschemeid=0;
  } else if (roleName == 'Collector') {
   this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
  // var RPType="District";
   this.divisionid = 0;
   this.mainschemeid=0;
   this.chartOptions3.chart.height = '400px';
  } else {
   this.divisionid = 0;
   this.himisDistrictid = 0;
   this.mainschemeid=0;
   this.chartOptions3.chart.height = '900';
  }
  var RPType = 'District';
  const contractid=0;
  this.api.GETRunningWorkSummary(RPType,this.divisionid,this.himisDistrictid,this.mainschemeid,contractid)
  .subscribe(
    (data: any) => {
      this.RunningWorkDataDistrict = data;
      console.log('API Response total:', this.RunningWorkDataDistrict);
      const id: string[] = [];
      const name: string[] = [];
      const totalWorks: any[] = [];
      const tvcValuecr: number[] = [];
      const paidTillcr: number[] = [];
      const grossPendingcr: number[] = [];

      data.forEach(
        (item: {
          name: string;
          id: any;
          totalWorks: any;
          tvcValuecr: number;
          paidTillcr: any;grossPendingcr:any
        }) => {
          id.push(item.id);
          name.push(item.name);
          totalWorks.push(item.totalWorks);
          tvcValuecr.push(item.tvcValuecr);
          paidTillcr.push(item.paidTillcr);
          grossPendingcr.push(item.grossPendingcr);
        }
      );

      this.chartOptions3.series = [
       {
         name: 'No. of Works',
         data: totalWorks,
         color: '#eeba0b',
       },
       {
         name: 'Value(in Cr)',
         data: tvcValuecr,
        color: '#6a6afd',
       },
       {
         name: 'Paid-Till(in Cr)',
         data: paidTillcr,
         color: 'rgba(93, 243, 174, 0.85)',
       },
       { name: 'Gross Due(in Cr)', data: grossPendingcr,color:'rgba(250, 199, 161, 0.85)'},
       
        // { name: 'Works Tender Value', data: totalNormalTVC,color:'rgba(208, 156, 205, 0.85)'  },
      ];
      this.chartOptions3.xaxis = { categories: name };
      this.cO = this.chartOptions3;
      this.cdr.detectChanges();

      this.spinner.hide();
    },
    (error: any) => {
      console.error('Error fetching data', error);
    }
  );
  }
  GETRunningWorkContractor(): void {
  this.spinner.show();
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
   this.divisionid = sessionStorage.getItem('divisionID');
  // var RPType ='Division';
   this.chartOptions4.chart.height = '200px';
   this.himisDistrictid = 0;
   this.mainschemeid=0;
  } else if (roleName == 'Collector') {
   this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
  // var RPType="District";
   this.divisionid = 0;
   this.mainschemeid=0;
   this.chartOptions4.chart.height = '400px';
  } else {
   this.divisionid = 0;
   this.himisDistrictid = 0;
   this.mainschemeid=0;
   this.chartOptions4.chart.height = '900';
  }
  var RPType = 'Contractor';
  const contractid=0;
  this.api.GETRunningWorkSummary(RPType,this.divisionid,this.himisDistrictid,this.mainschemeid,contractid)
  .subscribe(
    (data: any) => {
      this.RunningWorkDataContractor = data;
      console.log('API Response total:', this.RunningWorkDataContractor);
      const id: string[] = [];
      const name: string[] = [];
      const totalWorks: any[] = [];
      const tvcValuecr: number[] = [];
      const paidTillcr: number[] = [];
      const grossPendingcr: number[] = [];

      data.forEach(
        (item: {
          name: string;
          id: any;
          totalWorks: any;
          tvcValuecr: number;
          paidTillcr: any;grossPendingcr:any
        }) => {
          id.push(item.id);
          name.push(item.name);
          totalWorks.push(item.totalWorks);
          tvcValuecr.push(item.tvcValuecr);
          paidTillcr.push(item.paidTillcr);
          grossPendingcr.push(item.grossPendingcr);
        }
      );

      this.chartOptions4.series = [
       {
         name: 'No. of Works',
         data: totalWorks,
         color: '#eeba0b',
       },
       {
         name: 'Value(in Cr)',
         data: tvcValuecr,
        color: '#6a6afd',
       },
       {
         name: 'Paid-Till(in Cr)',
         data: paidTillcr,
         color: 'rgba(93, 243, 174, 0.85)',
       },
       { name: 'Gross Due(in Cr)', data: grossPendingcr,color:'rgba(250, 199, 161, 0.85)'},
       
        // { name: 'Works Tender Value', data: totalNormalTVC,color:'rgba(208, 156, 205, 0.85)'  },
      ];
      this.chartOptions4.xaxis = { categories: name };
      this.cO = this.chartOptions4;
      this.cdr.detectChanges();

      this.spinner.hide();
    },
    (error: any) => {
      console.error('Error fetching data', error);
    }
  );
  }
  // #endregion
//#region Get API data Running Works Delay
  //  GTotal,Division,Scheme,District,Contractor
// GETRunningWorkSummaryDelay(RPType:any,divisionId:any,districtid:any,mainschemeid:any,contractid:any) {
//   return this.http.get<RunningWorkDelay[]>(`${this.apiUrl}/RunningWork/RunningWorkSummaryDelay?RPType=${RPType}&divisionid=${divisionId}&districtid=${districtid}&mainSchemeId=${mainschemeid}&contractid=${contractid}`);
// //https://cgmsc.gov.in/HIMIS_APIN/api/RunningWork/RunningWorkSummaryDelay?RPType=GTotal&divisionid=0&districtid=0&mainSchemeId=0&contractid=0
// }

GETRunningWorkDelayTotal(): void {
  this.spinner.show();
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
   this.divisionid = sessionStorage.getItem('divisionID');
  // var RPType ='Division';
   this.chartOptions_I.chart.height = '200px';
   this.himisDistrictid = 0;
   this.mainschemeid=0;
  } else if (roleName == 'Collector') {
   this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
  // var RPType="District";
   this.divisionid = 0;
   this.mainschemeid=0;
   this.chartOptions_I.chart.height = '400px';
  } else {
   this.divisionid = 0;
   this.himisDistrictid = 0;
   this.mainschemeid=0;
   this.chartOptions_I.chart.height = '300';
  }
  var RPType = 'GTotal';
const contractid=0;
  // ?RPType=GTotal&divisionid=0&districtid=0&mainSchemeId=0&contractid=0
   this.api.GETRunningWorkSummaryDelay( RPType, this.divisionid,this.himisDistrictid,this.mainschemeid,contractid)
     .subscribe(
       (data: any) => {
         this.RunningWorkDelayDataGTotal = data;
         console.log('API Response total:', this.RunningWorkDelayDataGTotal);
       
        
         const id: string[] = [];
         const name: string[] = [];
         const totalWorks: any[] = [];
         const tvcValuecr: number[] = [];
         const paidTillcr: number[] = [];
         const grossPendingcr: number[] = [];
         const morethanSixMonth: number[] = [];
         const d_91_180Days: number[] = [];
         const d_1_90Days: number[] = [];
         const timeValid: number[] = [];
  
         data.forEach(
           (item: {
             name: string;
             id: any;
             totalWorks: any;
             tvcValuecr: number;
         paidTillcr: any;grossPendingcr:any;morethanSixMonth:any;d_91_180Days:any;d_1_90Days:any;timeValid:any
           }) => {
             id.push(item.id);
             name.push(item.name);
             totalWorks.push(item.totalWorks);
             tvcValuecr.push(item.tvcValuecr);
             paidTillcr.push(item.paidTillcr);
             grossPendingcr.push(item.grossPendingcr);
             morethanSixMonth.push(item.morethanSixMonth);
             d_91_180Days.push(item.d_91_180Days);
             d_1_90Days.push(item.d_1_90Days);
             timeValid.push(item.timeValid);
           }
         );
  
         this.chartOptions_I.series = [
          {
            name: 'No. of Works',
            data: totalWorks,
            color: '#eeba0b',
          },
          {
            name: 'Value(in Cr)',
            data: tvcValuecr,
           color: '#6a6afd',
          },
          {
            name: 'Paid-Till(in Cr)',
            data: paidTillcr,
            color: 'rgba(93, 243, 174, 0.85)',
          },
          { name: 'Gross Due(in Cr)', data: grossPendingcr,color:'rgba(250, 199, 161, 0.85)'},
          
           { name: 'More than Six Month', data: morethanSixMonth,color:'rgba(208, 156, 205, 0.85)'  },
           { name: 'Day in 91 to 180 Days', data: d_91_180Days,color:'rgba(245, 155, 207, 0.85)'  },
           { name: 'Day in 1 to 90 Days', data: d_1_90Days,color:'rgba(205, 243, 144, 0.85)'  },
           { name: 'Valid Time', data: timeValid,color:'rgba(130, 234, 238, 0.85)'  },
         ];
         this.chartOptions_I.xaxis = { categories: name };
         this.cO = this.chartOptions_I;
         this.cdr.detectChanges();
  
         this.spinner.hide();
       },
       (error: any) => {
         console.error('Error fetching data', error);
       }
     );
  }
  GETRunningWorksDelayDivision(): void {
  this.spinner.show();
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
   this.divisionid = sessionStorage.getItem('divisionID');
  // var RPType ='Division';
   this.chartOptions_II.chart.height = '200px';
   this.himisDistrictid = 0;
   this.mainschemeid=0;
  } else if (roleName == 'Collector') {
   this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
  // var RPType="District";
   this.divisionid = 0;
   this.mainschemeid=0;
   this.chartOptions_II.chart.height = '400px';
  } else {
   this.divisionid = 0;
   this.himisDistrictid = 0;
   this.mainschemeid=0;
   this.chartOptions_II.chart.height = '300';
  }
  var RPType = 'Division';
  const contractid=0;

   this.api.GETRunningWorkSummaryDelay(RPType,this.divisionid,this.himisDistrictid,this.mainschemeid,contractid)
     .subscribe(
       (data: any) => {
         this.RunningWorkDelayDataDivision = data;
         console.log('API Response total:', this.RunningWorkDelayDataDivision);
        
         const id: string[] = [];
         const name: string[] = [];
         const totalWorks: any[] = [];
         const tvcValuecr: number[] = [];
         const paidTillcr: number[] = [];
         const grossPendingcr: number[] = [];
         const morethanSixMonth: number[] = [];
         const d_91_180Days: number[] = [];
         const d_1_90Days: number[] = [];
         const timeValid: number[] = [];
  
         data.forEach(
           (item: {
             name: string;
             id: any;
             totalWorks: any;
             tvcValuecr: number;
         paidTillcr: any;grossPendingcr:any;morethanSixMonth:any;d_91_180Days:any;d_1_90Days:any;timeValid:any
           }) => {
             id.push(item.id);
             name.push(item.name);
             totalWorks.push(item.totalWorks);
             tvcValuecr.push(item.tvcValuecr);
             paidTillcr.push(item.paidTillcr);
             grossPendingcr.push(item.grossPendingcr);
             morethanSixMonth.push(item.morethanSixMonth);
             d_91_180Days.push(item.d_91_180Days);
             d_1_90Days.push(item.d_1_90Days);
             timeValid.push(item.timeValid);
           }
         );
  
         this.chartOptions_II.series = [
          {
            name: 'No. of Works',
            data: totalWorks,
            color: '#eeba0b',
          },
          {
            name: 'Value(in Cr)',
            data: tvcValuecr,
           color: '#6a6afd',
          },
          {
            name: 'Paid-Till(in Cr)',
            data: paidTillcr,
            color: 'rgba(93, 243, 174, 0.85)',
          },
          { name: 'Gross Due(in Cr)', data: grossPendingcr,color:'rgba(250, 199, 161, 0.85)'},
          
           { name: 'More than Six Month', data: morethanSixMonth,color:'rgba(208, 156, 205, 0.85)'  },
           { name: 'Day in 91 to 180 Days', data: d_91_180Days,color:'rgba(245, 155, 207, 0.85)'  },
           { name: 'Day in 1 to 90 Days', data: d_1_90Days,color:'rgba(205, 243, 144, 0.85)'  },
           { name: 'Valid Time', data: timeValid,color:'rgba(130, 234, 238, 0.85)'  },
         ];
         this.chartOptions_II.xaxis = { categories: name };
         this.cO = this.chartOptions_II;
         this.cdr.detectChanges();
  
         this.spinner.hide();
       },
       (error: any) => {
         console.error('Error fetching data', error);
       }
     );
  }
  GETRunningWorkDelayScheme(): void {
  this.spinner.show();
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
   this.divisionid = sessionStorage.getItem('divisionID');
   this.chartOptions_III.chart.height = '200px';
   this.himisDistrictid = 0;
   this.mainschemeid=0;
  } else if (roleName == 'Collector') {
   this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
   this.divisionid = 0;
   this.mainschemeid=0;
   this.chartOptions_III.chart.height = '400px';
  } else {
   this.divisionid = 0;
   this.himisDistrictid = 0;
   this.mainschemeid=0;
   this.chartOptions_III.chart.height = '700';
  }
  var RPType = 'Scheme';
  const contractid=0;
  this.api.GETRunningWorkSummaryDelay(RPType,this.divisionid,this.himisDistrictid,this.mainschemeid,contractid)
     .subscribe(
       (data: any) => {
         this.RunningWorkDelayDataScheme = data;
         console.log('API Response total:', this.RunningWorkDelayDataScheme);
        
         const id: string[] = [];
         const name: string[] = [];
         const totalWorks: any[] = [];
         const tvcValuecr: number[] = [];
         const paidTillcr: number[] = [];
         const grossPendingcr: number[] = [];
         const morethanSixMonth: number[] = [];
         const d_91_180Days: number[] = [];
         const d_1_90Days: number[] = [];
         const timeValid: number[] = [];
  
         data.forEach(
           (item: {
             name: string;
             id: any;
             totalWorks: any;
             tvcValuecr: number;
         paidTillcr: any;grossPendingcr:any;morethanSixMonth:any;d_91_180Days:any;d_1_90Days:any;timeValid:any
           }) => {
             id.push(item.id);
             name.push(item.name);
             totalWorks.push(item.totalWorks);
             tvcValuecr.push(item.tvcValuecr);
             paidTillcr.push(item.paidTillcr);
             grossPendingcr.push(item.grossPendingcr);
             morethanSixMonth.push(item.morethanSixMonth);
             d_91_180Days.push(item.d_91_180Days);
             d_1_90Days.push(item.d_1_90Days);
             timeValid.push(item.timeValid);
           }
         );
  
         this.chartOptions_III.series = [
          {
            name: 'No. of Works',
            data: totalWorks,
            color: '#eeba0b',
          },
          {
            name: 'Value(in Cr)',
            data: tvcValuecr,
           color: '#6a6afd',
          },
          {
            name: 'Paid-Till(in Cr)',
            data: paidTillcr,
            color: 'rgba(93, 243, 174, 0.85)',
          },
          { name: 'Gross Due(in Cr)', data: grossPendingcr,color:'rgba(250, 199, 161, 0.85)'},
          
           { name: 'More than Six Month', data: morethanSixMonth,color:'rgba(208, 156, 205, 0.85)'  },
           { name: 'Day in 91 to 180 Days', data: d_91_180Days,color:'rgba(245, 155, 207, 0.85)'  },
           { name: 'Day in 1 to 90 Days', data: d_1_90Days,color:'rgba(205, 243, 144, 0.85)'  },
           { name: 'Valid Time', data: timeValid,color:'rgba(130, 234, 238, 0.85)'  },
         ];
         this.chartOptions_III.xaxis = { categories: name };
         this.cO = this.chartOptions_III;
         this.cdr.detectChanges();
  
         this.spinner.hide();
       },
       (error: any) => {
         console.error('Error fetching data', error);
       }
     );
  
  }
  GETRunningWorkDelayDistrict(): void {
  this.spinner.show();
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
   this.divisionid = sessionStorage.getItem('divisionID');
  // var RPType ='Division';
   this.chartOptions_IV.chart.height = '200px';
   this.himisDistrictid = 0;
   this.mainschemeid=0;
  } else if (roleName == 'Collector') {
   this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
  // var RPType="District";
   this.divisionid = 0;
   this.mainschemeid=0;
   this.chartOptions_IV.chart.height = '400px';
  } else {
   this.divisionid = 0;
   this.himisDistrictid = 0;
   this.mainschemeid=0;
   this.chartOptions_IV.chart.height = '1000';
  }
  var RPType = 'District';
  const contractid=0;
  this.api.GETRunningWorkSummaryDelay(RPType,this.divisionid,this.himisDistrictid,this.mainschemeid,contractid)
  .subscribe(
    (data: any) => {
      this.RunningWorkDelayDataDistrict = data;
      console.log('API Response total:', this.RunningWorkDelayDataDistrict);
      
      const id: string[] = [];
      const name: string[] = [];
      const totalWorks: any[] = [];
      const tvcValuecr: number[] = [];
      const paidTillcr: number[] = [];
      const grossPendingcr: number[] = [];
      const morethanSixMonth: number[] = [];
      const d_91_180Days: number[] = [];
      const d_1_90Days: number[] = [];
      const timeValid: number[] = [];

      data.forEach(
        (item: {
          name: string;
          id: any;
          totalWorks: any;
          tvcValuecr: number;
      paidTillcr: any;grossPendingcr:any;morethanSixMonth:any;d_91_180Days:any;d_1_90Days:any;timeValid:any
        }) => {
          id.push(item.id);
          name.push(item.name);
          totalWorks.push(item.totalWorks);
          tvcValuecr.push(item.tvcValuecr);
          paidTillcr.push(item.paidTillcr);
          grossPendingcr.push(item.grossPendingcr);
          morethanSixMonth.push(item.morethanSixMonth);
          d_91_180Days.push(item.d_91_180Days);
          d_1_90Days.push(item.d_1_90Days);
          timeValid.push(item.timeValid);
        }
      );

      this.chartOptions_IV.series = [
       {
         name: 'No. of Works',
         data: totalWorks,
         color: '#eeba0b',
       },
       {
         name: 'Value(in Cr)',
         data: tvcValuecr,
        color: '#6a6afd',
       },
       {
         name: 'Paid-Till(in Cr)',
         data: paidTillcr,
         color: 'rgba(93, 243, 174, 0.85)',
       },
       { name: 'Gross Due(in Cr)', data: grossPendingcr,color:'rgba(250, 199, 161, 0.85)'},
       
        { name: 'More than Six Month', data: morethanSixMonth,color:'rgba(208, 156, 205, 0.85)'  },
        { name: 'Day in 91 to 180 Days', data: d_91_180Days,color:'rgba(245, 155, 207, 0.85)'  },
        { name: 'Day in 1 to 90 Days', data: d_1_90Days,color:'rgba(205, 243, 144, 0.85)'  },
        { name: 'Valid Time', data: timeValid,color:'rgba(130, 234, 238, 0.85)'  },
      ];
      this.chartOptions_IV.xaxis = { categories: name };
      this.cO = this.chartOptions_IV;
      this.cdr.detectChanges();

      this.spinner.hide();
    },
    (error: any) => {
      console.error('Error fetching data', error);
    }
  );
  }
  GETRunningWorkDelayContractor(): void {
  this.spinner.show();
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
   this.divisionid = sessionStorage.getItem('divisionID');
  // var RPType ='Division';
   this.chartOptions_V.chart.height = '200px';
   this.himisDistrictid = 0;
   this.mainschemeid=0;
  } else if (roleName == 'Collector') {
   this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
  // var RPType="District";
   this.divisionid = 0;
   this.mainschemeid=0;
   this.chartOptions_V.chart.height = '400px';
  } else {
   this.divisionid = 0;
   this.himisDistrictid = 0;
   this.mainschemeid=0;
   this.chartOptions_V.chart.height = '500';
  }
  var RPType = 'Contractor';
  const contractid=0;
  this.api.GETRunningWorkSummaryDelay(RPType,this.divisionid,this.himisDistrictid,this.mainschemeid,contractid)
  .subscribe(
    (data: any) => {
      this.RunningWorkDelayDataContractor = data;
      console.log('API Response total:', this.RunningWorkDelayDataContractor);
      
      const id: string[] = [];
      const name: string[] = [];
      const totalWorks: any[] = [];
      const tvcValuecr: number[] = [];
      const paidTillcr: number[] = [];
      const grossPendingcr: number[] = [];
      const morethanSixMonth: number[] = [];
      const d_91_180Days: number[] = [];
      const d_1_90Days: number[] = [];
      const timeValid: number[] = [];

      data.forEach(
        (item: {
          name: string;
          id: any;
          totalWorks: any;
          tvcValuecr: number;
      paidTillcr: any;grossPendingcr:any;morethanSixMonth:any;d_91_180Days:any;d_1_90Days:any;timeValid:any
        }) => {
          id.push(item.id);
          name.push(item.name);
          totalWorks.push(item.totalWorks);
          tvcValuecr.push(item.tvcValuecr);
          paidTillcr.push(item.paidTillcr);
          grossPendingcr.push(item.grossPendingcr);
          morethanSixMonth.push(item.morethanSixMonth);
          d_91_180Days.push(item.d_91_180Days);
          d_1_90Days.push(item.d_1_90Days);
          timeValid.push(item.timeValid);
        }
      );

      this.chartOptions_V.series = [
       {
         name: 'No. of Works',
         data: totalWorks,
         color: '#eeba0b',
       },
       {
         name: 'Value(in Cr)',
         data: tvcValuecr,
        color: '#6a6afd',
       },
       {
         name: 'Paid-Till(in Cr)',
         data: paidTillcr,
         color: 'rgba(93, 243, 174, 0.85)',
       },
       { name: 'Gross Due(in Cr)', data: grossPendingcr,color:'rgba(250, 199, 161, 0.85)'},
       
        { name: 'More than Six Month', data: morethanSixMonth,color:'rgba(208, 156, 205, 0.85)'  },
        { name: 'Day in 91 to 180 Days', data: d_91_180Days,color:'rgba(245, 155, 207, 0.85)'  },
        { name: 'Day in 1 to 90 Days', data: d_1_90Days,color:'rgba(205, 243, 144, 0.85)'  },
        { name: 'Valid Time', data: timeValid,color:'rgba(130, 234, 238, 0.85)'  },
      ];
      this.chartOptions_V.xaxis = { categories: name };
      this.cO = this.chartOptions_V;
      this.cdr.detectChanges();

      this.spinner.hide();
    },
    (error: any) => {
      console.error('Error fetching data', error);
    }
  );
  }
  // #endregion
}

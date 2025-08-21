import { NgFor, CommonModule, NgStyle, DatePipe,Location } from '@angular/common';
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
import { NgApexchartsModule, ChartComponent, ApexAxisChartSeries, ApexChart, 
  ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip,
   ApexXAxis, ApexYAxis } from 'ng-apexcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { RunningWork, RunningWorkDelay,RunningDelayWorksDetails, WorkOrderPendingDetailsNew ,ASFile} from 'src/app/Model/DashProgressCount';
import { ApiService } from 'src/app/service/api.service';
import { InsertUserPageViewLogmodal} from 'src/app/Model/DashLoginDDL';
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
   ASFileData: ASFile[] = [];

//#region DataBase Table
   dataSource!: MatTableDataSource<RunningDelayWorksDetails>;
  //  dataSource1!: MatTableDataSource<PriceEvaluationDetails>;
   @ViewChild('paginator') paginator!: MatPaginator;
   @ViewChild('sort') sort!: MatSort;
  //  @ViewChild('paginator1') paginator1!: MatPaginator;
  //  @ViewChild('sort1') sort1!: MatSort;
   dispatchData: RunningDelayWorksDetails[] = [];
  //  dispatchData1: PriceEvaluationDetails[] = [];
 
   //#endregion
   selectedvalue:any;
   selectedParameter:any;
  selectedTabIndex: number=0;
 divisionid: any;
 himisDistrictid: any;
 TimeStatus:any;
 mainschemeid:any;
 name:any;
 selectname:any;
 roleName:any;
 InsertUserPageViewLogdata: InsertUserPageViewLogmodal = new InsertUserPageViewLogmodal();

 pageName: string = '';
 fullUrl: string = '';
 constructor(
  public api: ApiService,
  public spinner: NgxSpinnerService,
  private cdr: ChangeDetectorRef,
  private dialog: MatDialog,
  public datePipe: DatePipe,private location: Location,
 ) {
  this.pageName = this.location.path();
this.fullUrl = window.location.href;
  this.dataSource = new MatTableDataSource<RunningDelayWorksDetails>([]);
  // this.dataSource1 = new MatTableDataSource<PriceEvaluationDetails>([]);
 }
 
 ngOnInit() {
  this.roleName = localStorage.getItem('roleName');
  this.initializeChartOptions();
  this.initializeChartOptions2();
  
 if(this.selectedTabIndex == 0){
    //  this.name="Technical Evaluation Details"
   this.GETRunningWorkTotal();
    this.GETRunningWorksDivision();
    this.GETRunningWorkScheme();
    this.GETRunningWorkDistrict();
    this.InsertUserPageViewLog();
    if (this.roleName != 'Infrastructure_Public') {
      this.GETRunningWorkContractor(); 
    }
 
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
        columnWidth:'40%',
        borderRadius:3,
        distributed: false,
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
        // de
        dataPointSelection: (
          event,
          chartContext,
          { dataPointIndex, seriesIndex }
        ) => {
          ;
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
              this.name = selectedData.name;
              this.selectname=selectedSeries;

              if (selectedSeries=='No. of Works') {
                this.selectedvalue = selectedData.totalWorks;

                this.selectedvalue = selectedData.totalWorks;
                this.fetchDataBasedOnChartSelection(0,0,0,selectedSeries );
              } else if (selectedSeries=='Delayed > 6 Month') {
                this.selectedvalue = selectedData.totalWorks;

                this.selectedvalue = selectedData.morethanSixMonth;

                this.fetchDataBasedOnChartSelection('Delay', 'SixMonth', 0, selectedSeries );
                // return '#FFA500';
              } else if (selectedSeries =='Delayed > 3 and < 6 Month') {
                this.selectedvalue = selectedData.d_91_180Days;

                this.fetchDataBasedOnChartSelection('Delay', 'Between3_6', 0, selectedSeries );
                // return '#FFA500';
              } else if (selectedSeries=='Delayed > 1 and < 3 Month') {
                this.selectedvalue = selectedData.d_1_90Days;

                  this.fetchDataBasedOnChartSelection('Delay', 'Between1_3', 0, selectedSeries );
                // return '#FFA500';
              } else {
                this.selectedvalue = selectedData.timeValid;

                // delayTime=OnTime&parameter=TimeValid
                this.fetchDataBasedOnChartSelection('OnTime','TimeValid', 0, selectedSeries );
              }  
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
          columnWidth:'40%',
          borderRadius:3,
          distributed: false,
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
      text: 'Delayed / On Time Works Summary ',
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
              this.selectname=selectedSeries;
            
              // {
              //   name: 'No. of Works',
              //   data: totalWorks,
              //   color: '#eeba0b',
              // },
              //  { name: 'Delayed > 6 Month', data: morethanSixMonth,color:'rgb(250, 87, 149)'  },
              //  { name: 'Delayed > 3 and < 6 Month', data: d_91_180Days,color:'rgba(245, 155, 207, 0.85)'  },
              //  { name: 'Delayed > 1 and < 3 Month', data: d_1_90Days,color:'rgb(231, 250, 87)'  },timeValid
              if (selectedSeries=='No. of Works') {
                this.selectedvalue = selectedData.totalWorks;

                this.fetchDataBasedOnChartSelection_II(0,0,id,selectedSeries );
              } else if (selectedSeries=='Delayed > 6 Month') {
                this.selectedvalue = selectedData.morethanSixMonth;

                this.fetchDataBasedOnChartSelection_II('Delay', 'SixMonth', id, selectedSeries );
                // return '#FFA500';
              } else if (selectedSeries =='Delayed > 3 and < 6 Month') {
                this.selectedvalue = selectedData.d_91_180Days;

                this.fetchDataBasedOnChartSelection_II('Delay', 'Between3_6', id, selectedSeries );
                // return '#FFA500';
              } else if (selectedSeries=='Delayed > 1 and < 3 Month') {
                this.selectedvalue = selectedData.d_1_90Days;

                  this.fetchDataBasedOnChartSelection_II('Delay', 'Between1_3', id, selectedSeries );
                // return '#FFA500';
              } else {
                this.selectedvalue = selectedData.timeValid;

                // delayTime=OnTime&parameter=TimeValid
                this.fetchDataBasedOnChartSelection_II('OnTime','TimeValid', id, selectedSeries );
              } 
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
      text: 'Division-wise Delayed / On Time Works',
      // text: 'Division-wise Delayed / On Time Works Summary',
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
              this.selectname=selectedSeries;

              // {
              //   name: 'No. of Works',
              //   data: totalWorks,
              //   color: '#eeba0b',
              // },
              //  { name: 'Delayed > 6 Month', data: morethanSixMonth,color:'rgb(250, 87, 149)'  },
              //  { name: 'Delayed > 3 and < 6 Month', data: d_91_180Days,color:'rgba(245, 155, 207, 0.85)'  },
              //  { name: 'Delayed > 1 and < 3 Month', data: d_1_90Days,color:'rgb(231, 250, 87)'  },
              if (selectedSeries=='No. of Works') {
                this.selectedvalue = selectedData.totalWorks;

                this.fetchDataBasedOnChartSelection_III(0,0,id,selectedSeries );
              } else if (selectedSeries=='Delayed > 6 Month') {
                this.selectedvalue = selectedData.morethanSixMonth;

                this.fetchDataBasedOnChartSelection_III('Delay', 'SixMonth',id, selectedSeries );
                // return '#FFA500';
              } else if (selectedSeries =='Delayed > 3 and < 6 Month') {
                this.selectedvalue = selectedData.d_91_180Days;

                this.fetchDataBasedOnChartSelection_III('Delay', 'Between3_6', id, selectedSeries );
                // return '#FFA500';
              } else if (selectedSeries=='Delayed > 1 and < 3 Month') {
                this.selectedvalue = selectedData.d_1_90Days;

                  this.fetchDataBasedOnChartSelection_III('Delay', 'Between1_3', id, selectedSeries );
                // return '#FFA500';
              } else {
                this.selectedvalue = selectedData.timeValid;

                // delayTime=OnTime&parameter=TimeValid
                this.fetchDataBasedOnChartSelection_III('OnTime','TimeValid', id, selectedSeries );
              } 
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
      // text: 'Scheme-wise Delayed / On Time Works Summary',
      text: 'Scheme-wise Delayed / On Time Works',
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
              this.selectname=selectedSeries;

              // {
              //   name: 'No. of Works',
              //   data: totalWorks,
              //   color: '#eeba0b',
              // },
              //  { name: 'Delayed > 6 Month', data: morethanSixMonth,color:'rgb(250, 87, 149)'  },
              //  { name: 'Delayed > 3 and < 6 Month', data: d_91_180Days,color:'rgba(245, 155, 207, 0.85)'  },
              //  { name: 'Delayed > 1 and < 3 Month', data: d_1_90Days,color:'rgb(231, 250, 87)'  },
              if (selectedSeries=='No. of Works') {
                this.selectedvalue = selectedData.totalWorks;

                this.fetchDataBasedOnChartSelection_IV(0,0,id,selectedSeries );
              } else if (selectedSeries=='Delayed > 6 Month') {
                this.selectedvalue = selectedData.morethanSixMonth;

                this.fetchDataBasedOnChartSelection_IV('Delay', 'SixMonth', id, selectedSeries );
                // return '#FFA500';
              } else if (selectedSeries =='Delayed > 3 and < 6 Month') {
                this.selectedvalue = selectedData.d_91_180Days;

                this.fetchDataBasedOnChartSelection_IV('Delay', 'Between3_6', id, selectedSeries );
                // return '#FFA500';
              } else if (selectedSeries=='Delayed > 1 and < 3 Month') {
                this.selectedvalue = selectedData.d_1_90Days;

                  this.fetchDataBasedOnChartSelection_IV('Delay', 'Between1_3', id, selectedSeries );
                // return '#FFA500';
              } else {
                this.selectedvalue = selectedData.timeValid;

                // delayTime=OnTime&parameter=TimeValid
                this.fetchDataBasedOnChartSelection_IV('OnTime','TimeValid', id, selectedSeries );
              } 
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
      text: 'District-wise Delayed / On Time Works',
      // text: 'District-wise Delayed / On Time Works Summary',
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
              this.selectname=selectedSeries;

              // {
              //   name: 'No. of Works',
              //   data: totalWorks,
              //   color: '#eeba0b',
              // },
              //  { name: 'Delayed > 6 Month', data: morethanSixMonth,color:'rgb(250, 87, 149)'  },
              //  { name: 'Delayed > 3 and < 6 Month', data: d_91_180Days,color:'rgba(245, 155, 207, 0.85)'  },
              //  { name: 'Delayed > 1 and < 3 Month', data: d_1_90Days,color:'rgb(231, 250, 87)'  },
              if (selectedSeries=='No. of Works') {
                this.selectedvalue = selectedData.totalWorks;

                this.fetchDataBasedOnChartSelection_V(0,0,id,selectedSeries );
              } else if (selectedSeries=='Delayed > 6 Month') {
                this.selectedvalue = selectedData.morethanSixMonth;

                this.fetchDataBasedOnChartSelection_V('Delay', 'SixMonth', id, selectedSeries );
                // return '#FFA500';
              } else if (selectedSeries =='Delayed > 3 and < 6 Month') {
                this.selectedvalue = selectedData.d_91_180Days;

                this.fetchDataBasedOnChartSelection_V('Delay', 'Between3_6', id, selectedSeries );
                // return '#FFA500';
              } else if (selectedSeries=='Delayed > 1 and < 3 Month') {
                this.selectedvalue = selectedData.d_1_90Days;

                  this.fetchDataBasedOnChartSelection_V ('Delay', 'Between1_3',id, selectedSeries );
                // return '#FFA500';
              } else {
                this.selectedvalue = selectedData.timeValid;

                // delayTime=OnTime&parameter=TimeValid
                this.fetchDataBasedOnChartSelection_V('OnTime','TimeValid', id, selectedSeries );
              } 
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
      text: 'Contractor-wise Delayed / On Time Works',
      // text: 'Contractor-wise Delayed / On Time Works Summary',
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
   this.chartOptions.chart.height = '400px';
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
   this.chartOptions.chart.height = '400';
  }
  var RPType = 'GTotal';
const contractid=0;
  // ?RPType=GTotal&divisionid=0&districtid=0&mainSchemeId=0&contractid=0
   this.api.GETRunningWorkSummary( RPType, this.divisionid,this.himisDistrictid,this.mainschemeid,contractid)
     .subscribe(
       (data: any) => {
         this.RunningWorkDataGTotal = data;
        //  console.log('API Response total:', this.RunningWorkDataGTotal);
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
  
        //  this.chartOptions.series = [
        //   {name: 'No. of Works', data: totalWorks, color: '#eeba0b',  },
        //   { name: 'Contract Value(in Cr)', data: tvcValuecr, color: '#6a6afd', },
        //   { name: 'Paid-Value(in Cr)', data: paidTillcr, color: 'rgba(93, 243, 174, 0.85)', },
        //   { name: 'Bill Generated & Unpaid Value(in Cr)', data: grossPendingcr,color:'rgba(250, 199, 161, 0.85)'}, ];
        const series = [];
        if (roleName === 'Infrastructure_Public') {
          series.push( {name: 'No. of Works', data: totalWorks, color: '#eeba0b',  });
          series.push({ name: 'Contract Value(in Cr)', data: tvcValuecr, color: '#6a6afd', });
         
        }
        else{
          series.push( {name: 'No. of Works', data: totalWorks, color: '#eeba0b', });
          series.push({ name: 'Contract Value(in Cr)', data: tvcValuecr, color: '#6a6afd',  });
          series.push({  name: 'Paid-Value(in Cr)', data: paidTillcr, color: 'rgba(93, 243, 174, 0.85)', });
          series.push({  name: 'Bill Generated & Unpaid Value(in Cr)', data: grossPendingcr,color:'rgba(250, 199, 161, 0.85)' });
        }
        this.chartOptions.series = series;
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
   this.chartOptions1.chart.height = '300px';
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
   this.chartOptions1.chart.height = '400';
  }
  var RPType = 'Division';
  const contractid=0;

   this.api.GETRunningWorkSummary(RPType,this.divisionid,this.himisDistrictid,this.mainschemeid,contractid)
     .subscribe(
       (data: any) => {
         this.RunningWorkDataDivision = data;
        //  console.log('API Response total:', this.RunningWorkDataDivision);
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
  
        //  this.chartOptions1.series = [
        //   {name: 'No. of Works', data: totalWorks, color: '#eeba0b', },
        //   {name: 'Contract Value(in Cr)', data: tvcValuecr, color: '#6a6afd', },
        //   { name: 'Paid-Value(in Cr)', data: paidTillcr, color: 'rgba(93, 243, 174, 0.85)', },
        //   { name: 'Bill Generated & Unpaid Value(in Cr)', data: grossPendingcr,color:'rgba(250, 199, 161, 0.85)'}, ];
        const series = [];
        if (roleName === 'Infrastructure_Public') {
          series.push( {name: 'No. of Works', data: totalWorks, color: '#eeba0b',  });
          series.push({ name: 'Contract Value(in Cr)', data: tvcValuecr, color: '#6a6afd', });
         
        }
        else{
          series.push( {name: 'No. of Works', data: totalWorks, color: '#eeba0b', });
          series.push({ name: 'Contract Value(in Cr)', data: tvcValuecr, color: '#6a6afd',  });
          series.push({  name: 'Paid-Value(in Cr)', data: paidTillcr, color: 'rgba(93, 243, 174, 0.85)', });
          series.push({  name: 'Bill Generated & Unpaid Value(in Cr)', data: grossPendingcr,color:'rgba(250, 199, 161, 0.85)' });
        }
        this.chartOptions1.series = series;
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
   this.chartOptions2.chart.height = '400px';
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
        //  console.log('API Response total:', this.RunningWorkDataScheme);
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
  
        //  this.chartOptions2.series = [
        //   {name: 'No. of Works', data: totalWorks, color: '#eeba0b', },
        //   { name: 'Contract Value(in Cr)', data: tvcValuecr, color: '#6a6afd',},
        //   {name: 'Paid-Value(in Cr)', data: paidTillcr, color: 'rgba(93, 243, 174, 0.85)', },
        //   { name: 'Bill Generated & Unpaid Value(in Cr)', data: grossPendingcr,color:'rgba(250, 199, 161, 0.85)'}, ];
        const series = [];
        if (roleName === 'Infrastructure_Public') {
          series.push( {name: 'No. of Works', data: totalWorks, color: '#eeba0b',  });
          series.push({ name: 'Contract Value(in Cr)', data: tvcValuecr, color: '#6a6afd', });
         
        }
        else{
          series.push( {name: 'No. of Works', data: totalWorks, color: '#eeba0b', });
          series.push({ name: 'Contract Value(in Cr)', data: tvcValuecr, color: '#6a6afd',  });
          series.push({  name: 'Paid-Value(in Cr)', data: paidTillcr, color: 'rgba(93, 243, 174, 0.85)', });
          series.push({  name: 'Bill Generated & Unpaid Value(in Cr)', data: grossPendingcr,color:'rgba(250, 199, 161, 0.85)' });
        }
        this.chartOptions2.series = series;
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
   this.chartOptions3.chart.height = '400px';
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
      // console.log('API Response total:', this.RunningWorkDataDistrict);
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

      // this.chartOptions3.series = [
      //   { name: 'No. of Works', data: totalWorks, color: '#eeba0b', },
      //   {name: 'Contract Value(in Cr)', data: tvcValuecr,  color: '#6a6afd', },
      //   {name: 'Paid-Value(in Cr)', data: paidTillcr,color: 'rgba(93, 243, 174, 0.85)',},
      //   { name: 'Bill Generated & Unpaid Value(in Cr)', data: grossPendingcr,color:'rgba(250, 199, 161, 0.85)'},];
      const series = [];
        if (roleName === 'Infrastructure_Public') {
          series.push( {name: 'No. of Works', data: totalWorks, color: '#eeba0b',  });
          series.push({ name: 'Contract Value(in Cr)', data: tvcValuecr, color: '#6a6afd', });
         
        }
        else{
          series.push( {name: 'No. of Works', data: totalWorks, color: '#eeba0b', });
          series.push({ name: 'Contract Value(in Cr)', data: tvcValuecr, color: '#6a6afd',  });
          series.push({  name: 'Paid-Value(in Cr)', data: paidTillcr, color: 'rgba(93, 243, 174, 0.85)', });
          series.push({  name: 'Bill Generated & Unpaid Value(in Cr)', data: grossPendingcr,color:'rgba(250, 199, 161, 0.85)' });
        }
        this.chartOptions3.series = series;
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
   this.chartOptions4.chart.height = '400px';
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
      // console.log('API Response total:', this.RunningWorkDataContractor);
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
          name: 'Contract Value(in Cr)',
          data: tvcValuecr,
         color: '#6a6afd',
        },
        {
          name: 'Paid-Value(in Cr)',
          data: paidTillcr,
          color: 'rgba(93, 243, 174, 0.85)',
        },
        { name: 'Bill Generated & Unpaid Value(in Cr)', data: grossPendingcr,color:'rgba(250, 199, 161, 0.85)'},
     
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

  GETRunningWorkDelayTotal(): void {
  this.spinner.show();
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
   this.divisionid = sessionStorage.getItem('divisionID');
  // var RPType ='Division';
   this.chartOptions_I.chart.height = '400px';
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
   this.chartOptions_I.chart.height = '400';
  }
  var RPType = 'GTotal';
const contractid=0;
  // ?RPType=GTotal&divisionid=0&districtid=0&mainSchemeId=0&contractid=0
   this.api.GETRunningWorkSummaryDelay( RPType, this.divisionid,this.himisDistrictid,this.mainschemeid,contractid)
     .subscribe(
       (data: any) => {
         this.RunningWorkDelayDataGTotal = data;
        //  console.log('API Response total:', this.RunningWorkDelayDataGTotal);
       
        
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
            //  tvcValuecr.push(item.tvcValuecr);
            //  paidTillcr.push(item.paidTillcr);
            //  grossPendingcr.push(item.grossPendingcr);
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
           { name: 'Delayed > 6 Month', data: morethanSixMonth,color:'rgb(250, 87, 149)'  },
           { name: 'Delayed > 3 and < 6 Month', data: d_91_180Days,color:'rgba(245, 155, 207, 0.85)'  },
           { name: 'Delayed > 1 and < 3 Month', data: d_1_90Days,color:'rgb(250, 247, 87)'  },
           { name: 'On Time', data: timeValid,color:'rgb(98, 245, 98)'  },
                    // {
          //   name: 'Value(in Cr)',
          //   data: tvcValuecr,
          //  color: '#6a6afd',
          // },
          // {
          //   name: 'Paid-Till(in Cr)',
          //   data: paidTillcr,
          //   color: 'rgba(93, 243, 174, 0.85)',
          // },
          // { name: 'Gross Due(in Cr)', data: grossPendingcr,color:'rgba(250, 199, 161, 0.85)'},
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
   this.chartOptions_II.chart.height = '300px';
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
   this.chartOptions_II.chart.height = '400';
  }
  var RPType = 'Division';
  const contractid=0;

   this.api.GETRunningWorkSummaryDelay(RPType,this.divisionid,this.himisDistrictid,this.mainschemeid,contractid)
     .subscribe(
       (data: any) => {
         this.RunningWorkDelayDataDivision = data;
        //  console.log('API Response total:', this.RunningWorkDelayDataDivision);
        
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
       //  tvcValuecr.push(item.tvcValuecr);
       //  paidTillcr.push(item.paidTillcr);
       //  grossPendingcr.push(item.grossPendingcr);
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
     // {
     //   name: 'Value(in Cr)',
     //   data: tvcValuecr,
     //  color: '#6a6afd',
     // },
     // {
     //   name: 'Paid-Till(in Cr)',
     //   data: paidTillcr,
     //   color: 'rgba(93, 243, 174, 0.85)',
     // },
     // { name: 'Gross Due(in Cr)', data: grossPendingcr,color:'rgba(250, 199, 161, 0.85)'},
     
      { name: 'Delayed > 6 Month', data: morethanSixMonth,color:'rgb(250, 87, 149)'  },
      { name: 'Delayed > 3 and < 6 Month', data: d_91_180Days,color:'rgba(245, 155, 207, 0.85)'  },
      { name: 'Delayed > 1 and < 3 Month', data: d_1_90Days,color:'rgb(250, 247, 87)'  },
      { name: 'On Time', data: timeValid,color:'rgb(98, 245, 98)'  },
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
   this.chartOptions_III.chart.height = '400px';
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
        //  console.log('API Response total:', this.RunningWorkDelayDataScheme);
        
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
       //  tvcValuecr.push(item.tvcValuecr);
       //  paidTillcr.push(item.paidTillcr);
       //  grossPendingcr.push(item.grossPendingcr);
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
     // {
     //   name: 'Value(in Cr)',
     //   data: tvcValuecr,
     //  color: '#6a6afd',
     // },
     // {
     //   name: 'Paid-Till(in Cr)',
     //   data: paidTillcr,
     //   color: 'rgba(93, 243, 174, 0.85)',
     // },
     // { name: 'Gross Due(in Cr)', data: grossPendingcr,color:'rgba(250, 199, 161, 0.85)'},
     
      { name: 'Delayed > 6 Month', data: morethanSixMonth,color:'rgb(250, 87, 149)'  },
      { name: 'Delayed > 3 and < 6 Month', data: d_91_180Days,color:'rgba(245, 155, 207, 0.85)'  },
      { name: 'Delayed > 1 and < 3 Month', data: d_1_90Days,color:'rgb(250, 247, 87)'  },
      { name: 'On Time', data: timeValid,color:'rgb(98, 245, 98)'  },
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
   this.chartOptions_IV.chart.height = '400px';
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
      // console.log('API Response total:', this.RunningWorkDelayDataDistrict);
      
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
     //  tvcValuecr.push(item.tvcValuecr);
     //  paidTillcr.push(item.paidTillcr);
     //  grossPendingcr.push(item.grossPendingcr);
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
   // {
   //   name: 'Value(in Cr)',
   //   data: tvcValuecr,
   //  color: '#6a6afd',
   // },
   // {
   //   name: 'Paid-Till(in Cr)',
   //   data: paidTillcr,
   //   color: 'rgba(93, 243, 174, 0.85)',
   // },
   // { name: 'Gross Due(in Cr)', data: grossPendingcr,color:'rgba(250, 199, 161, 0.85)'},
   
    { name: 'Delayed > 6 Month', data: morethanSixMonth,color:'rgb(250, 87, 149)'  },
    { name: 'Delayed > 3 and < 6 Month', data: d_91_180Days,color:'rgba(245, 155, 207, 0.85)'  },
    { name: 'Delayed > 1 and < 3 Month', data: d_1_90Days,color:'rgb(250, 247, 87)'  },
    { name: 'On Time', data: timeValid,color:'rgb(98, 245, 98)'  },
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
   this.chartOptions_V.chart.height = '400px';
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
      // console.log('API Response total:', this.RunningWorkDelayDataContractor);
      
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
     //  tvcValuecr.push(item.tvcValuecr);
     //  paidTillcr.push(item.paidTillcr);
     //  grossPendingcr.push(item.grossPendingcr);
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
   // {
   //   name: 'Value(in Cr)',
   //   data: tvcValuecr,
   //  color: '#6a6afd',
   // },
   // {
   //   name: 'Paid-Till(in Cr)',
   //   data: paidTillcr,
   //   color: 'rgba(93, 243, 174, 0.85)',
   // },
   // { name: 'Gross Due(in Cr)', data: grossPendingcr,color:'rgba(250, 199, 161, 0.85)'},
   
    { name: 'Delayed > 6 Month', data: morethanSixMonth,color:'rgb(250, 87, 149)'  },
    { name: 'Delayed > 3 and < 6 Month', data: d_91_180Days,color:'rgba(245, 155, 207, 0.85)'  },
    { name: 'Delayed > 1 and < 3 Month', data: d_1_90Days,color:'rgb(250, 247, 87)'  },
    { name: 'On Time', data: timeValid,color:'rgb(98, 245, 98)'  },
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

// #region data table for delayTime


fetchDataBasedOnChartSelection(delayTime:any,parameter:any,divisionID: any, seriesName: string): void {
  // ;
  this.selectedParameter=delayTime;
  // console.log(`Selected ID: ${divisionID}, Series: ${seriesName}`);
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
   this.divisionid = sessionStorage.getItem('divisionID');
   this.himisDistrictid = 0;
  //  this.mainschemeid=0;
  } else if (roleName == 'Collector') {
   this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
   this.divisionid = 0;
  //  this.mainschemeid=0;
  } else {
   this.divisionid = 0;
   this.himisDistrictid = 0;
  //  this.mainschemeid=0;
  }
  const  districtid=0;
  const mainSchemeId=0;
  const contractid=0;
  this.spinner.show();
//  const delayTime="delayTime";
//  const parameter="parameter";
  this.api.GETRunningDelayWorksDetails(delayTime,parameter,this.divisionid,this.himisDistrictid,mainSchemeId,contractid).subscribe(
    (res) => {
      this.dispatchData = res.map((item: RunningDelayWorksDetails, index: number) => ({
        ...item,
        sno: index + 1
      }));
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
fetchDataBasedOnChartSelection_II(delayTime:any,parameter:any,divisionID: any, seriesName: string): void {
  // ;
  // alert(delayTime);
  this.selectedParameter=delayTime;
  // console.log(`Selected ID: ${divisionID}, Series: ${seriesName}`);
  var roleName = localStorage.getItem('roleName');
  // if (roleName == 'Division') {
  //  this.divisionid = sessionStorage.getItem('divisionID');
  //  this.himisDistrictid = 0;
  // //  this.mainschemeid=0;
  // }
    if (roleName == 'Collector') {
   this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
  //  this.divisionid = 0;
  //  this.mainschemeid=0;
  } else {
  //  this.divisionid = 0;
   this.himisDistrictid = 0;
  //  this.mainschemeid=0;
  }
  const  districtid=0;
  const mainSchemeId=0;
  const contractid=0;
  this.spinner.show();
//  const delayTime="delayTime";
//  const parameter="parameter";
  this.api.GETRunningDelayWorksDetails(delayTime,parameter,divisionID,this.himisDistrictid ,mainSchemeId,contractid).subscribe(
    (res) => {
      this.dispatchData = res.map((item: RunningDelayWorksDetails, index: number) => ({
        ...item,
        sno: index + 1
      }));
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
fetchDataBasedOnChartSelection_III(delayTime:any,parameter:any,mainSchemeId: any, seriesName: string): void {
  this.selectedParameter=delayTime;
  // console.log(`mainSchemeId ID: ${mainSchemeId}, Series: ${seriesName}`);
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
   this.divisionid = sessionStorage.getItem('divisionID');
   this.himisDistrictid = 0;
  //  this.mainschemeid=0;
  } else if (roleName == 'Collector') {
   this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
   this.divisionid = 0;
  //  this.mainschemeid=0;
  } else {
   this.divisionid = 0;
   this.himisDistrictid = 0;
  //  this.mainschemeid=0;
  }
  // const  districtid=0;
  // const mainSchemeId=0;
  // const divisionID=0;
  const contractid=0;
  this.spinner.show();
//  const delayTime="delayTime";
//  const parameter="parameter";
  this.api.GETRunningDelayWorksDetails(delayTime,parameter,this.divisionid,this.himisDistrictid,mainSchemeId,contractid).subscribe(
    (res) => {
      this.dispatchData = res.map((item: RunningDelayWorksDetails, index: number) => ({
        ...item,
        sno: index + 1
      }));
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
fetchDataBasedOnChartSelection_IV(delayTime:any,parameter:any,districtid: any, seriesName: string): void {
  this.selectedParameter=delayTime;
  // console.log(`districtid ID: ${districtid}, Series: ${seriesName}`);

  const  divisionID=0;
  // const  districtid=0;
  const mainSchemeId=0;
  const contractid=0;
  this.spinner.show();
//  const delayTime="delayTime";
//  const parameter="parameter";
  this.api.GETRunningDelayWorksDetails(delayTime,parameter,divisionID,districtid,mainSchemeId,contractid).subscribe(
    (res) => {
      this.dispatchData = res.map((item: RunningDelayWorksDetails, index: number) => ({
        ...item,
        sno: index + 1
      }));
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
fetchDataBasedOnChartSelection_V(delayTime:any,parameter:any,contractid: any, seriesName: string): void {
 this.selectedParameter=delayTime;
  // console.log(`contractid ID: ${contractid}, Series: ${seriesName}`);
  const  districtid=0;
  const mainSchemeId=0;
  const divisionID=0;
  // const contractid=0;
  this.spinner.show();
//  const delayTime="delayTime";
//  const parameter="parameter";
  this.api.GETRunningDelayWorksDetails(delayTime,parameter,divisionID,districtid,mainSchemeId,contractid).subscribe(
    (res) => {
      this.dispatchData = res.map((item: RunningDelayWorksDetails, index: number) => ({
        ...item,
        sno: index + 1
      }));
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
      { title: 'S.No', dataKey: 'sno' },
      { title: 'Head', dataKey: 'head' },
      { title: 'Division', dataKey: 'divName_En' },
      { title: 'District', dataKey: 'district' },
      { title: 'Block', dataKey: 'blockname' },
      { title: 'AS Letter No', dataKey: 'letterNo' },
      { title: 'Approver', dataKey: 'approver' },
      { title: 'Work', dataKey: 'work' },
      // { title: 'AS Date', dataKey: 'aadt' },
      // { title: 'AS Amount(in Lacs)', dataKey: 'asAmt' },
      { title: 'TS Date', dataKey: 'tsDate' },
      { title: 'TS Amount(in Lacs)', dataKey: 'tsamt' },
      { title: 'Tender Type', dataKey: 'tType' },
      { title: 'NIT Reference', dataKey: 'tenderReference' },
      { title: 'NIT/Sanction DT', dataKey: 'dateOfIssueNIT' },
      { title: 'Acceptance Letter RefNo', dataKey: 'acceptanceLetterRefNo' },
      { title: 'Accepted DT', dataKey: 'acceptLetterDT' },
      // { title: 'Rate%', dataKey: 'sanctionRate' },
      // { title: 'Sanction', dataKey: 'sanctionDetail' },
      // { title: 'Amount Of Contract(In Lacs)', dataKey: 'totalAmountOfContract' },
      // { title: 'Work Order DT', dataKey: 'wrokOrderDT' }, // (Consider renaming in data)
      { title: 'Time Allowed', dataKey: 'timeAllowed' },
      { title: 'Due DT Time PerAdded', dataKey: 'dueDTTimePerAdded' },
      { title: 'Delay/On Time Days', dataKey: 'delayDays' },
      // { title: 'Work Order RefNo', dataKey: 'agreementRefNo' },
      { title: 'Contractor ID/Class', dataKey: 'cid' },
      { title: 'Contractor', dataKey: 'contractorNAme' }, // (Possible typo: "contractorNAme" should be "contractorName"?)
      { title: 'Contractor Mobile No', dataKey: 'mobNo' },
      { title: 'Last Progress', dataKey: 'lProgress' },
      { title: 'Progress DT', dataKey: 'progressDT' },
      { title: 'Exp.Comp DT', dataKey: 'expcompdt' },
      { title: 'Delay Reason', dataKey: 'delayreason' },
      { title: 'Sub Engineer', dataKey: 'subengname' },
      { title: 'Asst.Eng', dataKey: 'aeName' },
      { title: 'Work ID', dataKey: 'work_id' },
      // { title: 'AS Letter', dataKey: 'asLetter' },
    ];
    const rows = this.dispatchData.map((row) => ({
      sno: row.sno,
      head: row.head,
      divName_En:row.divName_En,
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
      // sanctionRate: row.sanctionRate,
      // sanctionDetail: row.sanctionDetail,
      // totalAmountOfContract: row.totalAmountOfContract,
      workorderDT: row.workorderDT,
      timeAllowed: row.timeAllowed,
      dueDTTimePerAdded: row.dueDTTimePerAdded,
      delayDays: row.delayDays,
      // agreementRefNo: row.agreementRefNo,
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
      // asLetter: row.asLetter,
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
  onButtonClick2(ASID:any,workid:any): void {
    //  this.value='Active';
    // window.open('https://cgmsc.gov.in/himisr/Upload/W3900002AS2.pdf', '_blank');
      // alert(ASID);
      // alert(this.value);
      // return;
      // asLetterName
      // filename
      this.spinner.show();
      this.api.GETASFile(ASID,workid)
        .subscribe(
          (res) => {
            // this.ASFileData=res;
            const filename = res[0]?.filename; // Ensure `res[0]` exists
            const URL = res[0]?.asLetterName;
            
            if (filename) {
              window.open(URL, '_blank');
            } else {
              alert("⚠️ Alert: AS Letter Not Found!\n\nThe requested document is missing.\nPlease try again later or contact support.");
              // alert("⚠️ Alert: AS Letter Not Found!\n\nThe requested document (AS Letter) is not available at this moment.\nPlease check again later or contact support for further assistance.");
            }
          //  const URL =this.ASFileData[0].asLetterName;
          // window.open('https://cgmsc.gov.in/himisr/Upload/W3900002AS2.pdf', '_blank');
  
            // console.log('res:', res);
            console.log('ASFileData:',this.ASFileData);
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            alert(`Error fetching data: ${error.message}`);
          }
        );
     }
     
     InsertUserPageViewLog() {
      try {
        // debugger
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
}

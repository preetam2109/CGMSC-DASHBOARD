import { NgFor, CommonModule, DatePipe, NgStyle,Location } from '@angular/common';
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
import { InsertUserPageViewLogmodal} from 'src/app/Model/DashLoginDDL';
import { ASFile, PriceEvaluation, PriceEvaluationDetails, TenderEvaluation, TenderEvaluationDetails } from 'src/app/Model/DashProgressCount';
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
  selector: 'app-tender-evaluation',
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
  templateUrl: './tender-evaluation.component.html',
  styleUrl: './tender-evaluation.component.css'
})
export class TenderEvaluationComponent {
 //#region chart

 @ViewChild('chart') chart: ChartComponent | undefined;
 @ViewChild('itemDetailsModal') itemDetailsModal: any;
 @ViewChild('itemDetailsModal1') itemDetailsModal1: any;
 public cO: Partial<ChartOptions> | undefined;
 chartOptions!: ChartOptions; // For bar chart
 chartOptions2!: ChartOptions; // For bar charta
 chartOptionsLine!: ChartOptions; // For line chart
 chartOptionsLine2!: ChartOptions; // For line chart

 chartOptions_I!: ChartOptions; // For bar chart
 chartOptions_II!: ChartOptions; // For bar charta
 chartOptions_III!: ChartOptions; // For line chart
 chartOptions_IV!: ChartOptions; // For line chart
 //#endregion
  //#region DataBase Table
   dataSource!: MatTableDataSource<TenderEvaluationDetails>;
   dataSource1!: MatTableDataSource<PriceEvaluationDetails>;
   @ViewChild('paginator') paginator!: MatPaginator;
   @ViewChild('sort') sort!: MatSort;
   @ViewChild('paginator1') paginator1!: MatPaginator;
   @ViewChild('sort1') sort1!: MatSort;
   dispatchData: TenderEvaluationDetails[] = [];
   dispatchData1: PriceEvaluationDetails[] = [];
 
   //#endregion
   TenderEvaluationTotal: TenderEvaluation[] = [];
   TenderEvaluationDivision: TenderEvaluation[] = [];
   TenderEvaluationScheme: TenderEvaluation[] = [];
   TenderEvaluationDistrict: TenderEvaluation[] = [];

   PriceEvaluationTotal: PriceEvaluation[] = [];
   PriceEvaluationDivision: PriceEvaluation[] = [];
   PriceEvaluationScheme: PriceEvaluation[] = [];
   PriceEvaluationDistrict: PriceEvaluation[] = [];
   ASFileData: ASFile[] = [];
selectedTabIndex: number=0;
 divisionid: any;
 himisDistrictid: any;
 TimeStatus:any;
 mainschemeid:any;
 name:any;
 Selectedname:any;
 nosWorks:any;
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
 this.dataSource = new MatTableDataSource<TenderEvaluationDetails>([]);
 this.dataSource1 = new MatTableDataSource<PriceEvaluationDetails>([]);
}

ngOnInit() {
 this.initializeChartOptions();
 this.initializeChartOptions2();
 
if(this.selectedTabIndex == 0){
    this.name="Technical Evaluation Details"
  this.GETTenderEvaluationTotal();
   this.GETTenderEvaluationDivision();
   this.GETTenderEvaluationScheme();
   this.GETTenderEvaluationDistrict();
   this.InsertUserPageViewLog();
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
           const apiData = this.TenderEvaluationDivision; // Replace with the actual data source or API response
           // Find the data in your API response that matches the selectedCategory
           const selectedData = apiData.find(
             (data) => data.name === selectedCategory
           );
           // console.log("selectedData chart1",selectedData)
           if (selectedData) {
             const id = selectedData.id; // Extract the id from the matching entry
             this.Selectedname= selectedData.name;
             this.nosWorks= selectedData.nosWorks;
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
     text: 'Division-wise Technical Evaluation',
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
           const apiData = this.TenderEvaluationScheme; // Replace with the actual data source or API response
           // Find the data in your API response that matches the selectedCategory
           const selectedData = apiData.find(
             (data) => data.name === selectedCategory
           );
           // console.log("selectedData chart1",selectedData)
           if (selectedData) {
             const id = selectedData.id; // Extract the id from the matching entry
             this.Selectedname= selectedData.name;
             this.nosWorks= selectedData.nosWorks;
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
     text: 'Scheme-wise Technical Evaluation',
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
           const apiData = this.TenderEvaluationDistrict; // Replace with the actual data source or API response
           // Find the data in your API response that matches the selectedCategory
           const selectedData = apiData.find(
             (data) => data.name === selectedCategory
           );
           // console.log("selectedData chart1",selectedData)
           if (selectedData) {
             const id = selectedData.id; // Extract the id from the matching entry
             this.Selectedname= selectedData.name;
             this.nosWorks= selectedData.nosWorks;
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
     text: 'District-wise Technical Evaluation',
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
           const apiData = this.TenderEvaluationTotal; // Replace with the actual data source or API response
           // Find the data in your API response that matches the selectedCategory
           const selectedData = apiData.find(
             (data) => data.name === selectedCategory
           );
           // console.log("selectedData chart1",selectedData)
           if (selectedData) {
             const id = selectedData.id; // Extract the id from the matching entry
             this.Selectedname= selectedData.name;
             this.nosWorks= selectedData.nosWorks;
             this.fetchDataBasedOnChartSelectionTotal(0, selectedSeries);
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
      columnWidth:'30%',
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
     text: 'Technical Evaluation Summary',
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

 this.chartOptions_I = {
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
           this.chartOptions_I?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
         const selectedSeries =
           this.chartOptions_I?.series?.[seriesIndex]?.name;
         // Ensure the selectedCategory and selectedSeries are valid
         if (selectedCategory && selectedSeries) {
           const apiData = this.PriceEvaluationDivision; // Replace with the actual data source or API response
          //  console.log('data=',this.PriceEvaluationDivision);
           // Find the data in your API response that matches the selectedCategory
           const selectedData = apiData.find(
             (data) => data.name === selectedCategory
           );
           // console.log("selectedData chart1",selectedData)
           if (selectedData) {
             const id = selectedData.id; // Extract the id from the matching entry
             this.Selectedname= selectedData.name;
             this.nosWorks= selectedData.nosWorks;
             this.fetchDataBasedOnChartSelectionDivisionPE(id, selectedSeries);
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
     text: 'Division-wise Price Evaluation',
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
         // Ensure the selectedCategory and selectedSeries are valid
         if (selectedCategory && selectedSeries) {
           const apiData = this.PriceEvaluationScheme; // Replace with the actual data source or API response
           // Find the data in your API response that matches the selectedCategory
           const selectedData = apiData.find(
             (data) => data.name === selectedCategory
           );
           // console.log("selectedData chart1",selectedData)
           if (selectedData) {
             const id = selectedData.id; // Extract the id from the matching entry
             this.Selectedname= selectedData.name;
             this.nosWorks= selectedData.nosWorks;
             this.fetchDataBasedOnChartSelectionmainSchemePE(id, selectedSeries);
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
     text: 'Scheme-wise Price Evaluation',
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
         // Ensure the selectedCategory and selectedSeries are valid
         if (selectedCategory && selectedSeries) {
           const apiData = this.PriceEvaluationDistrict; // Replace with the actual data source or API response
           // Find the data in your API response that matches the selectedCategory
           const selectedData = apiData.find(
             (data) => data.name === selectedCategory
           );
           // console.log("selectedData chart1",selectedData)
           if (selectedData) {
             const id = selectedData.id; // Extract the id from the matching entry
             this.Selectedname= selectedData.name;
             this.nosWorks= selectedData.nosWorks;
             this.fetchDataBasedOnChartSelectionDisPE(id, selectedSeries);
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
     text: 'District-wise Price Evaluation',
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
           this.chartOptions_IV?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
         const selectedSeries =
           this.chartOptions_IV?.series?.[seriesIndex]?.name;
         // Ensure the selectedCategory and selectedSeries are valid
         if (selectedCategory && selectedSeries) {
           const apiData = this.PriceEvaluationTotal; // Replace with the actual data source or API response
           // Find the data in your API response that matches the selectedCategory
           const selectedData = apiData.find(
             (data) => data.name === selectedCategory
           );
           // console.log("selectedData chart1",selectedData)
           if (selectedData) {
             const id = selectedData.id; // Extract the id from the matching entry
             this.Selectedname= selectedData.name;
             this.nosWorks= selectedData.nosWorks;
             this.fetchDataBasedOnChartSelectionTotalPE(0, selectedSeries);
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
          columnWidth:'30%',
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
    //  text: 'Total Price Evaluation',
     text: 'Price Evaluation Summary',

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
  this.name="Technical Evaluation Details"

   this.GETTenderEvaluationTotal();
   this.GETTenderEvaluationDivision();
   this.GETTenderEvaluationScheme();
   this.GETTenderEvaluationDistrict();
 }else{
  this.name="Price Evaluation Details"

  this.GETPEvaluationTotal();
   this.GETPEvaluationDivision();
   this.GETPEvaluationScheme();
   this.GETPEvaluationDistrict();
 
 }
}
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  this.dataSource1.paginator = this.paginator1;
  this.dataSource1.sort = this.sort1;
}
//#region Get API data Tender Evaluation
GETTenderEvaluationTotal(): void {
this.spinner.show();
var roleName = localStorage.getItem('roleName');
if (roleName == 'Division') {
 this.divisionid = sessionStorage.getItem('divisionID');
var RPType ='Division';
 this.chartOptionsLine2.chart.height = '200px';
 this.himisDistrictid = 0;
 this.mainschemeid=0;
} else if (roleName == 'Collector') {
 this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
var RPType="District";
 this.divisionid = 0;
 this.mainschemeid=0;
 this.chartOptionsLine2.chart.height = '400px';
} else {
 this.divisionid = 0;
 this.himisDistrictid = 0;
 this.mainschemeid=0;
 this.chartOptionsLine2.chart.height = '300';
}
// this.TimeStatus=this.selectedTabIndex == 0?'Live':'Timeover';
var RPType = 'Total';
// RPType=Total&divisionid=0&districtid=0&mainschemeid=0&TimeStatus=0
 this.api.GETTenderEvaluation( RPType, this.divisionid,this.himisDistrictid,this.mainschemeid)
   .subscribe(
     (data: any) => {
       this.TenderEvaluationTotal = data;
       // console.log('API Response total:', this.WoIssuedTotal);
      //  console.log('API Response data:', data);
      

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
           totalValuecr: any;avgDaysSince:any
         }) => {
           id.push(item.id);
           name.push(item.name);
           nosWorks.push(item.nosWorks);
           nosTender.push(item.nosTender);
           totalValuecr.push(item.totalValuecr);
           avgDaysSince.push(item.avgDaysSince);
         }
       );

       this.chartOptionsLine2.series = [
        {
          name: 'No. of Works',
          data: nosWorks,
          color: '#eeba0b',
        },
        {
          name: 'No. of Tender',
          data: nosTender,
         //  color: 'rgb(0, 143, 251)',
         color: '#6a6afd',
        },
        {
          name: 'Value(in Cr)',
          data: totalValuecr,
          color: 'rgba(93, 243, 174, 0.85)',
        },
       //  { name: 'Avg Days Since', data: avgDaysSince, color:' rgba(181, 7, 212, 0.85)' },
        { name: 'Avg Days Since Opened Date', data: avgDaysSince,color:'rgba(250, 199, 161, 0.85)'},
        //  {
        //    name: 'Total Numbers of Works',
        //    data: nosWorks,
        //    color: '#eeba0b',
        //  },
        //  {
        //    name: 'Total Numbers of Tender',
        //    data: nosTender,
        //    color: 'rgb(0, 143, 251)',
        //  },
        //  {
        //    name: 'Total Value in Cr',
        //    data: totalValuecr,
        //    color: 'rgba(93, 243, 174, 0.85)',
        //  },
        // //  { name: 'Avg Days Since', data: avgDaysSince, color:' rgba(181, 7, 212, 0.85)' },
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
GETTenderEvaluationDivision(): void {
this.spinner.show();
var roleName = localStorage.getItem('roleName');
if (roleName == 'Division') {
 this.divisionid = sessionStorage.getItem('divisionID');
var RPType ='Division';
 this.chartOptions.chart.height = '200px';
 this.himisDistrictid = 0;
 this.mainschemeid=0;
} else if (roleName == 'Collector') {
 this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
var RPType="District";
 this.divisionid = 0;
 this.mainschemeid=0;
 this.chartOptions.chart.height = '400px';
} else {
 this.divisionid = 0;
 this.himisDistrictid = 0;
 this.mainschemeid=0;
 this.chartOptions.chart.height = '300';
}
this.TimeStatus=this.selectedTabIndex == 0?'Live':'Timeover';
var RPType = 'Division';
// RPType=Total&divisionid=0&districtid=0&mainschemeid=0&TimeStatus=0
 this.api.GETTenderEvaluation( RPType, this.divisionid,this.himisDistrictid,this.mainschemeid)
   .subscribe(
     (data: any) => {
       this.TenderEvaluationDivision = data;
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
           totalValuecr: any;avgDaysSince:any
         }) => {
           id.push(item.id);
           name.push(item.name);
           nosWorks.push(item.nosWorks);
           nosTender.push(item.nosTender);
           totalValuecr.push(item.totalValuecr);
           avgDaysSince.push(item.avgDaysSince);
         }
       );

       this.chartOptions.series = [
        {
          name: 'No. of Works',
          data: nosWorks,
          color: '#eeba0b',
        },
        {
          name: 'No. of Tender',
          data: nosTender,
         //  color: 'rgb(0, 143, 251)',
         color: '#6a6afd',
        },
        {
          name: 'Value(in Cr)',
          data: totalValuecr,
          color: 'rgba(93, 243, 174, 0.85)',
        },
       //  { name: 'Avg Days Since', data: avgDaysSince, color:' rgba(181, 7, 212, 0.85)' },
        { name: 'Avg Days Since Opened Date', data: avgDaysSince,color:'rgba(250, 199, 161, 0.85)'},
        //  {
        //    name: 'Total Numbers of Works',
        //    data: nosWorks,
        //    color: '#eeba0b',
        //  },
        //  {
        //    name: 'Total Numbers of Tender',
        //    data: nosTender,
        //    color: 'rgb(0, 143, 251)',
        //  },
        //  {
        //    name: 'Total Value in Cr',
        //    data: totalValuecr,
        //    color: 'rgba(93, 243, 174, 0.85)',
        //  },
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
GETTenderEvaluationScheme(): void {
this.spinner.show();
var roleName = localStorage.getItem('roleName');
if (roleName == 'Division') {
 this.divisionid = sessionStorage.getItem('divisionID');
var RPType ='Division';
 this.chartOptions2.chart.height = '200px';
 this.himisDistrictid = 0;
 this.mainschemeid=0;
} else if (roleName == 'Collector') {
 this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
var RPType="District";
 this.divisionid = 0;
 this.mainschemeid=0;
 this.chartOptions2.chart.height = '400px';
} else {
 this.divisionid = 0;
 this.himisDistrictid = 0;
 this.mainschemeid=0;
 this.chartOptions2.chart.height = '300';
}
this.TimeStatus=this.selectedTabIndex == 0?'Live':'Timeover';
// alert( this.TimeStatus)
var RPType = 'Scheme';
// RPType=Total&divisionid=0&districtid=0&mainschemeid=0&TimeStatus=0
 this.api.GETTenderEvaluation( RPType, this.divisionid,this.himisDistrictid,this.mainschemeid)
   .subscribe(
     (data: any) => {
       this.TenderEvaluationScheme = data;
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
           totalValuecr: any;avgDaysSince:any
         }) => {
           id.push(item.id);
           name.push(item.name);
           nosWorks.push(item.nosWorks);
           nosTender.push(item.nosTender);
           totalValuecr.push(item.totalValuecr);
           avgDaysSince.push(item.avgDaysSince);
         }
       );

       this.chartOptions2.series = [
        {
          name: 'No. of Works',
          data: nosWorks,
          color: '#eeba0b',
        },
        {
          name: 'No. of Tender',
          data: nosTender,
         //  color: 'rgb(0, 143, 251)',
         color: '#6a6afd',
        },
        {
          name: 'Value(in Cr)',
          data: totalValuecr,
          color: 'rgba(93, 243, 174, 0.85)',
        },
       //  { name: 'Avg Days Since', data: avgDaysSince, color:' rgba(181, 7, 212, 0.85)' },
        { name: 'Avg Days Since Opened Date', data: avgDaysSince,color:'rgba(250, 199, 161, 0.85)'},
        //  {
        //    name: 'Total Numbers of Works',
        //    data: nosWorks,
        //    color: '#eeba0b',
        //  },
        //  {
        //    name: 'Total Numbers of Tender',
        //    data: nosTender,
        //    color: 'rgb(0, 143, 251)',
        //  },
        //  {
        //    name: 'Total Value in Cr',
        //    data: totalValuecr,
        //    color: 'rgba(93, 243, 174, 0.85)',
        //  },
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
// var RPType ='Division';
 this.chartOptionsLine.chart.height = '200px';
 this.himisDistrictid = 0;
 this.mainschemeid=0;
} else if (roleName == 'Collector') {
 this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
// var RPType="District";
 this.divisionid = 0;
 this.mainschemeid=0;
 this.chartOptionsLine.chart.height = '400px';
} else {
 this.divisionid = 0;
 this.himisDistrictid = 0;
 this.mainschemeid=0;
 this.chartOptionsLine.chart.height = '900';
}
this.TimeStatus=this.selectedTabIndex == 0?'Live':'Timeover';
// alert( this.TimeStatus)
var RPType = 'District';
// RPType=Total&divisionid=0&districtid=0&mainschemeid=0&TimeStatus=0
 this.api.GETTenderEvaluation( RPType, this.divisionid,this.himisDistrictid,this.mainschemeid)
   .subscribe(
     (data: any) => {
       this.TenderEvaluationDistrict = data;
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
           totalValuecr: any;avgDaysSince:any
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
          name: 'No. of Works',
          data: nosWorks,
          color: '#eeba0b',
        },
        {
          name: 'No. of Tender',
          data: nosTender,
         //  color: 'rgb(0, 143, 251)',
         color: '#6a6afd',
        },
        {
          name: 'Value(in Cr)',
          data: totalValuecr,
          color: 'rgba(93, 243, 174, 0.85)',
        },
       //  { name: 'Avg Days Since', data: avgDaysSince, color:' rgba(181, 7, 212, 0.85)' },
        { name: 'Avg Days Since Opened Date', data: avgDaysSince,color:'rgba(250, 199, 161, 0.85)'},
        //  {
        //    name: 'Total Numbers of Works',
        //    data: nosWorks,
        //    color: '#eeba0b',
        //  },
        //  {
        //    name: 'Total Numbers of Tender',
        //    data: nosTender,
        //    color: 'rgb(0, 143, 251)',
        //  },
        //  {
        //    name: 'Total Value in Cr',
        //    data: totalValuecr,
        //    color: 'rgba(93, 243, 174, 0.85)',
        //  },
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
//#region Get API data Price Evaluation
GETPEvaluationTotal(): void {
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
   this.chartOptions_IV.chart.height = '300';
  }
  // this.TimeStatus=this.selectedTabIndex == 0?'Live':'Timeover';
  var RPType = 'Total';
  // RPType=Total&divisionid=0&districtid=0&mainschemeid=0&TimeStatus=0
   this.api.GETPriceEvaluation( RPType, this.divisionid,this.himisDistrictid,this.mainschemeid)
     .subscribe(
       (data: any) => {
         this.PriceEvaluationTotal = data;
         // console.log('API Response total:', this.WoIssuedTotal);
        //  console.log('API Response data:', data);
        
  
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
             totalValuecr: any;avgDaysSince:any
           }) => {
             id.push(item.id);
             name.push(item.name);
             nosWorks.push(item.nosWorks);
             nosTender.push(item.nosTender);
             totalValuecr.push(item.totalValuecr);
             avgDaysSince.push(item.avgDaysSince);
           }
         );
  
         this.chartOptions_IV.series = [
           {
             name: 'No. of Works',
             data: nosWorks,
             color: '#eeba0b',
           },
           {
             name: 'No. of Tender',
             data: nosTender,
            //  color: 'rgb(0, 143, 251)',
            color: '#6a6afd',
           },
           {
             name: 'Value(in Cr)',
             data: totalValuecr,
             color: 'rgba(93, 243, 174, 0.85)',
           },
          //  { name: 'Avg Days Since', data: avgDaysSince, color:' rgba(181, 7, 212, 0.85)' },
           { name: 'Avg Days Since Opened Date', data: avgDaysSince,color:'rgba(250, 199, 161, 0.85)'},
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
  GETPEvaluationDivision(): void {
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
  this.TimeStatus=this.selectedTabIndex == 0?'Live':'Timeover';
  var RPType = 'Division';
  // RPType=Total&divisionid=0&districtid=0&mainschemeid=0&TimeStatus=0
   this.api.GETPriceEvaluation(RPType, this.divisionid,this.himisDistrictid,this.mainschemeid)
     .subscribe(
       (data: any) => {
         this.PriceEvaluationDivision = data;
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
             totalValuecr: any;avgDaysSince:any
           }) => {
             id.push(item.id);
             name.push(item.name);
             nosWorks.push(item.nosWorks);
             nosTender.push(item.nosTender);
             totalValuecr.push(item.totalValuecr);
             avgDaysSince.push(item.avgDaysSince);
           }
         );
  
         this.chartOptions_I.series = [
          {
            name: 'No. of Works',
            data: nosWorks,
            color: '#eeba0b',
          },
          {
            name: 'No. of Tender',
            data: nosTender,
           //  color: 'rgb(0, 143, 251)',
           color: '#6a6afd',
          },
          {
            name: 'Value(in Cr)',
            data: totalValuecr,
            color: 'rgba(93, 243, 174, 0.85)',
          },
         //  { name: 'Avg Days Since', data: avgDaysSince, color:' rgba(181, 7, 212, 0.85)' },
          { name: 'Avg Days Since Opened Date', data: avgDaysSince,color:'rgba(250, 199, 161, 0.85)'},
          //  {
          //    name: 'Total Numbers of Works',
          //    data: nosWorks,
          //    color: '#eeba0b',
          //  },
          //  {
          //    name: 'Total Numbers of Tender',
          //    data: nosTender,
          //    color: 'rgb(0, 143, 251)',
          //  },
          //  {
          //    name: 'Total Value in Cr',
          //    data: totalValuecr,
          //    color: 'rgba(93, 243, 174, 0.85)',
          //  },
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
  GETPEvaluationScheme(): void {
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
  this.TimeStatus=this.selectedTabIndex == 0?'Live':'Timeover';
  // alert( this.TimeStatus)
  var RPType = 'Scheme';
  // RPType=Total&divisionid=0&districtid=0&mainschemeid=0&TimeStatus=0
   this.api.GETPriceEvaluation( RPType, this.divisionid,this.himisDistrictid,this.mainschemeid)
     .subscribe(
       (data: any) => {
         this.PriceEvaluationScheme = data;
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
             totalValuecr: any;avgDaysSince:any
           }) => {
             id.push(item.id);
             name.push(item.name);
             nosWorks.push(item.nosWorks);
             nosTender.push(item.nosTender);
             totalValuecr.push(item.totalValuecr);
             avgDaysSince.push(item.avgDaysSince);
           }
         );
  
         this.chartOptions_II.series = [
          {
            name: 'No. of Works',
            data: nosWorks,
            color: '#eeba0b',
          },
          {
            name: 'No. of Tender',
            data: nosTender,
           //  color: 'rgb(0, 143, 251)',
           color: '#6a6afd',
          },
          {
            name: 'Value(in Cr)',
            data: totalValuecr,
            color: 'rgba(93, 243, 174, 0.85)',
          },
         //  { name: 'Avg Days Since', data: avgDaysSince, color:' rgba(181, 7, 212, 0.85)' },
          { name: 'Avg Days Since Opened Date', data: avgDaysSince,color:'rgba(250, 199, 161, 0.85)'},
          //  {
          //    name: 'Total Numbers of Works',
          //    data: nosWorks,
          //    color: '#eeba0b',
          //  },
          //  {
          //    name: 'Total Numbers of Tender',
          //    data: nosTender,
          //    color: 'rgb(0, 143, 251)',
          //  },
          //  {
          //    name: 'Total Value in Cr',
          //    data: totalValuecr,
          //    color: 'rgba(93, 243, 174, 0.85)',
          //  },
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
  GETPEvaluationDistrict(): void {
  this.spinner.show();
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
   this.divisionid = sessionStorage.getItem('divisionID');
  // var RPType ='Division';
   this.chartOptions_III.chart.height = '200px';
   this.himisDistrictid = 0;
   this.mainschemeid=0;
  } else if (roleName == 'Collector') {
   this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
  // var RPType="District";
   this.divisionid = 0;
   this.mainschemeid=0;
   this.chartOptions_III.chart.height = '400px';
  } else {
   this.divisionid = 0;
   this.himisDistrictid = 0;
   this.mainschemeid=0;
   this.chartOptions_III.chart.height = '500';
  }
  this.TimeStatus=this.selectedTabIndex == 0?'Live':'Timeover';
  // alert( this.TimeStatus)
  var RPType = 'District';
  // RPType=Total&divisionid=0&districtid=0&mainschemeid=0&TimeStatus=0
   this.api.GETPriceEvaluation( RPType, this.divisionid,this.himisDistrictid,this.mainschemeid)
     .subscribe(
       (data: any) => {
         this.PriceEvaluationDistrict = data;
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
             totalValuecr: any;avgDaysSince:any
           }) => {
             id.push(item.id);
             name.push(item.name);
             nosWorks.push(item.nosWorks);
             nosTender.push(item.nosTender);
             totalValuecr.push(item.totalValuecr);
             avgDaysSince.push(item.avgDaysSince);
           }
         );
  
         this.chartOptions_III.series = [
          {
            name: 'No. of Works',
            data: nosWorks,
            color: '#eeba0b',
          },
          {
            name: 'No. of Tender',
            data: nosTender,
           //  color: 'rgb(0, 143, 251)',
           color: '#6a6afd',
          },
          {
            name: 'Value(in Cr)',
            data: totalValuecr,
            color: 'rgba(93, 243, 174, 0.85)',
          },
         //  { name: 'Avg Days Since', data: avgDaysSince, color:' rgba(181, 7, 212, 0.85)' },
          { name: 'Avg Days Since Opened Date', data: avgDaysSince,color:'rgba(250, 199, 161, 0.85)'},
          //  {
          //    name: 'Total Numbers of Works',
          //    data: nosWorks,
          //    color: '#eeba0b',
          //  },
          //  {
          //    name: 'Total Numbers of Tender',
          //    data: nosTender,
          //    color: 'rgb(0, 143, 251)',
          //  },
          //  {
          //    name: 'Total Value in Cr',
          //    data: totalValuecr,
          //    color: 'rgba(93, 243, 174, 0.85)',
          //  },
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
  // #endregion

// #region dataBase tender Evalution
fetchDataBasedOnChartSelectionTotal(  divisionID: any, seriesName: string ): void {
  // ;
//  console.log(`Selected ID: ${divisionID}, Series: ${seriesName}`);
 const distid = 0;
 const mainSchemeId = 0;
 this.spinner.show();
//  this.TimeStatus=this.selectedTabIndex == 0?'Live':'Timeover';
 this.api.GETTenderEvaluationDetails(divisionID,mainSchemeId,distid)
   .subscribe(
     (res) => {
       this.dispatchData = res.map(
         (item: TenderEvaluationDetails, index: number) => ({
           ...item,
           sno: index + 1,
         })
       );
      //  console.log('res:', res);
      //  console.log('GETTenderEvaluationDetails=:', this.dispatchData);
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
fetchDataBasedOnChartSelectionDivision(  divisionID: any, seriesName: string ): void {
//  console.log(`Selected ID: ${divisionID}, Series: ${seriesName}`);
 const distid = 0;
 const mainSchemeId = 0;
const TimeStatus="Live";
 this.spinner.show();
 // getTenderDetails?divisionId=D1004&mainSchemeId=0&distid=0&TimeStatus=Live
 this.TimeStatus=this.selectedTabIndex == 0?'Live':'Timeover';
 // alert(this.TimeStatus);
 this.api.GETTenderEvaluationDetails(divisionID,mainSchemeId,distid)
   .subscribe(
     (res) => {
       this.dispatchData = res.map(
         (item: TenderEvaluationDetails, index: number) => ({
           ...item,
           sno: index + 1,
         })
       );
      //  console.log('res:', res);
      //  console.log('dispatchData=:', this.dispatchData);
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
fetchDataBasedOnChartSelectionDistrict(  distid: any, seriesName: string ): void {
//  console.log(`Selected ID: ${distid}, Series: ${seriesName}`);
 const divisionID = 0;
 const mainSchemeId = 0;
const TimeStatus="Live";
 this.spinner.show();
 // getTenderDetails?divisionId=D1004&mainSchemeId=0&distid=0&TimeStatus=Live
 this.TimeStatus=this.selectedTabIndex == 0?'Live':'Timeover';
 // alert(this.TimeStatus);
 this.api.GETTenderEvaluationDetails(divisionID,mainSchemeId,distid)
   .subscribe(
     (res) => {
       this.dispatchData = res.map(
         (item: TenderEvaluationDetails, index: number) => ({
           ...item,
           sno: index + 1,
         })
       );
      //  console.log('res:', res);
      //  console.log('dispatchData=:', this.dispatchData);
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
fetchDataBasedOnChartSelectionScheme(  mainSchemeId: any, seriesName: string ): void {
//  console.log(`Selected ID: ${mainSchemeId}, Series: ${seriesName}`);
 const divisionID = 0;
 const distid = 0;
const TimeStatus="Live";
 this.spinner.show();
 // getTenderDetails?divisionId=D1004&mainSchemeId=0&distid=0&TimeStatus=Live
 this.TimeStatus=this.selectedTabIndex == 0?'Live':'Timeover';
 // alert(this.TimeStatus);
 this.api.GETTenderEvaluationDetails(divisionID,mainSchemeId,distid)
   .subscribe(
     (res) => {
       this.dispatchData = res.map(
         (item: TenderEvaluationDetails, index: number) => ({
           ...item,
           sno: index + 1,
         })
       );
      //  console.log('res:', res);
      //  console.log('dispatchData=:', this.dispatchData);
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
//#endregion

// #region Price Evaluation Details
fetchDataBasedOnChartSelectionTotalPE(  divisionID: any, seriesName: string ): void {
  // console.log(`Selected ID: ${divisionID}, Series: ${seriesName}`);
  const distid = 0;
  const mainSchemeId = 0;
  this.spinner.show();
 //  this.TimeStatus=this.selectedTabIndex == 0?'Live':'Timeover';
  this.api.GETPriceEvaluationDetails(divisionID,mainSchemeId,distid)
    .subscribe(
      (res) => {
        this.dispatchData1 = res.map(
          (item: PriceEvaluationDetails, index: number) => ({
            ...item,
            sno: index + 1,
          })
        );
        // console.log('res:', res);
        // console.log('dispatchData1=:', this.dispatchData1);
        this.dataSource1.data = this.dispatchData1;
        this.dataSource1.paginator = this.paginator1;
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
fetchDataBasedOnChartSelectionDivisionPE(  divisionID: any, seriesName: string ): void {
  // console.log(`Selected ID: ${divisionID}, Series: ${seriesName}`);
  const distid = 0;
  const mainSchemeId = 0;
  this.spinner.show();
 //  this.TimeStatus=this.selectedTabIndex == 0?'Live':'Timeover';
  this.api.GETPriceEvaluationDetails(divisionID,mainSchemeId,distid)
    .subscribe(
      (res) => {
        this.dispatchData1 = res.map(
          (item: PriceEvaluationDetails, index: number) => ({
            ...item,
            sno: index + 1,
          })
        );
        // console.log('res:', res);
        // console.log('dispatchData1=:', this.dispatchData1);
        this.dataSource1.data = this.dispatchData1;
        this.dataSource1.paginator = this.paginator1;
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
fetchDataBasedOnChartSelectionDisPE(  distid: any, seriesName: string ): void {
  // console.log(`Selected ID: ${distid}, Series: ${seriesName}`);
  const divisionID = 0;
  const mainSchemeId = 0;
  this.spinner.show();
 //  this.TimeStatus=this.selectedTabIndex == 0?'Live':'Timeover';
  this.api.GETPriceEvaluationDetails(divisionID,mainSchemeId,distid)
    .subscribe(
      (res) => {
        this.dispatchData1 = res.map(
          (item: PriceEvaluationDetails, index: number) => ({
            ...item,
            sno: index + 1,
          })
        );
        // console.log('res:', res);
        // console.log('dispatchData1=:', this.dispatchData1);
        this.dataSource1.data = this.dispatchData1;
        this.dataSource1.paginator = this.paginator1;
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
fetchDataBasedOnChartSelectionmainSchemePE(  mainSchemeId: any, seriesName: string ): void {
  // console.log(`Selected ID: ${mainSchemeId}, Series: ${seriesName}`);
  const divisionID = 0;
  const distid = 0;
  this.spinner.show();
 //  this.TimeStatus=this.selectedTabIndex == 0?'Live':'Timeover';
  this.api.GETPriceEvaluationDetails(divisionID,mainSchemeId,distid)
    .subscribe(
      (res) => {
        this.dispatchData1 = res.map(
          (item: PriceEvaluationDetails, index: number) => ({
            ...item,
            sno: index + 1,
          })
        );
        // console.log('res:', res);
        // console.log('dispatchData1=:', this.dispatchData1);
        this.dataSource1.data = this.dispatchData1;
        this.dataSource1.paginator = this.paginator1;
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
//#endregion
// data filter
applyTextFilter(event: Event) {
const filterValue = (event.target as HTMLInputElement).value;
this.dataSource.filter = filterValue.trim().toLowerCase();
if (this.dataSource.paginator) {
 this.dataSource.paginator.firstPage();
}
}
applyTextFilter1(event: Event) {
const filterValue = (event.target as HTMLInputElement).value;
this.dataSource1.filter = filterValue.trim().toLowerCase();
if (this.dataSource1.paginator) {
 this.dataSource1.paginator.firstPage();
}
}
exportToPDF() {
const doc = new jsPDF('l', 'mm', 'a4');
const columns = [
 { title: 'S.No', dataKey: 'sno' },
 { title: 'AS Letter No', dataKey: 'letterno' },
 { title: 'Head', dataKey: 'head' },
 { title: 'AS Date', dataKey: 'aA_RAA_Date' },
 { title: 'AS Amount', dataKey: 'asAmt' },
 { title: 'District', dataKey: 'district' },
 { title: 'Work ID', dataKey: 'work_id' },
 { title: 'Work Name', dataKey: 'workname' },
 { title: 'Start Dt', dataKey: 'startdt' },
 { title: 'End Dt', dataKey: 'enddt' },
 { title: 'NO of Calls', dataKey: 'noofcalls' },
 { title: 'NIT NO', dataKey: 'tenderno' },
 { title: 'Cover A Opened DT', dataKey: 'tOpnedDT' },
 { title: 'Cover B Opened DT', dataKey: 'topnedbdt' },
 { title: 'Days Since Cov A/B Opned', dataKey: 'daysSinceOpen' },
 { title: 'e-Procno', dataKey: 'eprocno' },
];
const rows = this.dispatchData.map((row) => ({
 sno: row.sno,
 letterNo: row.letterno,
 head: row.head,
 aA_RAA_Date: row.aA_RAA_Date,
 asAmt: row.asAmt,
 district: row.district,
 work_id: row.work_id,
 workname: row.workname,
 startdt: row.startdt,
 enddt: row.enddt,
 noofcalls: row.noofcalls,
 tenderno: row.tenderno,
 tOpnedDT: row.tOpnedDT,
 topnedbdt: row.topnedbdt,
 daysSinceOpen: row.daysSinceOpen,
 eprocno: row.eprocno,
}));

autoTable(doc, {
 columns: columns,
 body: rows,
 startY: 20,
 theme: 'striped',
 headStyles: { fillColor: [22, 160, 133] },
});

doc.save('TechnicalEvaluation.pdf');
}
exportToPDF1() {
const doc = new jsPDF('l', 'mm', 'a4');
const columns = [
 { title: 'S.No', dataKey: 'sno' },
 { title: 'AS Letter No', dataKey: 'letterno' },
 { title: 'Head', dataKey: 'head' },
 { title: 'AS Date', dataKey: 'aA_RAA_Date' },
 { title: 'AS Amount', dataKey: 'asAmt' },
 { title: 'District', dataKey: 'district' },
 { title: 'Work ID', dataKey: 'work_id' },
 { title: 'Work Name', dataKey: 'workname' },
 { title: 'Start Dt', dataKey: 'startdt' },
 { title: 'End Dt', dataKey: 'enddt' },
 { title: 'NO of Calls', dataKey: 'noofcalls' },
 { title: 'NIT NO', dataKey: 'tenderno' },
 { title: 'Cover A Opened DT', dataKey: 'TOpnedDT' },
 { title: 'Days Since Cov A/B Opned', dataKey: 'daysSinceOpen' },
 { title: 'Price Opened DT', dataKey: 'topnedpricedt' },
 { title: 'Sanction', dataKey: 'sanctionDetail' },
 { title: 'Rate %', dataKey: 'SanctionRate' },
 { title: 'Contractor Name', dataKey: 'cnAme' },
 { title: 'Contractor ID', dataKey: 'cid' },
// 'TOpnedDT','daysSinceOpen','topnedpricedt','sanctionDetail','SanctionRate','cnAme','cid','action'

 { title: 'e-Procno', dataKey: 'eprocno' },
];
const rows = this.dispatchData1.map((row) => ({
  // 'TOpnedDT','topnedbdt','daysSinceOpen',
 sno: row.sno,
 letterNo: row.letterno,
 head: row.head,
 aA_RAA_Date: row.aA_RAA_Date,
 asAmt: row.asAmt,
 district: row.district,
 work_id: row.work_id,
 workname: row.workname,
 startdt: row.startdt,
 enddt: row.enddt,
 noofcalls: row.noofcalls,
 tenderno: row.tenderno,
 tOpnedDT: row.tOpnedDT,
 topnedpricedt: row.topnedpricedt,
 daysSinceOpen: row.daysSinceOpen,
 sanctionDetail: row.sanctionDetail,
 sanctionRate: row.sanctionRate,
//  CName: row.CName,
 cnAme: row.cnAme,
 cid: row.cid,
 eprocno: row.eprocno,
}));

autoTable(doc, {
 columns: columns,
 body: rows,
 startY: 20,
 theme: 'striped',
 headStyles: { fillColor: [22, 160, 133] },
});

doc.save('PriceEvaluation.pdf');
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
      console.log('InsertUserPageViewLogdata=',this.InsertUserPageViewLogdata);
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

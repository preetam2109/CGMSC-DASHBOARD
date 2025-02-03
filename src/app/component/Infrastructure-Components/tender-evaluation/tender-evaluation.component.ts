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
import {  PriceEvaluation, TenderEvaluation, TenderEvaluationDetails } from 'src/app/Model/DashProgressCount';
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
 public cO: Partial<ChartOptions> | undefined;
 chartOptions!: ChartOptions; // For bar chart
 chartOptions2!: ChartOptions; // For bar charta
 chartOptionsLine!: ChartOptions; // For line chart
 chartOptionsLine2!: ChartOptions; // For line chart
 //#endregion
  //#region DataBase Table
   dataSource!: MatTableDataSource<TenderEvaluationDetails>;
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
   dispatchData: TenderEvaluationDetails[] = [];
 
   //#endregion
   TenderEvaluationTotal: TenderEvaluation[] = [];
   TenderEvaluationDivision: TenderEvaluation[] = [];
   TenderEvaluationScheme: TenderEvaluation[] = [];
   TenderEvaluationDistrict: TenderEvaluation[] = [];

   PriceEvaluationTotal: PriceEvaluation[] = [];
   PriceEvaluationDivision: PriceEvaluation[] = [];
   PriceEvaluationScheme: PriceEvaluation[] = [];
   PriceEvaluationDistrict: PriceEvaluation[] = [];
selectedTabIndex: number=0;
 divisionid: any;
 himisDistrictid: any;
 TimeStatus:any;
 mainschemeid:any;
constructor(
 public api: ApiService,
 public spinner: NgxSpinnerService,
 private cdr: ChangeDetectorRef,
 private dialog: MatDialog,
 public datePipe: DatePipe
) {
 this.dataSource = new MatTableDataSource<TenderEvaluationDetails>([]);
//  this.dataSource = new MatTableDataSource<PriceEvaluationDetails>([]);
}

ngOnInit() {
 this.initializeChartOptions();
 this.initializeChartOptions2();
 
if(this.selectedTabIndex == 0){
  this.GETTenderEvaluationTotal();
   this.GETTenderEvaluationDivision();
   this.GETTenderEvaluationScheme();
   this.GETTenderEvaluationDistrict();

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
     text: 'Total Tender Evaluation Division wise Progress',
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
     text: 'Total Tender Evaluation Scheme wise Progress',
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
     text: 'Total Tender Evaluation District wise Progress',
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
     text: 'Total Tender Evaluation',
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
           const apiData = this.PriceEvaluationDivision; // Replace with the actual data source or API response
           // Find the data in your API response that matches the selectedCategory
           const selectedData = apiData.find(
             (data) => data.name === selectedCategory
           );
           // console.log("selectedData chart1",selectedData)
           if (selectedData) {
             const id = selectedData.id; // Extract the id from the matching entry

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
     text: 'Total Price Evaluation Division wise Progress',
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
           const apiData = this.PriceEvaluationScheme; // Replace with the actual data source or API response
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
     text: 'Total Price Evaluation Scheme wise Progress',
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
           const apiData = this.PriceEvaluationDistrict; // Replace with the actual data source or API response
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
     text: 'Total Price Evaluation District wise Progress',
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
           const apiData = this.PriceEvaluationTotal; // Replace with the actual data source or API response
           // Find the data in your API response that matches the selectedCategory
           const selectedData = apiData.find(
             (data) => data.name === selectedCategory
           );
           // console.log("selectedData chart1",selectedData)
           if (selectedData) {
             const id = selectedData.id; // Extract the id from the matching entry

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
     text: 'Total Price Evaluation',
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
   this.GETTenderEvaluationTotal();
   this.GETTenderEvaluationDivision();
   this.GETTenderEvaluationScheme();
   this.GETTenderEvaluationDistrict();
 }else{
  this.GETPEvaluationTotal();
   this.GETPEvaluationDivision();
   this.GETPEvaluationScheme();
   this.GETPEvaluationDistrict();
 }
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

       this.chartOptionsLine2.series = [
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
        //  { name: 'Avg Days Since', data: avgDaysSince, color:' rgba(181, 7, 212, 0.85)' },
         { name: 'Avg Days Since', data: avgDaysSince,color:'rgba(250, 199, 161, 0.85)'},
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
         { name: 'Avg Days Since', data: avgDaysSince,color:'rgba(250, 199, 161, 0.85)'},

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
         { name: 'Avg Days Since', data: avgDaysSince,color:'rgba(250, 199, 161, 0.85)'},

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
         { name: 'Avg Days Since', data: avgDaysSince,color:'rgba(250, 199, 161, 0.85)'},

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
   this.chartOptionsLine2.chart.height = '200px';
   this.himisDistrictid = 0;
   this.mainschemeid=0;
  } else if (roleName == 'Collector') {
   this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
  // var RPType="District";
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
   this.api.GETPriceEvaluation( RPType, this.divisionid,this.himisDistrictid,this.mainschemeid)
     .subscribe(
       (data: any) => {
         this.PriceEvaluationTotal = data;
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
  
         this.chartOptionsLine2.series = [
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
          //  { name: 'Avg Days Since', data: avgDaysSince, color:' rgba(181, 7, 212, 0.85)' },
           { name: 'Avg Days Since', data: avgDaysSince,color:'rgba(250, 199, 161, 0.85)'},
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
  GETPEvaluationDivision(): void {
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
  this.TimeStatus=this.selectedTabIndex == 0?'Live':'Timeover';
  var RPType = 'Division';
  // RPType=Total&divisionid=0&districtid=0&mainschemeid=0&TimeStatus=0
   this.api.GETPriceEvaluation( RPType, this.divisionid,this.himisDistrictid,this.mainschemeid)
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
  
         this.chartOptions.series = [
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
           { name: 'Avg Days Since', data: avgDaysSince,color:'rgba(250, 199, 161, 0.85)'},
  
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
  GETPEvaluationScheme(): void {
  this.spinner.show();
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
   this.divisionid = sessionStorage.getItem('divisionID');
  // var RPType ='Division';
   this.chartOptions2.chart.height = '200px';
   this.himisDistrictid = 0;
   this.mainschemeid=0;
  } else if (roleName == 'Collector') {
   this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
  // var RPType="District";
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
  
         this.chartOptions2.series = [
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
           { name: 'Avg Days Since', data: avgDaysSince,color:'rgba(250, 199, 161, 0.85)'},
  
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
  GETPEvaluationDistrict(): void {
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
   this.chartOptionsLine.chart.height = '500';
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
           { name: 'Avg Days Since', data: avgDaysSince,color:'rgba(250, 199, 161, 0.85)'},
  
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

// #region dataBase 
fetchDataBasedOnChartSelectionTotal(  divisionID: any, seriesName: string ): void {
 console.log(`Selected ID: ${divisionID}, Series: ${seriesName}`);
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
       console.log('res:', res);
       console.log('dispatchData=:', this.dispatchData);
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
 console.log(`Selected ID: ${divisionID}, Series: ${seriesName}`);
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
       console.log('res:', res);
       console.log('dispatchData=:', this.dispatchData);
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
 console.log(`Selected ID: ${distid}, Series: ${seriesName}`);
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
       console.log('res:', res);
       console.log('dispatchData=:', this.dispatchData);
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
 console.log(`Selected ID: ${mainSchemeId}, Series: ${seriesName}`);
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
       console.log('res:', res);
       console.log('dispatchData=:', this.dispatchData);
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
 { title: 'e-Procno', dataKey: 'eprocno' },
 { title: 'NIT NO', dataKey: 'tenderno' },
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
 eprocno: row.eprocno,
}));

autoTable(doc, {
 columns: columns,
 body: rows,
 startY: 20,
 theme: 'striped',
 headStyles: { fillColor: [22, 160, 133] },
});

doc.save('TenderDetails.pdf');
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
}

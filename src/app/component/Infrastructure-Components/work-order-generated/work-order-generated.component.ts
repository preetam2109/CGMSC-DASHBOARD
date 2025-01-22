import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { WorkOrderIssued } from 'src/app/Model/DashProgressCount';
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
  selector: 'app-work-order-generated',
  standalone: true,
  imports: [NgApexchartsModule, MatSortModule, MatPaginatorModule, MatTableModule, MatTableExporterModule, MatInputModule, MatDialogModule,
    MatFormFieldModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, FormsModule, NgFor, CommonModule,],
  templateUrl: './work-order-generated.component.html',
  styleUrl: './work-order-generated.component.css'
})
export class WorkOrderGeneratedComponent {
  //#region chart 
  @ViewChild('chart') chart: ChartComponent | undefined;
  @ViewChild('itemDetailsModal') itemDetailsModal: any; 
  public cO: Partial<ChartOptions> | undefined;
  chartOptions!: ChartOptions; // For bar chart
  chartOptions2!: ChartOptions; // For bar chart
  chartOptionsLine!: ChartOptions; // For line chart
  chartOptionsLine2!: ChartOptions; // For line chart
  //#endregion
  //#region DataBase Table
  //#endregion
  WoIssuedTotal:WorkOrderIssued[]=[];
  wOIssuedGTotal:WorkOrderIssued[]=[];
  wOIssuedDistrict:WorkOrderIssued[]=[];
  wOIssuedScheme:WorkOrderIssued[]=[];
  divisionid:any;himisDistrictid:any;
  dateRange!: FormGroup;
  fromdt: any;
  todt: any;
  constructor(public api: ApiService, public spinner: NgxSpinnerService,private cdr: ChangeDetectorRef,
   private dialog: MatDialog,private fb: FormBuilder,
   public datePipe: DatePipe,){
    // this.dataSource = new MatTableDataSource<WorkOrderPendingDetailsNew>([]);
  }
ngOnInit(){
  const today = new Date();
  const firstDayOfMonthLastYear = new Date(today.getFullYear() - 1, today.getMonth(), 1);

  this.dateRange = this.fb.group({
    start: [firstDayOfMonthLastYear],
    end: [today]
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
            const selectedCategory = this.chartOptions?.xaxis?.categories?.[dataPointIndex];  // This is likely just the category name (a string)
            const selectedSeries = this.chartOptions?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.WoIssuedTotal;  // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find((data) => data.name === selectedCategory);
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id;  // Extract the id from the matching entry

                this.fetchDataBasedOnChartSelection(id, selectedSeries);

              } else {
                console.log(`No data found for selected category: ${selectedCategory}`);
              }
            } else {
              console.log('Selected category or series is invalid.');
            }
          }
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
          colors: ['#000']
        }
      },
      stroke: {
        width: 1,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        text: 'Total Works Order Issued Division wise Progress',
        align: 'center',
        style: {
          fontSize: '12px',
          // color: '#000'
          color: '#6e0d25'
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
            const selectedCategory = this.chartOptions?.xaxis?.categories?.[dataPointIndex];  // This is likely just the category name (a string)
            const selectedSeries = this.chartOptions?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.WoIssuedTotal;  // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find((data) => data.name === selectedCategory);
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id;  // Extract the id from the matching entry

                this.fetchDataBasedOnChartSelection(id, selectedSeries);

              } else {
                console.log(`No data found for selected category: ${selectedCategory}`);
              }
            } else {
              console.log('Selected category or series is invalid.');
            }
          }
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
          colors: ['#000']
        }
      },
      stroke: {
        width: 1,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        text: 'Total Works Order Issued District wise Progress',
        align: 'center',
        style: {
          fontSize: '12px',
          // color: '#000'
          color: '#6e0d25'
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
            const selectedCategory = this.chartOptions?.xaxis?.categories?.[dataPointIndex];  // This is likely just the category name (a string)
            const selectedSeries = this.chartOptions?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.WoIssuedTotal;  // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find((data) => data.name === selectedCategory);
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id;  // Extract the id from the matching entry

                this.fetchDataBasedOnChartSelection(id, selectedSeries);

              } else {
                console.log(`No data found for selected category: ${selectedCategory}`);
              }
            } else {
              console.log('Selected category or series is invalid.');
            }
          }
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
          colors: ['#000']
        }
      },
      stroke: {
        width: 1,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        text: 'Total Works Order Issued Scheme wise Progress',
        align: 'center',
        style: {
          fontSize: '12px',
          // color: '#000'
          color: '#6e0d25'
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
            const selectedCategory = this.chartOptions?.xaxis?.categories?.[dataPointIndex];  // This is likely just the category name (a string)
            const selectedSeries = this.chartOptions?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.WoIssuedTotal;  // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find((data) => data.name === selectedCategory);
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id;  // Extract the id from the matching entry

                this.fetchDataBasedOnChartSelection(id, selectedSeries);

              } else {
                console.log(`No data found for selected category: ${selectedCategory}`);
              }
            } else {
              console.log('Selected category or series is invalid.');
            }
          }
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: 'top', // top, center, bottom
          }
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
          colors: ['#000']
        }
      },
      stroke: {
        width: 1,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        text: 'Total Works Order Issued',
        align: 'center',
        style: {
          fontSize: '12px',
          // color: '#000'
          color: '#6e0d25'
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
  fetchDataBasedOnChartSelection(id: any, selectedSeries: string) {
    throw new Error('Method not implemented.');
  }
  GetWOIssueTotal(): void {
    this.spinner.show();
    var roleName  = localStorage.getItem('roleName');
  if(roleName == 'Division'){
  this.divisionid = sessionStorage.getItem('divisionID');
  this.chartOptions.chart.height = '200px';
  this.himisDistrictid=0; 
  }  else if (roleName == 'Collector') {
  this.himisDistrictid=sessionStorage.getItem('himisDistrictid');
  this.divisionid=0;
  this.chartOptions.chart.height = '400px';
  }
  else{
    this.divisionid=0;
    this.himisDistrictid=0; 
    this.chartOptions.chart.height = 'auto';
  }
  const startDate = this.dateRange.value.start;
  const endDate = this.dateRange.value.end;
this.fromdt = startDate ? this.datePipe.transform(startDate, 'dd-MMM-yyyy') : '';
this.todt  = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
  var RPType ='Total';
  // console.log('fromdt=',this.fromdt,'todt=',this.todt)
    // this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
    // https://cgmsc.gov.in/HIMIS_APIN/api/WorkOrder/WorkOrderGenerated?RPType=Total&divisionid=0&districtid=0&fromdt=01-01-2024&todt=0
    if (this.fromdt && this.todt) {
    this.api.GETWorkOrderGenerated(RPType,this.divisionid,this.himisDistrictid,this.fromdt,this.todt).subscribe(
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
       
        data.forEach((item: {
          name: string; id: any; totalWorks: any; totalTVC: number;
          avgDaysSinceAcceptance: any,zonalWorks:any,tenderWorks:any,totalZonalTVC:any,totalNormalTVC:any
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
        });
        
        this.chartOptions.series = [
          {name: 'Total Pending Works', data: totalWorks,color:'#eeba0b'} ,
          { name: 'Contract Value cr',data: totalTVC,color: 'rgb(0, 143, 251)' },
          { name: 'Avg Days Since Acceptance', data: avgDaysSinceAcceptance, color:'rgba(93, 243, 174, 0.85)' }, 
          // { name: 'Avg Days Since Acceptance', data: avgDaysSinceAcceptance, color:' rgba(181, 7, 212, 0.85)' }, 
          // { name: 'Zonal Works', data: zonalWorks,color:'#fae4e4'},
          { name: 'Zonal Works', data: zonalWorks,color:'rgba(31, 225, 11, 0.85)'},
          { name: 'Tender Works', data: tenderWorks,color:'rgba(2, 202, 227, 0.85)'},
          { name: 'Zonal Tender Value', data: totalZonalTVC,color:'rgba(172, 5, 26, 0.85)'},
          { name: 'Works Tender Value', data: totalNormalTVC,color:'rgba(250, 199, 161, 0.85)'  },
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
    var roleName  = localStorage.getItem('roleName');
  if(roleName == 'Division'){
  this.divisionid = sessionStorage.getItem('divisionID');
  this.chartOptions2.chart.height = '400';
  this.himisDistrictid=0; 
  }  else if (roleName == 'Collector') {
  this.himisDistrictid=sessionStorage.getItem('himisDistrictid');
  this.divisionid=0;
  this.chartOptions2.chart.height = '400';
  }
  else{
    this.divisionid=0;
    this.himisDistrictid=0; 
    this.chartOptions2.chart.height = '900';
  }
  const startDate = this.dateRange.value.start;
  const endDate = this.dateRange.value.end;
this.fromdt = startDate ? this.datePipe.transform(startDate, 'dd-MMM-yyyy') : '';
this.todt  = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
var RPType ='District';
  // console.log('fromdt=',this.fromdt,'todt=',this.todt)
    // this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
    // https://cgmsc.gov.in/HIMIS_APIN/api/WorkOrder/WorkOrderGenerated?RPType=Total&divisionid=0&districtid=0&fromdt=01-01-2024&todt=0
    if (this.fromdt && this.todt) {
    this.api.GETWorkOrderGenerated(RPType,this.divisionid,this.himisDistrictid,this.fromdt,this.todt).subscribe(
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
       
        data.forEach((item: {
          name: string; id: any; totalWorks: any; totalTVC: number;
          avgDaysSinceAcceptance: any,zonalWorks:any,tenderWorks:any,totalZonalTVC:any,totalNormalTVC:any
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
        });
        
        this.chartOptions2.series = [
          {name: 'Total Pending Works', data: totalWorks,color:'#eeba0b'} ,
          { name: 'Contract Value cr',data: totalTVC,color: 'rgb(0, 143, 251)' },
          { name: 'Avg Days Since Acceptance', data: avgDaysSinceAcceptance, color:'rgba(93, 243, 174, 0.85)' }, 
          // { name: 'Avg Days Since Acceptance', data: avgDaysSinceAcceptance, color:' rgba(181, 7, 212, 0.85)' }, 
          // { name: 'Zonal Works', data: zonalWorks,color:'#fae4e4'},
          { name: 'Zonal Works', data: zonalWorks,color:'rgba(31, 225, 11, 0.85)'},
          { name: 'Tender Works', data: tenderWorks,color:'rgba(2, 202, 227, 0.85)'},
          { name: 'Zonal Tender Value', data: totalZonalTVC,color:'rgba(172, 5, 26, 0.85)'},
          { name: 'Works Tender Value', data: totalNormalTVC,color:'rgba(250, 199, 161, 0.85)'  },
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
    debugger;
    this.spinner.show();
    var roleName  = localStorage.getItem('roleName');
  if(roleName == 'Division'){
  this.divisionid = sessionStorage.getItem('divisionID');
  this.chartOptionsLine.chart.height = '400';
  this.himisDistrictid=0; 
  }  else if (roleName == 'Collector') {
  this.himisDistrictid=sessionStorage.getItem('himisDistrictid');
  this.divisionid=0;
  this.chartOptionsLine.chart.height = '400';
  }
  else{
    this.divisionid=0;
    this.himisDistrictid=0; 
    this.chartOptionsLine.chart.height = '900';
  }
  const startDate = this.dateRange.value.start;
  const endDate = this.dateRange.value.end;
this.fromdt = startDate ? this.datePipe.transform(startDate, 'dd-MMM-yyyy') : '';
this.todt  = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
var RPType ='Scheme';
  console.log('fromdt=',this.fromdt,'todt=',this.todt)
    // this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
    // https://cgmsc.gov.in/HIMIS_APIN/api/WorkOrder/WorkOrderGenerated?RPType=Total&divisionid=0&districtid=0&fromdt=01-01-2024&todt=0
    if (this.fromdt && this.todt) {
    this.api.GETWorkOrderGenerated(RPType,this.divisionid,this.himisDistrictid,this.fromdt,this.todt).subscribe(
      (data: any) => {
        this.wOIssuedScheme = data;
        console.log('API Response Scheme:', this.WoIssuedTotal);
        console.log('API Response data:', data);
        const id: string[] = [];
        const name: string[] = [];
        const totalWorks: any[] = [];
        const totalTVC: number[] = [];
        const avgDaysSinceAcceptance: number[] = [];
        const zonalWorks: number[] = [];
        const tenderWorks: number[] = [];
        const totalZonalTVC: number[] = [];
        const totalNormalTVC: number[] = [];
       
        data.forEach((item: {
          name: string; id: any; totalWorks: any; totalTVC: number;
          avgDaysSinceAcceptance: any,zonalWorks:any,tenderWorks:any,totalZonalTVC:any,totalNormalTVC:any
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
        });
        
        this.chartOptionsLine.series = [
          {name: 'Total Pending Works', data: totalWorks,color:'#eeba0b'} ,
          { name: 'Contract Value cr',data: totalTVC,color: 'rgb(0, 143, 251)' },
          { name: 'Avg Days Since Acceptance', data: avgDaysSinceAcceptance, color:' rgba(181, 7, 212, 0.85)' }, 
          // { name: 'Zonal Works', data: zonalWorks,color:'#fae4e4'},
          { name: 'Zonal Works', data: zonalWorks,color:'rgba(31, 225, 11, 0.85)'},
          { name: 'Tender Works', data: tenderWorks,color:'rgba(2, 202, 227, 0.85)'},
          { name: 'Zonal Tender Value', data: totalZonalTVC,color:'rgba(172, 5, 26, 0.85)'},
          { name: 'Works Tender Value', data: totalNormalTVC,color:'rgba(250, 199, 161, 0.85)'  },
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
    var roleName  = localStorage.getItem('roleName');
  if(roleName == 'Division'){
  this.divisionid = sessionStorage.getItem('divisionID');
  this.chartOptionsLine2.chart.height = '300';
  this.himisDistrictid=0; 
  }  else if (roleName == 'Collector') {
  this.himisDistrictid=sessionStorage.getItem('himisDistrictid');
  this.divisionid=0;
  this.chartOptionsLine2.chart.height = '300';
  }
  else{
    this.divisionid=0;
    this.himisDistrictid=0; 
    this.chartOptionsLine2.chart.height = '300';
  }
  const startDate = this.dateRange.value.start;
  const endDate = this.dateRange.value.end;
this.fromdt = startDate ? this.datePipe.transform(startDate, 'dd-MMM-yyyy') : '';
this.todt  = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
var RPType ='GTotal';
  console.log('fromdt=',this.fromdt,'todt=',this.todt)
    // this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
    // https://cgmsc.gov.in/HIMIS_APIN/api/WorkOrder/WorkOrderGenerated?RPType=Total&divisionid=0&districtid=0&fromdt=01-01-2024&todt=0
    if (this.fromdt && this.todt) {
    this.api.GETWorkOrderGenerated(RPType,this.divisionid,this.himisDistrictid,this.fromdt,this.todt).subscribe(
      (data: any) => {
        this.wOIssuedGTotal = data;
        console.log('API Response total:', this.WoIssuedTotal);
        console.log('API Response data:', data);
        const id: string[] = [];
        const name: string[] = [];
        const totalWorks: any[] = [];
        const totalTVC: number[] = [];
        const avgDaysSinceAcceptance: number[] = [];
        const zonalWorks: number[] = [];
        const tenderWorks: number[] = [];
        const totalZonalTVC: number[] = [];
        const totalNormalTVC: number[] = [];
       
        data.forEach((item: {
          name: string; id: any; totalWorks: any; totalTVC: number;
          avgDaysSinceAcceptance: any,zonalWorks:any,tenderWorks:any,totalZonalTVC:any,totalNormalTVC:any
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
        });
        
        this.chartOptionsLine2.series = [
          {name: 'Total Pending Works', data: totalWorks,color:'#eeba0b'} ,
          { name: 'Contract Value cr',data: totalTVC,color: 'rgb(0, 143, 251)' },
          { name: 'Avg Days Since Acceptance', data: avgDaysSinceAcceptance, color:' rgba(181, 7, 212, 0.85)' }, 
          // { name: 'Zonal Works', data: zonalWorks,color:'#fae4e4'},
          { name: 'Zonal Works', data: zonalWorks,color:'rgba(31, 225, 11, 0.85)'},
          { name: 'Tender Works', data: tenderWorks,color:'rgba(2, 202, 227, 0.85)'},
          { name: 'Zonal Tender Value', data: totalZonalTVC,color:'rgba(172, 5, 26, 0.85)'},
          { name: 'Works Tender Value', data: totalNormalTVC,color:'rgba(250, 199, 161, 0.85)'  },
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
}

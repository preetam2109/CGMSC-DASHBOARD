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
import { ASFile, LiveTenderdata, TenderDetails } from 'src/app/Model/DashProgressCount';
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
  selector: 'app-live-tender',
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
  templateUrl: './live-tender.component.html',
  styleUrl: './live-tender.component.css',
})
export class LiveTenderComponent {
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
      LiveTenderTotal: LiveTenderdata[] = [];
      LiveTenderDivision: LiveTenderdata[] = [];
      LiveTenderScheme: LiveTenderdata[] = [];
      LiveTenderDistrict: LiveTenderdata[] = [];
        ASFileData: ASFile[] = [];
  selectedTabIndex: number=0;
    divisionid: any;
    himisDistrictid: any;
    TimeStatus:any;
    mainschemeid:any;
    titleTotal:any
    titleDivision:any;
    titleScheme:any;
    titleDist:any;
    name:any;
    nosWorks:any;
  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    public datePipe: DatePipe
  ) {
    this.dataSource = new MatTableDataSource<TenderDetails>([]);
  //   this.titleTotal="Live Tenders";
  //   this.titleDivision="Division-wise Live Tenders";
  //  this.titleScheme="Scheme-wise Live Tenders";
  //   this.titleDist="District-wise Live Tenders";
  }

  ngOnInit() {

    this.initializeChartOptions();
    
  if(this.selectedTabIndex == 0){
    this.GETLiveTenderTotal();
    this.GETLiveTenderDivision();
    this.GETLiveTenderScheme();
    this.GETLiveTenderDistrict();

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
              const apiData = this.LiveTenderDivision; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry
                this.name= selectedData.name;
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
        // text: 'Division-wise Live Tenders',
        align: 'center',
        style: {
          // fontSize: '12px',
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
            const selectedCategory =
              this.chartOptions2?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
            const selectedSeries =
              this.chartOptions2?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            ;
            if (selectedCategory && selectedSeries) {
              const apiData = this.LiveTenderScheme; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry
                this.name= selectedData.name;
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
        // text: 'Scheme-wise Live Tenders',
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
              const apiData = this.LiveTenderDistrict; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry
                this.name= selectedData.name;
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
        // text: 'District-wise Live Tenders',
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
              const apiData = this.LiveTenderTotal; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry
                this.name= selectedData.name;
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
        // text: 'Live Tenders ',
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
    //  this.titleTotal="Live Tenders";
    //   this.titleDivision="Division-wise Live Tenders";
    //  this.titleScheme="Scheme-wise Live Tenders";
    //   this.titleDist="District-wise Live Tenders";
      this.GETLiveTenderTotal();
      this.GETLiveTenderDivision();
      this.GETLiveTenderScheme();
      this.GETLiveTenderDistrict();
    }else{
    // this.titleTotal = "Pending To Open Tenders";
    //  this.titleDivision=" Division-wise Pending To Open Tenders";
    // this.titleScheme="Scheme-wise Pending To Open Tenders";
    //  this.titleDist="District-wise Pending To Open Tenders";
    this.GETLiveTenderTotal();
    this.GETLiveTenderDivision();
    this.GETLiveTenderScheme();
    this.GETLiveTenderDistrict();
    }
  }
//#region Get API data
GETLiveTenderTotal(): void {
  this.spinner.show();
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
    this.divisionid = sessionStorage.getItem('divisionID');
  // var RPType ='Division';
  var RPType = 'Total';

    this.chartOptionsLine2.chart.height = '200px';
    this.himisDistrictid = 0;
    this.mainschemeid=0;
  } else if (roleName == 'Collector') {
    this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
  //  var RPType="District";
  var RPType = 'Total';

    this.divisionid = 0;
    this.mainschemeid=0;
    this.chartOptionsLine2.chart.height = '400px';
  } else {
    this.divisionid = 0;
    this.himisDistrictid = 0;
    this.mainschemeid=0;
  var RPType = 'Total';

    this.chartOptionsLine2.chart.height = '300';
  }
  this.TimeStatus=this.selectedTabIndex == 0?'Live':'Timeover';
  // RPType=Total&divisionid=0&districtid=0&mainschemeid=0&TimeStatus=0
    this.api.GETLiveTender( RPType, this.divisionid,this.himisDistrictid,this.mainschemeid,this.TimeStatus )
      .subscribe(
        (data: any) => {
          this.LiveTenderTotal = data;
          // console.log('API Response total:', this.WoIssuedTotal);
          // console.log('API Response data:', data);

          const id: string[] = [];
          const name: string[] = [];
          const nosWorks: any[] = [];
          const nosTender: number[] = [];
          const totalValuecr: number[] = [];

          data.forEach(
            (item: {
              name: string;
              id: any;
              nosWorks: any;
              nosTender: number;
              totalValuecr: any;
            }) => {
              id.push(item.id);
              name.push(item.name);
              nosWorks.push(item.nosWorks);
              nosTender.push(item.nosTender);
              totalValuecr.push(item.totalValuecr);
            }
          );

          this.chartOptionsLine2.series = [
            {
              name: 'No of Works ',
              data: nosWorks,
              color: '#eeba0b',
            },
            {
              name: 'No of Tenders',
              data: nosTender,
              color: '#6a6afd',
              // color: 'rgb(0, 143, 251)',
            },
            {
              name: 'Tender Value(in Cr)',
              data: totalValuecr,
              color: 'rgba(93, 243, 174, 0.85)',
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
          this.chartOptionsLine2.xaxis = { categories: name };
          this.cO = this.chartOptionsLine2;
          if(this.selectedTabIndex == 0){
            this.chartOptionsLine2.title={text: 'Live Tenders ',
            //   this.titleTotal = "Pending To Open Tenders";
            //   this.titleDivision=" Division-wise Pending To Open Tenders";
            //  this.titleScheme="Scheme-wise Pending To Open Tenders";
            //   this.titleDist="District-wise Pending To Open Tenders";
              // text: 'Live Tenders ',
              align: 'center',
              style: {
                fontSize: '12px',
                // color: '#000'
                color: '#6e0d25',
              },
            }

          }else{
            this.chartOptionsLine2.title={text: 'Pending To Open Tenders',
          
              // text: 'Live Tenders ',
              align: 'center',
              style: {
                fontSize: '12px',
                // color: '#000'
                color: '#6e0d25',
              },
            }
          }

         
          this.cdr.detectChanges();

          this.spinner.hide();
        },
        (error: any) => {
          console.error('Error fetching data', error);
        }
      );
  }
GETLiveTenderDivision(): void {
  this.spinner.show();
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
    this.divisionid = sessionStorage.getItem('divisionID');
  // var RPType ='Division';
  var RPType = 'Division';
    this.chartOptions.chart.height = '200px';
    this.himisDistrictid = 0;
    this.mainschemeid=0;
  } else if (roleName == 'Collector') {
    this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
  //  var RPType="District";
  var RPType = 'Division';
    this.divisionid = 0;
    this.mainschemeid=0;
    this.chartOptions.chart.height = '400px';
  } else {
    this.divisionid = 0;
    this.himisDistrictid = 0;
    this.mainschemeid=0;
    var RPType = 'Division';
    this.chartOptions.chart.height = '300';
  }
  this.TimeStatus=this.selectedTabIndex == 0?'Live':'Timeover';
  
  // RPType=Total&divisionid=0&districtid=0&mainschemeid=0&TimeStatus=0
    this.api.GETLiveTender( RPType, this.divisionid,this.himisDistrictid,this.mainschemeid,this.TimeStatus )
      .subscribe(
        (data: any) => {
          this.LiveTenderDivision = data;
          // console.log('API Response total:', this.WoIssuedTotal);
          // console.log('API Response data:', data);

          const id: string[] = [];
          const name: string[] = [];
          const nosWorks: any[] = [];
          const nosTender: number[] = [];
          const totalValuecr: number[] = [];

          data.forEach(
            (item: {
              name: string;
              id: any;
              nosWorks: any;
              nosTender: number;
              totalValuecr: any;
            }) => {
              id.push(item.id);
              name.push(item.name);
              nosWorks.push(item.nosWorks);
              nosTender.push(item.nosTender);
              totalValuecr.push(item.totalValuecr);
            }
          );

          this.chartOptions.series = [
            {
              name: 'No of Works ',
              data: nosWorks,
              color: '#eeba0b',
            },
            {
              name: 'No of Tenders',
              data: nosTender,
              // color: 'rgb(0, 143, 251)',
              color: '#6a6afd',
            },
            {
              name: 'Tender Value(in Cr)',
              data: totalValuecr,
              color: 'rgba(93, 243, 174, 0.85)',
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
          if(this.selectedTabIndex == 0){
            this.chartOptions.title={text: 'Division-wise Live Tenders ',
            //   this.titleTotal = "Pending To Open Tenders";
            //   this.titleDivision=" Division-wise Pending To Open Tenders";
            //  this.titleScheme="Scheme-wise Pending To Open Tenders";
            //   this.titleDist="District-wise Pending To Open Tenders";
              // text: 'Live Tenders ',
              align: 'center',
              style: {
                fontSize: '12px',
                // color: '#000'
                color: '#6e0d25',
              },
            }

          }else{
            this.chartOptions.title={text: 'Division-wise Pending To Open Tenders',
          
              // text: 'Live Tenders ',
              align: 'center',
              style: {
                fontSize: '12px',
                // color: '#000'
                color: '#6e0d25',
              },
            }
          }
          this.cdr.detectChanges();

          this.spinner.hide();
        },
        (error: any) => {
          console.error('Error fetching data', error);
        }
      );
  }
GETLiveTenderScheme(): void {
  this.spinner.show();
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
    this.divisionid = sessionStorage.getItem('divisionID');
  // var RPType ='Division';
  var RPType = 'Scheme';

    this.chartOptions2.chart.height = '200px';
    this.himisDistrictid = 0;
    this.mainschemeid=0;
  } else if (roleName == 'Collector') {
    this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
  //  var RPType="District";
   var RPType = 'Scheme';

    this.divisionid = 0;
    this.mainschemeid=0;
    this.chartOptions2.chart.height = '400px';
  } else {
    this.divisionid = 0;
    this.himisDistrictid = 0;
    this.mainschemeid=0;
    this.chartOptions2.chart.height = '300';
    var RPType = 'Scheme';
  }
  this.TimeStatus=this.selectedTabIndex == 0?'Live':'Timeover';
  // alert( this.TimeStatus)
  // RPType=Total&divisionid=0&districtid=0&mainschemeid=0&TimeStatus=0
    this.api.GETLiveTender( RPType, this.divisionid,this.himisDistrictid,this.mainschemeid,this.TimeStatus )
      .subscribe(
        (data: any) => {
          this.LiveTenderScheme = data;
          // console.log('API Response total:', this.WoIssuedTotal);
          // console.log('API Response data:', data);

          const id: string[] = [];
          const name: string[] = [];
          const nosWorks: any[] = [];
          const nosTender: number[] = [];
          const totalValuecr: number[] = [];

          data.forEach(
            (item: {
              name: string;
              id: any;
              nosWorks: any;
              nosTender: number;
              totalValuecr: any;
            }) => {
              id.push(item.id);
              name.push(item.name);
              nosWorks.push(item.nosWorks);
              nosTender.push(item.nosTender);
              totalValuecr.push(item.totalValuecr);
            }
          );

          this.chartOptions2.series = [
            {
              name: 'No of Works ',
              data: nosWorks,
              color: '#eeba0b',
            },
            {
              name: 'No of Tenders',
              data: nosTender,
              // color: 'rgb(0, 143, 251)',
              color: '#6a6afd',
            },
            {
              name: 'Tender Value(in Cr)',
              data: totalValuecr,
              color: 'rgba(93, 243, 174, 0.85)',
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
          this.chartOptions2.xaxis = { categories: name };
          this.cO = this.chartOptions2;
          if(this.selectedTabIndex == 0){
            this.chartOptions2.title={text: 'Scheme-wise Live Tenders ',
            //   this.titleTotal = "Pending To Open Tenders";
            //   this.titleDivision=" Division-wise Pending To Open Tenders";
            //  this.titleScheme="Scheme-wise Pending To Open Tenders";
            //   this.titleDist="District-wise Pending To Open Tenders";
              // text: 'Live Tenders ',
              align: 'center',
              style: {
                fontSize: '12px',
                // color: '#000'
                color: '#6e0d25',
              },
            }

          }else{
            this.chartOptions2.title={text: 'Scheme-wise Pending To Open Tenders',
          
              // text: 'Live Tenders ',
              align: 'center',
              style: {
                fontSize: '12px',
                // color: '#000'
                color: '#6e0d25',
              },
            }
          }
          this.cdr.detectChanges();

          this.spinner.hide();
        },
        (error: any) => {
          console.error('Error fetching data', error);
        }
      );
  }
GETLiveTenderDistrict(): void {
  this.spinner.show();
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
    this.divisionid = sessionStorage.getItem('divisionID');
  // var RPType ='Division';
  var RPType="District";

    this.chartOptionsLine.chart.height = '200px';
    this.himisDistrictid = 0;
    this.mainschemeid=0;
  } else if (roleName == 'Collector') {
    this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
   var RPType="District";
    this.divisionid = 0;
    this.mainschemeid=0;
    this.chartOptionsLine.chart.height = '400px';
  } else {
    this.divisionid = 0;
    this.himisDistrictid = 0;
    this.mainschemeid=0;
    this.chartOptionsLine.chart.height = '900';
    var RPType = 'District';
  }
  this.TimeStatus=this.selectedTabIndex == 0?'Live':'Timeover';
  // alert( this.TimeStatus)
  // RPType=Total&divisionid=0&districtid=0&mainschemeid=0&TimeStatus=0
    this.api.GETLiveTender( RPType, this.divisionid,this.himisDistrictid,this.mainschemeid,this.TimeStatus )
      .subscribe(
        (data: any) => {
          this.LiveTenderDistrict = data;
          // console.log('API Response total:', this.WoIssuedTotal);
          // console.log('API Response data :', data);

          const id: string[] = [];
          const name: string[] = [];
          const nosWorks: any[] = [];
          const nosTender: number[] = [];
          const totalValuecr: number[] = [];

          data.forEach(
            (item: {
              name: string;
              id: any;
              nosWorks: any;
              nosTender: number;
              totalValuecr: any;
            }) => {
              id.push(item.id);
              name.push(item.name);
              nosWorks.push(item.nosWorks);
              nosTender.push(item.nosTender);
              totalValuecr.push(item.totalValuecr);
            }
          );

          this.chartOptionsLine.series = [
            {
              name: 'No of Works ',
              data: nosWorks,
              color: '#eeba0b',
            },
            {
              name: 'No of Tenders',
              data: nosTender,
              // color: 'rgb(0, 143, 251)',
              color: '#6a6afd',
            },
            {
              name: 'Tender Value(in Cr)',
              data: totalValuecr,
              color: 'rgba(93, 243, 174, 0.85)',
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
          this.chartOptionsLine.xaxis = { categories: name };
          this.cO = this.chartOptionsLine;
          if(this.selectedTabIndex == 0){
            this.chartOptionsLine.title={text: 'District-wise Live Tenders ',
              align: 'center',
              style: {
                fontSize: '12px',
                // color: '#000'
                color: '#6e0d25',
              },
            }

          }else{
            this.chartOptionsLine.title={text: 'District-wise Pending To Open Tenders',
              align: 'center',
              style: {
                fontSize: '12px',
                // color: '#000'
                color: '#6e0d25',
              },
            }
          }
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
    // console.log(`Selected ID: ${divisionID}, Series: ${seriesName}`);
    const distid = 0;
    const mainSchemeId = 0;
   const TimeStatus="Live";
    this.spinner.show();
    // getTenderDetails?divisionId=D1004&mainSchemeId=0&distid=0&TimeStatus=Live
    this.TimeStatus=this.selectedTabIndex == 0?'Live':'Timeover';
    // alert(this.TimeStatus);
    this.api.GETTenderDetails(divisionID,mainSchemeId,distid,this.TimeStatus)
      .subscribe(
        (res) => {
          this.dispatchData = res.map(
            (item: TenderDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // console.log('res:', res);
          // console.log('dispatchData=:', this.dispatchData);
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
    // console.log(`Selected ID: ${divisionID}, Series: ${seriesName}`);
    const distid = 0;
    const mainSchemeId = 0;
   const TimeStatus="Live";
    this.spinner.show();
    // getTenderDetails?divisionId=D1004&mainSchemeId=0&distid=0&TimeStatus=Live
    this.TimeStatus=this.selectedTabIndex == 0?'Live':'Timeover';
    // alert(this.TimeStatus);
    this.api.GETTenderDetails(divisionID,mainSchemeId,distid,this.TimeStatus)
      .subscribe(
        (res) => {
          this.dispatchData = res.map(
            (item: TenderDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // console.log('res:', res);
          // console.log('dispatchData=:', this.dispatchData);
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
    // console.log(`Selected ID: ${distid}, Series: ${seriesName}`);
    const divisionID = 0;
    const mainSchemeId = 0;
   const TimeStatus="Live";
    this.spinner.show();
    // getTenderDetails?divisionId=D1004&mainSchemeId=0&distid=0&TimeStatus=Live
    this.TimeStatus=this.selectedTabIndex == 0?'Live':'Timeover';
    // alert(this.TimeStatus);
    this.api.GETTenderDetails(divisionID,mainSchemeId,distid,this.TimeStatus)
      .subscribe(
        (res) => {
          this.dispatchData = res.map(
            (item: TenderDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // console.log('res:', res);
          // console.log('dispatchData=:', this.dispatchData);
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
    // console.log(`Selected ID: ${mainSchemeId}, Series: ${seriesName}`);
    const divisionID = 0;
    const distid = 0;
   const TimeStatus="Live";
    this.spinner.show();
    // getTenderDetails?divisionId=D1004&mainSchemeId=0&distid=0&TimeStatus=Live
    this.TimeStatus=this.selectedTabIndex == 0?'Live':'Timeover';
    // alert(this.TimeStatus);
    this.api.GETTenderDetails(divisionID,mainSchemeId,distid,this.TimeStatus)
      .subscribe(
        (res) => {
          this.dispatchData = res.map(
            (item: TenderDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // console.log('res:', res);
          // console.log('dispatchData=:', this.dispatchData);
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
          // console.log('ASFileData:',this.ASFileData);
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          alert(`Error fetching data: ${error.message}`);
        }
      );
}
}

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
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/api.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MatTabChangeEvent } from '@angular/material/tabs';

import { LiveTenderdata } from 'src/app/Model/DashProgressCount';
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
      // dataSource!: MatTableDataSource<WorkGenDetails>;
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      // dispatchPending: WorkGenDetails[] = [];
    
      //#endregion
      LiveTenderTotal: LiveTenderdata[] = [];
      // wOIssuedGTotal: LiveTenderdata[] = [];
      // wOIssuedDistrict: LiveTenderdata[] = [];
      // wOIssuedScheme: LiveTenderdata[] = [];
    // 
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
    // this.dataSource = new MatTableDataSource<WorkGenDetails>([]);
  }

  ngOnInit() {
    this.initializeChartOptions();
    
  if(this.selectedTabIndex == 0){
    this.GETLiveTenderTotal();

  }
  // else{
  //   this.TimeStatus='Timeover';
  // }
    // this.GetWOIssueDistrict();
    // this.GetWOIssueScheme();
    // this.GetWOIssueGTotal();
  }

  initializeChartOptions() {
    // this.chartOptions = {
    //   series: [],
    //   chart: {
    //     type: 'bar',
    //     stacked: true,
    //     // height: 'auto',
    //     // height:400,
    //     // height: 200,
    //     // width:600,
    //     events: {
    //       dataPointSelection: (
    //         event,
    //         chartContext,
    //         { dataPointIndex, seriesIndex }
    //       ) => {
    //         const selectedCategory =
    //           this.chartOptions?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
    //         const selectedSeries =
    //           this.chartOptions?.series?.[seriesIndex]?.name;
    //         // Ensure the selectedCategory and selectedSeries are valid
    //         if (selectedCategory && selectedSeries) {
    //           const apiData = this.WoIssuedTotal; // Replace with the actual data source or API response
    //           // Find the data in your API response that matches the selectedCategory
    //           const selectedData = apiData.find(
    //             (data) => data.name === selectedCategory
    //           );
    //           // console.log("selectedData chart1",selectedData)
    //           if (selectedData) {
    //             const id = selectedData.id; // Extract the id from the matching entry

    //             this.fetchDataBasedOnChartSelectionTotal(id, selectedSeries);
    //           } else {
    //             console.log(
    //               `No data found for selected category: ${selectedCategory}`
    //             );
    //           }
    //         } else {
    //           console.log('Selected category or series is invalid.');
    //         }
    //       },
    //     },
    //   },
    //   plotOptions: {
    //     bar: {
    //       horizontal: true,
    //     },
    //   },
    //   xaxis: {
    //     categories: [],
    //   },
    //   yaxis: {
    //     title: {
    //       text: undefined,
    //     },
    //   },
    //   dataLabels: {
    //     enabled: true,
    //     style: {
    //       // colors: ['#FF0000']
    //       colors: ['#000'],
    //     },
    //   },
    //   stroke: {
    //     width: 1,
    //     // colors: ['#000'],
    //     colors: ['#fff'],
    //   },
    //   title: {
    //     text: 'Total Works Order Issued Division wise Progress',
    //     align: 'center',
    //     style: {
    //       fontSize: '12px',
    //       // color: '#000'
    //       color: '#6e0d25',
    //     },
    //   },
    //   tooltip: {
    //     y: {
    //       formatter: function (val: any) {
    //         return val.toString();
    //       },
    //     },
    //   },
    //   fill: {
    //     opacity: 1,
    //   },
    //   legend: {
    //     position: 'top',
    //     horizontalAlign: 'center',
    //     offsetX: 40,
    //   },
    // };
    // this.chartOptions2 = {
    //   series: [],
    //   chart: {
    //     type: 'bar',
    //     stacked: true,
    //     // height: 'auto',
    //     // height:400,
    //     // height: 200,
    //     // width:600,
    //     events: {
    //       dataPointSelection: (
    //         event,
    //         chartContext,
    //         { dataPointIndex, seriesIndex }
    //       ) => {
    //         const selectedCategory =
    //           this.chartOptions2?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
    //         const selectedSeries =
    //           this.chartOptions2?.series?.[seriesIndex]?.name;
    //         // Ensure the selectedCategory and selectedSeries are valid
    //         debugger;
    //         if (selectedCategory && selectedSeries) {
    //           const apiData = this.wOIssuedDistrict; // Replace with the actual data source or API response
    //           // Find the data in your API response that matches the selectedCategory
    //           const selectedData = apiData.find(
    //             (data) => data.name === selectedCategory
    //           );
    //           // console.log("selectedData chart1",selectedData)
    //           if (selectedData) {
    //             const id = selectedData.id; // Extract the id from the matching entry

    //             this.fetchDataBasedOnChartSelectionDistrict(id, selectedSeries);
    //           } else {
    //             console.log(
    //               `No data found for selected category: ${selectedCategory}`
    //             );
    //           }
    //         } else {
    //           console.log('Selected category or series is invalid.');
    //         }
    //       },
    //     },
    //   },
    //   plotOptions: {
    //     bar: {
    //       horizontal: true,
    //     },
    //   },
    //   xaxis: {
    //     categories: [],
    //   },
    //   yaxis: {
    //     title: {
    //       text: undefined,
    //     },
    //   },
    //   dataLabels: {
    //     enabled: true,
    //     style: {
    //       // colors: ['#FF0000']
    //       colors: ['#000'],
    //     },
    //   },
    //   stroke: {
    //     width: 1,
    //     // colors: ['#000'],
    //     colors: ['#fff'],
    //   },
    //   title: {
    //     text: 'Total Works Order Issued District wise Progress',
    //     align: 'center',
    //     style: {
    //       fontSize: '12px',
    //       // color: '#000'
    //       color: '#6e0d25',
    //     },
    //   },
    //   tooltip: {
    //     y: {
    //       formatter: function (val: any) {
    //         return val.toString();
    //       },
    //     },
    //   },
    //   fill: {
    //     opacity: 1,
    //   },
    //   legend: {
    //     position: 'top',
    //     horizontalAlign: 'center',
    //     offsetX: 40,
    //   },
    // };
    // this.chartOptionsLine = {
    //   series: [],
    //   chart: {
    //     type: 'bar',
    //     stacked: true,
    //     // height: 'auto',
    //     // height:400,
    //     // height: 200,
    //     // width:600,
    //     events: {
    //       dataPointSelection: (
    //         event,
    //         chartContext,
    //         { dataPointIndex, seriesIndex }
    //       ) => {
    //         const selectedCategory =
    //           this.chartOptionsLine?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
    //         const selectedSeries =
    //           this.chartOptionsLine?.series?.[seriesIndex]?.name;
    //         // Ensure the selectedCategory and selectedSeries are valid
    //         if (selectedCategory && selectedSeries) {
    //           const apiData = this.wOIssuedScheme; // Replace with the actual data source or API response
    //           // Find the data in your API response that matches the selectedCategory
    //           const selectedData = apiData.find(
    //             (data) => data.name === selectedCategory
    //           );
    //           // console.log("selectedData chart1",selectedData)
    //           if (selectedData) {
    //             const id = selectedData.id; // Extract the id from the matching entry

    //             this.fetchDataBasedOnChartSelectionScheme(id, selectedSeries);
    //           } else {
    //             console.log(
    //               `No data found for selected category: ${selectedCategory}`
    //             );
    //           }
    //         } else {
    //           console.log('Selected category or series is invalid.');
    //         }
    //       },
    //     },
    //   },
    //   plotOptions: {
    //     bar: {
    //       horizontal: true,
    //     },
    //   },
    //   xaxis: {
    //     categories: [],
    //   },
    //   yaxis: {
    //     title: {
    //       text: undefined,
    //     },
    //   },
    //   dataLabels: {
    //     enabled: true,
    //     style: {
    //       // colors: ['#FF0000']
    //       colors: ['#000'],
    //     },
    //   },
    //   stroke: {
    //     width: 1,
    //     // colors: ['#000'],
    //     colors: ['#fff'],
    //   },
    //   title: {
    //     text: 'Total Works Order Issued Scheme wise Progress',
    //     align: 'center',
    //     style: {
    //       fontSize: '12px',
    //       // color: '#000'
    //       color: '#6e0d25',
    //     },
    //   },
    //   tooltip: {
    //     y: {
    //       formatter: function (val: any) {
    //         return val.toString();
    //       },
    //     },
    //   },
    //   fill: {
    //     opacity: 1,
    //   },
    //   legend: {
    //     position: 'top',
    //     horizontalAlign: 'center',
    //     offsetX: 40,
    //   },
    // };
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
            debugger;
            if (selectedCategory && selectedSeries) {
              const apiData = this.LiveTenderTotal; // Replace with the actual data source or API response
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
        text: 'Total Works Order Issued',
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
  fetchDataBasedOnChartSelection(arg0: number, selectedSeries: string) {
    throw new Error('Method not implemented.');
  }
  selectedTabValue(event: any): void {
    this.selectedTabIndex = event.index;
    this.GETLiveTenderTotal();
  }
//#region Get API data
GETLiveTenderTotal(): void {
  this.spinner.show();
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
    this.divisionid = sessionStorage.getItem('divisionID');
  var RPType ='Divsion';
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
    this.chartOptionsLine2.chart.height = 'auto';
  }
  this.TimeStatus=this.selectedTabIndex == 0?'Live':'Timeover';
  // alert( this.TimeStatus)
  var RPType = 'Total';
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

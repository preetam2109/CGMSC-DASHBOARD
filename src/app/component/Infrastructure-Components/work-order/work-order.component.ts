import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashProgressDistCount, WOpendingTotal, WorkOrderPendingDetailsNew } from 'src/app/Model/DashProgressCount';
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
  selector: 'app-work-order',
  standalone: true,
  imports: [NgApexchartsModule, MatSortModule, MatPaginatorModule],
  templateUrl: './work-order.component.html',
  styleUrl: './work-order.component.css'
})
export class WorkOrderComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions; // For bar chart
  chartOptions2: ChartOptions; // For bar chart
  chartOptionsLine: ChartOptions; // For line chart
  chartOptionsLine2: ChartOptions; // For line chart
  whidMap: { [key: string]: number } = {};
  dataSource!: MatTableDataSource<WorkOrderPendingDetailsNew>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  wOpendingTotal:WOpendingTotal[]=[];
  WorkorderpendingdetailsNew:WorkOrderPendingDetailsNew[]=[];
  divisionid=0;
  Scheme='Scheme';
  Total='Total';
  Contractor='Contractor';
  District='District'
  divisionIDMap: { [key: string]: number } = {};

  constructor(public api: ApiService, public spinner: NgxSpinnerService,private cdr: ChangeDetectorRef){
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        stacked: true,
        height: 400,
        // width:600,
        events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            const selectedCategory =
              this.chartOptions?.xaxis?.categories?.[dataPointIndex];
            const selectedSeries = this.chartOptions?.series?.[seriesIndex]?.name;
            if (selectedCategory && selectedSeries) {
              const divisionID = this.divisionIDMap[selectedCategory];
              // this.seriesName=selectedSeries;
              alert(divisionID);
              if (divisionID) {
                this.FetchDataBasedOnChartSelection(divisionID, selectedSeries);
              }
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
          colors: ['#000']
        }
      },
      stroke: {
        width: 1,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        text: 'Total Pending Total Works wise Progress',
        // text: 'RP Type Total Pending Works wise Progress',
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
        height: 600,
        // width:600,
        events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            const selectedCategory =
              this.chartOptions2?.xaxis?.categories?.[dataPointIndex];
            const selectedSeries = this.chartOptions2?.series?.[seriesIndex]?.name;

            if (selectedCategory && selectedSeries) {
              const whid = this.whidMap[selectedCategory];
              if (whid) {
                // this.fetchDataBasedOnChartSelection();
              }
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
          colors: ['#000']
        }
      },
      stroke: {
        width: 1,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        text: 'Total Pending  Works District wise Progress',
        // text: 'RP Type Total Pending Works wise Progress',
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
        height: 600,
        // width:600,
        events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            const selectedCategory =
              this.chartOptionsLine?.xaxis?.categories?.[dataPointIndex];
            const selectedSeries = this.chartOptionsLine?.series?.[seriesIndex]?.name;

            if (selectedCategory && selectedSeries) {
              const whid = this.whidMap[selectedCategory];
              if (whid) {
                // this.fetchDataBasedOnChartSelection();
              }
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
          colors: ['#000']
        }
      },
      stroke: {
        width: 1,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        text: 'Total Pending Works Contractor  wise Progress',
        // text: 'RP Type Total Pending Works wise Progress',
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
        stacked: true,
        height: 400,
        // width:600,
        events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            const selectedCategory =
              this.chartOptionsLine2?.xaxis?.categories?.[dataPointIndex];
            const selectedSeries = this.chartOptionsLine2?.series?.[seriesIndex]?.name;

            if (selectedCategory && selectedSeries) {
              const whid = this.whidMap[selectedCategory];
              if (whid) {
                // this.fetchDataBasedOnChartSelection();
              }
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
          colors: ['#000']
        }
      },
      stroke: {
        width: 1,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        text: 'Total Pending Works Scheme wise Progress',
        // text: 'RP Type Total Pending Works wise Progress',
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
    this.GetWOPendingTotal();
    this.GetWOPendingDistrict();
    this.GetWOPendingScheme();
    this.GetWOPendingContractor();
    this.dataSource = new MatTableDataSource<WorkOrderPendingDetailsNew>([]);

    // this.dataSource = new MatTableDataSource<WOpendingTotal>([]);
  }
 
  ngOnInit() {
    // this.GetWOPendingTotal();
    // this.GetWOPendingDistrict();
    // this.GetWOPendingContractor();
  // this.GetWOPendingScheme();
  }
  //#region API get DATA
  GetWOPendingTotal(): void {
    this.spinner.show();
    this.api.WOPendingTotal(this.Total,this.divisionid).subscribe(
      (data: any) => {
        // this.wOpendingTotal = data;
        const name: string[] = [];
        const id: string[] = [];
        const pendingWork: any[] = [];
        const contrctValuecr: number[] = [];
        const noofWorksGreater7Days: any[] = [];
        this.whidMap = {}; // Initialize the mmidMap
        console.log('API Response:', data);
        data.forEach((item: {
          name: string; id: any; pendingWork: any; contrctValuecr: number;
          noofWorksGreater7Days: any
        }) => {
          id.push(item.id);
          name.push(item.name);
          pendingWork.push(item.pendingWork);
          contrctValuecr.push(item.contrctValuecr);
          noofWorksGreater7Days.push(item.noofWorksGreater7Days);

          // console.log('name:', item.name, 'id:', item.id);
          if (item.name && item.id) {
            this.whidMap[item.name] = item.id;
          } else {
            console.warn('Missing whid for warehousename :', item.name);
          }


        });

        console.log('whidMap:', this.whidMap); // Log the populated mmidMap

        this.chartOptions.series = [

          {
            name: 'Total Pending Works',
            data: pendingWork,
            // color: '#0000FF'
            color:'#eeba0b'
          }
          ,
          {
            name: 'Contrct Value cr',
            data: contrctValuecr,
            // color:'#00b4d8'
            // color:  'rgb(0, 128, 0)'
            // color: '#eeba0b'
          },
          {
            name: 'Noof Works Greater 7 Days',
            data: noofWorksGreater7Days,
            color: 'rgb(0, 143, 251)'
            // color: 'rgb(144, 238, 144)'
            // color: '#90EE90'
           
          },
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
  GetWOPendingDistrict(): void {
    this.api.WOPendingTotal(this.District,this.divisionid).subscribe(
      (data: any) => {
        // this.wOpendingTotal = data;
        const name: string[] = [];
        const id: string[] = [];
        const pendingWork: any[] = [];
        const contrctValuecr: number[] = [];
        const noofWorksGreater7Days: any[] = [];
        this.whidMap = {}; // Initialize the mmidMap
        console.log('API Response:', data);
        data.forEach((item: {
          name: string; id: any; pendingWork: any; contrctValuecr: number;
          noofWorksGreater7Days: any
        }) => {
          id.push(item.id);
          name.push(item.name);
          pendingWork.push(item.pendingWork);
          contrctValuecr.push(item.contrctValuecr);
          noofWorksGreater7Days.push(item.noofWorksGreater7Days);

          // console.log('name:', item.name, 'id:', item.id);
          if (item.name && item.id) {
            this.whidMap[item.name] = item.id;
          } else {
            console.warn('Missing whid for warehousename :', item.name);
          } });


        this.chartOptions2.series = [

          {
            name: 'Total Pending Works',
            data: pendingWork,
            // color: '#0000FF'
            color:'#eeba0b'
          }
          ,
          {
            name: 'Contrct Value cr',
            data: contrctValuecr,
            // color:'#00b4d8'
            // color:  'rgb(0, 128, 0)'
            // color: '#eeba0b'
          },
          {
            name: 'Noof Works Greater 7 Days',
            data: noofWorksGreater7Days,
            color: 'rgb(0, 143, 251)'
            // color: 'rgb(144, 238, 144)'
            // color: '#90EE90'
           
          },
        ];

        this.chartOptions2.xaxis = { categories: name };
        this.cO = this.chartOptions2;
        this.cdr.detectChanges();
      },
      (error: any) => {
        console.error('Error fetching data', error);
      }
    );
  }
  GetWOPendingContractor(): void {
    this.spinner.show();
    this.api.WOPendingTotal(this.Contractor,this.divisionid).subscribe(
      (data: any) => {
        // this.wOpendingTotal = data;
        const name: string[] = [];
        const id: string[] = [];
        const pendingWork: any[] = [];
        const contrctValuecr: number[] = [];
        const noofWorksGreater7Days: any[] = [];
        this.whidMap = {}; // Initialize the mmidMap
        console.log('API Response:', data);
        data.forEach((item: {
          name: string; id: any; pendingWork: any; contrctValuecr: number;
          noofWorksGreater7Days: any
        }) => {
          id.push(item.id);
          name.push(item.name);
          pendingWork.push(item.pendingWork);
          contrctValuecr.push(item.contrctValuecr);
          noofWorksGreater7Days.push(item.noofWorksGreater7Days);

          // console.log('name:', item.name, 'id:', item.id);
          if (item.name && item.id) {
            this.whidMap[item.name] = item.id;
          } else {
            console.warn('Missing whid for warehousename :', item.name);
          } });


        this.chartOptionsLine.series = [

          {
            name: 'Total Pending Works',
            data: pendingWork,
            // color: '#0000FF'
            color:'#eeba0b'
          }
          ,
          {
            name: 'Contrct Value cr',
            data: contrctValuecr,
            // color:'#00b4d8'
            // color:  'rgb(0, 128, 0)'
            // color: '#eeba0b'
          },
          {
            name: 'Noof Works Greater 7 Days',
            data: noofWorksGreater7Days,
            color: 'rgb(0, 143, 251)'
            // color: 'rgb(144, 238, 144)'
            // color: '#90EE90'
           
          },
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
  GetWOPendingScheme(): void {
    this.api.WOPendingTotal(this.Scheme,this.divisionid).subscribe(
      (data: any) => {
        // this.wOpendingTotal = data;
        const name: string[] = [];
        const id: string[] = [];
        const pendingWork: any[] = [];
        const contrctValuecr: number[] = [];
        const noofWorksGreater7Days: any[] = [];
        this.whidMap = {}; // Initialize the mmidMap
        console.log('API Response:', data);
        data.forEach((item: {
          name: string; id: any; pendingWork: any; contrctValuecr: number;
          noofWorksGreater7Days: any
        }) => {
          id.push(item.id);
          name.push(item.name);
          pendingWork.push(item.pendingWork);
          contrctValuecr.push(item.contrctValuecr);
          noofWorksGreater7Days.push(item.noofWorksGreater7Days);

          // console.log('name:', item.name, 'id:', item.id);
          if (item.name && item.id) {
            this.whidMap[item.name] = item.id;
          } else {
            console.warn('Missing whid for warehousename :', item.name);
          } });


        this.chartOptionsLine2.series = [

          {
            name: 'Total Pending Works',
            data: pendingWork,
            // color: '#0000FF'
            color:'#eeba0b'
          }
          ,
          {
            name: 'Contrct Value cr',
            data: contrctValuecr,
            // color:'#00b4d8'
            // color:  'rgb(0, 128, 0)'
            // color: '#eeba0b'
          },
          {
            name: 'Noof Works Greater 7 Days',
            data: noofWorksGreater7Days,
            color: 'rgb(0, 143, 251)'
            // color: 'rgb(144, 238, 144)'
            // color: '#90EE90'
           
          },
        ];

        this.chartOptionsLine2.xaxis = { categories: name };
        this.cO = this.chartOptionsLine2;
        this.cdr.detectChanges();
      },
      (error: any) => {
        console.error('Error fetching data', error);
      }
    );
  }
//#endregion
//#region 
// WorkorderpendingdetailsNew
 FetchDataBasedOnChartSelection(divisionID: number,seriesName: string):void {
  console.log(`Selected divisionID: ${divisionID}, Series: ${seriesName}`);
  
  var distid=0, mainSchemeId=0;
  this.spinner.show();
  // this.isshow=true;
  var workid=0,dayPara=0
var contractid=0;
  this.api.GetWorkOrderPendingDetailsNew(divisionID,distid,mainSchemeId,contractid).subscribe(
    (res: any) => {
          // Process the API response and map latitude and longitude to positions
          this.WorkorderpendingdetailsNew = res.map((item: any) => ({
            ...item,
           
          }));
          this.spinner.hide();
          console.log('Fetched markers:', this.WorkorderpendingdetailsNew);
        },
    (error) => {
      console.error('Error fetching drop info:', error);
  // this.toastr.error('Failed to load warehouse data');
    }
  );

}
//#endregion
  
}

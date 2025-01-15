import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { DashProgressDistCount } from 'src/app/Model/DashProgressCount';
import { ApiService } from 'src/app/service/api.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexTooltip,
  ApexFill,
  ApexLegend,
  NgApexchartsModule,
  ChartComponent
} from 'ng-apexcharts';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

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
  selector: 'app-dash-progress-dist-count',
  standalone: true,
  imports: [NgApexchartsModule, MatSortModule, MatPaginatorModule],
  templateUrl: './dash-progress-dist-count.component.html',
  styleUrls: ['./dash-progress-dist-count.component.css']
})
export class DashProgressDistCountComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions;
  whidMap: { [key: string]: number } = {};
  dataSource!: MatTableDataSource<DashProgressDistCount>;
  dashprogressdistCount: DashProgressDistCount[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  divisionid: any;

  constructor(public api: ApiService, private cdr: ChangeDetectorRef) {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        stacked: true,
        // height: 1000,
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
        text: 'District wise work Progress',
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
    this.loadData();
    this.dataSource = new MatTableDataSource<DashProgressDistCount>([]);

  }

  ngOnInit() {
    this.loadData();

    // setTimeout(() => this.loadData(), 10000);

  }

  loadData(): void {
    var roleName  = localStorage.getItem('roleName');
    // alert( roleName )
if(roleName == 'Division'){
  this.divisionid = sessionStorage.getItem('divisionID');
  // this.showDivision=false;
} else {
  this.divisionid =0;
}

// var roleName = localStorage.getItem('roleName');
// // alert( roleName )
// if (roleName == 'Division') {
//   this.divisionid = sessionStorage.getItem('divisionID');
//   this.himisDistrictid = 0;
//   this.showDivision = false;
//   // return; 
//   // alert( this.divisionid )
//   this.loadInitialData();
// } else if (roleName == 'Collector') {
//   this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
//   this.showDistrict = false;
//   this.showDivision = false;
//   this.loadInitialData();
//   //  alert( this.himisDistrictid );
// } else {
//   this.himisDistrictid = 0;
//   this.divisionid = 0;
//   this.loadInitialData();

// }
// divisionId: any, mainSchemeId: any,dashID:any
    this.api.DashProgressDistCount(this.divisionid , 0, 0).subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.dashprogressdistCount = data;
        } else {
          console.warn('Unexpected data format', data);
        }


        // this.dashprogressdistCount = data;
        const districtname: string[] = [];
        const accWorkOrder3001: number[] = [];
        const completed4001: number[] = [];
        const tenderProcess2001: number[] = [];
        const running5001: number[] = [];
        const landIssue6001: number[] = [];
        const toBeTender1001: number[] = [];
        const retunDept8001: number[] = [];
        const total: number[] = [];
        this.whidMap = {}; // Initialize the mmidMap
        // console.log('API Response:', data);
        data.forEach((item: {
          districtname: string; completed4001: any; tenderProcess2001: number; running5001: number;
          landIssue6001: number; district_ID: number; retunDept8001: number; total: number; accWorkOrder3001: number;toBeTender1001:number
        }) => {
          districtname.push(item.districtname);
          accWorkOrder3001.push(item.accWorkOrder3001);
          completed4001.push(item.completed4001);
          tenderProcess2001.push(item.tenderProcess2001);
          running5001.push(item.running5001);
          landIssue6001.push(item.landIssue6001);
          retunDept8001.push(item.retunDept8001);
          toBeTender1001.push(item.toBeTender1001);
          total.push(item.total);

          console.log('districtname:', item.districtname, 'whid:', item.district_ID);
          if (item.districtname && item.district_ID) {
            this.whidMap[item.districtname] = item.district_ID;
          } else {
            console.warn('Missing whid for warehousename :', item.districtname);
          }


        });

        console.log('whidMap:', this.whidMap); // Log the populated mmidMap

        this.chartOptions.series = [

          {
            name: 'Total Works',
            data: total,
            color: '#0000FF'
          }
          ,
          {
            name: 'Completed/Handover',
            data: completed4001,
            color:  'rgb(0, 128, 0)'
            // color: '#eeba0b'
          },
          {
            name: 'Running Work',
            data: running5001,
            color: 'rgb(144, 238, 144)'
            // color: '#90EE90'
          },
          {
            name: 'Acceptance/Work Order',
            data: accWorkOrder3001,
            color: 'rgb(173, 216, 230)'
            // color: '#008000'
          },
          {
            name: 'land Issue',
            data: landIssue6001,
            color: 'rgb(255, 0, 0)'
            // color: '#FF0000'
          },
          {
            name: 'Tender in Process',
            data: tenderProcess2001,
            color: 'rgb(255, 140, 0)'
            // color: '#ADD8E6'
          },
          {
            name: 'To be Tender',
            data: toBeTender1001,
            color: 'rgb(255, 192, 203)'
            // color: '#FFC0CB'
            // color: '#00b4d8'
          },
          // {
          //   name: 'retunDept',
          //   data: retunDept8001,
          //   color: 'rgb(158, 158, 158)'
          // },
        ];

        this.chartOptions.xaxis = { categories: districtname };
        this.cO = this.chartOptions;
        this.cdr.detectChanges();
      },
      (error: any) => {
        console.error('Error fetching data', error);
      }
    );
  }

  // fetchDataBasedOnChartSelection(): void {
  //   
  //   this.api.DashProgressDistCount(0, 0, 0).subscribe(
  //     (res : any) => {
  //       // this.dashprogressdistCount = res.map((item: DashProgressDistCount, index: number) => ({
  //       //   ...item,
  //       //   sno: index + 1
  //       // }));
  //       // this.dashprogressdistCount = res;
  //       console.log('res:=', res)
  //       this.dashprogressdistCount=res;
  //       this.dataSource = new MatTableDataSource(this.dashprogressdistCount); // Ensure dataSource is initialized
  //       // this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //       this.cdr.detectChanges();
  //     },
  //     (error) => {
  //       console.error('Error fetching data', error);
  //     }
  //   );
  // }

}

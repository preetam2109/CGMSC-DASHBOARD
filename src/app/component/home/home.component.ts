import { Component, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexStroke, ApexXAxis, ApexFill, ApexPlotOptions, ChartComponent } from 'ng-apexcharts';
import { ApiService } from 'src/app/service/api.service';
import { BasicAuthenticationService } from 'src/app/service/authentication/basic-authentication.service';
import { HardcodedAuthenticationService } from 'src/app/service/authentication/hardcoded-authentication.service'; // Assuming you have a service for getting the username
import { MenuServiceService } from 'src/app/service/menu-service.service';
import { ChartOptions } from '../card/card.component';
import { fontWeight } from 'html2canvas/dist/types/css/property-descriptors/font-weight';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { style } from '@angular/animations';
import { Observable, catchError, finalize, forkJoin, map, of, reduce, tap } from 'rxjs';
import { WOpendingTotal } from 'src/app/Model/DashProgressCount';
import autoTable from 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';
import { InsertUserPageViewLogmodal} from 'src/app/Model/DashLoginDDL';
import { Location } from '@angular/common';
import { StockStatusModel, whstockoutin,StockOutDetailsmodel,IssuePerDetailModel,WhStockOutInDetailModel} from 'src/app/Model/DashLoginDDL';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  exportToPDF() {
    throw new Error('Method not implemented.');
  }
  applyTextFilter($event: KeyboardEvent) {
    throw new Error('Method not implemented.');
  }
  @ViewChild('itemDetailsModal') itemDetailsModal: any;

  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions;
  chartOptions1: ChartOptions;
  chartOptions2: ChartOptions;
  chartOptions3: ChartOptions;
  chartOptions4: ChartOptions;
  chartStockoutdhs: ChartOptions;
  chartIndent: ChartOptions;
  chartNearexp: ChartOptions;
  chartUQC: ChartOptions;
  title: string = 'welcome';
  username: any = '';
  menuItems: {
    label: string;
    route: string;
    submenu?: { label: string; route: string }[];
    icon?: string;
  }[] = [];
  expandedMenus: { [key: string]: boolean } = {};
  nosIndent: number = 0; // Default value
  nosfac: number = 0; // Default value
  nositems: number = 0;
  mcid = 1;
  selectedCategoryRadio: any = 'Drugs';
  NormalZonal: any = 0;
  wOpendingTotal: any;
  LIPendingTotal: any;
  RunningWork: any;
  handoverAbstractl: any;
  pipelineSlippage: any;
  paidSummary: any;
  RCstatusDetails: any[] = [];
  pipelineSlippageItemDetail: any[] = [];
  pipelineSlippagePOItemDetailDTO: any[] = [];
  parameterNew: any;
  title1: any;
  flag:any
  totalpoitems: any;
  totalrecvalue: any;
  dropindentid: any;
  indentIssued: any;
  nooffacIndented: any;
  nosindent: any;
  totalpovalue: any;
  nositemsI: any;
  totalValuecr: any;
  nosfacility: any;
  roleName: any = localStorage.getItem('roleName');
  currentMonth = new Date().toLocaleString('default', { month: 'long' });
  MasIndentitemslist: any;
  itemid: any;
  MasItemlist: any;
  PartiIndentlist: any;
  PartPOsSince1920list: any;
  PartItemissuelist: any;
  PartItemRClist: any;

  totalNoTenders: number = 0;
  totalRC1: any[]=[];
  totalRC1details: any;

  @ViewChild('StatusDetailsModal') StatusDetailsModal: any;
  @ViewChild('pipelineSlippageItemDetailModal') pipelineSlippageItemDetailModal: any;
  @ViewChild('pipelineSlippagePOItemDetailDTOModal') pipelineSlippagePOItemDetailDTOModal: any;
  @ViewChild('RCDetailsModal') RCDetailsModal: any;

  dataSource = new MatTableDataSource<any>();
  dataSource2 = new MatTableDataSource<any>();
  dataSource3 = new MatTableDataSource<any>();
  dataSource4 = new MatTableDataSource<any>();
  dataSource8 = new MatTableDataSource<any>();
  dataSource9 = new MatTableDataSource<any>();
  dataSource10 = new MatTableDataSource<any>();
  dataSource11 = new MatTableDataSource<any>();
  @ViewChild('paginator8') paginator8!: MatPaginator;
  @ViewChild('sort8') sort8!: MatSort;
  @ViewChild('paginator9') paginator9!: MatPaginator;
  @ViewChild('sort9') sort9!: MatSort;
  @ViewChild('paginator15') paginator15!: MatPaginator;
  @ViewChild('sort15') sort15!: MatSort;
  @ViewChild('paginator16') paginator16!: MatPaginator;
  @ViewChild('sort16') sort16!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator2!: MatPaginator;
  @ViewChild(MatSort) sort2!: MatSort;
  @ViewChild(MatPaginator) paginator3!: MatPaginator;
  @ViewChild(MatSort) sort3!: MatSort;
  @ViewChild(MatPaginator) paginator4!: MatPaginator;
  @ViewChild(MatSort) sort4!: MatSort;

  selectedCategory: any = '';

  loadingSectionA = false;
  loadingSectionB = false;

  @ViewChild('StockOutDetailsModal') StockOutDetailsModal: any;
  @ViewChild('IssuePerDetailModal') IssuePerDetailModal: any;
  @ViewChild('WhStockOutInDetailModal') WhStockOutInDetailModal: any;

  dispatch_WhStockOutInDetail: WhStockOutInDetailModel[] = [];
  WhStockOutInDetail = new MatTableDataSource<WhStockOutInDetailModel>();
  InsertUserPageViewLogdata: InsertUserPageViewLogmodal = new InsertUserPageViewLogmodal();

  pageName: string = '';
  fullUrl: string = '';
  dispatch_IssueperDetails: IssuePerDetailModel[] = [];
  dispatch_StockOutDetails: StockOutDetailsmodel[] = [];
  dispatch_whstockoutin: whstockoutin[] = [];
  dispatchdata: StockStatusModel[] = [];
  IssuePerDetailsdata = new MatTableDataSource<IssuePerDetailModel>();
  StockoutDetailsdata = new MatTableDataSource<StockOutDetailsmodel>();
  StockStatusdata = new MatTableDataSource<StockStatusModel>();
  whstockoutindata = new MatTableDataSource<whstockoutin>();
  @ViewChild('paginator10') paginator10!: MatPaginator;
  @ViewChild('sort10') sort10!: MatSort;
  @ViewChild('paginator11') paginator11!: MatPaginator;
  @ViewChild('sort11') sort11!: MatSort;
  @ViewChild('paginator12') paginator12!: MatPaginator;
  @ViewChild('sort12') sort12!: MatSort;
  @ViewChild('paginator13') paginator13!: MatPaginator;
  @ViewChild('sort13') sort13!: MatSort;
  @ViewChild('paginator14') paginator14!: MatPaginator;
  @ViewChild('sort14') sort14!: MatSort;
  displayedColumns: string[] = [
    // "sno",
    'parameterNew',
    'cntItems',
    'pricecnt',
    'evalutioncnt',
    'livecnt',
    'rentendercn',
    // "action"
  ];
  displayedColumns1: string[] = [
    'sno',
    'itemcode',
    'itemname',
    'sku',
    // "unitcount",
    'dhsaiqty',
    'dmeaiqty',
    'avgIssueqty_Last3FY',
    'tenderstatus',
    'tenderstartdt',
    'coV_A_OPDATE',
    'dayssince',
    'parameterNew',
    'styockPer',
    'pricecnt',
    'evalutioncnt',
    'livecnt',
    'rentendercn',
    // "action"
  ];

  displayedColumns2: string[] = [
    'sno',
    'warehousename',
    'stockout',
    'stockin',
    'noofitems',

    // "action"

    // sno!:number;
    // warehouseid!:number;
    // warehousename!:string;
    // noofitems!:number;
    // stockout!:number;
    // stockin!:number;
  ];

  displayedColumns3: string[] = [
    'sno',
    'warehousename',
    'itemcode',
    'itemname',
    'strength',
    'sku',
    'readyforissue',
    'pending',
    "iwhPipeline",
    "supplierPipeline"
    // "stockOut",
    // "stockIn",
    // "action"
  ];

  // Define an array of colors for the cards
  // colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFC300', '#DAF7A6', '#C70039'];

  // Chart 1 - Daily Sales
  //  chart1 = {
  //   series: <ApexAxisChartSeries>[{
  //     name: "Sales",
  //     data: [10, 20, 15, 25, 30, 35]
  //   }],
  //   chart: <ApexChart>{
  //     type: 'line',
  //     height: 150
  //   },
  //   stroke: <ApexStroke>{
  //     curve: 'smooth'
  //   },
  //   xaxis: <ApexXAxis>{
  //     categories: ['M', 'T', 'W', 'T', 'F', 'S']
  //   },
  //   colors: ['#4caf50'],
  //   fill: <ApexFill>{
  //     type: 'gradient',
  //     gradient: {
  //       shade: 'light',
  //       type: "vertical",
  //       gradientToColors: ['#4caf50'],
  //       stops: [0, 100]
  //     }
  //   }
  // };

  // Chart 2 - Email Subscriptions
  chart2 = {
    series: <ApexAxisChartSeries>[
      {
        name: 'Subscriptions',
        data: [200, 400, 600, 800, 700, 600, 800, 900, 750, 850],
      },
    ],
    chart: <ApexChart>{
      type: 'bar',
      height: 150,
    },
    xaxis: <ApexXAxis>{
      categories: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O'],
    },
    colors: ['#ff9800'],
    fill: <ApexFill>{
      colors: ['#ff9800'],
    },
  };

  // Chart 3 - Completed Tasks
  // chart3 = {
  //   series: <ApexAxisChartSeries>[
  //     {
  //        // Series name
  //       data: [] // Dynamically populated
  //     }
  //   ],
  //   chart: <ApexChart>{
  //     type: 'bar', // Keep the type as 'bar'
  //     height: 400,
  //   },
  //   plotOptions: <ApexPlotOptions>{
  //     bar: {
  //       horizontal: true, // Set the bars to horizontal
  //     }
  //   },
  //   stroke: <ApexStroke>{
  //     width: 1, // Bar border width
  //     colors: ['#fff'] // Optional: Border color for the bars
  //   },
  //   xaxis: <ApexXAxis>{
  //     categories: [] ,// Dynamically populated
  //     opposite:false
  //   },
  //   tooltip: {
  //     enabled: true,
  //     y: {
  //       formatter: (val: any) => `${val}` // Show only the value in the tooltip
  //     }
  //   },
  //   colors: ['#f44336'], // Customize bar colors
  //   fill: <ApexFill>{
  //     type: 'gradient',
  //     gradient: {
  //       shade: 'light',
  //       type: 'vertical', // Gradient direction for horizontal bars
  //       gradientToColors: ['#ff7961'], // Second color in the gradient
  //       stops: [0, 100] // Define where the gradient starts and ends
  //     }

  //   }
  // };
  // chart3 = {
  //   series: <ApexAxisChartSeries>[
  //     {
  //       data: [] // Dynamically populated data
  //     }
  //   ],
  //   chart: <ApexChart> {
  //     type: 'bar',
  //     height: 400
  //   },
  //   plotOptions: <ApexPlotOptions> {
  //     bar: {
  //       horizontal: true, // Ensures the bars are horizontal
  //       columnWidth: '50%', // You can adjust the width of the bars
  //       endingShape: 'rounded' // Optional: rounded end for bars
  //     }
  //   },
  //   stroke: <ApexStroke> {
  //     width: 1, // Bar border width
  //     colors: ['#fff'] // Border color for the bars
  //   },
  //   xaxis: <ApexXAxis> {
  //     categories: [] // Dynamically populated categories
  //   },
  //   tooltip: {
  //     enabled: true,
  //     y: {
  //       formatter: (val: any) => `${val}` // Corrected: Use template literals for value display
  //     }
  //   },
  //   colors: ['#f44336'], // Custom bar color
  //   fill: <ApexFill> {
  //     type: 'gradient',
  //     gradient: {
  //       shade: 'light',
  //       type: 'vertical', // Gradient direction
  //       gradientToColors: ['#ff7961'], // Second color for gradient
  //       stops: [0, 100] // Gradient stops
  //     }
  //   }
  // };

  colors = [];
  role: any = localStorage.getItem('roleName');
  labelToIconMap: { [key: string]: string } = {
    Home: 'assets/dash-icon/house.png',
    'Seasonal Drugs': 'assets/dash-icon/season.png',
    'Health Facilities Coverage': 'assets/dash-icon/hscov.png',
    'Warehouse Information': 'assets/dash-icon/data-warehouse.png',
    'Warehouse Stock Abstract': 'assets/dash-icon/packages.png',
    'Warehouse Stock Details': 'assets/dash-icon/inventory.png',
    Devlivery: 'assets/dash-icon/fast-delivery.png',
    'Growth in Distribution': 'assets/dash-icon/distribution.png',
    'Warehouse Stock-out %': 'assets/dash-icon/out-of-stock.png',
    'ANPR Report ': 'assets/dash-icon/cctv-camera.png',
    'Near Expiry': 'assets/dash-icon/expired.png',
    'Time-Based Analysis': 'assets/dash-icon/time-to-market.png',
    'Growth In Procurment': 'assets/dash-icon/financial-profit.png',
    NOC: 'assets/dash-icon/approved.png',
    'Quality Control': 'assets/dash-icon/biochemist.png',
    Handover: 'assets/dash-icon/hand-over.png',
    'Work Order': 'assets/dash-icon/clipboard.png',
    'Running Works': 'assets/dash-icon/under-construction.png',
    'cgmsc-supplies': 'assets/dash-icon/drugs.png',
    ' Evaluation': 'assets/dash-icon/norm.png',
    'Evaluation': 'assets/dash-icon/norm.png',
    'Progress Abstract': 'assets/dash-icon/hospital.png',
    'Analysis': 'assets/dash-icon/analysis_12139646.png',
    'Tender Evaluation': 'assets/dash-icon/check-list.png',
    'Consumption Pattern': 'assets/dash-icon/consumptiondash.png',
    'Live Tender': 'assets/dash-icon/auction.png',
    'To be Tender': 'assets/dash-icon/tender.png',
    'Payment Tracker': 'assets/dash-icon/payment.png',
    'Search Work': 'assets/dash-icon/analysis.png',
    'Work Abstract': 'assets/dash-icon/analysis_.png',
    'Administrative Sanction': 'assets/dash-icon/blogger.png',
    'Land Issues': 'assets/dash-icon/barrier.png',
    'Technical Sanction': 'assets/dash-icon/deadline.png',
    'Monitoring with Geographic Coordinate': 'assets/dash-icon/planning.png',
    'District-wise Progress': 'assets/dash-icon/online-report.png',
    'Progress on Scheme': 'assets/dash-icon/online-report.png',
    'Engineer Work Tracker': 'assets/dash-icon/person.png',
    'Engineer-Works': 'assets/dash-icon/person.png',
    'Payment Time Taken': 'assets/dash-icon/saving.png',
    'Finance Dashboard': 'assets/dash-icon/dashboard.png',
    Dashboard: 'assets/dash-icon/dashboard.png',
    'Handover Insights': 'assets/dash-icon/hand-over.png',
    'Attendance': 'assets/dash-icon/deadline.png',
    'Conversation Hod ': 'assets/dash-icon/cooperation.png',
    'Tender Status': 'assets/dash-icon/dashboard.png',
    'QC Insights ': 'assets/dash-icon/biochemist.png',
    'QC Courier': 'assets/dash-icon/biochemist.png',
    'QC-Lab Issues': 'assets/dash-icon/biochemist.png',
    'Finance': 'assets/dash-icon/budget.png',
    'Supplier Pending Payments': 'assets/dash-icon/payment.png',
    'Payment': 'assets/dash-icon/payment.png',
    'DHS Dashboard': 'assets/dash-icon/online-report.png',
    'CME Dashboard': 'assets/dash-icon/online-report.png',
    'Med. Coll/Hospital Indent vs Issuance/NOC': 'assets/dash-icon/hscov.png',
    'Field Stock': 'assets/dash-icon/SDrug.png',
    'Warehouse Indent Pending': 'assets/dash-icon/drugs.png',
    'Quality Control Track': 'assets/dash-icon/biochemist.png',
    'WH Wise Stock Out': 'assets/dash-icon/out-of-stock.png',
    'Time Taken By Supplier': 'assets/dash-icon/project.png',
    'Door Delivery App Uses': 'assets/dash-icon/fast-delivery.png',
    'QC Time Taken': 'assets/dash-icon/biochemist.png',
  };
  constructor(
    public toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private api: ApiService,
    private menuService: MenuServiceService,
    private authService: HardcodedAuthenticationService,
    public basicAuthentication: BasicAuthenticationService,
    public router: Router,private location: Location,
  ) {
    this.pageName = this.location.path();
this.fullUrl = window.location.href;
    this.StockStatusdata = new MatTableDataSource<StockStatusModel>([]);
    this.whstockoutindata = new MatTableDataSource<whstockoutin>([]);
    this.StockoutDetailsdata = new MatTableDataSource<StockOutDetailsmodel>([]);
    this.IssuePerDetailsdata = new MatTableDataSource<IssuePerDetailModel>([]);
    this.WhStockOutInDetail = new MatTableDataSource<WhStockOutInDetailModel>(
      []
    );

    this.chartOptions = {
      series: [], // Your data values
      chart: {
        type: 'donut',
        height: 150, // ✅ Set height explicitly
        // width: 400,
      },
      labels: [],
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#001219'],
          fontWeight: '2px',
        },
        formatter: function (val: any, opts: any) {
          return opts.w.globals.series[opts.seriesIndex]; // Shows actual values inside the chart
        },
      },
      legend: {
        // position: "right", // ✅ Legends appear on the right
        // fontSize: '14px',
        // fontWeight: 'bold',
        labels: {
          // colors: "#333",
          // useSeriesColors: false
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300, // ✅ Responsive width
              height: 300,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    } as unknown as ChartOptions;

    this.chartStockoutdhs = {
      series: [], // Radial bar data
      chart: {
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '16px',
            },
            value: {
              fontSize: '14px',

              formatter: function (_val: any, opts: any) {
                console.log('opts.w.globals.series:', opts.w.globals.series); // Debugging
                console.log('opts.seriesIndex:', opts.seriesIndex); // Debugging
                return (
                  opts.w.globals.series[opts.seriesIndex]?.toString() || '0'
                ); // Ensure total values are displayed
              },
            },
          },
        },
      },
      labels: ['Total Drugs', 'Stock out Drugs', 'Stock out %'],
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#FF0000'],
        },
        formatter: function (val: any, opts: any) {
          return opts.w.globals.series[opts.seriesIndex]; // Shows actual values inside the chart
        },
      },
      legend: {
        labels: {},
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    } as unknown as ChartOptions;

    this.chartIndent = {
      series: [], // Radial bar data
      chart: {
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '16px',
            },
            value: {
              fontSize: '14px',

              formatter: function (_val: any, opts: any) {
                console.log('opts.w.globals.series:', opts.w.globals.series); // Debugging
                console.log('opts.seriesIndex:', opts.seriesIndex); // Debugging
                return (
                  opts.w.globals.series[opts.seriesIndex]?.toString() || '0'
                ); // Ensure total values are displayed
              },
            },
          },
        },
      },
      labels: ['No of Drugs', 'Return From CGMSC', 'Actual Annual Indent'],
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#FF0000'],
        },
        formatter: function (val: any, opts: any) {
          return opts.w.globals.series[opts.seriesIndex]; // Shows actual values inside the chart
        },
      },
      legend: {
        labels: {},
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    } as unknown as ChartOptions;

    this.chartOptions3 = {
      series: [], // Radial bar data
      chart: {
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '16px',
            },
            value: {
              fontSize: '14px',
              formatter: function (_val: any, opts: any) {
                console.log('opts.w.globals.series:', opts.w.globals.series); // Debugging
                console.log('opts.seriesIndex:', opts.seriesIndex); // Debugging
                return (
                  opts.w.globals.series[opts.seriesIndex]?.toString() || '0'
                ); // Ensure total values are displayed
              },
            },
          },
        },
      },
      labels: ['EDL', 'NEDL', 'Total'],
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#001219'],
          fontWeight: '2px',
        },
        formatter: function (val: any, opts: any) {
          return opts.w.globals.series[opts.seriesIndex]; // Shows actual values inside the chart
        },
      },
      legend: {
        labels: {},
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    } as unknown as ChartOptions;

    this.chartUQC = {
      series: [], // Radial bar data
      chart: {
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '16px',
            },
            value: {
              fontSize: '14px',
              formatter: function (_val: any, opts: any) {
                console.log('opts.w.globals.series:', opts.w.globals.series); // Debugging
                console.log('opts.seriesIndex:', opts.seriesIndex); // Debugging
                return (
                  opts.w.globals.series[opts.seriesIndex]?.toString() || '0'
                ); // Ensure total values are displayed
              },
            },
          },
        },
      },

      labels: ['UQC Stock Value(in Cr)', 'No of Items', 'No of Batches'],
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#001219'],
          fontWeight: '2px',
        },
        formatter: function (val: any, opts: any) {
          return opts.w.globals.series[opts.seriesIndex]; // Shows actual values inside the chart
        },
      },
      legend: {
        labels: {},
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    } as unknown as ChartOptions;

    this.chartOptions4 = {
      series: [], // Radial bar data
      chart: {
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '16px',
            },
            value: {
              fontSize: '14px',
              formatter: function (_val: any, opts: any) {
                console.log('opts.w.globals.series:', opts.w.globals.series); // Debugging
                console.log('opts.seriesIndex:', opts.seriesIndex); // Debugging
                return (
                  opts.w.globals.series[opts.seriesIndex]?.toString() || '0'
                ); // Ensure total values are displayed
              },
            },
          },
        },
      },
      labels: ['EDL', 'NEDL', 'Total'],
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#001219'],
          fontWeight: '2px',
        },
        formatter: function (val: any, opts: any) {
          return opts.w.globals.series[opts.seriesIndex]; // Shows actual values inside the chart
        },
      },
      legend: {
        labels: {},
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    } as unknown as ChartOptions;

    this.chartOptions1 = {
      series: [],
      chart: {
        type: 'line',
        stacked: true,
        height: 150,
      },
      labels: [],
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: undefined,
        },
        labels: {
          formatter: function (value) {
            return value.toFixed(0); // This will show the values without decimals
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          // colors: ['#FF0000']
        },
      },
      stroke: {
        width: 4,
        // colors: ['#fff'],
      },
      title: {
        text: '',
        align: 'center',
        style: {
          fontWeight: 'bold',
          fontSize: '16px',
          color: '#FF3C00',
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
        show: false,
      },
    };

    this.chartNearexp = {
      series: [],
      chart: {
        type: 'line',
        stacked: true,
        height: 150,
      },
      labels: [],
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: undefined,
        },
        labels: {
          formatter: function (value) {
            return value.toFixed(0); // This will show the values without decimals
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          // colors: ['#FF0000']
        },
      },
      stroke: {
        width: 4,
        // colors: ['#fff'],
      },
      title: {
        text: '',
        align: 'center',
        style: {
          fontWeight: 'bold',
          fontSize: '16px',
          color: '#FF3C00',
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
        // position: 'right',
        // horizontalAlign: 'center',
        // offsetX: 40,
        show: false,
      },
    };
    this.chartOptions2 = {
      series: [],
      chart: {
        type: 'line',
        stacked: true,
        height: 150,
      },
      labels: [],
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: undefined,
        },
        labels: {
          formatter: function (value) {
            return value.toFixed(0); // This will show the values without decimals
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          // colors: ['#FF0000']
        },
      },
      stroke: {
        width: 4,
        // colors: ['#fff'],
      },
      title: {
        text: '',
        align: 'center',
        style: {
          fontWeight: 'bold',
          fontSize: '16px',
          color: '#FF3C00',
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
        // position: 'right',
        // horizontalAlign: 'center',
        // offsetX: 40,
        show: false,
      },
    };
  }
  applyTextFiltertotal(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource8.filter = filterValue.trim().toLowerCase();

    if (this.dataSource8.paginator) {
      this.dataSource8.paginator.firstPage();
    }
  }
  applyTextFilterpipelineSlippage(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource10.filter = filterValue.trim().toLowerCase();

    if (this.dataSource10.paginator) {
      this.dataSource10.paginator.firstPage();
    }
  }
  applyTextFilterpipelineSlippagePOItemDetailDTOModal(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource11.filter = filterValue.trim().toLowerCase();

    if (this.dataSource11.paginator) {
      this.dataSource11.paginator.firstPage();
    }
  }
  applyTextFiltertotalRC(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource9.filter = filterValue.trim().toLowerCase();

    if (this.dataSource9.paginator) {
      this.dataSource9.paginator.firstPage();
    }
  }
  ngOnInit() {
    this.spinner.show();
    this.GETStockStatus(),
      this.whstockoutin(),
      (this.username = sessionStorage.getItem('authenticatedUser'));

    this.role = this.basicAuthentication.getRole().roleName; // Fetch dynamic role from the authentication service
    console.log('SE Role:', this.role);
    this.updateMenu();
    //  this.addIconsToMenu();
    this.selectedCategory = this.menuService.getSelectedCategory();

    forkJoin([
      this.CGMSCIndentPending().pipe(catchError(() => of(null))),
      this.GetDeliveryInMonth().pipe(catchError(() => of(null))),
      this.GetPOCountCFY().pipe(catchError(() => of(null))),
      this.last7DaysIssue().pipe(catchError(() => of(null))),
      // this.loadData().pipe(catchError(() => of(null))),
      this.loadData1().pipe(catchError(() => of(null))),
      this.loadData2().pipe(catchError(() => of(null))),
      this.loadData3().pipe(catchError(() => of(null))),
      this.loadStockoutDHS().pipe(catchError(() => of(null))),
      this.loadIndent().pipe(catchError(() => of(null))),
      this.Nearexp().pipe(catchError(() => of(null))),
      this.loadUQC().pipe(catchError(() => of(null))),
      this.loadData4().pipe(catchError(() => of(null))),
      this.getItemNoDropDown().pipe(catchError(() => of(null))),
      this.getTenderStatus().pipe(catchError(() => of(null))),
      this.getTotalRC1().pipe(catchError(() => of(null))),
      this.wOPendingTotal().pipe(catchError(() => of(null))),
      this.getLIPendingTotal().pipe(catchError(() => of(null))),
      this.gETRunningWorkSummary().pipe(catchError(() => of(null))),
      this.handoverAbstract().pipe(catchError(() => of(null))),
      this.gETPaidSummary().pipe(catchError(() => of(null))),
      this.GetpipelineSlippage().pipe(catchError(() => of(null))),
    ])
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe({
        error: () => this.toastr.error('Some data failed to load'),
      });

      this.InsertUserPageViewLog();
    // Collect all API observables
    //   const apiCalls = [
    //     this.CGMSCIndentPending(),
    //     this.GetDeliveryInMonth(),
    //     this.GetPOCountCFY(),
    //     this.last7DaysIssue(),
    //     this.loadData(),
    //     this.loadData1(),
    //     this.loadData2(),
    //     this.loadData3(),
    //     this.loadStockoutDHS(),
    //     this.loadIndent(),
    //     this.Nearexp(),
    //     this.loadUQC(),
    //     this.loadData4(),
    //     this.getItemNoDropDown(),
    //     this.getTenderStatus(),
    //     this.getTotalRC1(),
    //     this.wOPendingTotal(),
    //     this.getLIPendingTotal(),
    //     this.gETRunningWorkSummary(),
    //     this.handoverAbstract(),
    //     this.gETPaidSummary()
    // ];

    // // Execute all API calls in parallel
    // forkJoin(apiCalls).pipe(
    //     finalize(() => this.spinner.hide()) // Hide spinner when all complete
    // ).subscribe({
    //     error: () => this.toastr.error('Some data failed to load')
    // });
  }
  gETPaidSummary(): Observable<any> {
    return this.api
      .GETPaidSummary('GTotal', 0, 0, 0, '01-Apr-2025', '30-May-2025')
      .pipe(
        map((res: any[]) => {
          const total = res.reduce(
            (sum, item) => sum + Number(item?.noofWorks || 0),
            0
          );
          this.paidSummary = total;
          return total;
        }),
        catchError((error) => {
          console.error('Failed to load paid summary:', error);
          this.toastr?.error('Error loading paid summary');
          this.paidSummary = 0;
          return of(0);
        })
      );
  }

  handoverAbstract(): Observable<any> {
    return this.api
      .HandoverAbstract('Total', 4001, 0, 0, 0, '01-Apr-2025', '30-May-2025', 0)
      .pipe(
        catchError((error) => {
          console.error('Failed to load handover abstract:', error);
          this.toastr.error('Error loading handover data');
          this.handoverAbstractl = 0;
          return of([]); // return safe fallback
        }),
        tap((res: any[]) => {
          this.handoverAbstractl = res.reduce(
            (sum, item) => sum + Number(item.totalWorks || 0),
            0
          );
        })
      );
  }
  GetpipelineSlippage(): Observable<any> {
    return this.api
      .pipelineSlippage()
      .pipe(
        catchError((error) => {
          console.error('Failed to load pipelineSlippage abstract:', error);
          this.toastr.error('Error loading pipelineSlippage data');
          this.pipelineSlippage = 0;
          return of([]); // return safe fallback
        }),
        tap((res: any[]) => {
          this.pipelineSlippage = res
        })
      );
  }

  getLIPendingTotal(): Observable<any> {
    return this.api.GetLIPendingTotal('Total', 0, 0, 0).pipe(
      map((res: any[]) => {
        const total = res.reduce(
          (sum, item) => sum + Number(item.totalWorks || 0),
          0
        );
        this.LIPendingTotal = total;
        return total;
      }),
      catchError((error) => {
        console.error('Failed to fetch LI Pending Total:', error);
        this.toastr.error('Error loading LI pending total');
        return of(0);
      })
    );
  }

  gETRunningWorkSummary(): Observable<any> {
    return this.api.GETRunningWorkSummary('GTotal', 0, 0, 0, 0).pipe(
      map((res: any[]) => {
        const total = res.reduce(
          (sum, item) => sum + Number(item.totalWorks || 0),
          0
        );
        this.RunningWork = total;
        return total;
      }),
      catchError((error) => {
        console.error('Failed to fetch running work summary:', error);
        this.toastr.error('Error loading running work summary');
        return of(0);
      })
    );
  }

  wOPendingTotal(): Observable<any> {
    return this.api.WOPendingTotal('Total', 0, 0, 0).pipe(
      map((res: any[]) => {
        const total = res.reduce(
          (sum, item) => sum + Number(item.pendingWork || 0),
          0
        );
        this.wOpendingTotal = total;
        return total;
      }),
      catchError((error) => {
        console.error('Failed to fetch WO Pending Total:', error);
        this.toastr.error('Error loading Work Order pending total');
        return of(0);
      })
    );
  }

  getTotalRC1(): Observable<any[]> {
    return this.api.GetTotalRC1(this.mcid, 'Y').pipe(
      tap((res: any[]) => {
        this.totalRC1 = res;
        console.log('TotalRC1 Response:', JSON.stringify(this.totalRC1));
      }),
      catchError((error) => {
        console.error('Failed to load RC1 data:', error);
        this.toastr.error('Error loading RC1 data');
        return of([]); // or of(null) depending on your logic
      })
    );
  }

  getTenderStatus(): Observable<any> {
    if (this.selectedCategory === 'Infrastructure') {
      return this.api.GetConsTenderStatus(this.NormalZonal).pipe(
        map((res: any[]) => {
          const total = res
            .filter((item) => item.tenderStatus !== 'To Be Tender')
            .reduce((sum, item) => sum + (item.nosWorks || 0), 0);
          this.totalNoTenders = total;
          return total;
        }),
        catchError((error) => {
          console.error('Failed to load tender status (Cons):', error);
          this.toastr.error('Error loading construction tender status');
          return of(0);
        })
      );
    } else {
      return this.api.GetTenderStagesTotal(this.mcid).pipe(
        map((res: any[]) => {
          const total = res.reduce(
            (sum, item) => sum + (item.noTenders || 0),
            0
          );
          this.totalNoTenders = total;
          return total;
        }),
        catchError((error) => {
          console.error('Failed to load tender status:', error);
          this.toastr.error('Error loading tender stages');
          return of(0);
        })
      );
    }
  }

  getItemNoDropDown(): Observable<any[]> {
    return this.api.MasIndentitems(this.mcid, 0, 0, 0).pipe(
      map((res: any[]) => {
        if (res && res.length > 0) {
          const mappedList = res.map((item) => ({
            itemid: item.itemid,
            nameText: item.nameText,
          }));
          this.MasIndentitemslist = mappedList;
          return mappedList;
        } else {
          console.error('No nameText found or incorrect structure:', res);
          return [];
        }
      }),
      catchError((error) => {
        console.error('Error fetching dropdown items:', error);
        this.toastr.error('Failed to load item dropdown');
        return of([]);
      })
    );
  }

  // GetTotalRC(){
  //   this.api.getTotalRC().subscribe((res:any)=>{

  //   })

  // }
  GetNearExpRC() {
    this.api.getNearExpRC(1).subscribe((res: any) => {});
  }
  GetDeliveryInMonth(): Observable<any> {
    return this.api.getDeliveryInMonth(0, 0, 0, 0, this.mcid).pipe(
      tap((res: any) => {
        this.nosindent = res[0].nosindent;
        this.indentIssued = res[0].indentIssued;
        this.nooffacIndented = res[0].nooffacIndented;
      }),
      catchError((error) => {
        console.error('Failed to load delivery data:', error);
        this.toastr.error('Data not found');
        return of([]); // or of(null), depending on how you handle failure
      })
    );
  }

  GetPOCountCFY(): Observable<any> {
    return this.api.getPOCountCFY(0, this.mcid, 0).pipe(
      tap((res: any) => {
        this.totalpoitems = res[0].totalpoitems;
        this.totalpovalue = res[0].totalpovalue;
        this.totalrecvalue = res[0].totalrecvalue;
      }),
      catchError((error) => {
        console.error('Failed to load PO count:', error);
        this.toastr.error('Data not found');
        return of([]); // or of(null) based on your use case
      })
    );
  }

  last7DaysIssue(): Observable<any> {
    return this.api.Last7DaysIssue(0, this.mcid, 0, 0, 0).pipe(
      tap((res: any) => {
        this.nositemsI = res[0].nositems;
        this.totalValuecr = res[0].totalValuecr;
        this.nosfacility = res[0].nosfacility;
      }),
      catchError((error) => {
        console.error('Failed to load last 7 days issue data:', error);
        this.toastr.error('Data not found');
        return of([]); // or of(null) if more appropriate
      })
    );
  }

  CGMSCIndentPending(): Observable<any> {
    return this.api.CGMSCIndentPending(this.mcid, 0).pipe(
      tap((res: any) => {
        console.log('dsds', res);
        this.nosIndent = res[0].nosIndent;
        this.nosfac = res[0].nosfac;
        this.nositems = res[0].nositems;
      }),
      catchError((error) => {
        console.error('Failed to load CGMSC Indent Pending:', error);
        this.toastr.error('Data not found');
        return of([]); // return fallback value
      })
    );
  }

  menuIcons() {}
  // Method to add custom icons based on the label
  addIconsToMenu(): void {
    // Define a mapping for labels to icons
    const labelToIconMap: any = {
      Home: 'home',
      'Seasonal Drugs': 'assets/dash-icon/pill.png',
    };

    // Loop through the menu items and set the icon for each label
    this.menuItems.forEach((item) => {
      item.icon = labelToIconMap[item.label] || 'default_icon'; // Default icon if no match found
    });

    // Log the updated menuItems with icons
    console.log('Menu Items with Icons:', this.menuItems);
  }

  closeSubmenu() {
    // Loop through expanded menus and close them
    for (const key in this.expandedMenus) {
      this.expandedMenus[key] = false;
    }
  }

  private updateMenu() {
    console.log('Role:', this.role);

    // ;
    // Check if the role has categories or direct items
    const hasCategories = ['SEC1', 'DHS', 'CME'].includes(this.role);

    if (hasCategories) {
      const category = this.menuService.getSelectedCategory();
      console.log('Selected Category:', category);
      if (category) {
        this.menuItems = this.menuService.getMenuItems(this.role);
      } else {
        // Handle the case where no category is selected
        this.menuItems = [];
      }
    } else {
      // For roles without categories, fetch items directly
      this.menuItems = this.menuService.getMenuItems(this.role);
    }

    const unwantedLabels = ['EMD Drugs/Consumables', 'IWH Pendings'];
    this.menuItems = this.menuItems.filter(
      (item) => !unwantedLabels.includes(item.label)
    );
    console.log('Menu Items:', this.menuItems);
  }

  toggleSubmenu(menuLabel: string): void {
    // Toggle the clicked submenu, close all others
    for (const key in this.expandedMenus) {
      if (key !== menuLabel) {
        this.expandedMenus[key] = false; // Collapse all other menus
      }
    }
    this.expandedMenus[menuLabel] = !this.expandedMenus[menuLabel]; // Toggle current menu
  }

  onISelectChange(event: Event): void {
    const selectedUser = this.MasIndentitemslist.find(
      (user: { itemid: string }) => user.itemid === this.itemid
    );

    if (selectedUser) {
      this.itemid = selectedUser.itemid || null;
      // this.getTravelVouchers()
    } else {
      console.error('Selected itemid not found in the list.');
    }
  }

  // loadData() {
  //
  //   // Replace the API call with your endpoint and parameters
  //   const fromDate = '01-Jan-2025'; // Example date
  //   const toDate = '30-Jan-2025'; // Example date
  //   this.api.DeliveryInMonth(fromDate,toDate).subscribe((data:any)=>{
  //     console.log('data',data[0])
  //     this.chart3.series[0].data = [
  //       data[0].nooffacIndented,
  //       data[0].nosindent,
  //       data[0].indentIssued,
  //       data[0].dropindentid,
  //       data[0].dropfac
  //     ];
  //     this.chart3.xaxis.categories = [
  //       'No. of Facilities Indented',
  //       'No. of Indents',
  //       'Indents Issued',
  //       'Drop Indents',
  //       'Drop Facilities'
  //     ];
  //   });
  //   }
  loadData() {
    // ;
    // const fromDate = '01-Jan-2025';
    // const toDate = '30-Jan-2025';
    // this.api.DeliveryInMonth(fromDate, toDate).subscribe(
    //   (data: any) => {
    //     const nooffacIndented: number[] = [];
    //     const nosindent: number[] = [];
    //     const dropfac: number[] = [];
    //     const dropindentid: number[] = [];
    //     console.log('Delivered from warehouse Response:', data);
    //     data.forEach((item: any) => {
    //       nooffacIndented.push(item.nooffacIndented);
    //       nosindent.push(item.nosindent);
    //       dropfac.push(item.dropfac);
    //       dropindentid.push(item.dropindentid);
    //     });
    //     const totalNoOffacIndented = nooffacIndented.reduce((a, b) => a + b, 0);
    //     const totalNosIndent = nosindent.reduce((a, b) => a + b, 0);
    //     const totalDropFac = dropfac.reduce((a, b) => a + b, 0);
    //     const Dropindentid = dropindentid.reduce((a, b) => a + b, 0);
    //     this.chartOptions = {
    //       ...this.chartOptions,
    //       series: [totalNoOffacIndented,totalDropFac ,totalNosIndent,Dropindentid ],
    //       chart: {
    //         type: "donut"
    //       },
    //       labels: [
    //         'Indented Facility',
    //         'Delivered Facilities',
    //         'Total Indent',
    //         'Delivered Indent'
    //       ]
    //     } as any;
    //   }
    //   ,
    //   (error: any) => {
    //     console.error('Error fetching data', error);
    //   }
    // );
  }

  loadData3(): Observable<any[]> {
    return this.api.getTotalRC(this.mcid).pipe(
      tap((data: any) => {
        const categories: string[] = [];
        const edl: number[] = [];
        const nedl: number[] = [];
        const total: number[] = [];

        console.log('Delivered from warehouse Response:', data);

        data.forEach((item: any) => {
          categories.push(item.mcategory);
          edl.push(item.edl);
          nedl.push(item.nedl);
          total.push(item.total);
        });

        // Update the bar chart
        this.chartOptions3 = {
          series: [
            { name: 'EDL', data: edl },
            { name: 'Non-EDL', data: nedl },
            { name: 'Total', data: total },
          ],
          chart: { type: 'bar', height: 300 },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '50%',
              endingShape: 'rounded',
            },
          },
          dataLabels: { enabled: true },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
          },
          xaxis: {
            categories: categories,
          },
          yaxis: {
            title: { text: 'NOS RC' },
          },
          fill: { opacity: 1 },
          tooltip: {
            y: {
              formatter: (val: number) => val.toString(),
            },
          },
          legend: {
            position: 'top',
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: { width: 300 },
                legend: { position: 'bottom' },
              },
            },
          ],
        } as any;
      }),
      catchError((error) => {
        console.error('Error fetching data', error);
        this.toastr.error('Chart data failed to load');
        return of([]); // fallback observable
      })
    );
  }

  loadStockoutDHS(): Observable<any[]> {
    return this.api.StockoutPer(this.mcid, 1, 0, 2).pipe(
      tap((data: any[]) => {
        const edLtypeid: number[] = [];
        const edLtpe: string[] = [];
        const nositems: number[] = [];
        const stockout: number[] = [];
        const stockoutp: number[] = [];

        console.log('DHS Stock out percentage:', data);

        data.forEach((item: any) => {
          edLtypeid.push(item.edLtypeid);
          edLtpe.push(item.edLtpe);
          nositems.push(item.nositems);
          stockout.push(item.stockout);
          stockoutp.push(item.stockoutp);
        });

        this.chartStockoutdhs = {
          series: [
            {
              name: 'Total ' + this.selectedCategoryRadio,
              data: nositems,
            },
            {
              name: 'Stock out',
              data: stockout,
            },
            {
              name: 'Stock out %',
              data: stockoutp,
            },
          ],
          chart: {
            type: 'bar',
            height: 300,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '70%',
              endingShape: 'rounded',
              dataLabels: {
                position: 'top',
              },
            },
          },
          stroke: {
            show: true,
            width: 1,
            colors: ['transparent'],
          },
          xaxis: {
            categories: edLtpe,
          },
          yaxis: {
            title: {
              text: 'No of ' + this.selectedCategoryRadio,
            },
          },
          dataLabels: {
            enabled: true,
            style: {
              colors: ['#000'],
            },
          },
          fill: {
            opacity: 1,
          },
          tooltip: {
            y: {
              formatter: (val: number) => val.toString(),
            },
          },
          legend: {
            position: 'top',
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 300,
                },
                legend: {
                  position: 'bottom',
                },
              },
            },
          ],
        } as any;
      }),
      catchError((error) => {
        console.error('Error fetching data', error);
        this.toastr.error('Failed to load DHS Stockout data');
        return of([]); // fallback observable
      })
    );
  }

  loadIndent(): Observable<any[]> {
    return this.api.IndentcntHome(this.mcid, 0).pipe(
      tap((data: any[]) => {
        const hod: string[] = [];
        const nositems: number[] = [];
        const returned: number[] = [];
        const actualAI: number[] = [];

        console.log('Annual Indent data:', data);

        data.forEach((item: any) => {
          hod.push(item.hod);
          nositems.push(item.nositems);
          returned.push(item.returned);
          actualAI.push(item.actualAI);
        });

        this.chartIndent = {
          series: [
            {
              name: 'No of Items',
              data: nositems,
            },
            {
              name: 'Return From CGMSC',
              data: returned,
            },
            {
              name: 'Actual Annual Indent',
              data: actualAI,
            },
          ],
          chart: {
            type: 'bar',
            height: 300,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '70%',
              endingShape: 'rounded',
              dataLabels: {
                position: 'top',
              },
            },
          },
          stroke: {
            show: true,
            width: 1,
            colors: ['transparent'],
          },
          xaxis: {
            categories: hod,
          },
          yaxis: {
            title: {
              text: '',
            },
          },
          dataLabels: {
            enabled: true,
            style: {
              colors: ['#000'],
            },
          },
          fill: {
            opacity: 1,
          },
          tooltip: {
            y: {
              formatter: (val: number) => val.toString(),
            },
          },
          legend: {
            position: 'top',
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 300,
                },
                legend: {
                  position: 'bottom',
                },
              },
            },
          ],
        } as any;
      }),
      catchError((error) => {
        console.error('Error fetching data', error);
        this.toastr.error('Failed to load Indent chart');
        return of([]); // Fallback value for forkJoin compatibility
      })
    );
  }

  loadData4(): Observable<any[]> {
    return this.api.CGMSCStockHome(this.mcid).pipe(
      tap((data: any[]) => {
        const edLtpe: string[] = [];
        const nositems: number[] = [];
        const stkvalue: number[] = [];
        const total: number[] = [];

        console.log('Delivered from warehouse Response:', data);

        data.forEach((item: any) => {
          edLtpe.push(item.edLtpe);
          nositems.push(item.nositems);
          stkvalue.push(item.stkvalue);
          total.push(item.total);
        });

        this.chartOptions4 = {
          series: [
            {
              name: 'No of ' + this.selectedCategoryRadio,
              data: nositems,
              color: '#072ac8',
            },
            {
              name: 'Value (in Cr)',
              data: stkvalue,
              color: '#774e24',
            },
          ],
          chart: {
            type: 'bar',
            stacked: true,
            height: 300,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '75%',
              endingShape: 'rounded',
            },
          },
          dataLabels: {
            enabled: true,
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
          },
          xaxis: {
            categories: edLtpe,
          },
          yaxis: {
            title: {
              text: '',
            },
          },
          fill: {
            opacity: 1,
          },
          tooltip: {
            y: {
              formatter: (val: number) => val.toString(),
            },
          },
          legend: {
            position: 'top',
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 300,
                },
                legend: {
                  position: 'bottom',
                },
              },
            },
          ],
        } as any;
      }),
      catchError((error) => {
        console.error('Error fetching CGMSC Stock data', error);
        this.toastr.error('Failed to load CGMSC stock chart');
        return of([]);
      })
    );
  }

  Nearexp(): Observable<any[]> {
    return this.api.NearExp(this.mcid, 5).pipe(
      tap((data: any[]) => {
        const nositems: number[] = [];
        const mname: string[] = [];
        const nosbatches: number[] = [];
        const stkvaluEcr: number[] = [];

        console.log('Near expiry data:', data);

        data.forEach((item: any) => {
          nositems.push(item.nositems);
          mname.push(item.mname);
          nosbatches.push(item.nosbatches);
          stkvaluEcr.push(item.stkvaluEcr);
        });

        this.chartNearexp.series = [
          {
            name: 'Near Exp Value (in Cr)',
            data: stkvaluEcr,
            color: '#5f0f40',
          },
        ];

        this.chartNearexp.xaxis = {
          categories: mname,
          labels: {
            style: {
              fontWeight: 'bold',
              fontSize: '15px',
            },
          },
        };

        this.cO = this.chartNearexp;
      }),
      catchError((error) => {
        console.error('Error fetching Near Exp data', error);
        this.toastr.error('Failed to load Near Expiry chart');
        return of([]); // Return empty observable to prevent breaking forkJoin
      })
    );
  }

  loadUQC(): Observable<any[]> {
    return this.api.QCPendingHomeDash(this.mcid).pipe(
      tap((data: any[]) => {
        const categories: string[] = [];
        const nositems: number[] = [];
        const nosbatch: number[] = [];
        const stkvalue: number[] = [];

        console.log('Under QC home Dashboard:', data);

        data.forEach((item: any) => {
          categories.push(item.mcategory);
          nositems.push(item.nositems);
          nosbatch.push(item.nosbatch);
          stkvalue.push(item.stkvalue);
        });

        this.chartUQC = {
          series: [
            {
              name: 'UQC Stock Value (in Cr)',
              data: stkvalue,
            },
            {
              name: 'No of Items',
              data: nositems,
            },
            {
              name: 'No of Batches',
              data: nosbatch,
            },
          ],
          chart: {
            type: 'bar',
            height: 300,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '50%',
              endingShape: 'rounded',
            },
          },
          dataLabels: {
            enabled: true,
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
          },
          xaxis: {
            categories: categories,
          },
          yaxis: {
            title: {
              text: 'Under QC Info',
            },
          },
          fill: {
            opacity: 1,
          },
          tooltip: {
            y: {
              formatter: (val: number) => val.toString(),
            },
          },
          legend: {
            position: 'top',
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 300,
                },
                legend: {
                  position: 'bottom',
                },
              },
            },
          ],
        } as any;
      }),
      catchError((error) => {
        console.error('Error fetching UQC chart data', error);
        this.toastr.error('Failed to load Under QC chart');
        return of([]); // Prevent breaking forkJoin
      })
    );
  }

  getstatusDetails() {
    this.spinner.show();

    this.api.NearExpRCDetails(this.mcid, 0).subscribe({
      next: (res: any[]) => {
        if (res && res.length > 0) {
          this.RCstatusDetails = res.map((item: any, index: number) => ({
            ...item,
            sno: index + 1,
          }));

          this.dataSource8.data = this.RCstatusDetails;
          this.dataSource8.paginator = this.paginator8;
          this.dataSource8.sort = this.sort8;
        } else {
          this.toastr.error('No data found');
        }
      },
      error: (err) => {
        console.error('API error:', err);
        this.toastr.error('Failed to load data');
      },
      complete: () => {
        this.spinner.hide();
      },
    });

    this.openDialogHOD();
  }
  GetpipelineSlippageItemDetail(nos:any) {
    this.spinner.show();
if(nos>14){
  this.flag=1;
}else{
  this.flag=2;
}

    this.api.pipelineSlippageItemDetail(this.flag).subscribe({
      next: (res: any[]) => {
        if (res && res.length > 0) {
          this.pipelineSlippageItemDetail = res.map((item: any, index: number) => ({
            ...item,
            sno: index + 1,
          }));

          this.dataSource10.data = this.pipelineSlippageItemDetail;
          this.dataSource10.paginator = this.paginator15;
          this.dataSource10.sort = this.sort15;
        } else {
          this.toastr.error('No data found');
          this.dataSource10.data=[];
        }
      },
      error: (err) => {
        console.error('API error:', err);
        this.toastr.error('Failed to load data');
      },
      complete: () => {
        this.spinner.hide();
      },
    });

    this.openDialogpipelineSlippageItemDetail();
  }

  GetPipelineSlippagePOItemDetailDTO(po:any) {
    this.spinner.show();
if(po>14){
  this.flag=1;
}else{
  this.flag=2;
}

    this.api.PipelineSlippagePOItemDetailDTO(this.flag).subscribe({
      next: (res: any[]) => {
        if (res && res.length > 0) {
          this.pipelineSlippagePOItemDetailDTO = res.map((item: any, index: number) => ({
            ...item,
            sno: index + 1,
          }));

          this.dataSource11.data = this.pipelineSlippagePOItemDetailDTO;
          this.dataSource11.paginator = this.paginator16;
          this.dataSource11.sort = this.sort16;
        } else {
          this.toastr.error('No data found');
          this.dataSource11.data=[];
        }
      },
      error: (err) => {
        console.error('API error:', err);
        this.toastr.error('Failed to load data');
      },
      complete: () => {
        this.spinner.hide();
      },
    });

    this.openDialogpipelineSlippagePOItemDetailDTO();
  }
  
  Rcdetails(value: any) {
    this.spinner.show();

    this.api.GetTotalRC1Details(this.mcid, value).subscribe({
      next: (res: any[]) => {
        if (res && res.length > 0) {
          this.totalRC1details = res.map((item: any, index: number) => ({
            ...item,
            sno: index + 1,
          }));

          this.dataSource9.data = this.totalRC1details;
          this.dataSource9.paginator = this.paginator9;
          this.dataSource9.sort = this.sort9;
        } else {
          this.toastr.error('No data found');
        }
      },
      error: (err) => {
        console.error('API error:', err);
        this.toastr.error('Failed to load data');
      },
      complete: () => {
        this.spinner.hide();
      },
    });

    this.openDialogTotalRCDetails();
  }
  openDialogHOD() {
    // this.getTotalTenderValue()

    const dialogRef = this.dialog.open(this.StatusDetailsModal, {
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
  openDialogpipelineSlippageItemDetail() {
    // this.getTotalTenderValue()

    const dialogRef = this.dialog.open(this.pipelineSlippageItemDetailModal, {
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
  openDialogpipelineSlippagePOItemDetailDTO() {
    // this.getTotalTenderValue()

    const dialogRef = this.dialog.open(this.pipelineSlippagePOItemDetailDTOModal, {
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
  openDialogTotalRCDetails() {
    // this.getTotalTenderValue()

    const dialogRef = this.dialog.open(this.RCDetailsModal, {
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

  loadData1(): Observable<any[]> {
    return this.api.Last7DaysIssue(7, this.mcid, 0, 0, 1).pipe(
      tap((data: any[]) => {
        const nositems: number[] = [];
        const indentDT: any[] = [];
        const indentdate: any[] = [];
        const totalValuecr: number[] = [];
        const nosfacility: number[] = [];

        console.log('helo :', data);

        data.forEach((item: any) => {
          nositems.push(item.nositems);
          indentDT.push(item.indentDT.slice(0, 2));
          indentdate.push(item.indentdate);
          totalValuecr.push(item.totalValuecr);
          nosfacility.push(item.nosfacility);
        });

        this.chartOptions1.series = [
          {
            name: 'totalValuecr',
            data: totalValuecr,
            color: '#5f0f40',
          },
        ];

        this.chartOptions1.xaxis = {
          categories: indentDT,
          labels: {
            style: {
              fontWeight: 'bold',
              fontSize: '15px',
            },
          },
        };

        this.cO = this.chartOptions1;
      }),
      catchError((error) => {
        console.error('Error fetching data', error);
        this.toastr.error('Chart data failed to load');
        return of([]); // safe fallback
      })
    );
  }

  loadData2(): Observable<any[]> {
    return this.api.Last7DaysReceipt(7, this.mcid, 0, 0).pipe(
      tap((data: any[]) => {
        const nosPO: number[] = [];
        const nositems: any[] = [];
        const receiptdate: any[] = [];
        const receiptDT: any[] = [];
        const rvalue: number[] = [];

        console.log('API Response:', data);

        data.forEach((item: any) => {
          nosPO.push(item.nosPO);
          nositems.push(item.nositems);
          receiptdate.push(item.receiptdate);
          receiptDT.push(item.receiptDT.slice(0, 2));
          rvalue.push(item.rvalue);
        });

        this.chartOptions2.series = [
          {
            name: 'rvalue',
            data: rvalue,
            color: '#004b23',
          },
        ];

        this.chartOptions2.xaxis = {
          categories: receiptDT,
          labels: {
            style: {
              fontWeight: 'bold',
              fontSize: '15px',
            },
          },
        };

        this.cO = this.chartOptions2;
      }),
      catchError((error) => {
        console.error('Error fetching data', error);
        this.toastr.error('Chart data failed to load');
        return of([]); // fallback if error occurs
      })
    );
  }

  searchItem() {
    this.spinner.show();
    const itemid = this.itemid;
    this.getMasitems();
    this.GetPartiIndent();
    this.getPartPOsSince1920();

    this.getPartiItemsissue();
    this.getPartiItemsRC();
    this.openDialog();
  }

  getMasitems() {
    this.api.Masitems(this.itemid, 0, 0, 0, 0, 0).subscribe((res: any[]) => {
      if (res && res.length > 0) {
        this.MasItemlist = res.map((item) => ({
          itemcode: item.itemcode,
          itemname: item.itemname,
          strengtH1: item.strengtH1,
          unit: item.unit,
          groupname: item.groupname,
          itemtypename: item.itemtypename,
          edl: item.edl,
          edltype: item.edltype,
        }));
        // console.log('VehicleNoDropDownList :', this.VehicleNoDropDownList);
      } else {
        console.error('No nameText found or incorrect structure:', res);
      }
    });
  }

  GetPartiIndent() {
    this.api.getPartiIndent(this.itemid).subscribe((res: any[]) => {
      if (res && res.length > 0) {
        this.PartiIndentlist = res.map((item: any, index: number) => ({
          ...item,
          sno: index + 1,
        }));
        console.log('Mapped List:', this.PartiIndentlist);
        this.dataSource.data = this.PartiIndentlist; // Ensure this line executes properly
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinner.hide();
      } else {
        console.error('No nameText found or incorrect structure:', res);
      }
    });
  }
  getPartPOsSince1920() {
    this.api.PartPOsSince1920(this.itemid).subscribe((res: any[]) => {
      if (res && res.length > 0) {
        this.spinner.show();

        this.PartPOsSince1920list = res.map((item: any, index: number) => ({
          ...item,
          sno: index + 1,
        }));
        console.log('Mapped List:', this.PartPOsSince1920list);
        this.dataSource2.data = this.PartPOsSince1920list; // Ensure this line executes properly
        this.dataSource2.paginator = this.paginator2;
        this.dataSource2.sort = this.sort2;
        this.spinner.hide();
      } else {
        console.error('No nameText found or incorrect structure:', res);
        this.spinner.hide();
      }
    });
  }

  getPartiItemsissue() {
    this.api.PartItemIssue(this.itemid).subscribe((res: any[]) => {
      if (res && res.length > 0) {
        this.spinner.show();

        this.PartItemissuelist = res.map((item: any, index: number) => ({
          ...item,
          sno: index + 1,
        }));
        console.log('Mapped List:', this.PartItemissuelist);
        this.dataSource3.data = this.PartItemissuelist; // Ensure this line executes properly
        this.dataSource3.paginator = this.paginator3;
        this.dataSource3.sort = this.sort3;
        this.spinner.hide();
      } else {
        console.error('No nameText found or incorrect structure:', res);
        this.spinner.hide();
      }
    });
  }

  getPartiItemsRC() {
    this.api.PartItem_RCs(this.itemid).subscribe((res: any[]) => {
      if (res && res.length > 0) {
        this.spinner.show();

        this.PartItemRClist = res.map((item: any, index: number) => ({
          ...item,
          sno: index + 1,
        }));
        console.log('Mapped List:', this.PartItemRClist);
        this.dataSource4.data = this.PartItemRClist; // Ensure this line executes properly
        this.dataSource4.paginator = this.paginator4;
        this.dataSource4.sort = this.sort4;
        this.spinner.hide();
      } else {
        console.error('No nameText found or incorrect structure:', res);
        this.spinner.hide();
      }
    });
  }

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

  updateSelectedHodid(): void {
    this.spinner.show();

    // Set category ID
    if (this.selectedCategoryRadio === 'Drugs') this.mcid = 1;
    else if (this.selectedCategoryRadio === 'Consumables') this.mcid = 2;
    else if (this.selectedCategoryRadio === 'Reagent') this.mcid = 3;
    else if (this.selectedCategoryRadio === 'AYUSH') this.mcid = 4;

    // Create API calls with individual error handling
    forkJoin([
      this.GetPOCountCFY().pipe(catchError(() => of(null))),
      this.last7DaysIssue().pipe(catchError(() => of(null))),
      this.loadData1().pipe(catchError(() => of(null))),
      this.loadData2().pipe(catchError(() => of(null))),
      this.loadIndent().pipe(catchError(() => of(null))),
      this.loadData4().pipe(catchError(() => of(null))),
      this.Nearexp().pipe(catchError(() => of(null))),
      this.loadData3().pipe(catchError(() => of(null))),
      this.loadUQC().pipe(catchError(() => of(null))),
      this.loadStockoutDHS().pipe(catchError(() => of(null))),
      this.CGMSCIndentPending().pipe(catchError(() => of(null))),
      this.getItemNoDropDown().pipe(catchError(() => of(null))),
      this.GetDeliveryInMonth().pipe(catchError(() => of(null))),
      this.getTenderStatus().pipe(catchError(() => of(null))),
      this.getTotalRC1().pipe(catchError(() => of(null))),
    ])
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe({
        error: () => this.toastr.error('Some data failed to load'),
      });
  }

  exportToPDFHODDetails() {
    const doc = new jsPDF('l', 'mm', 'a4'); // landscape

    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();

    const title = 'RC  Details';
    doc.setFontSize(18);
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const xOffset = (pageWidth - textWidth) / 2;
    doc.text(title, xOffset, 20);

    doc.setFontSize(10);
    doc.text(`Date: ${dateString}  Time: ${timeString}`, 10, 10);

    const columns = [
      { header: 'S.No', dataKey: 'sno' },
      { header: 'Item ID', dataKey: 'itemid' },
      { header: 'Item Code', dataKey: 'itemcode' },
      { header: 'Item Name', dataKey: 'itemname' },
      { header: 'Strength', dataKey: 'strength1' },
      { header: 'Unit', dataKey: 'unit' },
      { header: 'Basic Rate', dataKey: 'basicrate' },
      { header: 'GST (%)', dataKey: 'gst' },
      { header: 'Final Rate (incl. GST)', dataKey: 'finalrategst' },
      { header: 'RC Start', dataKey: 'rcStart' },
      { header: 'RC End', dataKey: 'rcEndDT' },
    ];

    const rows = this.RCstatusDetails.map((item: any, index: number) => ({
      sno: index + 1,
      itemid: item.itemid,
      itemcode: item.itemcode,
      itemname: item.itemname,
      strength1: item.strength1,
      unit: item.unit,
      basicrate: item.basicrate,
      gst: item.gst,
      finalrategst: item.finalrategst,
      rcStart: item.rcStart,
      rcEndDT: item.rcEndDT,
    }));

    autoTable(doc, {
      head: [columns.map((col) => col.header)],
      body: rows.map((row) =>
        columns.map((col) => row[col.dataKey as keyof typeof row] || '')
      ), // Table rows

      startY: 30,
      theme: 'striped',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save('RC_Details.pdf');
  }
  exportToPDFpipelineSlippageItemDetail() {
    const doc = new jsPDF('l', 'mm', 'a4'); // Landscape A4
  
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();
  
    const title = 'Pipeline Slippage Item Details';
    doc.setFontSize(18);
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const xOffset = (pageWidth - textWidth) / 2;
    doc.text(title, xOffset, 20);
  
    doc.setFontSize(10);
    doc.text(`Date: ${dateString}  Time: ${timeString}`, 10, 28);
  
    // ✅ Define new columns
    const columns = [
      { header: 'S.No', dataKey: 'sno' },
      { header: 'Time Duration', dataKey: 'timduration' },
      { header: 'Item ID', dataKey: 'itemid' },
      { header: 'Item Code', dataKey: 'itemcode' },
      { header: 'Item Name', dataKey: 'itemname' },
      { header: 'Abs Qty', dataKey: 'absqty_sum' },
      { header: 'Receipt Qty', dataKey: 'receiptabsqty_sum' },
      { header: 'Pipeline Qty', dataKey: 'pipelineqty_sum' },
      { header: 'Min %', dataKey: 'min_per' },
      { header: 'Worst D', dataKey: 'worst_d' },
      { header: 'No. of POs', dataKey: 'nospo' },
    ];
  
    // ✅ Prepare rows
    const rows = this.pipelineSlippageItemDetail.map((item: any, index: number) => ({
      sno: index + 1,
      timduration: item.timduration,
      itemid: item.itemid,
      itemcode: item.itemcode,
      itemname: item.itemname,
      absqty_sum: item.absqty_sum,
      receiptabsqty_sum: item.receiptabsqty_sum,
      pipelineqty_sum: item.pipelineqty_sum,
      min_per: item.min_per,
      worst_d: item.worst_d,
      nospo: item.nospo,
    }));
  
    // ✅ Generate table
    autoTable(doc, {
      head: [columns.map((col) => col.header)],
      body: rows.map((row) =>
        columns.map((col) => row[col.dataKey as keyof typeof row] ?? '')
      ),
      startY: 35,
      theme: 'striped',
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [22, 160, 133], textColor: 255, halign: 'center' },
      columnStyles: {
        0: { cellWidth: 12 }, // S.No small
        1: { cellWidth: 25 }, // Time Duration
        4: { cellWidth: 45 }, // Item Name wider
      },
    });
  
    doc.save('PipelineSlippageItemDetails.pdf');
  }
  exportToPDFpipelineSlippagePOItemDetailDTOModal() {
    const doc = new jsPDF('l', 'mm', 'a4'); // Landscape A4
  
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();
  
    const title = 'Pipeline Slippage PO Item Details';
    doc.setFontSize(18);
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const xOffset = (pageWidth - textWidth) / 2;
    doc.text(title, xOffset, 20);
  
    doc.setFontSize(10);
    doc.text(`Date: ${dateString}  Time: ${timeString}`, 10, 28);
  
    // ✅ Define new columns
    const columns = [
      { header: 'S.No', dataKey: 'sno' },
      { header: 'Item Code', dataKey: 'itemcode' },
      { header: 'Item Name', dataKey: 'itemname' },
      { header: 'Strength', dataKey: 'strength1' },
      { header: 'Unit', dataKey: 'unit' },
      { header: 'Supplier', dataKey: 'suppliername' },
      { header: 'PO No', dataKey: 'pono' },
      { header: 'SO Issue Date', dataKey: 'soissuedate' },
      { header: 'Extended Date', dataKey: 'extendeddate' },
      { header: 'PO Qty', dataKey: 'poqty' },
      { header: 'Received Qty', dataKey: 'receivedQTY' },
      { header: 'Time Duration', dataKey: 'timduration' },
    ];
  
    // ✅ Prepare rows
    const rows = this.pipelineSlippagePOItemDetailDTO.map(
      (item: any, index: number) => ({
        sno: index + 1,
        itemcode: item.itemcode,
        itemname: item.itemname,
        strength1: item.strength1,
        unit: item.unit,
        suppliername: item.suppliername,
        pono: item.pono,
        soissuedate: item.soissuedate
          ? new Date(item.soissuedate).toLocaleDateString()
          : '-',
        extendeddate: item.extendeddate
          ? new Date(item.extendeddate).toLocaleDateString()
          : '-',
        poqty: item.poqty,
        receivedQTY: item.receivedQTY,
        timduration: item.timduration,
      })
    );
  
    // ✅ Generate table
    autoTable(doc, {
      head: [columns.map((col) => col.header)],
      body: rows.map((row) =>
        columns.map((col) => row[col.dataKey as keyof typeof row] ?? '')
      ),
      startY: 35,
      theme: 'striped',
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: 255,
        halign: 'center',
      },
      columnStyles: {
        0: { cellWidth: 12 }, // S.No
        1: { cellWidth: 20 }, // Item Code
        2: { cellWidth: 50 }, // Item Name wider
        6: { cellWidth: 45 }, // PO No
      },
    });
  
    doc.save('pipelineSlippagePOItemDetailDTO.pdf');
  }
  
  
  exportToPDFRCDDetails() {
    const doc = new jsPDF('l', 'mm', 'a4'); // landscape

    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();

    const title = 'RC  Details';
    doc.setFontSize(18);
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const xOffset = (pageWidth - textWidth) / 2;
    doc.text(title, xOffset, 20);

    doc.setFontSize(10);
    doc.text(`Date: ${dateString}  Time: ${timeString}`, 10, 10);

    const columns = [
      { header: 'S.No', dataKey: 'sno' },
      { header: 'Item ID', dataKey: 'itemid' },
      { header: 'Item Code', dataKey: 'itemcode' },
      { header: 'Item Name', dataKey: 'itemname' },
      { header: 'Strength', dataKey: 'strength1' },
      { header: 'Unit', dataKey: 'unit' },
      { header: 'Basic Rate', dataKey: 'basicrate' },
      { header: 'GST (%)', dataKey: 'gst' },
      { header: 'Final Rate (incl. GST)', dataKey: 'finalrategst' },
      { header: 'RC Start', dataKey: 'rcStart' },
      { header: 'RC End', dataKey: 'rcEndDT' },
    ];

    const rows = this.totalRC1details.map((item: any, index: number) => ({
      sno: index + 1,
      itemid: item.itemid,
      itemcode: item.itemcode,
      itemname: item.itemname,
      strength1: item.strength1,
      unit: item.unit,
      basicrate: item.basicrate,
      gst: item.gst,
      finalrategst: item.finalrategst,
      rcStart: item.rcStart,
      rcEndDT: item.rcEndDT,
    }));

    autoTable(doc, {
      head: [columns.map((col) => col.header)],
      body: rows,

      startY: 30,
      theme: 'striped',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save('Total_RC_Details.pdf');
  }

  //#region StockStatus
  // https://dpdmis.in/CGMSCHO_API2/api/HO/StockStatus?yearId=546&mcid=1&edlStatus=EDL
  // https://dpdmis.in/CGMSCHO_API2/api/HO/IssuePerDetail?yearId=546&mcid=1&perCondition=BELOW10&tendCondition=PRICE

  // https://dpdmis.in/CGMSCHO_API2/api/HO/whstockoutin?yearId=546&mcid=1&catid=52

  GETStockStatus() {
    // this.spinner.show();
    this.loadingSectionA = true;
    this.api.StockStatus().subscribe((res: any[]) => {
      if (res && res.length > 0) {
        this.dispatchdata = res.map((item: any, index: number) => ({
          ...item,
          sno: index + 1,
        }));
        console.log('StockStatusdata:', this.dispatchdata);
        this.StockStatusdata.data = this.dispatchdata;
        this.StockStatusdata.paginator = this.paginator10;
        this.StockStatusdata.sort = this.sort10;
        this.loadingSectionA = false;
      } else {
        console.error('No nameText found or incorrect structure:', res);
        this.loadingSectionA = false;
      }
    });
  }
  whstockoutin() {
    //   whstockoutin(mcid:any,catid:any){
    //   return this.http.get<any[]>(${this.CGMSCHO_API2}/HO/whstockoutin?yearId=546&mcid=${mcid}&catid=${catid});
    // }

    // second card

    const yearId = 546,
      mcid = 1;
    this.loadingSectionB = true;

    this.api.whstockoutin(mcid).subscribe((res: any[]) => {
      if (res && res.length > 0) {
        this.dispatch_whstockoutin = res.map((item: any, index: number) => ({
          ...item,
          sno: index + 1,
        }));
        console.log('whstockoutindata:', this.dispatch_whstockoutin);
        this.whstockoutindata.data = this.dispatch_whstockoutin;
        this.whstockoutindata.paginator = this.paginator11;
        this.whstockoutindata.sort = this.sort11;
        this.loadingSectionB = false;
      } else {
        console.error('No nameText found or incorrect structure:', res);
        this.loadingSectionB = false;
      }
    });
  }

  applyTextFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.StockStatusdata.filter = filterValue.trim().toLowerCase();
  }
  applyTextFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.whstockoutindata.filter = filterValue.trim().toLowerCase();
  }
  applyTextFilter3(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.WhStockOutInDetail.filter = filterValue.trim().toLowerCase();
  }
  applyTextFilter4(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.StockoutDetailsdata.filter = filterValue.trim().toLowerCase();
  }
  applyTextFilter5(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.IssuePerDetailsdata.filter = filterValue.trim().toLowerCase();
  }

  exportToPDFRCNotValidStock() {
    const doc = new jsPDF('l', 'mm', 'a4'); // landscape

    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();

    const title = 'RC Not Valid Stock Details';
    doc.setFontSize(18);
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const xOffset = (pageWidth - textWidth) / 2;
    doc.text(title, xOffset, 20);

    doc.setFontSize(10);
    doc.text(`Date: ${dateString}  Time: ${timeString}`, 10, 10);
    const columns = [
      // { header: 'S.No', dataKey: 'sno' },
      { header: 'Stock Parameter', dataKey: 'parameterNew' },
      { header: 'Total Drugs', dataKey: 'cntItems' },
      { header: 'Price Opned', dataKey: 'pricecnt' },
      { header: 'Under Evaluation', dataKey: 'evalutioncnt' },
      { header: 'Live In Tender', dataKey: 'livecnt' },
      { header: 'To be Retender', dataKey: 'rentendercn' },
    ];
    const rows = this.dispatchdata.map((item: any, index: number) => ({
      // sno: index + 1,
      parameterNew: item.parameterNew,
      cntItems: item.cntItems,
      pricecnt: item.pricecnt,
      evalutioncnt: item.evalutioncnt,
      livecnt: item.livecnt,
      rentendercn: item.rentendercn,
    }));
    autoTable(doc, {
      head: [columns.map((col) => col.header)],
      body: rows.map((row) => [
        row.parameterNew,
        row.cntItems,
        row.pricecnt,
        row.evalutioncnt,
        row.livecnt,
        row.rentendercn,
      ]),
      startY: 30,
      theme: 'striped',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [22, 160, 133] },
    });
    doc.save('RCNotValidStock.pdf');
  }
  exportToPDFRCValidStock() {
    const doc = new jsPDF('l', 'mm', 'a4'); // landscape

    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();

    const title = 'RC Valid Stock Details';
    doc.setFontSize(18);
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const xOffset = (pageWidth - textWidth) / 2;
    doc.text(title, xOffset, 20);

    doc.setFontSize(10);
    doc.text(`Date: ${dateString}  Time: ${timeString}`, 10, 10);
    // "sno",
    //   "warehousename",
    //   "noofitems",
    //   "stockout",
    //   "stockin",
    const columns = [
      { header: 'S.No', dataKey: 'sno' },
      { header: 'WH Name', dataKey: 'warehousename' },
      { header: 'No of Items', dataKey: 'noofitems' },
      { header: 'Stock Out', dataKey: 'stockout' },
      { header: 'Stock In', dataKey: 'stockin' },
    ];
    const rows = this.dispatch_whstockoutin.map((item: any, index: number) => ({
      sno: index + 1,
      warehousename: item.warehousename,
      noofitems: item.noofitems,
      stockout: item.stockout,
      stockin: item.stockin,
    }));

    autoTable(doc, {
      head: [columns.map((col) => col.header)],
      body: rows.map((row) => [
        row.sno + 1,
        row.warehousename,
        row.noofitems,
        row.stockout,
        row.stockin,
      ]),
      startY: 30,
      theme: 'striped',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save('RCValidStock.pdf');
  }
  exportToPDFRCValidStockDetail() {
    const doc = new jsPDF('l', 'mm', 'a4');

    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();

    const title = 'RC Valid Stock Details';
    doc.setFontSize(18);
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const xOffset = (pageWidth - textWidth) / 2;
    doc.text(title, xOffset, 20);

    doc.setFontSize(10);
    doc.text(`Date: ${dateString}  Time: ${timeString}`, 10, 10);

    const columns = [
      { header: 'S.No', dataKey: 'sno' },
      { header: 'Warehouse ID', dataKey: 'warehouseid' },
      { header: 'WH Name', dataKey: 'warehousename' },
      { header: 'Item Code', dataKey: 'itemcode' },
      { header: 'Item Name', dataKey: 'itemname' },
      { header: 'Strength', dataKey: 'strength' },
      { header: 'SKU', dataKey: 'sku' },
      { header: 'Item ID', dataKey: 'itemid' },
      { header: 'Ready For Issue', dataKey: 'readyforissue' },
      { header: 'Pending', dataKey: 'pending' },
      { header: 'Stock Out', dataKey: 'stockOut' },
      { header: 'Stock In', dataKey: 'stockIn' },
    ];

    const rows = this.dispatch_WhStockOutInDetail.map(
      (item: any, index: number) => ({
        sno: index + 1,
        warehouseid: item.warehouseid,
        warehousename: item.warehousename,
        itemcode: item.itemcode,
        itemname: item.itemname,
        strength: item.strength,
        sku: item.sku,
        itemid: item.itemid,
        readyforissue: item.readyforissue,
        pending: item.pending,
        stockOut: item.stockOut,
        stockIn: item.stockIn,
      })
    );

    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 30,
      theme: 'striped',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save('RCValidStockDetail.pdf');
  }
  exportToPDFRCIssuePerDetailsDetail() {
    const doc = new jsPDF('l', 'mm', 'a4');

    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();

    const title = 'RC Issue Percentage Details';
    doc.setFontSize(18);
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const xOffset = (pageWidth - textWidth) / 2;
    doc.text(title, xOffset, 20);

    doc.setFontSize(10);
    doc.text(`Date: ${dateString}  Time: ${timeString}`, 10, 10);

    const columns = [
      { header: 'S.No', dataKey: 'sno' },
      { header: 'Item Code', dataKey: 'itemcode' },
      { header: 'Item Name', dataKey: 'itemname' },
      { header: 'SKU', dataKey: 'sku' },
      { header: 'Unit Count', dataKey: 'unitcount' },
      { header: 'DHS AI Qty', dataKey: 'dhsaiqty' },
      { header: 'DME AI Qty', dataKey: 'dmeaiqty' },
      { header: 'Avg Issue Qty Last 3 FY', dataKey: 'avgIssueqty_Last3FY' },
      { header: 'Tender Status', dataKey: 'tenderstatus' },
      { header: 'Tender Start Date', dataKey: 'tenderstartdt' },
      { header: 'CoV/A OP Date', dataKey: 'coV_A_OPDATE' },
      { header: 'Days Since', dataKey: 'dayssince' },
      { header: 'Parameter New', dataKey: 'parameterNew' },
      { header: 'Stock %', dataKey: 'styockPer' },
      { header: 'Price Count', dataKey: 'pricecnt' },
      { header: 'Evaluation Count', dataKey: 'evalutioncnt' },
      { header: 'Live Count', dataKey: 'livecnt' },
      { header: 'Re-Tender Count', dataKey: 'rentendercn' },
    ];

    const rows = this.dispatch_IssueperDetails.map(
      (item: any, index: number) => ({
        sno: index + 1,
        itemcode: item.itemcode,
        itemname: item.itemname,
        sku: item.sku,
        unitcount: item.unitcount,
        dhsaiqty: item.dhsaiqty,
        dmeaiqty: item.dmeaiqty,
        avgIssueqty_Last3FY: item.avgIssueqty_Last3FY,
        tenderstatus: item.tenderstatus,
        tenderstartdt: item.tenderstartdt,
        coV_A_OPDATE: item.coV_A_OPDATE,
        dayssince: item.dayssince,
        parameterNew: item.parameterNew,
        styockPer: item.styockPer,
        pricecnt: item.pricecnt,
        evalutioncnt: item.evalutioncnt,
        livecnt: item.livecnt,
        rentendercn: item.rentendercn,
      })
    );

    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 30,
      theme: 'striped',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save('RCIssueperDetails.pdf');
  }

  exportToPDFRCStockoutDetailsDetail() {
    const doc = new jsPDF('l', 'mm', 'a4'); // Landscape mode

    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();

    const title = 'RC Stockout Details Detail';
    doc.setFontSize(18);
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const xOffset = (pageWidth - textWidth) / 2;
    doc.text(title, xOffset, 20);

    doc.setFontSize(10);
    doc.text(`Date: ${dateString}  Time: ${timeString}`, 10, 10);

    const columns = [
      { header: 'S.No', dataKey: 'sno' },
      { header: 'Item Code', dataKey: 'itemcode' },
      { header: 'Item Name', dataKey: 'itemname' },
      { header: 'SKU', dataKey: 'sku' },
      { header: 'Unit Count', dataKey: 'unitcount' },
      { header: 'DHSAI Qty', dataKey: 'dhsaiqty' },
      { header: 'DMEAI Qty', dataKey: 'dmeaiqty' },
      { header: 'Avg Issue Qty (Last 3 FY)', dataKey: 'avgIssueqty_Last3FY' },
      { header: 'Tender Status', dataKey: 'tenderstatus' },
      { header: 'Tender Start Date', dataKey: 'tenderstartdt' },
      { header: 'CoV A OP Date', dataKey: 'coV_A_OPDATE' },
      { header: 'Days Since', dataKey: 'dayssince' },
      { header: 'Stock Parameter', dataKey: 'parameterNew' },
      { header: 'Stock %', dataKey: 'styockPer' },
      { header: 'Price Opened', dataKey: 'pricecnt' },
      { header: 'Under Evaluation', dataKey: 'evalutioncnt' },
      { header: 'Live in Tender', dataKey: 'livecnt' },
      { header: 'To be Retender', dataKey: 'rentendercn' },
    ];

    const rows = this.dispatch_StockOutDetails.map(
      (item: any, index: number) => ({
        sno: index + 1,
        itemcode: item.itemcode,
        itemname: item.itemname,
        sku: item.sku,
        unitcount: item.unitcount,
        dhsaiqty: item.dhsaiqty,
        dmeaiqty: item.dmeaiqty,
        avgIssueqty_Last3FY: item.avgIssueqty_Last3FY,
        tenderstatus: item.tenderstatus,
        tenderstartdt: item.tenderstartdt,
        coV_A_OPDATE: item.coV_A_OPDATE,
        dayssince: item.dayssince,
        parameterNew: item.parameterNew,
        styockPer: item.styockPer,
        pricecnt: item.pricecnt,
        evalutioncnt: item.evalutioncnt,
        livecnt: item.livecnt,
        rentendercn: item.rentendercn,
      })
    );

    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 30,
      theme: 'striped',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save('RCStockoutDetailsDetail.pdf');
  }

  getRowClass(param: string) {
    let val = param
      ?.replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .trim()
      .toLowerCase();
    if (val === '1. stock-out') return 'row-red';
    if (val === '2. <10% stock against avg issuance') return 'row-yellow';
    // console.log('PARAM:', JSON.stringify(val)); // Check what you get
    // if (val === '2. <10% stock against avg issuance') {

    //   return 'row-yellow';
    // }
    if (val === '3. 10 to 20 % stock against avg issuance') return 'row-pink';
    if (val === '4. 20 to 40 % stock against avg issuance') return 'row-gray';
    if (val === '5. 40 to 90 % stock against avg issuance')
      return 'row-magenta';
    if (val === '6. sufficient stock') return 'row-green';
    return '';
  }

  StockOutDetails(tendCondition: any) {
    // https://dpdmis.in/CGMSCHO_API2/api/HO/StockOutDetails?yearId=546&mcid=1&tendCondition=PRICE
    // dispatch_StockOutDetails:StockOutDetailsmodel[]=[];

    // StockoutDetailsdata = new MatTableDataSource<StockOutDetailsmodel>();
    const yearId = 546,
      mcid = 1;
    this.spinner.show();
    this.api.StockOutDetails(mcid, tendCondition).subscribe((res: any[]) => {
      if (res && res.length > 0) {
        this.dispatch_StockOutDetails = res.map((item: any, index: number) => ({
          ...item,
          sno: index + 1,
        }));
        console.log('dispatch_StockOutDetails:', this.dispatch_StockOutDetails);
        this.StockoutDetailsdata.data = this.dispatch_StockOutDetails;
        this.StockoutDetailsdata.paginator = this.paginator12;
        this.StockoutDetailsdata.sort = this.sort12;
        this.spinner.hide();
      } else {
        console.error('No nameText found or incorrect structure:', res);
        this.spinner.hide();
      }
    });
    this.openStockOutDetails();
  }
  openStockOutDetails() {
    const dialogRef = this.dialog.open(this.StockOutDetailsModal, {
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
  allvaluecilick(tendCondition: any,item: any,parameterNew: any,title1: any ) {
    this.parameterNew = parameterNew;
    this.title1 = title1;
    const yearId = 546,
      mcid = 1;
    // console.log("parameterNew",parameterNew)
    // return
    if (parameterNew == '1. Stock-Out') {
      if (tendCondition == '') {
        this.spinner.show();
        this.api.StockOutDetails(mcid, item).subscribe((res: any[]) => {
          if (res && res.length > 0) {
            this.dispatch_StockOutDetails = res.map(
              (item: any, index: number) => ({
                ...item,
                sno: index + 1,
              })
            );
            // console.log(
            //   'dispatch_StockOutDetails:',
            //   this.dispatch_StockOutDetails
            // );
            this.StockoutDetailsdata.data = this.dispatch_StockOutDetails;
            this.StockoutDetailsdata.paginator = this.paginator12;
            this.StockoutDetailsdata.sort = this.sort12;
            this.spinner.hide();
          } else {
            console.error('No nameText found or incorrect structure:', res);
            this.spinner.hide();
          }
        });
        this.openStockOutDetails();
      } else if (tendCondition == 'PRICE') {
        this.spinner.show();
        this.api
          .StockOutDetails(mcid, tendCondition)
          .subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.dispatch_StockOutDetails = res.map(
                (item: any, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log(
              //   'dispatch_StockOutDetails:',
              //   this.dispatch_StockOutDetails
              // );
              this.StockoutDetailsdata.data = this.dispatch_StockOutDetails;
              this.StockoutDetailsdata.paginator = this.paginator12;
              this.StockoutDetailsdata.sort = this.sort12;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
            }
          });
        this.openStockOutDetails();
      } else if (tendCondition == 'EVAL') {
        this.spinner.show();
        this.api
          .StockOutDetails(mcid, tendCondition)
          .subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.dispatch_StockOutDetails = res.map(
                (item: any, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log(
              //   'dispatch_StockOutDetails:',
              //   this.dispatch_StockOutDetails
              // );
              this.StockoutDetailsdata.data = this.dispatch_StockOutDetails;
              this.StockoutDetailsdata.paginator = this.paginator12;
              this.StockoutDetailsdata.sort = this.sort12;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
            }
          });
        this.openStockOutDetails();
      } else if (tendCondition == 'LIVE') {
        this.spinner.show();
        this.api
          .StockOutDetails(mcid, tendCondition)
          .subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.dispatch_StockOutDetails = res.map(
                (item: any, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log(
              //   'dispatch_StockOutDetails:',
              //   this.dispatch_StockOutDetails
              // );
              this.StockoutDetailsdata.data = this.dispatch_StockOutDetails;
              this.StockoutDetailsdata.paginator = this.paginator12;
              this.StockoutDetailsdata.sort = this.sort12;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
            }
          });
        this.openStockOutDetails();
      } else if (tendCondition == 'TOBETENDER') {
        this.spinner.show();
        this.api
          .StockOutDetails(mcid, tendCondition)
          .subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.dispatch_StockOutDetails = res.map(
                (item: any, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log(
              //   'dispatch_StockOutDetails:',
              //   this.dispatch_StockOutDetails
              // );
              this.StockoutDetailsdata.data = this.dispatch_StockOutDetails;
              this.StockoutDetailsdata.paginator = this.paginator12;
              this.StockoutDetailsdata.sort = this.sort12;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
            }
          });
        this.openStockOutDetails();
      } else {
        alert('Value is not Found');
      }
    } else if (parameterNew == '2. <10% Stock against Avg Issuance') {
      if (tendCondition == '') {
        // console.log(
        //   'parameterNew=',
        //   parameterNew,
        //   'tendCondition=',
        //   tendCondition
        // );

        const yearId = 546,
          mcid = 1,
          perCondition = 'BELOW10';
        this.spinner.show();
        this.api
          .IssuePerDetail(mcid, perCondition, item)
          .subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.dispatch_IssueperDetails = res.map(
                (item: any, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log(
              //   'dispatch_IssueperDetails:',
              //   this.dispatch_IssueperDetails
              // );
              this.IssuePerDetailsdata.data = this.dispatch_IssueperDetails;
              this.IssuePerDetailsdata.paginator = this.paginator13;
              this.IssuePerDetailsdata.sort = this.sort13;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
            }
          });
        this.openIssuePerDetails();
      } else if (tendCondition == 'PRICE') {
        // console.log(
        //   'parameterNew=',
        //   parameterNew,
        //   'tendCondition=',
        //   tendCondition
        // );

        const yearId = 546,
          mcid = 1,
          perCondition = 'BELOW10';
        this.spinner.show();
        this.api
          .IssuePerDetail(mcid, perCondition, tendCondition)
          .subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.dispatch_IssueperDetails = res.map(
                (item: any, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log(
              //   'dispatch_IssueperDetails:',
              //   this.dispatch_IssueperDetails
              // );
              this.IssuePerDetailsdata.data = this.dispatch_IssueperDetails;
              this.IssuePerDetailsdata.paginator = this.paginator13;
              this.IssuePerDetailsdata.sort = this.sort13;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
            }
          });
        this.openIssuePerDetails();
      } else if (tendCondition == 'EVAL') {
        // console.log(
        //   'parameterNew=',
        //   parameterNew,
        //   'tendCondition=',
        //   tendCondition
        // );

        const yearId = 546,
          mcid = 1,
          perCondition = 'BELOW10';
        this.spinner.show();
        this.api
          .IssuePerDetail(mcid, perCondition, tendCondition)
          .subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.dispatch_IssueperDetails = res.map(
                (item: any, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log(
              //   'dispatch_IssueperDetails:',
              //   this.dispatch_IssueperDetails
              // );
              this.IssuePerDetailsdata.data = this.dispatch_IssueperDetails;
              this.IssuePerDetailsdata.paginator = this.paginator13;
              this.IssuePerDetailsdata.sort = this.sort13;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
            }
          });
        this.openIssuePerDetails();
      } else if (tendCondition == 'LIVE') {
        // console.log(
        //   'parameterNew=',
        //   parameterNew,
        //   'tendCondition=',
        //   tendCondition
        // );

        const yearId = 546,
          mcid = 1,
          perCondition = 'BELOW10';
        this.spinner.show();
        this.api
          .IssuePerDetail(mcid, perCondition, tendCondition)
          .subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.dispatch_IssueperDetails = res.map(
                (item: any, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log(
              //   'dispatch_IssueperDetails:',
              //   this.dispatch_IssueperDetails
              // );
              this.IssuePerDetailsdata.data = this.dispatch_IssueperDetails;
              this.IssuePerDetailsdata.paginator = this.paginator13;
              this.IssuePerDetailsdata.sort = this.sort13;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
            }
          });
        this.openIssuePerDetails();
      } else if (tendCondition == 'TOBETENDER') {
        // console.log(
        //   'parameterNew=',
        //   parameterNew,
        //   'tendCondition=',
        //   tendCondition
        // );

        const yearId = 546,
          mcid = 1,
          perCondition = 'BELOW10';
        this.spinner.show();
        this.api
          .IssuePerDetail(mcid, perCondition, tendCondition)
          .subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.dispatch_IssueperDetails = res.map(
                (item: any, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log(
              //   'dispatch_IssueperDetails:',
              //   this.dispatch_IssueperDetails
              // );
              this.IssuePerDetailsdata.data = this.dispatch_IssueperDetails;
              this.IssuePerDetailsdata.paginator = this.paginator13;
              this.IssuePerDetailsdata.sort = this.sort13;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
            }
          });
        this.openIssuePerDetails();
      }
    }
    // jbchdajs
    else if (parameterNew == '3. 10 to 20 % Stock against Avg Issuance') {
      if (tendCondition == '') {
        // console.log(
        //   'parameterNew=',
        //   parameterNew,
        //   'tendCondition=',
        //   tendCondition
        // );

        const yearId = 546,
          mcid = 1,
          perCondition = '10TO20';
        this.spinner.show();
        this.api
          .IssuePerDetail(mcid, perCondition, item)
          .subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.dispatch_IssueperDetails = res.map(
                (item: any, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log(
              //   'dispatch_IssueperDetails:',
              //   this.dispatch_IssueperDetails
              // );
              this.IssuePerDetailsdata.data = this.dispatch_IssueperDetails;
              this.IssuePerDetailsdata.paginator = this.paginator13;
              this.IssuePerDetailsdata.sort = this.sort13;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
            }
          });
        this.openIssuePerDetails();
      } else if (tendCondition == 'PRICE') {
        // console.log(
        //   'parameterNew=',
        //   parameterNew,
        //   'tendCondition=',
        //   tendCondition
        // );

        const yearId = 546,
          mcid = 1,
          perCondition = '10TO20';
        this.spinner.show();
        this.api
          .IssuePerDetail(mcid, perCondition, tendCondition)
          .subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.dispatch_IssueperDetails = res.map(
                (item: any, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log(
              //   'dispatch_IssueperDetails:',
              //   this.dispatch_IssueperDetails
              // );
              this.IssuePerDetailsdata.data = this.dispatch_IssueperDetails;
              this.IssuePerDetailsdata.paginator = this.paginator13;
              this.IssuePerDetailsdata.sort = this.sort13;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
            }
          });
        this.openIssuePerDetails();
      } else if (tendCondition == 'EVAL') {
        // console.log(
        //   'parameterNew=',
        //   parameterNew,
        //   'tendCondition=',
        //   tendCondition
        // );

        const yearId = 546,
          mcid = 1,
          perCondition = '10TO20';
        this.spinner.show();
        this.api
          .IssuePerDetail(mcid, perCondition, tendCondition)
          .subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.dispatch_IssueperDetails = res.map(
                (item: any, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log(
              //   'dispatch_IssueperDetails:',
              //   this.dispatch_IssueperDetails
              // );
              this.IssuePerDetailsdata.data = this.dispatch_IssueperDetails;
              this.IssuePerDetailsdata.paginator = this.paginator13;
              this.IssuePerDetailsdata.sort = this.sort13;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
            }
          });
        this.openIssuePerDetails();
      } else if (tendCondition == 'LIVE') {
        // console.log(
        //   'parameterNew=',
        //   parameterNew,
        //   'tendCondition=',
        //   tendCondition
        // );

        const yearId = 546,
          mcid = 1,
          perCondition = '10TO20';
        this.spinner.show();
        this.api
          .IssuePerDetail(mcid, perCondition, tendCondition)
          .subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.dispatch_IssueperDetails = res.map(
                (item: any, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log(
              //   'dispatch_IssueperDetails:',
              //   this.dispatch_IssueperDetails
              // );
              this.IssuePerDetailsdata.data = this.dispatch_IssueperDetails;
              this.IssuePerDetailsdata.paginator = this.paginator13;
              this.IssuePerDetailsdata.sort = this.sort13;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
            }
          });
        this.openIssuePerDetails();
      } else if (tendCondition == 'TOBETENDER') {
        // console.log(
        //   'parameterNew=',
        //   parameterNew,
        //   'tendCondition=',
        //   tendCondition
        // );

        const yearId = 546,
          mcid = 1,
          perCondition = '10TO20';
        this.spinner.show();
        this.api
          .IssuePerDetail(mcid, perCondition, tendCondition)
          .subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.dispatch_IssueperDetails = res.map(
                (item: any, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log(
              //   'dispatch_IssueperDetails:',
              //   this.dispatch_IssueperDetails
              // );
              this.IssuePerDetailsdata.data = this.dispatch_IssueperDetails;
              this.IssuePerDetailsdata.paginator = this.paginator13;
              this.IssuePerDetailsdata.sort = this.sort13;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
            }
          });
        this.openIssuePerDetails();
      }
    }
    // hjdsfgnksdbfs
    else if (parameterNew == '4. 20 to 40 % Stock against Avg Issuance') {
      if (tendCondition == '') {
        // console.log(
        //   'parameterNew=',
        //   parameterNew,
        //   'tendCondition=',
        //   tendCondition
        // );

        const yearId = 546,
          mcid = 1,
          perCondition = '20TO40';
        this.spinner.show();
        this.api
          .IssuePerDetail(mcid, perCondition, item)
          .subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.dispatch_IssueperDetails = res.map(
                (item: any, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log(
              //   'dispatch_IssueperDetails:',
              //   this.dispatch_IssueperDetails
              // );
              this.IssuePerDetailsdata.data = this.dispatch_IssueperDetails;
              this.IssuePerDetailsdata.paginator = this.paginator13;
              this.IssuePerDetailsdata.sort = this.sort13;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
            }
          });
        this.openIssuePerDetails();
      } else if (tendCondition == 'PRICE') {
        // console.log(
        //   'parameterNew=',
        //   parameterNew,
        //   'tendCondition=',
        //   tendCondition
        // );

        const yearId = 546,
          mcid = 1,
          perCondition = '20TO40';
        this.spinner.show();
        this.api
          .IssuePerDetail(mcid, perCondition, tendCondition)
          .subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.dispatch_IssueperDetails = res.map(
                (item: any, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log(
              //   'dispatch_IssueperDetails:',
              //   this.dispatch_IssueperDetails
              // );
              this.IssuePerDetailsdata.data = this.dispatch_IssueperDetails;
              this.IssuePerDetailsdata.paginator = this.paginator13;
              this.IssuePerDetailsdata.sort = this.sort13;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
            }
          });
        this.openIssuePerDetails();
      } else if (tendCondition == 'EVAL') {
        // console.log(
        //   'parameterNew=',
        //   parameterNew,
        //   'tendCondition=',
        //   tendCondition
        // );

        const yearId = 546,
          mcid = 1,
          perCondition = '20TO40';
        this.spinner.show();
        this.api
          .IssuePerDetail(mcid, perCondition, tendCondition)
          .subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.dispatch_IssueperDetails = res.map(
                (item: any, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log(
              //   'dispatch_IssueperDetails:',
              //   this.dispatch_IssueperDetails
              // );
              this.IssuePerDetailsdata.data = this.dispatch_IssueperDetails;
              this.IssuePerDetailsdata.paginator = this.paginator13;
              this.IssuePerDetailsdata.sort = this.sort13;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
            }
          });
        this.openIssuePerDetails();
      } else if (tendCondition == 'LIVE') {
        // console.log(
        //   'parameterNew=',
        //   parameterNew,
        //   'tendCondition=',
        //   tendCondition
        // );

        const yearId = 546,
          mcid = 1,
          perCondition = '20TO40';
        this.spinner.show();
        this.api
          .IssuePerDetail(mcid, perCondition, tendCondition)
          .subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.dispatch_IssueperDetails = res.map(
                (item: any, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log(
              //   'dispatch_IssueperDetails:',
              //   this.dispatch_IssueperDetails
              // );
              this.IssuePerDetailsdata.data = this.dispatch_IssueperDetails;
              this.IssuePerDetailsdata.paginator = this.paginator13;
              this.IssuePerDetailsdata.sort = this.sort13;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
            }
          });
        this.openIssuePerDetails();
      } else if (tendCondition == 'TOBETENDER') {
        // console.log(
        //   'parameterNew=',
        //   parameterNew,
        //   'tendCondition=',
        //   tendCondition
        // );

        const yearId = 546,
          mcid = 1,
          perCondition = '20TO40';
        this.spinner.show();
        this.api
          .IssuePerDetail(mcid, perCondition, tendCondition)
          .subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.dispatch_IssueperDetails = res.map(
                (item: any, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log(
              //   'dispatch_IssueperDetails:',
              //   this.dispatch_IssueperDetails
              // );
              this.IssuePerDetailsdata.data = this.dispatch_IssueperDetails;
              this.IssuePerDetailsdata.paginator = this.paginator13;
              this.IssuePerDetailsdata.sort = this.sort13;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
            }
          });
        this.openIssuePerDetails();
      }
    }
    // yyyyyyy
    else if (parameterNew == '5. 40 to 90 % Stock against Avg Issuance') {
      if (tendCondition == '') {
        // console.log(
        //   'parameterNew=',
        //   parameterNew,
        //   'tendCondition=',
        //   tendCondition
        // );

        const yearId = 546,
          mcid = 1,
          perCondition = '40TO90';
        this.spinner.show();
        this.api
          .IssuePerDetail(mcid, perCondition, item)
          .subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.dispatch_IssueperDetails = res.map(
                (item: any, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log(
              //   'dispatch_IssueperDetails:',
              //   this.dispatch_IssueperDetails
              // );
              this.IssuePerDetailsdata.data = this.dispatch_IssueperDetails;
              this.IssuePerDetailsdata.paginator = this.paginator13;
              this.IssuePerDetailsdata.sort = this.sort13;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
            }
          });
        this.openIssuePerDetails();
      } else if (tendCondition == 'PRICE') {
        // console.log(
        //   'parameterNew=',
        //   parameterNew,
        //   'tendCondition=',
        //   tendCondition
        // );

        const yearId = 546,
          mcid = 1,
          perCondition = '40TO90';
        this.spinner.show();
        this.api
          .IssuePerDetail(mcid, perCondition, tendCondition)
          .subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.dispatch_IssueperDetails = res.map(
                (item: any, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log(
              //   'dispatch_IssueperDetails:',
              //   this.dispatch_IssueperDetails
              // );
              this.IssuePerDetailsdata.data = this.dispatch_IssueperDetails;
              this.IssuePerDetailsdata.paginator = this.paginator13;
              this.IssuePerDetailsdata.sort = this.sort13;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
            }
          });
        this.openIssuePerDetails();
      } else if (tendCondition == 'EVAL') {
        // console.log(
        //   'parameterNew=',
        //   parameterNew,
        //   'tendCondition=',
        //   tendCondition
        // );

        const yearId = 546,
          mcid = 1,
          perCondition = '40TO90';
        this.spinner.show();
        this.api
          .IssuePerDetail(mcid, perCondition, tendCondition)
          .subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.dispatch_IssueperDetails = res.map(
                (item: any, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log(
              //   'dispatch_IssueperDetails:',
              //   this.dispatch_IssueperDetails
              // );
              this.IssuePerDetailsdata.data = this.dispatch_IssueperDetails;
              this.IssuePerDetailsdata.paginator = this.paginator13;
              this.IssuePerDetailsdata.sort = this.sort13;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
            }
          });
        this.openIssuePerDetails();
      } else if (tendCondition == 'LIVE') {
        // console.log(
        //   'parameterNew=',
        //   parameterNew,
        //   'tendCondition=',
        //   tendCondition
        // );

        const yearId = 546,
          mcid = 1,
          perCondition = '40TO90';
        this.spinner.show();
        this.api
          .IssuePerDetail(mcid, perCondition, tendCondition)
          .subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.dispatch_IssueperDetails = res.map(
                (item: any, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log(
              //   'dispatch_IssueperDetails:',
              //   this.dispatch_IssueperDetails
              // );
              this.IssuePerDetailsdata.data = this.dispatch_IssueperDetails;
              this.IssuePerDetailsdata.paginator = this.paginator13;
              this.IssuePerDetailsdata.sort = this.sort13;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
            }
          });
        this.openIssuePerDetails();
      } else if (tendCondition == 'TOBETENDER') {
        // console.log(
        //   'parameterNew=',
        //   parameterNew,
        //   'tendCondition=',
        //   tendCondition
        // );

        const yearId = 546,
          mcid = 1,
          perCondition = '40TO90';
        this.spinner.show();
        this.api
          .IssuePerDetail(mcid, perCondition, tendCondition)
          .subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.dispatch_IssueperDetails = res.map(
                (item: any, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log(
              //   'dispatch_IssueperDetails:',
              //   this.dispatch_IssueperDetails
              // );
              this.IssuePerDetailsdata.data = this.dispatch_IssueperDetails;
              this.IssuePerDetailsdata.paginator = this.paginator13;
              this.IssuePerDetailsdata.sort = this.sort13;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
            }
          });
        this.openIssuePerDetails();
      }
    }
    // hh
    else if (parameterNew == '6. Sufficient Stock') {
      if (tendCondition == '') {
        // console.log(
        //   'parameterNew=',
        //   parameterNew,
        //   'tendCondition=',
        //   tendCondition
        // );

        const yearId = 546,
          mcid = 1,
          perCondition = 'ABOVE90';
        this.spinner.show();
        this.api
          .IssuePerDetail(mcid, perCondition, item)
          .subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.dispatch_IssueperDetails = res.map(
                (item: any, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log(
              //   'dispatch_IssueperDetails:',
              //   this.dispatch_IssueperDetails
              // );
              this.IssuePerDetailsdata.data = this.dispatch_IssueperDetails;
              this.IssuePerDetailsdata.paginator = this.paginator13;
              this.IssuePerDetailsdata.sort = this.sort13;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
            }
          });
        this.openIssuePerDetails();
      } else if (tendCondition == 'PRICE') {
        // console.log(
        //   'parameterNew=',
        //   parameterNew,
        //   'tendCondition=',
        //   tendCondition
        // );

        const yearId = 546,
          mcid = 1,
          perCondition = 'ABOVE90';
        this.spinner.show();
        this.api
          .IssuePerDetail(mcid, perCondition, tendCondition)
          .subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.dispatch_IssueperDetails = res.map(
                (item: any, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log(
              //   'dispatch_IssueperDetails:',
              //   this.dispatch_IssueperDetails
              // );
              this.IssuePerDetailsdata.data = this.dispatch_IssueperDetails;
              this.IssuePerDetailsdata.paginator = this.paginator13;
              this.IssuePerDetailsdata.sort = this.sort13;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
            }
          });
        this.openIssuePerDetails();
      } else if (tendCondition == 'EVAL') {
        // console.log(
        //   'parameterNew=',
        //   parameterNew,
        //   'tendCondition=',
        //   tendCondition
        // );

        const yearId = 546,
          mcid = 1,
          perCondition = 'ABOVE90';
        this.spinner.show();
        this.api
          .IssuePerDetail(mcid, perCondition, tendCondition)
          .subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.dispatch_IssueperDetails = res.map(
                (item: any, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log(
              //   'dispatch_IssueperDetails:',
              //   this.dispatch_IssueperDetails
              // );
              this.IssuePerDetailsdata.data = this.dispatch_IssueperDetails;
              this.IssuePerDetailsdata.paginator = this.paginator13;
              this.IssuePerDetailsdata.sort = this.sort13;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
            }
          });
        this.openIssuePerDetails();
      } else if (tendCondition == 'LIVE') {
        // console.log(
        //   'parameterNew=',
        //   parameterNew,
        //   'tendCondition=',
        //   tendCondition
        // );

        const yearId = 546,
          mcid = 1,
          perCondition = 'ABOVE90';
        this.spinner.show();
        this.api
          .IssuePerDetail(mcid, perCondition, tendCondition)
          .subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.dispatch_IssueperDetails = res.map(
                (item: any, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log(
              //   'dispatch_IssueperDetails:',
              //   this.dispatch_IssueperDetails
              // );
              this.IssuePerDetailsdata.data = this.dispatch_IssueperDetails;
              this.IssuePerDetailsdata.paginator = this.paginator13;
              this.IssuePerDetailsdata.sort = this.sort13;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
            }
          });
        this.openIssuePerDetails();
      } else if (tendCondition == 'TOBETENDER') {
        // console.log(
        //   'parameterNew=',
        //   parameterNew,
        //   'tendCondition=',
        //   tendCondition
        // );

        const yearId = 546,
          mcid = 1,
          perCondition = 'ABOVE90';
        this.spinner.show();
        this.api
          .IssuePerDetail(mcid, perCondition, tendCondition)
          .subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.dispatch_IssueperDetails = res.map(
                (item: any, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log(
              //   'dispatch_IssueperDetails:',
              //   this.dispatch_IssueperDetails
              // );
              this.IssuePerDetailsdata.data = this.dispatch_IssueperDetails;
              this.IssuePerDetailsdata.paginator = this.paginator13;
              this.IssuePerDetailsdata.sort = this.sort13;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
            }
          });
        this.openIssuePerDetails();
      }
    } else {
      alert('value is not found');
    }
  }

  IssuePerDetail(tendCondition: any) {
    // https://dpdmis.in/CGMSCHO_API2/api/HO/IssuePerDetail?yearId=546&mcid=1&perCondition=BELOW10&tendCondition=PRICE

    const yearId = 546,
      mcid = 1,
      perCondition = 'PRICE';
    this.spinner.show();
    this.api
      .IssuePerDetail(mcid, perCondition, tendCondition)
      .subscribe((res: any[]) => {
        if (res && res.length > 0) {
          this.dispatch_IssueperDetails = res.map(
            (item: any, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          console.log(
            'dispatch_IssueperDetails:',
            this.dispatch_IssueperDetails
          );
          this.IssuePerDetailsdata.data = this.dispatch_IssueperDetails;
          this.IssuePerDetailsdata.paginator = this.paginator13;
          this.IssuePerDetailsdata.sort = this.sort13;
          this.spinner.hide();
        } else {
          console.error('No nameText found or incorrect structure:', res);
          this.spinner.hide();
        }
      });
    this.openIssuePerDetails();
  }
  openIssuePerDetails() {
    const dialogRef = this.dialog.open(this.IssuePerDetailModal, {
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
  getWhStockOutInDetail(whid: any) {
    // whid=2615

    const para = 'STOCKOUT';
    this.spinner.show();
    this.api.WhStockOutInDetail(whid, para).subscribe((res: any[]) => {
      if (res && res.length > 0) {
        this.dispatch_WhStockOutInDetail = res.map(
          (item: any, index: number) => ({
            ...item,
            sno: index + 1,
          })
        );
        console.log(
          'dispatch_WhStockOutInDetail:',
          this.dispatch_WhStockOutInDetail
        );
        this.WhStockOutInDetail.data = this.dispatch_WhStockOutInDetail;
        this.WhStockOutInDetail.paginator = this.paginator14;
        this.WhStockOutInDetail.sort = this.sort14;
        this.spinner.hide();
      } else {
        console.error('No nameText found or incorrect structure:', res);
        this.spinner.hide();
      }
    });
    this.openWhStockOutInDetailModal();
  }
  openWhStockOutInDetailModal() {
    const dialogRef = this.dialog.open(this.WhStockOutInDetailModal, {
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
      //console.log('InsertUserPageViewLogdata=',this.InsertUserPageViewLogdata);
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
  //#endregion
}






import { Component, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexStroke, ApexXAxis, ApexFill, ApexPlotOptions, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { ApiService } from 'src/app/service/api.service';
import { BasicAuthenticationService } from 'src/app/service/authentication/basic-authentication.service';
import { HardcodedAuthenticationService } from 'src/app/service/authentication/hardcoded-authentication.service'; // Assuming you have a service for getting the username
import { MenuServiceService } from 'src/app/service/menu-service.service';
// import { ChartOptions } from '../card/card.component';
import { fontWeight } from 'html2canvas/dist/types/css/property-descriptors/font-weight';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { style } from '@angular/animations';
import { ChartOptions } from '../../card/card.component';
import { NgFor, CommonModule, NgStyle } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableExporterModule } from 'mat-table-exporter';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { DropdownModule } from 'primeng/dropdown';
import { HoldItemDetails, QCPendingMonthwiseRec, QCPendingMonthwiseRecDetails, QCPendingParticularArea, QCPendingPlace, QCResultPendingLabWise } from 'src/app/Model/DashCards';
import * as ApexCharts from 'apexcharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { color } from 'html2canvas/dist/types/css/types/color';


@Component({
  selector: 'app-qc-dashboard',
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
    SelectDropDownModule,
    DropdownModule,
    MatSelectModule,
    FormsModule,
    NgSelectModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatMenuModule,
     MatTableExporterModule,
     MatPaginatorModule,
      MatTableModule



  ],
  templateUrl: './qc-dashboard.component.html',
  styleUrl: './qc-dashboard.component.css'
})
export class QcDashboardComponent {
exportToPDF() {
throw new Error('Method not implemented.');
}
applyTextFilter($event: KeyboardEvent) {
throw new Error('Method not implemented.');
}
@ViewChild('itemDetailsModal') itemDetailsModal: any;
@ViewChild('itemDetailsModal2') itemDetailsModal2: any;
@ViewChild('UQCDetailsModal') UQCDetailsModal: any;
@ViewChild('HODDetailsModal') HODDetailsModal: any;
@ViewChild('NSQDetailsModal') NSQDetailsModal: any;


  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions;
  chartOptions1: ChartOptions;
  chartOptions2: ChartOptions;
  chartOptionsQCHOFinalUpdate: ChartOptions;
  chartOptionsQCStages: ChartOptions;
  chartQCPendingAtLab:ChartOptions;
  chartIndent: ChartOptions;
  chartNearexp: ChartOptions;
  chartUQC: ChartOptions;
  title: string = 'welcome';

  username: any = '';
  menuItems: {  label: string; route: string; submenu?: { label: string; route: string }[], icon?: string }[] = [];
  expandedMenus: { [key: string]: boolean } = {};
  nosIndent: number = 0; // Default value
  nosfac: number = 0;    // Default value
  nositems: number = 0;
  totalpoitems:any
  totalrecvalue:any
  dropindentid:any
  indentIssued:any
  nooffacIndented:any
  nosindent:any
  totalpovalue:any
  nositemsI:any
  totalValuecr:any
  nosfacility:any
  roleName:any = localStorage.getItem('roleName')
  currentMonth = new Date().toLocaleString('default', { month: 'long' });
  qCPendingItems:any
  itemid:any
  mcid=1
  monthid:any=''
  mname:any='';
  area:any=0;
  nositemshold:any
  nositemsnsq:any
  stkvaluehold:any
  nosbatchhold:any
  stkvaluensq:any
  nosbatchnsq:any

  mcategoryUQC:any
  nositemsUQC:any
  nosbatchUQC:any
  stkvalueUQC:any

  pOnositems: any;
  totalsample: any;
  qctimetaken: any;

  Headerdetails:any='';
  
  MasItemlist:any
  PartiIndentlist:any
  PartPOsSince1920list:any
  PartItemissuelist:any
  PartItemRClist:any
  qCPendingParticularArea:QCPendingParticularArea[]=[]
  qCPendingParticularArea2:QCPendingParticularArea[]=[]
  qCResultPendingLabWise:QCResultPendingLabWise[]=[]
  qCPendingMonthwiseRecDetails:QCPendingMonthwiseRecDetails[]=[]
  holdItemDetails:HoldItemDetails[]=[]
  dataSource = new MatTableDataSource<any>();
  dataSource2 = new MatTableDataSource<any>();
  dataSource3 = new MatTableDataSource<any>();
  dataSource4 = new MatTableDataSource<any>();
  dataSource5 = new MatTableDataSource<any>();
  dataSource6 = new MatTableDataSource<any>();
  dataSource7 = new MatTableDataSource<any>();
  dataSource8 = new MatTableDataSource<any>();
  @ViewChild('paginator') paginator!: MatPaginator;
    @ViewChild('sort') sort!: MatSort;
  @ViewChild('paginator2') paginator2!: MatPaginator;
    @ViewChild('sort2') sort2!: MatSort;
    @ViewChild('paginator3') paginator3!: MatPaginator;
    @ViewChild('sort3') sort3!: MatSort;
    @ViewChild('paginator4') paginator4!: MatPaginator;
    @ViewChild('sort4') sort4!: MatSort;
    @ViewChild('paginator5') paginator5!: MatPaginator;
    @ViewChild('sort5') sort5!: MatSort;
    @ViewChild('paginator6') paginator6!: MatPaginator;
    @ViewChild('sort6') sort6!: MatSort;
    @ViewChild('paginator7') paginator7!: MatPaginator;
    @ViewChild('sort7') sort7!: MatSort;
    @ViewChild('paginator8') paginator8!: MatPaginator;
    @ViewChild('sort8') sort8!: MatSort;

    selectedCategory:any='';
    selectedCategoryRadio:any='Drugs';
  
    qCPendingMonthwiseRec:QCPendingMonthwiseRec[]=[]
    qCPendingPlace:QCPendingPlace[]=[]




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
    series: <ApexAxisChartSeries>[{
      name: "Subscriptions",
      data: [200, 400, 600, 800, 700, 600, 800, 900, 750, 850]
    }],
    chart: <ApexChart>{
      type: 'bar',
      height: 150
    },
    xaxis: <ApexXAxis>{
      categories: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O']
    },
    colors: ['#ff9800'],
    fill: <ApexFill>{
      colors: ['#ff9800']
    }
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
  role:any=localStorage.getItem('roleName')
  labelToIconMap: { [key: string]: string } = {
    'Home':'assets/dash-icon/house.png',
    'Seasonal Drugs':'assets/dash-icon/season.png',
    'Health Facilities Coverage':'assets/dash-icon/hscov.png',
    'Warehouse Information':'assets/dash-icon/data-warehouse.png',
    'Warehouse Stock Abstract':'assets/dash-icon/packages.png',
    "Warehouse Stock Details":'assets/dash-icon/inventory.png',
    'Devlivery':'assets/dash-icon/fast-delivery.png',
    'Growth in Distribution':'assets/dash-icon/distribution.png',
    'Warehouse Stock-out %':'assets/dash-icon/out-of-stock.png',
    'ANPR Report ':'assets/dash-icon/cctv-camera.png',
    'Near Expiry':'assets/dash-icon/expired.png',
    'Time-Based Analysis':'assets/dash-icon/time-to-market.png',
    'Growth In Procurment':'assets/dash-icon/financial-profit.png',
    'NOC':'assets/dash-icon/approved.png',
    'Quality Control':'assets/dash-icon/biochemist.png',
    'Handover':'assets/dash-icon/hand-over.png',
    'Work Order':'assets/dash-icon/clipboard.png',
    'Running Works':'assets/dash-icon/under-construction.png',
    'cgmsc-supplies':'assets/dash-icon/drugs.png',
    'Evaluation':'assets/dash-icon/norm.png',
    'Progress Abstract':'assets/dash-icon/hospital.png',
    'Tender Evaluation':'assets/dash-icon/check-list.png',
    'Live Tender':'assets/dash-icon/auction.png',
    'To be Tender':'assets/dash-icon/tender.png',
    'Payment':'assets/dash-icon/payment.png',
    'Search Work':'assets/dash-icon/analysis.png',
    'Work Abstract':'assets/dash-icon/analysis_.png',
    'Administrative Sanction':'assets/dash-icon/blogger.png',
    'Land Issue':'assets/dash-icon/barrier.png',
    'Technical Sanction':'assets/dash-icon/deadline.png',
    'Division Progress Monitoring':'assets/dash-icon/planning.png',
    'District-wise Progress':'assets/dash-icon/online-report.png',
    'Engineer-Works':'assets/dash-icon/person.png',
    'Payment Time Taken':'assets/dash-icon/saving.png',
    'Finance Dashboard':'assets/dash-icon/dashboard.png',

  };
  constructor(private spinner: NgxSpinnerService, private dialog: MatDialog,private api: ApiService,private menuService: MenuServiceService,private authService: HardcodedAuthenticationService,public basicAuthentication: BasicAuthenticationService,public router:Router) {
    
   
    this.chartOptions = {
      series: [], // Your data values
      chart: {
        type: "donut",
        height: 150,  // ✅ Set height explicitly
        // width: 400,

      },
      labels: [],
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#001219'],
          fontWeight:'2px' 
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
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,  // ✅ Responsive width
              height: 300 
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    } as unknown as ChartOptions;

  
    this.chartQCPendingAtLab = {
      series: [], // Radial bar data
      chart: {
        type: "radialBar",
        height: "210%",  

        width:"200%"
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '16px'
            },
            value: {
              fontSize: '14px',
              
              formatter: function (_val: any, opts: any) {
                console.log("opts.w.globals.series:", opts.w.globals.series); // Debugging
                console.log("opts.seriesIndex:", opts.seriesIndex); // Debugging
                return opts.w.globals.series[opts.seriesIndex]?.toString() || "0"; // Ensure total values are displayed
              }
            }
          }
        }
      },
      labels: [
        'Total Drugs',
        'Stock out Drugs',
        'Stock out %'
      ],
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#FF0000'] 
        },
        formatter: function (val: any, opts: any) {
          return opts.w.globals.series[opts.seriesIndex]; // Shows actual values inside the chart
        }
      },
      legend: {
        labels: {}
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    } as unknown as ChartOptions;

    this.chartIndent = {
      series: [], // Radial bar data
      chart: {
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '16px'
            },
            value: {
              fontSize: '14px',
              
              formatter: function (_val: any, opts: any) {
                console.log("opts.w.globals.series:", opts.w.globals.series); // Debugging
                console.log("opts.seriesIndex:", opts.seriesIndex); // Debugging
                return opts.w.globals.series[opts.seriesIndex]?.toString() || "0"; // Ensure total values are displayed
              }
            }
          }
        }
      },
      labels: [
        'No of Drugs',
        'Return From CGMSC',
        'Actual Annual Indent'
      ],
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#FF0000'] 
        },
        formatter: function (val: any, opts: any) {
          return opts.w.globals.series[opts.seriesIndex]; // Shows actual values inside the chart
        }
      },
      legend: {
        labels: {}
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    } as unknown as ChartOptions;
    
      this.chartOptionsQCHOFinalUpdate = {
        series: [], // Radial bar data
        chart: {
          type: "radialBar"
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: '16px'
              },
              value: {
                fontSize: '14px',
                formatter: function (_val: any, opts: any) {
                  console.log("opts.w.globals.series:", opts.w.globals.series); // Debugging
                  console.log("opts.seriesIndex:", opts.seriesIndex); // Debugging
                  return opts.w.globals.series[opts.seriesIndex]?.toString() || "0"; // Ensure total values are displayed
                }
              }
            }
          }
        },
        labels: [
          'Value(in Cr)',
          'Batches',
          'Items'
        ],
        dataLabels: {
          enabled: true,
          style: {
            colors: ['#001219'],
            fontWeight: '2px'
          },
          formatter: function (val: any, opts: any) {
            return opts.w.globals.series[opts.seriesIndex]; // Shows actual values inside the chart
          }
        },
        legend: {
          labels: {}
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      } as unknown as ChartOptions;

      this.chartUQC = {
        series: [], // Radial bar data
        chart: {
          type: "radialBar",
          height: "210%",  

          width:"200%",

          events: {
            dataPointSelection: (
              event: any,
              chartContext: ApexCharts,
              { dataPointIndex, seriesIndex }: { dataPointIndex: number; seriesIndex: number }
            ) => {
              
              console.log("Chart Clicked!  sdsdsdsdsdsdds");  // 🛑 Yeh show ho raha ya nahi? Agar nahi to problem yahan hai
            },
          }
          
          
          
          
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
                  console.log("opts.w.globals.series:", opts.w.globals.series); // Debugging
                  console.log("opts.seriesIndex:", opts.seriesIndex); // Debugging
                  return opts.w.globals.series[opts.seriesIndex]?.toString() || "0"; // Ensure total values are displayed
                }
              }
            }
          }
        },
      
        labels: [
          'UQC Stock Value(in Cr)',
          'No of Items',
          'No of Batches'
        ],
        dataLabels: {
          enabled: true,
          // style: {
          //   // colors: ['#000'],
          //   // fontWeight: '2px'
          // },
          formatter: function (val: any, opts: any) {
            return opts.w.globals.series[opts.seriesIndex]; // Shows actual values inside the chart
          }
        },
        legend: {
          labels: {}
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      } as unknown as ChartOptions;
    
      this.chartOptionsQCStages = {
        series: [], // Radial bar data
        chart: {
          type: "pie",

        

          
        },
        
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: '16px'
              },
              value: {
                fontSize: '14px',
                formatter: function (_val: any, opts: any) {
                  console.log("opts.w.globals.series:", opts.w.globals.series); // Debugging
                  console.log("opts.seriesIndex:", opts.seriesIndex); // Debugging
                  return opts.w.globals.series[opts.seriesIndex]?.toString() || "0"; // Ensure total values are displayed
                }
              }
            }
          }
        },
        labels: [
          
        ],
        dataLabels: {
          enabled: true,
          style: {
            colors: ['#001219'],
            fontWeight: '2px'
          },
          formatter: function (val: any, opts: any) {
            return opts.w.globals.series[opts.seriesIndex]; // Shows actual values inside the chart
          }
        },
        legend: {
          labels: {}
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      } as unknown as ChartOptions;
    
      

    this.chartOptions1 = {
      series: [],
      chart: {
        type: 'line',
        stacked: true,
        height: '210%',
        width: '100%',
      },
      labels:[],
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
          }
        }
      },
      dataLabels: {
        enabled: true,
        style: {
          // colors: ['#FF0000'] 
        }
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
          color: '#FF3C00'
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
        show: false
      },
    };
    
    

     this.chartNearexp = {
      series: [],
      chart: {
        type: 'line',
        stacked: true,
        height: '210%',
        width: '100%',
      },
      labels: [ ],
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
        labels:{
          formatter: function (value) {
            return value.toFixed(0); // This will show the values without decimals
          }
        },
        
        
        
        
      },
      dataLabels: {
        enabled: true,
        style: {
          // colors: ['#FF0000'] 
        }
      },
      stroke: {
        width: 4,
        // colors: ['#fff'],
      },
      title: {
        text:'',
        align: 'center',
        style: {
          fontWeight:'bold',
          fontSize: '16px',
          color:'#FF3C00'
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
        show: false
      },
    };
    this.chartOptions2 = {
      series: [],
      chart: {
        type: 'line',
        stacked: true,
        height: '210%',
        width: '100%',
        
      },
      labels: [ ],
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
        labels:{
          formatter: function (value) {
            return value.toFixed(0); // This will show the values without decimals
          }
        },
        
        
        
        
      },
      dataLabels: {
        enabled: true,
        style: {
          // colors: ['#FF0000'] 
        }
      },
      stroke: {
        width: 4,
        // colors: ['#fff'],
      },
      title: {
        text:'',
        align: 'center',
        style: {
          fontWeight:'bold',
          fontSize: '16px',
          color:'#FF3C00'
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
        show: false
      },
    };
  }

  ngOnInit() {
     this.username = sessionStorage.getItem('authenticatedUser');
     
     this.role = this.basicAuthentication.getRole().roleName; // Fetch dynamic role from the authentication service
     console.log('SE Role:', this.role);
     this.updateMenu();
    //  this.addIconsToMenu();
    this.selectedCategory=this.menuService.getSelectedCategory();
    this.CGMSCIndentPending();
    this.GetDeliveryInMonth();
    this.GetPOCountCFY();
    this.last7DaysIssue();
    this.loadData();
    this.loadData1();
    this.loadData2();
    this.loadQCfinalUpdatePending();
    this.loadQCPendingAtLab();
    this.loadIndent();
    this.Nearexp();
    this.loadUQC();
    this.loadDataQCStages();
    this.getItemNoDropDown();
    this.getQCResultPendingLabWise();
    this.QCHold_Dash()
    this.QCNSQ_Dash()
    this.loadUQCDashCard()
    this.QCTimeTakenYear();
  }


  getItemNoDropDown(){
    this.api.QCPendingItems(1).subscribe((res:any[])=>{
      console.log(' QCPendingItems API dropdown Response:', res);
      if (res && res.length > 0) {
        this.qCPendingItems = res.map(item => ({
          itemid: item.itemid, // Adjust key names if needed
          nameText : item.nameText, 
        }));
        // console.log('VehicleNoDropDownList :', this.qCPendingItems);
      } else {
        console.error('No nameText found or incorrect structure:', res);
      }
    });  
  }
  // GetTotalRC(){
  //   this.api.getTotalRC().subscribe((res:any)=>{
      
  //   })

  // }
  GetNearExpRC(){
    this.api.getNearExpRC(1).subscribe((res:any)=>{

    })

  }

  QCHold_Dash(){
    this.api.QCHold_NSQDash('Hold').subscribe((res:any)=>{
      this.nositemshold=res[0].nositems
      this.stkvaluehold=res[0].stkvalue
      this.nosbatchhold=res[0].nosbatch
     
    })
  }
  QCNSQ_Dash(){
    this.api.QCHold_NSQDash('NSQ').subscribe((res:any)=>{
      this.nositemsnsq=res[0].nositems
      this.stkvaluensq=res[0].stkvalue
      this.nosbatchnsq=res[0].nosbatch
    })
  }

  GetDeliveryInMonth(){
    this.api.getDeliveryInMonth('01-Apr-2024','31-Mar-2025').subscribe((res:any)=>{
      this.nosindent=res[0].nosindent
      this.indentIssued=res[0].indentIssued
      this.nooffacIndented=res[0].nooffacIndented
        })
  }
  GetPOCountCFY(){
    this.api.getPOCountCFY(0,1).subscribe((res:any)=>{
  this.totalpoitems=res[0].totalpoitems
  this.totalpovalue=res[0].totalpovalue
  this.totalrecvalue=res[0].totalrecvalue
    })
  }
  last7DaysIssue(){
    this.api.Last7DaysIssue(0,1,0).subscribe((res:any)=>{
  this.nositemsI=res[0].nositems  
  this.totalValuecr=res[0].totalValuecr
  this.nosfacility=res[0].nosfacility
    })
  }
  QCTimeTakenYear(){
    this.api.QCTimeTakenYear(1,0,0).subscribe((res:any)=>{
  this.pOnositems=res[0].pOnositems  
  this.totalsample=res[0].totalsample
  this.qctimetaken=res[0].qctimetaken
 
    })
  }
  CGMSCIndentPending(){
    
    this.api.CGMSCIndentPending().subscribe((res:any)=>{
      console.log('dsds',res);
      this.nosIndent=res[0].nosIndent
  this.nosfac=res[0].nosfac
  this.nositems=res[0].nositems
    })
  }
  menuIcons(){
      
  }
   // Method to add custom icons based on the label
   addIconsToMenu(): void {
    // Define a mapping for labels to icons
    const labelToIconMap:any = {
      'Home': 'home',
      'Seasonal Drugs':'assets/dash-icon/pill.png'
      
    };

    

    // Loop through the menu items and set the icon for each label
    this.menuItems.forEach(item => {
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

  private updateMenu(){
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
    this.menuItems = this.menuItems.filter(item => !unwantedLabels.includes(item.label));
    console.log('Menu Items:', this.menuItems);
    
  }

  toggleSubmenu(menuLabel: string): void {
    
    // Toggle the clicked submenu, close all others
    for (const key in this.expandedMenus) {
      if (key !== menuLabel) {
        this.expandedMenus[key] = false;  // Collapse all other menus
      }
    }
    this.expandedMenus[menuLabel] = !this.expandedMenus[menuLabel];  // Toggle current menu
  }


  onISelectChange(event: Event): void {
    
 
  const selectedUser = this.qCPendingItems.find((user: { itemid: string }) => user.itemid === this.itemid); 

  if (selectedUser) {
    this.itemid=selectedUser.itemid || null;
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
  loadData(): void {
    ;
    const fromDate = '01-Jan-2025'; // Example date
    const toDate = '30-Jan-2025'; // Example date

    this.api.DeliveryInMonth(fromDate, toDate).subscribe(
      (data: any) => {
        const nooffacIndented: number[] = [];
        const nosindent: number[] = [];
        // const indentIssued: number[] = [];
        const dropfac: number[] = [];
        const dropindentid: number[] = [];

        console.log('Delivered from warehouse Response:', data);

        data.forEach((item: any) => {
          nooffacIndented.push(item.nooffacIndented);
          nosindent.push(item.nosindent);
          // indentIssued.push(item.indentIssued);
          dropfac.push(item.dropfac);
          dropindentid.push(item.dropindentid);
        });

        // Flatten the data into single total values
        const totalNoOffacIndented = nooffacIndented.reduce((a, b) => a + b, 0);
        const totalNosIndent = nosindent.reduce((a, b) => a + b, 0);
        // const totalIndentIssued = indentIssued.reduce((a, b) => a + b, 0);
        const totalDropFac = dropfac.reduce((a, b) => a + b, 0);
        const Dropindentid = dropindentid.reduce((a, b) => a + b, 0);

        // Update the pie chart
        this.chartOptions = {
          ...this.chartOptions, // Preserve existing options
          series: [totalNoOffacIndented,totalDropFac ,totalNosIndent,Dropindentid ], // Pie chart data
          chart: {
            type: "donut" // Ensure chart type is pie
          },
          labels: [
            'Indented Facility',
            'Delivered Facilities',
            'Total Indent',
            'Delivered Indent'
          ]
        } as any; // ✅ Fix: Use "as any" to bypass TypeScript restrictions
      }
      
      
      ,
      (error: any) => {
        console.error('Error fetching data', error);
      }
    );
}

loadQCfinalUpdatePending(): void {
  
 
  this.api.GetQCFinalResultPending(this.mcid).subscribe(
    (data: any) => {
      const mcategory: string[] = [];
      const mcid: number[] = [];
      const nositems: number[] = [];
      const nosbatch: number[] = [];
      const uqcvalue: number[] = [];
      const exceddedsincetimeline: string[] = [];

      console.log('QC Final Update:', data);

      data.forEach((item: any) => {
        mcategory.push(item.mcategory);
        mcid.push(item.mcid);
        nositems.push(item.nositems);
        nosbatch.push(item.nosbatch);
        uqcvalue.push(item.uqcvalue);
        exceddedsincetimeline.push(item.exceddedsincetimeline);
      });

      // Update the bar chart
      this.chartOptionsQCHOFinalUpdate = {
        series: [
          {
            name: 'Value(in Cr)',
            data: uqcvalue
          },
          {
            name: 'No of Batches',
            data: nosbatch
          },
          {
            name: 'No of Items',
            data: nositems
          }
        ],
        chart: {
          type: "bar",
          height: "210%",  

          // width:"200%"
        },
        plotOptions: {
          bar: {
            horizontal: false, // Set to true for horizontal bar chart
            columnWidth: "50%",
            endingShape: "rounded"
          }
        },
        dataLabels: {
          enabled: true
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories: exceddedsincetimeline // Dynamically set categories from API response
        },
        yaxis: {
          title: {
            text: "Final QC Pending"
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val: number) {
              return val.toString();
            }
          }
        },
        legend: {
          position: "top"
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                // width: 300
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      } as any;
    },
    (error: any) => {
      console.error('Error fetching data', error);
    }
  );
}

//qc pending at lab chart method

loadQCPendingAtLab(): void {

  this.api.QCLabPendingTimeline(this.mcid,'Both',0).subscribe(
    (data: any) => {
   

      const timeline: string[] = [];
      const nositems: number[] = [];
      const nosbatch: number[] = [];
      const uqcValuecr: number[] = [];

      console.log('QC Pending At Lab:', data);

      data.forEach((item: any) => {
     
        timeline.push(item.timeline);
        nositems.push(item.nositems);
        nosbatch.push(item.nosbatch);
        uqcValuecr.push(item.uqcValuecr);
      });

      // Update the bar chart
      this.chartQCPendingAtLab = 
      {
        series: [
          {
            name: 'Total Drugs',
            data: nositems
          },
          {
            name: 'No of Batch',
            data: nosbatch
          },
          {
            name: 'UQC Value',
            data: uqcValuecr
          }
        ],
        chart: {
          type: "bar",
          height: "210%",  

          // width:"200%"
        },
        plotOptions: {
          bar: {
            horizontal: false, // Set to true for horizontal bar chart
            columnWidth: "70%",
            endingShape: "rounded",
            dataLabels: {
              position: "top" // Places data labels on top of bars
            }
          }
        },
      
        stroke: {
          show: true,
          width: 1,
          colors: ["transparent"]
        },
        xaxis: {
          categories: timeline // Dynamically set categories from API response
        },
        yaxis: {
          title: {
            text: "No of Drugs"
          },
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ['#000'] 
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val: number) {
              return val.toString();
            }
          }
        },
        legend: {
          position: "top"
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                // width: 300
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      } as any;
    },
    (error: any) => {
      console.error('Error fetching data', error);
    }
  );
}

loadIndent(): void {


  this.api.IndentcntHome(1,0).subscribe(
    (data: any) => {
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

      // Update the bar chart
      this.chartIndent = {
        series: [
          {
            name: 'No of Drugs',
            data: nositems
          },
          {
            name: 'Return From CGMSC',
            data: returned
          },
          {
            name: 'Actual Annual Indent',
            data: actualAI
          }
        ],
        chart: {
          type: "bar",
          height: 300
        },
        plotOptions: {
          bar: {
            horizontal: false, // Set to true for horizontal bar chart
            columnWidth: "70%",
            endingShape: "rounded",
            dataLabels: {
              position: "top" // Places data labels on top of bars
            }
          }
        },
      
        stroke: {
          show: true,
          width: 1,
          colors: ["transparent"]
        },
        xaxis: {
          categories: hod // Dynamically set categories from API response
        },
        yaxis: {
          title: {
            text: "No of Drugs"
          },
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ['#000'] 
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val: number) {
              return val.toString();
            }
          }
        },
        legend: {
          position: "top"
        },
        responsive: [
          {
            // breakpoint: 480,
            options: {
              chart: {
                // width: 300
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      } as any;
    },
    (error: any) => {
      console.error('Error fetching data', error);
    }
  );
}



loadDataQCStages(): void {
  this.api.QCPendingPlace(this.mcid).subscribe(
    (data: any) => {

      this.qCPendingPlace=data;
      const seriesData: number[] = [];
      const labelsData: string[] = [
        "Pending in WH",
        "Pending in Courier fom WH",
        "Pending in HO for Lab Issue",
        "Pending in Courier for Lab",
        "Pending in Lab",
        "Pending in HO for Final Clearance"
      ];

      let aggregatedData = {
        qdIssuePendingbyWH: 0,
        whIssueButPendingInCourier: 0,
        hoqC_LabIssuePending: 0,
        dropPendingToLab: 0,
        labAnalysisOngoing: 0,
        pendingforfinalUpdate: 0
      };

      console.log('Delivered from warehouse Response:', data);

      data.forEach((item: any) => {
        aggregatedData.qdIssuePendingbyWH += item.qdIssuePendingbyWH;
        aggregatedData.whIssueButPendingInCourier += item.whIssueButPendingInCourier;
        aggregatedData.hoqC_LabIssuePending += item.hoqC_LabIssuePending;
        aggregatedData.dropPendingToLab += item.dropPendingToLab;
        aggregatedData.labAnalysisOngoing += item.labAnalysisOngoing;
        aggregatedData.pendingforfinalUpdate += item.pendingforfinalUpdate;
      });

      seriesData.push(
        aggregatedData.qdIssuePendingbyWH,
        aggregatedData.whIssueButPendingInCourier,
        aggregatedData.hoqC_LabIssuePending,
        aggregatedData.dropPendingToLab,
        aggregatedData.labAnalysisOngoing,
        aggregatedData.pendingforfinalUpdate
      );

      
      this.chartOptionsQCStages = {
        series: seriesData,
        chart: {
          type: "pie",
          height: "210%",  
          // width: "200%", 

          events: {
            dataPointSelection: (
              event: any,
              chartContext: ApexCharts,
              { dataPointIndex }: { dataPointIndex: number }
            ) => {
              console.log("Chart Clicked!");
          debugger
              // Get the selected category based on index
              const selectedCategory = this.chartOptionsQCStages?.labels?.[dataPointIndex] ?? "Unknown";
              const selectedValue = this.chartOptionsQCStages?.series?.[dataPointIndex] ?? 0;
              console.log("Selected Category:", selectedCategory);
              console.log("Selected Value:", selectedValue);
          debugger
              if (selectedCategory && selectedValue !== undefined) {
                console.log(`You clicked on ${selectedCategory} with value: ${selectedValue}`);
          debugger
                // Fetch data based on selection
                this.fetchDataBasedOnChartSelectionchartQCStages(selectedCategory, selectedValue);
              } else {
                console.log("Invalid selection.");
              }
            },
          }
          


        },
        fill: {
        colors: [  // Assign colors to labels in order
          "#f8796b",  // Pending in WH
          "#33FF57",  // Pending in Courier from WH #33FF57
          "#fc466b",  // Pending in HO for Lab Issue
          "#00b4d8",  // Pending in Courier for Lab
          "#ffbe0b",  // Pending in Lab
          "#38b000"   // Pending in HO for Final Clearance
        ],
      },
        dataLabels: {
          enabled: true,
          style: {
            colors: ['#001219'],
            fontWeight: '2px'
          },
          formatter: function (val: any, opts: any) {
            return opts.w.globals.series[opts.seriesIndex]; // Shows actual values inside the chart
          },
        },
        labels: labelsData,
        legend: {
          position: "right",
          horizontalAlign: "center", // Centers legend items
          floating: false,
          markers: {
            width: 12,
            height: 12,
            radius: 12
          },
          fontSize: "12px",
          itemMargin: {
            horizontal: 10, // Adjust horizontal spacing
            vertical: 5    // Adjust vertical spacing for column-wise layout
          }
          
        },
        responsive: [
          {
            breakpoint: 768,
            options: {
              chart: {
                // width: "100%",
                // height: "100%",
              },
              legend: {
                position: "bottom",
                horizontalAlign: "center",
                itemMargin: {
                  horizontal: 10,
                  vertical: 5
                }
              }
            }
          }
        ],
        tooltip: {
          y: {
            formatter: function (val: number) {
              return val.toFixed(0); // Show actual value
            }
          }
        }
      } as any;
      
    },
    (error: any) => {
      console.error('Error fetching data', error);
    }
  );
}





Nearexp(): void {

  this.api.NearExp(1,5).subscribe(
    (data:any) => {

      const nositems: number[] = [];
      const mname: any[] = [];
      const nosbatches: number[] = [];
      const stkvaluEcr: number[] = [];
      console.log('helo :', data);

      data.forEach((item:any)=> {
       
        nositems.push(item.nositems);
    
        mname.push(item.mname);
        nosbatches.push(item.nosbatches);
        stkvaluEcr.push(item.stkvaluEcr);
        
      });
      // console.log('klkllklkk',indentDT);


      this.chartNearexp.series = [

  
        { 
          name: 'Near Exp Value (in Cr)',
          data: stkvaluEcr ,
          color:'#5f0f40'
        },
     

        
      ];

      this.chartNearexp.xaxis = {
        categories: mname,
        labels:{
          style:{
            // colors:'#390099',
            fontWeight:'bold',
            fontSize:'15px'
          }
        }
        

        
       };
      this.cO = this.chartNearexp;

    },
    (error: any) => {
      console.error('Error fetching data', error);
      
    }
  );
}

loadUQCDashCard(): void {
  

  this.api.QCPendingHomeDash(this.mcid).subscribe(
    (res: any) => {

      
      
      this.mcategoryUQC=res[0].mcategory
      this.nositemsUQC=res[0].nositems
      this.nosbatchUQC=res[0].nosbatch
      this.stkvalueUQC=res[0].stkvalue

      

    

    
    },
    (error: any) => {
      console.error('Error fetching data', error);
    }
  );
}

loadUQC(): void {
  

  this.api.QCPendingMonthwiseRec(this.mcid).subscribe(
    (data: any) => {


      this.qCPendingMonthwiseRec=data;

      const categories: string[] = [];
      const nositems: number[] = [];
      const stkvalue: number[] = [];
      const nosbatch: number[] = [];

      console.log('Under QC home Dashboard:', data);

      data.forEach((item: any) => {
     
        categories.push(item.mname);
        nositems.push(item.nositems);
        nosbatch.push(item.nosbatch);
        stkvalue.push(item.stkvalue);
        
      });

      // Update the bar chart
      this.chartUQC = {
        series: [
          
          {
            name: 'No of Items',
            data: nositems
          },
          {
            name: 'No of Batches',
            data: nosbatch
          },
          {
            name: 'UQC Stock Value(in Cr)',
            data: stkvalue,
            
  
          }
        ],
        chart: {
          type: "bar",
          height: "210%",  

          // width:"200%",

          events: {
            dataPointSelection: (
              event: any,
              chartContext: ApexCharts,
              { dataPointIndex, seriesIndex }: { dataPointIndex: number; seriesIndex: number }
            ) => {
              
              console.log("Chart Clicked!");
              console.log("Chart Context:", chartContext);
          
              // Check categories
              console.log("Categories:", this.chartUQC?.xaxis?.categories);
              console.log("Selected Category Index:", dataPointIndex);
              const selectedCategory = this.chartUQC?.xaxis?.categories?.[dataPointIndex];
              console.log("Selected Category Value:", selectedCategory);
          
              // Check Series
              const selectedSeries = this.chartUQC?.series?.[seriesIndex]?.name;
              console.log("Selected Series:", selectedSeries);
          
              if (selectedCategory && selectedSeries) {
                const apiData = this.qCPendingMonthwiseRec;
                console.log("API Data:", apiData);
          
                // Ensure correct comparison
                const selectedData = apiData.find(
                  (data) => data.mname === selectedCategory
                );
                console.log("Selected Data from API:", selectedData);
          
                if (selectedData) {
                  const id = selectedData.monthid;
                  this.mname = selectedData.mname;
                  console.log("Month ID:", id, "Month Name:", this.mname);
                  this.fetchDataBasedOnChartSelectionchartUQCl(id, selectedSeries);
                } else {
                  console.log(`No data found for selected category: ${selectedCategory}`);
                }
              } else {
                console.log("Selected category or series is invalid.");
              }
            },
          }
          
          

        },
        plotOptions: {
          bar: {
            horizontal: false, // Set to true for horizontal bar chart
            // columnWidth: "50%",
            endingShape: "rounded"
          }
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ['#000'] // Ensures black color for data labels
          }
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
         categories: categories, // Dynamically set categories from API response
        //  Labels:{

        //    style: {
        //     color: ['#000'] // Ensures black color for data labels
        //   }
        //  }
        },
        yaxis: {
          title: {
           text: "Under QC Info"
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val: number) {
              return val.toString();
            }
          }
        },
        legend: {
          position: "top"
        },
        responsive: [
          {
            // breakpoint: 480,
            options: {
              chart: {
                // width: 300
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      } as any;
    },
    (error: any) => {
      console.error('Error fetching data', error);
    }
  );
}

  loadData1(): void {

        this.api.Last7DaysIssue(7,0,545).subscribe(
          (data:any) => {
            const nositems: number[] = [];
            const indentDT: any[] = [];
            const indentdate: any[] = [];
            const totalValuecr: number[] = [];
            const nosfacility: number[] = [];
            console.log('helo :', data);

            data.forEach((item:any)=> {
             
              nositems.push(item.nositems);
              indentDT.push(item.indentDT.slice(0, 2));
              indentdate.push(item.indentdate);
              totalValuecr.push(item.totalValuecr);
              nosfacility.push(item.nosfacility);
              
            });
            // console.log('klkllklkk',indentDT);
    
    
            this.chartOptions1.series = [
    
        
              { 
                name: 'totalValuecr',
                data: totalValuecr ,
                color:'#5f0f40'
              },
           
    
              
            ];
 
            this.chartOptions1.xaxis = {
              categories: indentDT,
              labels:{
                style:{
                  // colors:'#390099',
                  fontWeight:'bold',
                  fontSize:'15px'
                }
              }
              
    
              
             };
            this.cO = this.chartOptions1;
   
          },
          (error: any) => {
            console.error('Error fetching data', error);
            
          }
        );
      }
  loadData2(): void {
    
    
        this.api.Last7DaysReceipt(7,0,545).subscribe(
          (data:any) => {
            const nosPO: number[] = [];
            const nositems: any[] = [];
            const receiptdate: any[] = [];
            const receiptDT: number[] = [];
            const rvalue: number[] = [];
            console.log('API Response:', data);

            data.forEach((item:any)=> {
               
              nosPO.push(item.nosPO);
              nositems.push(item.nositems);
              receiptdate.push(item.receiptdate);
              receiptDT.push(item.receiptDT.slice(0,2));
              rvalue.push(item.rvalue);
                 
              
            });
    
    
            this.chartOptions2.series = [
    
               
            
          
              { 
                name: 'rvalue',
                data: rvalue ,
                color:'#004b23'
              },

    
    
              
            ];
    
            this.chartOptions2.xaxis = {
              categories: receiptDT,
              labels:{
                style:{
                  // colors:'#390099',
                  fontWeight:'bold',
                  fontSize:'15px'
                }
              }
              
    
              
             };
            this.cO = this.chartOptions2;
   
          },
          (error: any) => {
            console.error('Error fetching data', error);
            
          }
        );
      }

      searchItem() {
        
        this.spinner.show();
        const itemid=this.itemid
        this.getMasitems(); 
        // this.GetPartiIndent(); 
        // this.getPartPOsSince1920();
        this.QCPendingParticularArea();
        // this.getPartiItemsissue();
        // this.getPartiItemsRC();
        this.openDialog();
      }

      getMasitems(){
  
        this.api.Masitems(this.itemid,0,0,0,0,0).subscribe((res:any[])=>{
          if (res && res.length > 0) {
            this.MasItemlist = res.map(item => ({
            
              itemcode:item.itemcode,
              itemname:item.itemname,
              strengtH1:item.strengtH1,
              unit:item.unit,
              groupname:item.groupname,
              itemtypename:item.itemtypename,
              edl:item.edl,
              edltype:item.edltype
      
            }));
            // console.log('VehicleNoDropDownList :', this.VehicleNoDropDownList);
          } else {
            console.error('No nameText found or incorrect structure:', res);
          }
        });  
      }

      GetPartiIndent(){
  
        this.api.getPartiIndent(this.itemid).subscribe((res:any[])=>{
          if (res && res.length > 0) {
            this.PartiIndentlist =res.map((item: any, index: number) => ({
            
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
      getPartPOsSince1920(){
  
        this.api.PartPOsSince1920(this.itemid).subscribe((res:any[])=>{
          if (res && res.length > 0) {
           this.spinner.show();

            this.PartPOsSince1920list =res.map((item: any, index: number) => ({
            
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

      getPartiItemsissue(){
        
        this.api.PartItemIssue(this.itemid).subscribe((res:any[])=>{
          if (res && res.length > 0) {
           this.spinner.show();

            this.PartItemissuelist =res.map((item: any, index: number) => ({
            
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


      
      getPartiItemsRC(){
        
        this.api.PartItem_RCs(this.itemid).subscribe((res:any[])=>{
          if (res && res.length > 0) {
           this.spinner.show();

            this.PartItemRClist =res.map((item: any, index: number) => ({
            
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
      QCPendingParticularArea(){
        
        this.api.QCPendingParticularArea(this.area,this.itemid).subscribe((res:any[])=>{
          if (res && res.length > 0) {
           this.spinner.show();

            this.qCPendingParticularArea =res.map((item: any, index: number) => ({
            
              ...item,
              sno: index + 1,
            }));
            this.qCPendingParticularArea2 = res; 


            console.log('only one data'+this.qCPendingParticularArea2)

            console.log('Mapped List:', this.qCPendingParticularArea);
            this.dataSource5.data = this.qCPendingParticularArea; // Ensure this line executes properly
            this.dataSource5.paginator = this.paginator5;
            this.dataSource5.sort = this.sort5;
            this.spinner.hide();
          } else {
            console.error('No nameText found or incorrect structure:', res);
            this.spinner.hide();

          }
        });  

      }
      QCPendingParticularAreaPieChart(){
        debugger
        this.api.QCPendingParticularArea(this.area,0).subscribe((res:any[])=>{
          if (res && res.length > 0) {
           this.spinner.show();

            this.qCPendingParticularArea =res.map((item: any, index: number) => ({
            
              ...item,
              sno: index + 1,
            }));
            this.qCPendingParticularArea2 = res; 


            console.log('only one data'+this.qCPendingParticularArea2)

            console.log('pie chart Mapped List:', this.qCPendingParticularArea);
            this.dataSource5.data = this.qCPendingParticularArea; // Ensure this line executes properly
            this.dataSource5.paginator = this.paginator5;
            this.dataSource5.sort = this.sort5;
            this.spinner.hide();
          } else {
            console.error('No nameText found or incorrect structure:', res);
            this.spinner.hide();

          }
        });  

        this.openDialogqCPendingParticularArea();
        

      }
      getQCResultPendingLabWise(){
        
        this.api.QCResultPendingLabWise(this.mcid).subscribe((res:any[])=>{
          if (res && res.length > 0) {
           this.spinner.show();

            this.qCResultPendingLabWise =res.map((item: any, index: number) => ({
            
              ...item,
              sno: index + 1,
            }));
            console.log('Mapped List:', this.qCResultPendingLabWise);
            this.dataSource6.data = this.qCResultPendingLabWise; // Ensure this line executes properly
            this.dataSource6.paginator = this.paginator6;
            this.dataSource6.sort = this.sort6;
            this.spinner.hide();
          } else {
            console.error('No nameText found or incorrect structure:', res);
            this.spinner.hide();

          }
        });  

      }
      QCPendingMonthwiseRecDetails(){
        
        this.api.QCPendingMonthwiseRecDetails(this.monthid,this.mcid).subscribe((res:any[])=>{
          if (res && res.length > 0) {
           this.spinner.show();

            this.qCPendingMonthwiseRecDetails =res.map((item: any, index: number) => ({
            
              ...item,
              sno: index + 1,
            }));
            console.log('Mapped List:', this.qCPendingMonthwiseRecDetails);
            this.dataSource7.data = this.qCPendingMonthwiseRecDetails; // Ensure this line executes properly
            this.dataSource7.paginator = this.paginator7;
            this.dataSource7.sort = this.sort7;
            this.spinner.hide();
          } else {
            console.error('No nameText found or incorrect structure:', res);
            this.spinner.hide();

          }
        });  
        this.openDialogUQC();

      }
      getHoldItemDetails(){
        
        this.api.HoldItemDetails(this.mcid).subscribe((res:any[])=>{
          if (res && res.length > 0) {
           this.spinner.show();

            this.holdItemDetails =res.map((item: any, index: number) => ({
            
              ...item,
              sno: index + 1,
            }));
            console.log('Mapped List:', this.holdItemDetails);
            this.dataSource8.data = this.holdItemDetails; // Ensure this line executes properly
            this.dataSource8.paginator = this.paginator8;
            this.dataSource8.sort = this.sort8;
            this.spinner.hide();
          } else {
            console.error('No nameText found or incorrect structure:', res);
            this.spinner.hide();

          }
        });  
        this.openDialogHOD();

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
      openDialogqCPendingParticularArea() {
        
        const dialogRef = this.dialog.open(this.itemDetailsModal2, {
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

      openDialogUQC() {
        
        const dialogRef = this.dialog.open(this.UQCDetailsModal, {
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



        openDialogHOD() {
        
          const dialogRef = this.dialog.open(this.HODDetailsModal, {
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
        openDialogNSQ() {
        
          const dialogRef = this.dialog.open(this.NSQDetailsModal, {
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
    
          // Reset hodid to 0 initially
          // this.mcid = 0;
      
          // Map the selected category to the corresponding mcid value
          this.spinner.show()
          if (this.selectedCategoryRadio==='Drugs') {
            this.mcid = 1;
            this.loadUQC();
            this.loadDataQCStages()
            this.loadQCPendingAtLab()
            this.loadQCfinalUpdatePending()
            this.getQCResultPendingLabWise()
          this.spinner.hide()

            
            // this.chartOptions.title.text = this.OnChangeTitle +  this.selectedCategory;
          } else if (this.selectedCategoryRadio==='Consumables') {
            this.mcid = 2;
            this.loadUQC();
            this.loadDataQCStages()
            this.loadQCPendingAtLab()
            this.loadQCfinalUpdatePending()
            this.getQCResultPendingLabWise()
          this.spinner.hide()




            // this.chartOptions.title.text = this.OnChangeTitle + this.selectedCategory;
          } else if (this.selectedCategoryRadio==='Reagent') {
            this.mcid = 3;
            this.loadDataQCStages()
            this.loadUQC();
            this.loadQCPendingAtLab()
            this.loadQCfinalUpdatePending()
            this.getQCResultPendingLabWise()
          this.spinner.hide()



            // this.chartOptions.title.text = this.OnChangeTitle +  this.selectedCategory;
          } else if (this.selectedCategoryRadio==='AYUSH') {
            this.mcid = 4;
            this.loadDataQCStages()
            this.loadUQC();
            this.loadQCPendingAtLab()
            this.loadQCfinalUpdatePending()
            this.getQCResultPendingLabWise()
          this.spinner.hide()



            // this.chartOptions.title.text =this.OnChangeTitle +  this.selectedCategory;
          }
      
          // console.log('Selected Hod ID:', this.mcid);
        }

        fetchDataBasedOnChartSelectionchartUQCl(month:any,monthid:any){
          
          this.monthid=month
          this.QCPendingMonthwiseRecDetails()

// this.openDialogUQC();
        }
        fetchDataBasedOnChartSelectionchartQCStages(cat:any,value:any){

        this.Headerdetails=cat;
          if(cat==='Pending in WH'){
            this.area='WHIssue'

          }else if(cat==='Pending in HO for Lab Issue'){
            this.area='LabIssue'
            
          }else if(cat==='Pending in Courier for Lab'){
            this.area='LabCourier'

          }else if(cat==='Pending in Lab'){
            this.area='LabAnalysis'
          }else if(cat==='Pending in HO for Final Clearance'){
            this.area='FinalUpdate'
          }
          else if(cat==='Pending in Courier fom WH'){
            this.area='WHCourier'
          }
          this.QCPendingParticularAreaPieChart()
          
        

// this.openDialogUQC();
        }

        fetchHOD(){
          this.getHoldItemDetails()

// this.openDialogHOD();
        }

        exportToPDFQCLabPendingTracke() {
          const doc = new jsPDF('l', 'mm', 'a4');
          const columns = [
            { title: 'S.No', dataKey: 'sno' },
            { title: 'Lab Name', dataKey: 'labname' },
            { title: 'With Batches', dataKey: 'withBatches' },
            { title: 'Out Batches', dataKey: 'outBatches' },
          ];
        
          const rows = this.qCResultPendingLabWise.map((row) => ({
            sno: row.sno,
            labname: row.labname,
            withBatches: row.withBatches,
            outBatches: row.outBatches,
          }));
        
          autoTable(doc, {
            columns: columns,
            body: rows,
            startY: 20,
            theme: 'striped',
            headStyles: { fillColor: [22, 160, 133] },
          });
        
          doc.save('QCLabPendingTracker.pdf');
        }


       exportToPDFQCPendingMonthwiseRecDetails() {
  const doc = new jsPDF('l', 'mm', 'a4');
  const columns = [
    { title: 'S.No', dataKey: 'sno' },
    { title: 'Item Name', dataKey: 'itemname' },
    { title: 'Item Code', dataKey: 'itemcode' },
    { title: 'Strength', dataKey: 'strength1' },
    { title: 'Unit', dataKey: 'unit' },
    { title: 'Month Name', dataKey: 'monthname' },
    { title: 'Stock', dataKey: 'stk' },
    { title: 'Stock Value', dataKey: 'stkvalue' },
    { title: 'Category', dataKey: 'mcategory' },
  ];

  const rows = this.qCPendingMonthwiseRecDetails.map((row) => ({
    sno: row.sno,
    itemname: row.itemname,
    itemcode: row.itemcode,
    strength1: row.strength1,
    unit: row.unit,
    monthname: row.monthname,
    stk: row.stk,
    stkvalue: row.stkvalue,
    mcategory: row.mcategory,
  }));

  autoTable(doc, {
    columns: columns,
    body: rows,
    startY: 20,
    theme: 'striped',
    headStyles: { fillColor: [22, 160, 133] },
  });

  doc.save('QCPendingMonthwiseRecDetails.pdf');
}

exportToPDFqCPendingParticularArea() {
  const doc = new jsPDF('l', 'mm', 'a4');
  const columns = [
    { title: 'S.No', dataKey: 'sno' },
    { title: 'Code', dataKey: 'itemcode' },
    { title: 'Type', dataKey: 'itemtypename' },
    { title: 'Strength', dataKey: 'strength1' },
    { title: 'Batch No', dataKey: 'batchno' },
    { title: 'Nos WH', dataKey: 'noswh' },
    { title: 'UQC Qty', dataKey: 'uqcqty' },
    { title: 'Stock Value', dataKey: 'stockvalue' },
    { title: 'Warehouse Rec DT', dataKey: 'warehouseRecDT' },
    { title: 'WH QC Issue DT', dataKey: 'whqcIssueDT' },
    { title: 'Courier Pick DT', dataKey: 'courierPickDT' },
    { title: 'Sample Receipt In HO DT', dataKey: 'sampleReceiptInHODT' },
    { title: 'Lab Issue Date', dataKey: 'labissuedate' },
    { title: 'Lab Receipt DT', dataKey: 'lAbReceiptDT' },
    { title: 'HO QC Report Rec DT', dataKey: 'hoqcReportRecDT' },
    { title: 'Lab Result', dataKey: 'labresult' },
    { title: 'Analysis Days', dataKey: 'analysisDays' },
  ];

  const rows = this.qCPendingParticularArea.map((row) => ({
    sno: row.sno,
    itemcode: row.itemcode,
    itemtypename: row.itemtypename,
    strength1: row.strength1,
    batchno: row.batchno,
    noswh: row.noswh,
    uqcqty: row.uqcqty,
    stockvalue: row.stockvalue,
    warehouseRecDT: row.warehouseRecDT,
    whqcIssueDT: row.whqcIssueDT,
    courierPickDT: row.courierPickDT,
    sampleReceiptInHODT: row.sampleReceiptInHODT,
    labissuedate: row.labissuedate,
    lAbReceiptDT: row.lAbReceiptDT,
    hoqcReportRecDT: row.hoqcReportRecDT,
    labresult: row.labresult,
    analysisDays: row.analysisDays,
  }));

  autoTable(doc, {
    columns: columns,
    body: rows,
    startY: 20,
    theme: 'striped',
    headStyles: { fillColor: [22, 160, 133] },
  });

  doc.save('QCPendingParticularArea.pdf');
}


        
    
  }






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
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-public-view',
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
  templateUrl: './public-view.component.html',
  styleUrl: './public-view.component.css'
})
export class PublicViewComponent {


  currentRoute: string = '';

  



  go(value: any) {
    switch (value) {
      case 1:
        this.router.navigate(['GrowthInProcurmentTabPublic']);
        break; // ✅ Added break to stop execution
  
      case 2:
        this.router.navigate(['distributionPublic']);
        break; // ✅ Added break to stop execution
      case 3:
        this.router.navigate(['DropAppWarehousePerformancePublic']);
        break; // ✅ Added break to stop execution
      case 4:
        this.router.navigate(['IndentPendingWHdashPublic']);
        break; // ✅ Added break to stop execution
      case 5:
        this.router.navigate(['stockDetailsPublic']);
        break; // ✅ Added break to stop execution
  
      default:
        this.router.navigate(['public-view']);
    }
  }
  
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
  chartStockoutdhs:ChartOptions;
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
  MasIndentitemslist:any
  itemid:any
  MasItemlist:any
  PartiIndentlist:any
  PartPOsSince1920list:any
  PartItemissuelist:any
  PartItemRClist:any
  dataSource = new MatTableDataSource<any>();
  dataSource2 = new MatTableDataSource<any>();
  dataSource3 = new MatTableDataSource<any>();
  dataSource4 = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator2!: MatPaginator;
    @ViewChild(MatSort) sort2!: MatSort;
    @ViewChild(MatPaginator) paginator3!: MatPaginator;
    @ViewChild(MatSort) sort3!: MatSort;
    @ViewChild(MatPaginator) paginator4!: MatPaginator;
    @ViewChild(MatSort) sort4!: MatSort;

    selectedCategory:any='';
    selectedCategoryRadio:any='Drugs';
    mcid=1
  
  

     updateSelectedHodid(): void {
      
  this.spinner.show(); // Show the spinner before making API calls

  if (this.selectedCategoryRadio === 'Drugs') {
    this.mcid = 1;
  } else if (this.selectedCategoryRadio === 'Consumables') {
    this.mcid = 2;
  } else if (this.selectedCategoryRadio === 'Reagent') {
    this.mcid = 3;
  } else if (this.selectedCategoryRadio === 'AYUSH') {
    this.mcid = 4;
  }

  // Create an array of API calls to execute
  forkJoin([
    this.GetPOCountCFY(),
    this.last7DaysIssue(),
    this.loadData1(),
    this.loadData2(),
    this.loadIndent(),
    this.loadData4(),
    this.Nearexp(),
    this.loadData3(), // Drug rate contract
    this.loadUQC(),
    this.loadStockoutDHS(),
    this.CGMSCIndentPending(),
    this.getItemNoDropDown(),
    this.GetDeliveryInMonth(),
  ]).subscribe(
    () => {
      // Add a slight delay to ensure the spinner is visible
      setTimeout(() => {
        this.spinner.hide();
      }, 2000); // Adjust delay as needed (1000ms = 1 second)
    },
    (error) => {
      console.error("Error loading data:", error);
      this.spinner.hide(); // Hide the spinner even if an error occurs
    }
  );
}


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
    
   

    this.router.events.subscribe(() => {
      
      this.currentRoute = this.router.url;
    });


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

  
    this.chartStockoutdhs = {
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
        'No of Items',
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
    
      this.chartOptions3 = {
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
          'EDL',
          'NEDL',
          'Total'
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
          'UQC Stock Value(in Cr)',
          'No of Items',
          'No of Batches'
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
    
      this.chartOptions4 = {
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
          'EDL',
          'NEDL',
          'Total'
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
        height: 150
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
        height: 150
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
        height: 150
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
    this.loadData3();
    this.loadStockoutDHS();
    this.loadIndent();
    this.Nearexp();
    this.loadUQC();
    this.loadData4();
    this.getItemNoDropDown();
  


  }


  getItemNoDropDown(){
  
    this.api.MasIndentitems(this.mcid,0,0,0).subscribe((res:any[])=>{
      // console.log(' Vehicle API dropdown Response:', res);
      if (res && res.length > 0) {
        this.MasIndentitemslist = res.map(item => ({
          itemid: item.itemid, // Adjust key names if needed
          nameText : item.nameText,
          
          
        }));
        // console.log('VehicleNoDropDownList :', this.VehicleNoDropDownList);
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
  GetDeliveryInMonth(){
    this.api.getDeliveryInMonth(0,0,0,0,this.mcid).subscribe((res:any)=>{
      // this.dropindentid=res[0].dropindentid
      this.nosindent=res[0].nosindent
      this.indentIssued=res[0].indentIssued
      this.nooffacIndented=res[0].nooffacIndented
      // this.dropindentid=res[0].dropindentid
        })
  }
  GetPOCountCFY(){
    this.api.getPOCountCFY(0,this.mcid,0).subscribe((res:any)=>{
  this.totalpoitems=res[0].totalpoitems
  this.totalpovalue=res[0].totalpovalue
  this.totalrecvalue=res[0].totalrecvalue
    })
  }
  last7DaysIssue(){
    this.api.Last7DaysIssue(0,this.mcid,0,0,0).subscribe((res:any)=>{
      // alert(JSON.stringify(res))
  this.nositemsI=res[0].nositems  
  this.totalValuecr=res[0].totalValuecr
  this.nosfacility=res[0].nosfacility
    })
  }
  CGMSCIndentPending(){
    
    this.api.CGMSCIndentPending(this.mcid,0).subscribe((res:any)=>{
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
    

  const selectedUser = this.MasIndentitemslist.find((user: { itemid: string }) => user.itemid === this.itemid); 

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

loadData3(): void {
  

  this.api.getTotalRC(this.mcid).subscribe(
    (data: any) => {
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
          {
            name: 'EDL',
            data: edl
          },
          {
            name: 'Non-EDL',
            data: nedl
          },
          {
            name: 'Total',
            data: total
          }
        ],
        chart: {
          type: "bar",
          height: 300
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
          categories: categories // Dynamically set categories from API response
        },
        yaxis: {
          title: {
            text: "NOS RC"
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
                width: 300
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

loadStockoutDHS(): void {


  this.api.StockoutPer(this.mcid,1,0,2).subscribe(
    (data: any) => {
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

      // Update the bar chart
      this.chartStockoutdhs = 
      {
        series: [
          {
            name: 'Total Drugs',
            data: nositems
          },
          {
            name: 'Stock out',
            data: stockout
          },
          {
            name: 'Stock out %',
            data: stockoutp
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
          categories: edLtpe // Dynamically set categories from API response
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
                width: 300
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


  this.api.IndentcntHome(this.mcid,0).subscribe(
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
            name: 'No of Items',
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
      } as any;
    },
    (error: any) => {
      console.error('Error fetching data', error);
    }
  );
}

loadData4(): void {
  

  this.api.CGMSCStockHome(this.mcid).subscribe(
    (data: any) => {
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

      // Update the bar chart
      this.chartOptions4 = {
        series: [
          {
            name: 'No of Items',
            data: nositems,
            color:'#072ac8'
          },
          {
            name: 'Value (in Cr)',
            data: stkvalue,
            color:'#774e24'
          }
          
        ],
        chart: {
          type: "bar",
          stacked:true,
          height: 300
          
        },
        plotOptions: {
          bar: {
            
            horizontal: false, // Set to true for horizontal bar chart
            columnWidth: "75%",
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
          categories: edLtpe // Dynamically set categories from API response
        },
        yaxis: {
          title: {
            text: ""
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
                width: 300
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

Nearexp(): void {

  this.api.NearExp(this.mcid,5).subscribe(
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

loadUQC(): void {
  

  this.api.QCPendingHomeDash(this.mcid).subscribe(
    (data: any) => {
      
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

      // Update the bar chart
      this.chartUQC = {
        series: [
          {
            name: 'UQC Stock Value(in Cr)',
            data: stkvalue
  
          },
          {
            name: 'No of Items',
            data: nositems
          },
          {
            name: 'No of Batches',
            data: nosbatch
          }
        ],
        chart: {
          type: "bar",
          height: 300
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
         categories: categories // Dynamically set categories from API response
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
      } as any;
    },
    (error: any) => {
      console.error('Error fetching data', error);
    }
  );
}

  loadData1(): void {

        this.api.Last7DaysIssue(7,this.mcid,0,0,1).subscribe(
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
    
    
        this.api.Last7DaysReceipt(7,this.mcid,0,0).subscribe(
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
        this.GetPartiIndent(); 
        this.getPartPOsSince1920();
        
        this.getPartiItemsissue();
        this.getPartiItemsRC();
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

        backbutton(){
          this.router.navigate(['/login'])
        }
    
  }






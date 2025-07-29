import { NgFor, CommonModule, NgStyle } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgApexchartsModule, ChartComponent } from 'ng-apexcharts';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DropdownModule } from 'primeng/dropdown';
import { QCPendingParticularArea, QCResultPendingLabWise, QCPendingMonthwiseRecDetails, HoldItemDetails, QCPendingMonthwiseRec, QCPendingPlace } from 'src/app/Model/DashCards';
import { TobetenderDetails, SchemeReceived, SchemeTenderStatus, CoverStatusDetail, CoverStatusTenderDetail } from 'src/app/Model/Equipment';
import { StatusDetail, StatusItemDetail } from 'src/app/Model/TenderStatus';
import { ChartOptions } from 'src/app/component/card/card.component';
import { ApiService } from 'src/app/service/api.service';
import { BasicAuthenticationService } from 'src/app/service/authentication/basic-authentication.service';
import { HardcodedAuthenticationService } from 'src/app/service/authentication/hardcoded-authentication.service';
import { MenuServiceService } from 'src/app/service/menu-service.service';

@Component({
  selector: 'app-admin-dash',
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
  templateUrl: './admin-dash.component.html',
  styleUrl: './admin-dash.component.css'
})
export class AdminDashComponent {
  
  PDF() {
    const element = document.getElementById('workdetails');
    const printButton = document.getElementById('printButton'); // Make sure your button has this ID
  
    if (element) {
      // Hide the print button before capturing
      if (printButton) printButton.style.display = 'none';
  
      html2canvas(element, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
        });
  
        // Add date and time to top-right
        const now = new Date();
        const dateTime = now.toLocaleString();
        pdf.setFontSize(10);
        pdf.text(dateTime, 270, 10, { align: 'right' });
  
        // Add captured content
        pdf.addImage(imgData, 'PNG', 10, 10, 280, 80);
  
        // Save PDF
        pdf.save('drugtender.pdf');
  
        // Show the button again after capture
        if (printButton) printButton.style.display = 'block';
      });
    } else {
      console.error("Element with ID 'workdetails' not found.");
    }
  }
  

  applyTextFilter3($event: KeyboardEvent) {
    throw new Error('Method not implemented.');
    }
    applyTextFiltertotaltenderList(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource5.filter = filterValue.trim().toLowerCase();
    
      if (this.dataSource5.paginator) {
        this.dataSource5.paginator.firstPage();
      }
    }
    applyTextFiltertobeTenderList(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource9.filter = filterValue.trim().toLowerCase();
    
      if (this.dataSource9.paginator) {
        this.dataSource9.paginator.firstPage();
      }
    }
    
    applyTextFilterPT(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource6.filter = filterValue.trim().toLowerCase();
    
      if (this.dataSource6.paginator) {
        this.dataSource6.paginator.firstPage();
      }
    }
    @ViewChild('itemDetailsModal') itemDetailsModal: any;
    @ViewChild('itemDetailsModal2') itemDetailsModal2: any;
    @ViewChild('UQCDetailsModal') UQCDetailsModal: any;
    @ViewChild('HODDetailsModal') HODDetailsModal: any;
    @ViewChild('NSQDetailsModal') NSQDetailsModal: any;
    
    
    
    @ViewChild('StatusDetailsModal') StatusDetailsModal: any;
    @ViewChild('StatusItemDetailModal') StatusItemDetailModal: any;
    @ViewChild('TotalTenderDetailsModal') TotalTenderDetailsModal: any;
    @ViewChild('BidderslistModal') BidderslistModal: any;
    @ViewChild('ToBeTenderDetailsMOdal') ToBeTenderDetailsMOdal: any;

    @ViewChild('schemeReceiveddModal') schemeReceiveddModal: any;
    @ViewChild('schemeStatusModal') schemeStatusModal: any;
    

    
    
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
      mcid:any=1
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
      ToBeTender:any;
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



      tenderStatusList: any[] = [];
      totaltenderList: any[] = [];
      totalNoTenders: number = 0;
      noOfBidderslist:any[]=[];
      totalRC1: any;
      status:any='';
      statusDetails:CoverStatusDetail[]=[]
      toBeTenderDetails:TobetenderDetails[]=[]

      statusItemDetails:CoverStatusTenderDetail[]=[];
      schemeReceived:SchemeReceived[]=[];
      schemeTenderStatus:SchemeTenderStatus[]=[];
      schemeId:any;
      tender_id:any;
      sumtendervalue:any;
      isVis:any=true;
      csid:any





      
      holdItemDetails:HoldItemDetails[]=[]
      dataSource = new MatTableDataSource<any>();
      dataSource2 = new MatTableDataSource<any>();
      dataSource3 = new MatTableDataSource<any>();
      dataSource4 = new MatTableDataSource<any>();
      dataSource5 = new MatTableDataSource<any>();
      dataSource6 = new MatTableDataSource<any>();
      dataSource7 = new MatTableDataSource<any>();
      dataSource8 = new MatTableDataSource<any>();
      dataSource9 = new MatTableDataSource<any>();
      dataSource10 = new MatTableDataSource<any>();
      dataSource11 = new MatTableDataSource<any>();
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
        @ViewChild('paginator9') paginator9!: MatPaginator;
        @ViewChild('sort9') sort9!: MatSort;
        @ViewChild('paginator10') paginator10!: MatPaginator;
        @ViewChild('sort10') sort10!: MatSort;
        @ViewChild('paginator11') paginator11!: MatPaginator;
        @ViewChild('sort11') sort11!: MatSort;
    
        selectedCategory:any='';
        selectedCategoryRadio:any='Drugs';
      
        qCPendingMonthwiseRec:QCPendingMonthwiseRec[]=[]
        qCPendingPlace:QCPendingPlace[]=[]
    
    
    
    
 
    
    
      
        displayedColumns: string[] = [
          'sno', 'schemeCode', 'schemeName', 'eprocNo', 'startDt', 'actClosingDt',
          'noOfItems', 'tenderValue', 'itemAEDL', 'pricebiddate', 'noof_Bid_A','cov_A_Opdate','dA_DATE',
          'remarksData', 'status', 'tenderremark', 'remarkEntryDate'
        ];
    
    
    colors = [];
    cardColors: string[] = [
            'linear-gradient(to right, #22C1C3, #1EEB59)',



      'linear-gradient(to right, #B5A70B, #EB991E)',
      'linear-gradient(to right, #ff9a44, #f25c59)',
      'linear-gradient(to right, #3657FF, #FF8099)',
      'linear-gradient(to right, #22C1C3, #FDBB2D)'
    ];
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
      constructor(public toastr: ToastrService,private spinner: NgxSpinnerService, private dialog: MatDialog,private api: ApiService,private menuService: MenuServiceService,private authService: HardcodedAuthenticationService,public basicAuthentication: BasicAuthenticationService,public router:Router) {
        
       
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
        this.spinner.show();

         this.username = sessionStorage.getItem('authenticatedUser');
         
         this.role = this.basicAuthentication.getRole().roleName; // Fetch dynamic role from the authentication service
         console.log('SE Role:', this.role);
         this.updateMenu();
        //  this.addIconsToMenu();
        this.selectedCategory=this.menuService.getSelectedCategory();
        // this.CGMSCIndentPending();
        // this.GetDeliveryInMonth();
        // this.GetPOCountCFY();
        // this.last7DaysIssue();
        // this.loadData();
        // this.loadData1();
        // this.loadData2();
        // this.loadQCfinalUpdatePending();
        // this.loadQCPendingAtLab();
        // this.loadIndent();
        // this.Nearexp();
        // this.loadUQC();
        // this.loadDataQCStages();
        // this.getItemNoDropDown();
        // this.getQCResultPendingLabWise();
        // this.QCHold_Dash()
        // this.QCNSQ_Dash()
        // this.loadUQCDashCard()
        // this.QCTimeTakenYear();

        this.getTenderStatus();
        this.getTotalRC1();
        this.getToBeTenderDrugsSection();
              // this.QCPendingMonthwiseRecDetails()
        // this.spinner.hide();


      }
      
      checkIfLiveStatusExists(data: any) {
        const hasLive = data.some((item: any) => item.status === 'Live');
        if (hasLive) {
          // Remove columns if status is "Live"
          this.displayedColumns = this.displayedColumns.filter(col => col !== 'pricebiddate' && col !== 'noof_Bid_A');
        }
    }

      // fetchtotalTenderDetails() {
      //   this.spinner.show();
      //   this.api.getTotalTenderDetails(this.mcid).subscribe(
      //     (res: any[]) => {
      //       this.totaltenderList = res;
       
      //     },
      //     (error) => {
      //       console.error('Failed to load tender status:', error);
      //       this.spinner.hide();
      //     }
      //   );   
      //   }
      getToBeTenderDrugsSection(){
        
        this.api.GetToBeTenderDrugsSection(this.mcid).subscribe(
          (res: any[]) => {
            this.ToBeTender = res;
            console.log("lope"+JSON.stringify(this.ToBeTender));
          },
          (error) => {
            console.error('Failed to load tender status:', error);
          }
        );
      }
    
      getTenderStatus() {
        // this.spinner.show();
        this.api.CoverStatus().subscribe(
          (res: any[]) => {
            this.tenderStatusList = Array.isArray(res) ? res : [res]; // handles object or array
            console.log('sdsdsds'+this.tenderStatusList)
             // Calculate total noTenders
            this.totalNoTenders = res.filter(item => item.cStatus !== 'To Be Tender')
            .reduce((sum, item) => sum + (item.cntTender || 0), 0);


            // this.totalNoTenders = res
            // .filter(item => item.tenderStatus !== 'To Be Tender') // Exclude "To Be Tender"
            // .reduce((sum, item) => sum + (item.nosWorks || 0), 0);

            this.spinner.hide();

          },
          (error) => {
            console.error('Failed to load tender status:', error);
            this.toastr.error('Internal Server Error')
            this.spinner.hide();
          }
        );
      }
      
      getTotalRC1() {
        
        this.api.GetTotalRC1(this.mcid).subscribe(
          (res: any[]) => {
            this.totalRC1 = res;
            console.log("fjkdjflksdjf"+JSON.stringify(this.totalRC1));
            this.spinner.hide();
          },
          (error) => {
            this.toastr.error('data not found')
            console.error('Failed to load tender status:', error);
            this.spinner.hide();

          }
        );
      }

      getItemNoDropDown(){
    
      
        // this.api.QCPendingItems(this.mcid).subscribe((res:any[])=>{
    
        //   console.log(' QCPendingItems API dropdown Response:', res);
        //   if (res && res.length > 0) {
        //     this.qCPendingItems = res.map(item => ({
        //       itemid: item.itemid, 
        //       nameText : item.nameText, 
        //     }));
        //   } else {
        //     console.error('No nameText found or incorrect structure:', res);
        //   }
        // });  
      }
      // GetTotalRC(){
      //   this.api.getTotalRC().subscribe((res:any)=>{
          
      //   })
    
      // }
      GetNearExpRC(){
        // this.api.getNearExpRC(1).subscribe((res:any)=>{
    
        // })
    
      }
    
      // QCHold_Dash(){
      //   this.api.QCHold_NSQDash(this.mcid,'Hold').subscribe((res:any)=>{
      //     this.nositemshold=res[0].nositems
      //     this.stkvaluehold=res[0].stkvalue
      //     this.nosbatchhold=res[0].nosbatch
         
      //   })
      // }
      // QCNSQ_Dash(){
      //   this.api.QCHold_NSQDash(this.mcid,'NSQ').subscribe((res:any)=>{
      //     this.nositemsnsq=res[0].nositems
      //     this.stkvaluensq=res[0].stkvalue
      //     this.nosbatchnsq=res[0].nosbatch
      //   })
      // }
    
      // GetDeliveryInMonth(){
      //   this.api.getDeliveryInMonth(0,0,0,0,this.mcid).subscribe((res:any)=>{
      //     this.nosindent=res[0].nosindent
      //     this.indentIssued=res[0].indentIssued
      //     this.nooffacIndented=res[0].nooffacIndented
      //       })
      // }
      // GetPOCountCFY(){
      //   this.api.getPOCountCFY(0,1,0).subscribe((res:any)=>{
      // this.totalpoitems=res[0].totalpoitems
      // this.totalpovalue=res[0].totalpovalue
      // this.totalrecvalue=res[0].totalrecvalue
      //   })
      // }
      // last7DaysIssue(){
      //   this.api.Last7DaysIssue(0,1,0).subscribe((res:any)=>{
      // this.nositemsI=res[0].nositems  
      // this.totalValuecr=res[0].totalValuecr
      // this.nosfacility=res[0].nosfacility
      //   })
      // }
      QCTimeTakenYear(){
      //   this.api.QCTimeTakenYear(this.mcid,0,0).subscribe((res:any)=>{
      // this.pOnositems=res[0].pOnositems  
      // this.totalsample=res[0].totalsample
      // this.qctimetaken=res[0].qctimetaken
     
      //   })
      }
      CGMSCIndentPending(){
        
      //   this.api.CGMSCIndentPending(this.mcid,0).subscribe((res:any)=>{
      //     console.log('dsds',res);
      //     this.nosIndent=res[0].nosIndent
      // this.nosfac=res[0].nosfac
      // this.nositems=res[0].nositems
      //   })
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
    
    
    loadQCfinalUpdatePending(): void {
      
     
      // this.api.GetQCFinalResultPending(this.mcid).subscribe(
      //   (data: any) => {
      //     const mcategory: string[] = [];
      //     const mcid: number[] = [];
      //     const nositems: number[] = [];
      //     const nosbatch: number[] = [];
      //     const uqcvalue: number[] = [];
      //     const exceddedsincetimeline: string[] = [];
    
      //     console.log('QC Final Update:', data);
    
      //     data.forEach((item: any) => {
      //       mcategory.push(item.mcategory);
      //       mcid.push(item.mcid);
      //       nositems.push(item.nositems);
      //       nosbatch.push(item.nosbatch);
      //       uqcvalue.push(item.uqcvalue);
      //       exceddedsincetimeline.push(item.exceddedsincetimeline);
      //     });
    
          // Update the bar chart
      //     this.chartOptionsQCHOFinalUpdate = {
      //       series: [
      //         {
      //           name: 'Value(in Cr)',
      //           data: uqcvalue
      //         },
      //         {
      //           name: 'No of Batches',
      //           data: nosbatch
      //         },
      //         {
      //           name: 'No of Items',
      //           data: nositems
      //         }
      //       ],
      //       chart: {
      //         type: "bar",
      //         height: "210%",  
    
      //         // width:"200%"
      //       },
      //       plotOptions: {
      //         bar: {
      //           horizontal: false, // Set to true for horizontal bar chart
      //           columnWidth: "50%",
      //           endingShape: "rounded"
      //         }
      //       },
      //       dataLabels: {
      //         enabled: true
      //       },
      //       stroke: {
      //         show: true,
      //         width: 2,
      //         colors: ["transparent"]
      //       },
      //       xaxis: {
      //         categories: exceddedsincetimeline // Dynamically set categories from API response
      //       },
      //       yaxis: {
      //         title: {
      //           text: "Final QC Pending"
      //         }
      //       },
      //       fill: {
      //         opacity: 1
      //       },
      //       tooltip: {
      //         y: {
      //           formatter: function (val: number) {
      //             return val.toString();
      //           }
      //         }
      //       },
      //       legend: {
      //         position: "top"
      //       },
      //       responsive: [
      //         {
      //           breakpoint: 480,
      //           options: {
      //             chart: {
      //               // width: 300
      //             },
      //             legend: {
      //               position: "bottom"
      //             }
      //           }
      //         }
      //       ]
      //     } as any;
      //   },
      //   (error: any) => {
      //     console.error('Error fetching data', error);
      //   }
      // );
    }
    
    //qc pending at lab chart method
    
    loadQCPendingAtLab(): void {
    
      // this.api.QCLabPendingTimeline(this.mcid,'Both',0).subscribe(
      //   (data: any) => {
       
    
      //     const timeline: string[] = [];
      //     const nositems: number[] = [];
      //     const nosbatch: number[] = [];
      //     const uqcValuecr: number[] = [];
    
      //     console.log('QC Pending At Lab:', data);
    
      //     data.forEach((item: any) => {
         
      //       timeline.push(item.timeline);
      //       nositems.push(item.nositems);
      //       nosbatch.push(item.nosbatch);
      //       uqcValuecr.push(item.uqcValuecr);
      //     });
    
      //     this.chartQCPendingAtLab = 
      //     {
      //       series: [
      //         {
      //           name: 'Total Drugs',
      //           data: nositems
      //         },
      //         {
      //           name: 'No of Batch',
      //           data: nosbatch
      //         },
      //         {
      //           name: 'UQC Value',
      //           data: uqcValuecr
      //         }
      //       ],
      //       chart: {
      //         type: "bar",
      //         height: "210%",  
    
            // },
            // plotOptions: {
            //   bar: {
            //     horizontal: false, 
            //     columnWidth: "70%",
            //     endingShape: "rounded",
            //     dataLabels: {
            //       position: "top" 
            //     }
            //   }
            // },
          
            // stroke: {
            //   show: true,
            //   width: 1,
            //   colors: ["transparent"]
            // },
            // xaxis: {
            //   categories: timeline 
            // },
            // yaxis: {
            //   title: {
            //     text: "No of Drugs"
            //   },
            // },
            // dataLabels: {
            //   enabled: true,
            //   style: {
            //     colors: ['#000'] 
            //   }
            // },
            // fill: {
            //   opacity: 1
            // },
            // tooltip: {
            //   y: {
            //     formatter: function (val: number) {
            //       return val.toString();
            //     }
            //   }
            // },
            // legend: {
            //   position: "top"
            // },
            // responsive: [
            //   {
            //     breakpoint: 480,
            //     options: {
            //       chart: {
                    // width: 300
      //             },
      //             legend: {
      //               position: "bottom"
      //             }
      //           }
      //         }
      //       ]
      //     } as any;
      //   },
      //   (error: any) => {
      //     console.error('Error fetching data', error);
      //   }
      // );
    }
    
    loadIndent(): void {
    
    
      // this.api.IndentcntHome(1,0).subscribe(
      //   (data: any) => {
      //     const hod: string[] = [];
      //     const nositems: number[] = [];
      //     const returned: number[] = [];
      //     const actualAI: number[] = [];
    
      //     console.log('Annual Indent data:', data);
    
      //     data.forEach((item: any) => {
      //       hod.push(item.hod);
      //       nositems.push(item.nositems);
      //       returned.push(item.returned);
      //       actualAI.push(item.actualAI);
      //     });
    
      //     this.chartIndent = {
      //       series: [
      //         {
      //           name: 'No of Drugs',
      //           data: nositems
      //         },
      //         {
      //           name: 'Return From CGMSC',
      //           data: returned
      //         },
      //         {
      //           name: 'Actual Annual Indent',
      //           data: actualAI
      //         }
      //       ],
      //       chart: {
      //         type: "bar",
      //         height: 300
      //       },
      //       plotOptions: {
      //         bar: {
      //           horizontal: false,
      //           columnWidth: "70%",
      //           endingShape: "rounded",
      //           dataLabels: {
      //             position: "top" 
      //           }
      //         }
      //       },
          
      //       stroke: {
      //         show: true,
      //         width: 1,
      //         colors: ["transparent"]
      //       },
      //       xaxis: {
      //         categories: hod 
      //       },
      //       yaxis: {
      //         title: {
      //           text: "No of Drugs"
      //         },
      //       },
      //       dataLabels: {
      //         enabled: true,
      //         style: {
      //           colors: ['#000'] 
      //         }
      //       },
      //       fill: {
      //         opacity: 1
      //       },
      //       tooltip: {
      //         y: {
      //           formatter: function (val: number) {
      //             return val.toString();
      //           }
      //         }
      //       },
      //       legend: {
      //         position: "top"
      //       },
      //       responsive: [
      //         {
              
      //           options: {
      //             chart: {
                  
      //             },
      //             legend: {
      //               position: "bottom"
      //             }
      //           }
      //         }
      //       ]
      //     } as any;
      //   },
      //   (error: any) => {
      //     console.error('Error fetching data', error);
      //   }
      // );
    }
    
    
    
    // loadDataQCStages(): void {
    //   this.api.QCPendingPlace(this.mcid).subscribe(
    //     (data: any) => {
    
    //       this.qCPendingPlace=data;
    //       const seriesData: number[] = [];
    //       const labelsData: string[] = [
    //         "Pending in WH",
    //         "Pending in Courier fom WH",
    //         "Pending in HO for Lab Issue",
    //         "Pending in Courier for Lab",
    //         "Pending in Lab",
    //         "Pending in HO for Final Clearance"
    //       ];
    
    //       let aggregatedData = {
    //         qdIssuePendingbyWH: 0,
    //         whIssueButPendingInCourier: 0,
    //         hoqC_LabIssuePending: 0,
    //         dropPendingToLab: 0,
    //         labAnalysisOngoing: 0,
    //         pendingforfinalUpdate: 0
    //       };
    
    //       console.log('Delivered from warehouse Response:', data);
    
    //       data.forEach((item: any) => {
    //         aggregatedData.qdIssuePendingbyWH += item.qdIssuePendingbyWH;
    //         aggregatedData.whIssueButPendingInCourier += item.whIssueButPendingInCourier;
    //         aggregatedData.hoqC_LabIssuePending += item.hoqC_LabIssuePending;
    //         aggregatedData.dropPendingToLab += item.dropPendingToLab;
    //         aggregatedData.labAnalysisOngoing += item.labAnalysisOngoing;
    //         aggregatedData.pendingforfinalUpdate += item.pendingforfinalUpdate;
    //       });
    
    //       seriesData.push(
    //         aggregatedData.qdIssuePendingbyWH,
    //         aggregatedData.whIssueButPendingInCourier,
    //         aggregatedData.hoqC_LabIssuePending,
    //         aggregatedData.dropPendingToLab,
    //         aggregatedData.labAnalysisOngoing,
    //         aggregatedData.pendingforfinalUpdate
    //       );
    
          
    //       this.chartOptionsQCStages = {
    //         series: seriesData,
    //         chart: {
    //           type: "pie",
    //           height: "210%",  
    //           // width: "200%", 
    
    //           events: {
    //             dataPointSelection: (
    //               event: any,
    //               chartContext: ApexCharts,
    //               { dataPointIndex }: { dataPointIndex: number }
    //             ) => {
    //               console.log("Chart Clicked!");
              
    //               // Get the selected category based on index
    //               const selectedCategory = this.chartOptionsQCStages?.labels?.[dataPointIndex] ?? "Unknown";
    //               const selectedValue = this.chartOptionsQCStages?.series?.[dataPointIndex] ?? 0;
    //               console.log("Selected Category:", selectedCategory);
    //               console.log("Selected Value:", selectedValue);
              
    //               if (selectedCategory && selectedValue !== undefined) {
    //                 console.log(`You clicked on ${selectedCategory} with value: ${selectedValue}`);
              
    //                 this.fetchDataBasedOnChartSelectionchartQCStages(selectedCategory, selectedValue);
    //               } else {
    //                 console.log("Invalid selection.");
    //               }
    //             },
    //           }
              
    
    
    //         },
    //         fill: {
    //         colors: [  // Assign colors to labels in order
    //           "#f8796b",  // Pending in WH
    //           "#33FF57",  // Pending in Courier from WH #33FF57
    //           "#fc466b",  // Pending in HO for Lab Issue
    //           "#00b4d8",  // Pending in Courier for Lab
    //           "#ffbe0b",  // Pending in Lab
    //           "#38b000"   // Pending in HO for Final Clearance
    //         ],
    //       },
    //         dataLabels: {
    //           enabled: true,
    //           style: {
    //             colors: ['#001219'],
    //             fontWeight: '2px'
    //           },
    //           formatter: function (val: any, opts: any) {
    //             return opts.w.globals.series[opts.seriesIndex]; // Shows actual values inside the chart
    //           },
    //         },
    //         labels: labelsData,
    //         legend: {
    //           position: "right",
    //           horizontalAlign: "center", // Centers legend items
    //           floating: false,
    //           markers: {
    //             width: 12,
    //             height: 12,
    //             radius: 12
    //           },
    //           fontSize: "12px",
    //           itemMargin: {
    //             horizontal: 10, // Adjust horizontal spacing
    //             vertical: 5    // Adjust vertical spacing for column-wise layout
    //           }
              
    //         },
    //         responsive: [
    //           {
    //             breakpoint: 768,
    //             options: {
    //               chart: {
    //                 // width: "100%",
    //                 // height: "100%",
    //               },
    //               legend: {
    //                 position: "bottom",
    //                 horizontalAlign: "center",
    //                 itemMargin: {
    //                   horizontal: 10,
    //                   vertical: 5
    //                 }
    //               }
    //             }
    //           }
    //         ],
    //         tooltip: {
    //           y: {
    //             formatter: function (val: number) {
    //               return val.toFixed(0); // Show actual value
    //             }
    //           }
    //         }
    //       } as any;
          
    //     },
    //     (error: any) => {
    //       console.error('Error fetching data', error);
    //     }
    //   );
    // }
    
    
    
    
    
    Nearexp(): void {
    
      // this.api.NearExp(1,5).subscribe(
      //   (data:any) => {
    
      //     const nositems: number[] = [];
      //     const mname: any[] = [];
      //     const nosbatches: number[] = [];
      //     const stkvaluEcr: number[] = [];
      //     console.log('helo :', data);
    
      //     data.forEach((item:any)=> {
           
      //       nositems.push(item.nositems);
        
      //       mname.push(item.mname);
      //       nosbatches.push(item.nosbatches);
      //       stkvaluEcr.push(item.stkvaluEcr);
            
      //     });
    
    
      //     this.chartNearexp.series = [
    
      
      //       { 
      //         name: 'Near Exp Value (in Cr)',
      //         data: stkvaluEcr ,
      //         color:'#5f0f40'
      //       },
         
    
            
      //     ];
    
      //     this.chartNearexp.xaxis = {
      //       categories: mname,
      //       labels:{
      //         style:{
      //           fontWeight:'bold',
      //           fontSize:'15px'
      //         }
      //       }
            
    
            
      //      };
      //     this.cO = this.chartNearexp;
    
      //   },
      //   (error: any) => {
      //     console.error('Error fetching data', error);
          
      //   }
      // );
    }
    
    loadUQCDashCard(): void {
      
    
      // this.api.QCPendingHomeDash(this.mcid).subscribe(
      //   (res: any) => {
    
          
          
      //     this.mcategoryUQC=res[0].mcategory
      //     this.nositemsUQC=res[0].nositems
      //     this.nosbatchUQC=res[0].nosbatch
      //     this.stkvalueUQC=res[0].stkvalue
    
          
    
        
    
        
      //   },
      //   (error: any) => {
      //     console.error('Error fetching data', error);
      //   }
      // );
    }
    
    loadUQC(): void {
      
    
      // this.api.QCPendingMonthwiseRec(this.mcid).subscribe(
      //   (data: any) => {
    
    
      //     this.qCPendingMonthwiseRec=data;
    
      //     const categories: string[] = [];
      //     const nositems: number[] = [];
      //     const stkvalue: number[] = [];
      //     const nosbatch: number[] = [];
    
      //     console.log('Under QC home Dashboard:', data);
    
      //     data.forEach((item: any) => {
         
      //       categories.push(item.mname);
      //       nositems.push(item.nositems);
      //       nosbatch.push(item.nosbatch);
      //       stkvalue.push(item.stkvalue);
            
      //     });
    
      //     this.chartUQC = {
      //       series: [
              
      //         {
      //           name: 'No of Items',
      //           data: nositems
      //         },
      //         {
      //           name: 'No of Batches',
      //           data: nosbatch
      //         },
      //         {
      //           name: 'UQC Stock Value(in Cr)',
      //           data: stkvalue,
                
      
      //         }
      //       ],
      //       chart: {
      //         type: "bar",
      //         height: "210%",  
    
    
      //         events: {
      //           dataPointSelection: (
      //             event: any,
      //             chartContext: ApexCharts,
      //             { dataPointIndex, seriesIndex }: { dataPointIndex: number; seriesIndex: number }
      //           ) => {
                  
      //             console.log("Chart Clicked!");
      //             console.log("Chart Context:", chartContext);
              
      //             console.log("Categories:", this.chartUQC?.xaxis?.categories);
      //             console.log("Selected Category Index:", dataPointIndex);
      //             const selectedCategory = this.chartUQC?.xaxis?.categories?.[dataPointIndex];
      //             console.log("Selected Category Value:", selectedCategory);
              
      //             const selectedSeries = this.chartUQC?.series?.[seriesIndex]?.name;
      //             console.log("Selected Series:", selectedSeries);
              
      //             if (selectedCategory && selectedSeries) {
      //               const apiData = this.qCPendingMonthwiseRec;
      //               console.log("API Data:", apiData);
              
      //               const selectedData = apiData.find(
      //                 (data) => data.mname === selectedCategory
      //               );
      //               console.log("Selected Data from API:", selectedData);
              
      //               if (selectedData) {
      //                 const id = selectedData.monthid;
      //                 this.mname = selectedData.mname;
      //                 console.log("Month ID:", id, "Month Name:", this.mname);
      //                 this.fetchDataBasedOnChartSelectionchartUQCl(id, selectedSeries);
      //               } else {
      //                 console.log(`No data found for selected category: ${selectedCategory}`);
      //               }
      //             } else {
      //               console.log("Selected category or series is invalid.");
      //             }
      //           },
      //         }
              
              
    
      //       },
      //       plotOptions: {
      //         bar: {
      //           horizontal: false, 
      //           endingShape: "rounded"
      //         }
      //       },
      //       dataLabels: {
      //         enabled: true,
      //         style: {
      //           colors: ['#000'] 
      //         }
      //       },
      //       stroke: {
      //         show: true,
      //         width: 2,
      //         colors: ["transparent"]
      //       },
      //       xaxis: {
      //        categories: categories, 
          
      //       },
      //       yaxis: {
      //         title: {
      //          text: "Under QC Info"
      //         }
      //       },
      //       fill: {
      //         opacity: 1
      //       },
      //       tooltip: {
      //         y: {
      //           formatter: function (val: number) {
      //             return val.toString();
      //           }
      //         }
      //       },
      //       legend: {
      //         position: "top"
      //       },
      //       responsive: [
      //         {
      //           options: {
      //             chart: {
      //             },
      //             legend: {
      //               position: "bottom"
      //             }
      //           }
      //         }
      //       ]
      //     } as any;
      //   },
      //   (error: any) => {
      //     console.error('Error fetching data', error);
      //   }
      // );
    }
    
      loadData1(): void {
    
            // this.api.Last7DaysIssue(7,0,545).subscribe(
            //   (data:any) => {
            //     const nositems: number[] = [];
            //     const indentDT: any[] = [];
            //     const indentdate: any[] = [];
            //     const totalValuecr: number[] = [];
            //     const nosfacility: number[] = [];
            //     console.log('helo :', data);
    
            //     data.forEach((item:any)=> {
                 
            //       nositems.push(item.nositems);
            //       indentDT.push(item.indentDT.slice(0, 2));
            //       indentdate.push(item.indentdate);
            //       totalValuecr.push(item.totalValuecr);
            //       nosfacility.push(item.nosfacility);
                  
            //     });
        
        
            //     this.chartOptions1.series = [
        
            
            //       { 
            //         name: 'totalValuecr',
            //         data: totalValuecr ,
            //         color:'#5f0f40'
            //       },
               
        
                  
            //     ];
     
            //     this.chartOptions1.xaxis = {
            //       categories: indentDT,
            //       labels:{
            //         style:{
            //           fontWeight:'bold',
            //           fontSize:'15px'
            //         }
            //       }
                  
        
                  
            //      };
            //     this.cO = this.chartOptions1;
       
            //   },
            //   (error: any) => {
            //     console.error('Error fetching data', error);
                
            //   }
            // );
          }
      loadData2(): void {
        
        
            // this.api.Last7DaysReceipt(7,0,0,0).subscribe(
            //   (data:any) => {
            //     const nosPO: number[] = [];
            //     const nositems: any[] = [];
            //     const receiptdate: any[] = [];
            //     const receiptDT: number[] = [];
            //     const rvalue: number[] = [];
            //     console.log('API Response:', data);
    
            //     data.forEach((item:any)=> {
                   
            //       nosPO.push(item.nosPO);
            //       nositems.push(item.nositems);
            //       receiptdate.push(item.receiptdate);
            //       receiptDT.push(item.receiptDT.slice(0,2));
            //       rvalue.push(item.rvalue);
                     
                  
            //     });
        
        
            //     this.chartOptions2.series = [
        
                   
                
              
            //       { 
            //         name: 'rvalue',
            //         data: rvalue ,
            //         color:'#004b23'
            //       },
    
        
        
                  
            //     ];
        
            //     this.chartOptions2.xaxis = {
            //       categories: receiptDT,
            //       labels:{
            //         style:{
            //           fontWeight:'bold',
            //           fontSize:'15px'
            //         }
            //       }
                  
        
                  
            //      };
            //     this.cO = this.chartOptions2;
       
            //   },
            //   (error: any) => {
            //     console.error('Error fetching data', error);
                
            //   }
            // );
          }
    
          searchItem() {
            
            // this.spinner.show();
            // const itemid=this.itemid
            // this.getMasitems(); 
            // this.GetPartiIndent(); 
            // this.getPartPOsSince1920();
            // this.QCPendingParticularArea();
            // this.getPartiItemsissue();
            // this.getPartiItemsRC();
            // this.openDialog();
          }
    
          getMasitems(){
      
            // this.api.Masitems(this.itemid,0,0,0,0,0).subscribe((res:any[])=>{
            //   if (res && res.length > 0) {
            //     this.MasItemlist = res.map(item => ({
                
            //       itemcode:item.itemcode,
            //       itemname:item.itemname,
            //       strengtH1:item.strengtH1,
            //       unit:item.unit,
            //       groupname:item.groupname,
            //       itemtypename:item.itemtypename,
            //       edl:item.edl,
            //       edltype:item.edltype
          
            //     }));
            //   } else {
            //     console.error('No nameText found or incorrect structure:', res);
            //   }
            // });  
          }
    
          GetNoOfBidders(schemeid:any){
            this.api.getNoOfBidders(schemeid).subscribe((res:any[])=>{
              if (res && res.length > 0) {
                this.noOfBidderslist =res.map((item: any, index: number) => ({
                
                  ...item,
                  sno: index + 1,
                }));
                console.log('Mapped List:', this.noOfBidderslist);
                this.dataSource.data = this.noOfBidderslist; // Ensure this line executes properly
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.spinner.hide();
              } else {
                console.error('No nameText found or incorrect structure:', res);
              }
            });

            this.openDialog();


          }


          getPartPOsSince1920(){
      
            // this.api.PartPOsSince1920(this.itemid).subscribe((res:any[])=>{
            //   if (res && res.length > 0) {
            //    this.spinner.show();
    
            //     this.PartPOsSince1920list =res.map((item: any, index: number) => ({
                
            //       ...item,
            //       sno: index + 1,
            //     }));
            //     console.log('Mapped List:', this.PartPOsSince1920list);
            //     this.dataSource2.data = this.PartPOsSince1920list; // Ensure this line executes properly
            //     this.dataSource2.paginator = this.paginator2;
            //     this.dataSource2.sort = this.sort2;
            //     this.spinner.hide();
            //   } else {
            //     console.error('No nameText found or incorrect structure:', res);
            //     this.spinner.hide();
    
            //   }
            // });  
          }
    
          getPartiItemsissue(){
            
            // this.api.PartItemIssue(this.itemid).subscribe((res:any[])=>{
            //   if (res && res.length > 0) {
            //    this.spinner.show();
    
            //     this.PartItemissuelist =res.map((item: any, index: number) => ({
                
            //       ...item,
            //       sno: index + 1,
            //     }));
            //     console.log('Mapped List:', this.PartItemissuelist);
            //     this.dataSource3.data = this.PartItemissuelist; // Ensure this line executes properly
            //     this.dataSource3.paginator = this.paginator3;
            //     this.dataSource3.sort = this.sort3;
            //     this.spinner.hide();
            //   } else {
            //     console.error('No nameText found or incorrect structure:', res);
            //     this.spinner.hide();
    
            //   }
            // });  
    
          }
    
    
          
          getPartiItemsRC(){
            
            // this.api.PartItem_RCs(this.itemid).subscribe((res:any[])=>{
            //   if (res && res.length > 0) {
            //    this.spinner.show();
    
            //     this.PartItemRClist =res.map((item: any, index: number) => ({
                
            //       ...item,
            //       sno: index + 1,
            //     }));
            //     console.log('Mapped List:', this.PartItemRClist);
            //     this.dataSource4.data = this.PartItemRClist; 
            //     this.dataSource4.paginator = this.paginator4;
            //     this.dataSource4.sort = this.sort4;
            //     this.spinner.hide();
            //   } else {
            //     console.error('No nameText found or incorrect structure:', res);
            //     this.spinner.hide();
    
            //   }
            // });  
    
          }
          QCPendingParticularArea(){
            
            // this.api.QCPendingParticularArea(this.area,this.itemid).subscribe((res:any[])=>{
            //   if (res && res.length > 0) {
            //    this.spinner.show();
    
            //     this.qCPendingParticularArea =res.map((item: any, index: number) => ({
                
            //       ...item,
            //       sno: index + 1,
            //     }));
            //     this.qCPendingParticularArea2 = res; 
    
    
            //     console.log('only one data'+this.qCPendingParticularArea2)
    
            //     console.log('Mapped List:', this.qCPendingParticularArea);
            //     this.dataSource5.data = this.qCPendingParticularArea; 
            //     this.dataSource5.paginator = this.paginator5;
            //     this.dataSource5.sort = this.sort5;
            //     this.spinner.hide();
            //   } else {
            //     console.error('No nameText found or incorrect structure:', res);
            //     this.spinner.hide();
    
            //   }
            // });  
    
          }

          fetchtotalTenderDetails(){
            
            // totalD
            this.api.getTotalTenderDetails(this.mcid).subscribe((res:any[])=>{
              if (res && res.length > 0) {
               this.spinner.show();
    
                this.totaltenderList =res.map((item: any, index: number) => ({
                
                  ...item,
                  sno: index + 1,
                }));
                // this.totaltenderList = res; 
    
    
                // console.log('only one data'+this.totaltenderList)
    
                console.log('pie chart Mapped List:', this.dataSource5);
                this.dataSource5.data = this.totaltenderList; 
                this.dataSource5.paginator = this.paginator5;
                this.dataSource5.sort = this.sort5;
                this.spinner.hide();
              } else {
                console.error('No nameText found or incorrect structure:', res);
                this.spinner.hide();
    
              }
            });  
    
            this.openDialogfetchtotalTenderDetails();
            
    
          }
          getQCResultPendingLabWise(){
            
            // this.api.QCResultPendingLabWise(this.mcid).subscribe((res:any[])=>{
            //   if (res && res.length > 0) {
            //    this.spinner.show();
    
            //     this.qCResultPendingLabWise =res.map((item: any, index: number) => ({
                
            //       ...item,
            //       sno: index + 1,
            //     }));
            //     console.log('Mapped List:', this.qCResultPendingLabWise);
            //     this.dataSource6.data = this.qCResultPendingLabWise; // Ensure this line executes properly
            //     this.dataSource6.paginator = this.paginator6;
            //     this.dataSource6.sort = this.sort6;
            //     this.spinner.hide();
            //   } else {
            //     console.error('No nameText found or incorrect structure:', res);
            //     this.spinner.hide();
    
            //   }
            // });  
    
          }
          QCPendingMonthwiseRecDetails(tender_id:any){
            
            this.tender_id=tender_id;
            this.spinner.show();
            
            this.api.CoverStatusTenderDetail(this.tender_id).subscribe((res:any[])=>{
              if (res && res.length > 0) {
               this.spinner.show();
    
                this.statusItemDetails =res.map((item: any, index: number) => ({
                
                  ...item,
                  sno: index + 1,
                }));
                console.log('Mapped List:', this.statusItemDetails);
                this.dataSource7.data = this.statusItemDetails; // Ensure this line executes properly
                this.dataSource7.paginator = this.paginator7;
                this.dataSource7.sort = this.sort7;
                this.spinner.hide();
              } else {
                console.error('No data found:', res);
                this.toastr.error('No Data Found')
                this.spinner.hide();
    
              }
            });  
            // this.openDialogUQC();
            this.openSchemeItemsModal()
    
          }


          SchemeReceived(schemeId:any){
            
            this.schemeId=schemeId;
            // this.schemeId=1410;
            this.spinner.show();
            
            this.api.SchemeReceived(this.schemeId).subscribe((res:any[])=>{
              if (res && res.length > 0) {
               this.spinner.show();
    
                this.schemeReceived =res.map((item: any, index: number) => ({
                
                  ...item,
                  sno: index + 1,
                }));
                console.log('Mapped List:', this.schemeReceived);
                this.dataSource10.data = this.schemeReceived; // Ensure this line executes properly
                this.dataSource10.paginator = this.paginator10;
                this.dataSource10.sort = this.sort10;
                this.spinner.hide();
              } else {
                console.error('No data found:', res);
                this.toastr.error('No Data Found')
                this.spinner.hide();
    
              }
            });  
            // this.openDialogUQC();
            // alert(this.schemeReceived.length)
            if(this.schemeReceived.length>0){

              this.openSchemeReceivedModal()
            }
    
          }
          SchemeStatus(schemeId:any){
            
            this.schemeId=schemeId;
            this.spinner.show();
            
            this.api.SchemeTenderStatus(this.schemeId).subscribe((res:any[])=>{
              if (res && res.length > 0) {
               this.spinner.show();
    
                this.schemeTenderStatus =res.map((item: any, index: number) => ({
                
                  ...item,
                  sno: index + 1,
                }));
                console.log('Mapped List:', this.schemeTenderStatus);
                this.dataSource11.data = this.schemeTenderStatus; // Ensure this line executes properly
                this.dataSource11.paginator = this.paginator11;
                this.dataSource11.sort = this.sort11;
                this.spinner.hide();
              } else {
                console.error('No data found:', res);
                this.toastr.error('No Data Found')
                this.spinner.hide();
    
              }
            });  
            // this.openDialogUQC();
            this.openSchemeStatusModal()
    
          }



          getstatusDetails() {
            this.spinner.show();
          
            this.api.CoverStatusDetail(this.csid).subscribe({
              next: (res: any[]) => {
                if (res && res.length > 0) {
                  this.statusDetails = res.map((item: any, index: number) => ({
                    ...item,
                    sno: index + 1,
                  }));
                  console.log('Mapped List:', this.statusDetails);
          
                  this.dataSource8.data = this.statusDetails;
                  this.dataSource8.paginator = this.paginator8;
                  this.dataSource8.sort = this.sort8;
                  this.checkIfLiveStatusExists(this.dataSource8);
                } else {
                  console.error('No data found or incorrect structure:', res);
                  this.spinner.hide();  // Always hide spinner whether success or error
                  this.toastr.error('Failed to load data');

                }
              },
              error: (err) => {
                console.error('API error:', err);
                this.spinner.hide();  // Always hide spinner whether success or error
                this.toastr.error('Failed to load data');

                

              },
              complete: () => {
                this.spinner.hide();  // Always hide spinner whether success or error
              }
            });
          
            this.openDialogHOD();
          }
          getTotalTenderValue(): number {
            
           this.sumtendervalue= this.dataSource8.data
              .map(t => t.tenderValue)
              .reduce((acc, value) => acc + Number(value || 0), 0);
            return this.sumtendervalue;
          }
          
          
          
    
          openDialog() {
            
            const dialogRef = this.dialog.open(this.BidderslistModal, {
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

          openDialogfetchtotalTenderDetails() {
            
            const dialogRef = this.dialog.open(this.TotalTenderDetailsModal, {
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
    


            openSchemeItemsModal(): void {
              const dialogRef = this.dialog.open(this.StatusItemDetailModal, {
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
            openSchemeReceivedModal(): void {
              const dialogRef = this.dialog.open(this.schemeReceiveddModal, {
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


            
            openSchemeStatusModal(): void {
              
              const dialogRef = this.dialog.open(this.schemeStatusModal, {
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
            
            // const dialogRef = this.dialog.open(this.UQCDetailsModal, {
            //  width: '100%',
            //  height: '100%',
            //  maxWidth: '100%',
            //  panelClass: 'full-screen-dialog', 
            //  data: {
             
            //  },
           
            // });
            // dialogRef.afterClosed().subscribe((result) => {
            //  console.log('Dialog closed');
            // });
            }
    
    
    
            openDialogHOD() {
            this.getTotalTenderValue()
            
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

            openDialogtobeTender() {
            
            
              const dialogRef = this.dialog.open(this.ToBeTenderDetailsMOdal, {
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
            
              // const dialogRef = this.dialog.open(this.NSQDetailsModal, {
              //  width: '100%',
              //  height: '100%',
              //  maxWidth: '100%',
              //  panelClass: 'full-screen-dialog', 
              //  data: {
              //  },
            
              // });
              // dialogRef.afterClosed().subscribe((result) => {
              //  console.log('Dialog closed');
              // });
              }
    
            updateSelectedHodid(): void {
        
              // Reset hodid to 0 initially
              // this.mcid = 0;
          
              // Map the selected category to the corresponding mcid value
              this.spinner.show()
              if (this.selectedCategoryRadio==='Drugs') {
                this.mcid = 1;
                // this.loadUQC();
                // this.loadDataQCStages()
                // this.loadQCPendingAtLab()
                // this.loadQCfinalUpdatePending()
                // this.getQCResultPendingLabWise()
                // this.CGMSCIndentPending()
                // this.getItemNoDropDown()
                // this.loadUQCDashCard()
                // this.QCTimeTakenYear()
                // this.QCHold_Dash()
                // this.QCNSQ_Dash()
                this.getTenderStatus();
                this.getTotalRC1()
                this.getToBeTenderDrugsSection();
                // this.getstatusDetails()

    
              // this.spinner.hide()
    
                
                // this.chartOptions.title.text = this.OnChangeTitle +  this.selectedCategory;
              } else if (this.selectedCategoryRadio==='Consumables') {
                this.mcid = 2;
                // this.loadUQC();
                // this.loadDataQCStages()
                // this.loadQCPendingAtLab()
                // this.loadQCfinalUpdatePending()
                // this.getQCResultPendingLabWise()
                // this.CGMSCIndentPending()
                // this.getItemNoDropDown()
                // this.loadUQCDashCard()
                // this.QCTimeTakenYear()
                // this.QCHold_Dash()
                // this.QCNSQ_Dash()
                // this.getstatusDetails()
                this.getToBeTenderDrugsSection();
                this.getTenderStatus();
                this.getTotalRC1()

                this.getToBeTenderDrugsSection();
    
    
              // this.spinner.hide()
    
    
    
    
                // this.chartOptions.title.text = this.OnChangeTitle + this.selectedCategory;
              } else if (this.selectedCategoryRadio==='Reagent') {
                this.mcid = 3;
                // this.loadDataQCStages()
                // this.loadUQC();
                // this.loadQCPendingAtLab()
                // this.loadQCfinalUpdatePending()
                // this.getQCResultPendingLabWise()
                // this.CGMSCIndentPending()
                // this.getItemNoDropDown()
                // this.loadUQCDashCard()
                // this.QCTimeTakenYear()
                // this.QCHold_Dash()
                // this.QCNSQ_Dash()
                this.getToBeTenderDrugsSection();
                this.getTenderStatus();

                this.getTotalRC1()
                // this.getstatusDetails()

               
                this.getToBeTenderDrugsSection();
    
    
              // this.spinner.hide()
    
    
    
                // this.chartOptions.title.text = this.OnChangeTitle +  this.selectedCategory;
              } else if (this.selectedCategoryRadio==='AYUSH') {
                this.mcid = 4;
                // this.loadDataQCStages()
                // this.loadUQC();
                // this.loadQCPendingAtLab()
                // this.loadQCfinalUpdatePending()
                // this.getQCResultPendingLabWise()
                // this.CGMSCIndentPending()
                // this.getItemNoDropDown()
                // this.loadUQCDashCard()
                // this.QCTimeTakenYear()
                // this.QCHold_Dash()
                // this.QCNSQ_Dash()
                this.getToBeTenderDrugsSection();
                this.getTenderStatus();

                this.getTotalRC1()
                // this.getstatusDetails()

                this.getToBeTenderDrugsSection();
                
    
              // this.spinner.hide()
    
    
    
                // this.chartOptions.title.text =this.OnChangeTitle +  this.selectedCategory;
              }
          
              // console.log('Selected Hod ID:', this.mcid);
            }
    
            fetchDataBasedOnChartSelectionchartUQCl(month:any,monthid:any){
              
              this.monthid=month
              // this.QCPendingMonthwiseRecDetails()
    
    // this.openDialogUQC();
            }
    //         fetchDataBasedOnChartSelectionchartQCStages(cat:any,value:any){
    
    //         this.Headerdetails=cat;
    //           if(cat==='Pending in WH'){
    //             this.area='WHIssue'
    
    //           }else if(cat==='Pending in HO for Lab Issue'){
    //             this.area='LabIssue'
                
    //           }else if(cat==='Pending in Courier for Lab'){
    //             this.area='LabCourier'
    
    //           }else if(cat==='Pending in Lab'){
    //             this.area='LabAnalysis'
    //           }else if(cat==='Pending in HO for Final Clearance'){
    //             this.area='FinalUpdate'
    //           }
    //           else if(cat==='Pending in Courier fom WH'){
    //             this.area='WHCourier'
    //           }
    //           this.QCPendingParticularAreaPieChart()
              
            
    
    // // this.openDialogUQC();
    //         }
    
            fetchHOD(status:any,noTenders:any,csid:any){
              
              if (noTenders=== 0) {
                this.toastr.error('No Data Found');
                return; // exit early to avoid further execution
              }
              this.status=status;
              this.csid=csid;
              this.getstatusDetails()
    
    // this.openDialogHOD();
            }

            fetchDetails(){
this.status=': To Be Tender';
              this.gettobetenderDetails()

            }
            gettobetenderDetails(){
              
              this.spinner.show();
          
            this.api.GetToBeTenderDetail(this.mcid).subscribe({
              next: (res: any[]) => {
                if (res && res.length > 0) {
                  this.toBeTenderDetails = res.map((item: any, index: number) => ({
                    ...item,
                    sno: index + 1,
                  }));
                  console.log('Mapped List:', this.toBeTenderDetails);
          
                  this.dataSource9.data = this.toBeTenderDetails;
                  this.dataSource9.paginator = this.paginator9;
                  this.dataSource9.sort = this.sort9;
                  // this.checkIfLiveStatusExists(this.dataSource8);
                } else {
                  console.error('No data found or incorrect structure:', res);
                  this.spinner.hide();  // Always hide spinner whether success or error
                  this.toastr.error('Failed to load data');

                }
              },
              error: (err) => {
                console.error('API error:', err);
                this.spinner.hide();  // Always hide spinner whether success or error
                this.toastr.error('Failed to load data');

                

              },
              complete: () => {
                this.spinner.hide();  // Always hide spinner whether success or error
              }
            });
          
            this.openDialogtobeTender();
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
                { title: 'Item Code', dataKey: 'item_code' },
                { title: 'Item Name', dataKey: 'item_Name' },
                { title: 'Category', dataKey: 'categoryName' },
                { title: 'Quantity', dataKey: 'tender_quantity' },
                { title: 'Estimated Cost', dataKey: 'estimated_cost' },
                { title: 'Tender Value', dataKey: 'tenderValue' }
              ];
            
              const rows = this.statusItemDetails.map((row: any, index: number) => ({
                sno: index + 1,
                item_code: row.item_code || '',
                item_Name: row.item_Name || '',
                categoryName: row.categoryName ?? 'N/A',
                tender_quantity: row.tender_quantity ?? '',
                estimated_cost: row.estimated_cost ?? 'N/A',
                tenderValue: row.tenderValue ?? 'N/A'
              }));
            
              autoTable(doc, {
                columns: columns,
                body: rows,
                startY: 20,
                theme: 'striped',
                headStyles: { fillColor: [22, 160, 133], textColor: 255 },
                styles: { fontSize: 9, cellPadding: 3 },
                margin: { top: 20, left: 10, right: 10 },
              });
            
              doc.save('TenderItemDetails.pdf');
            }
            

            tobetenderDetailsReceivedPdf  () {
              const doc = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a3'
              });
            
              doc.setFont('NotoSansDevanagari');
            
              const now = new Date();
              const dateString = now.toLocaleDateString();
              const timeString = now.toLocaleTimeString();
            
              // Header
              const header = ' Status Details';
              const pageWidth = doc.internal.pageSize.getWidth();
              const titleWidth = doc.getTextWidth(header);
              const xOffset = (pageWidth - titleWidth) / 2;
            
              doc.setFontSize(18);
              doc.text(header, xOffset, 10);
            
              doc.setFontSize(10);
              doc.text(`Date: ${dateString} Time: ${timeString}`, 10, 10);
            
              // Columns updated
              const columns = [
                { title: 'S.No', dataKey: 'sno' },
                { title: 'Scheme ', dataKey: 'schemename' },
                { title: 'Tender ', dataKey: 'tenderstatus' },
                { title: 'Tender ', dataKey: 'tenderremark' },
                { title: 'Entry ', dataKey: 'entrydate' }
              ];
            
              const rows = this.schemeTenderStatus.map((row, index) => ({
                sno: index + 1,
                schemename: row.schemename || '-',
                tenderstatus: row.tenderstatus || '-',
                tenderremark: row.tenderremark || '-',
                entrydate: row.entrydate || '-'
              }));
            
              autoTable(doc, {
                columns: columns,
                body: rows,
                startY: 20,
                styles: {
                  font: 'NotoSansDevanagari',
                  fontSize: 9,
                  overflow: 'linebreak',
                  cellPadding: 2
                },
                theme: 'striped',
                headStyles: { fillColor: [22, 160, 133] }
              });
            
              doc.save('received.pdf');
            
            }
            
    
   exportToPDFtotaltenderList() {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a3' // larger than A4
    });
    doc.setFont('NotoSansDevanagari');
    
    // Get current date and time
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();
  
    // Set font size for the title
    doc.setFontSize(18);
  
    // Calculate the position to center the title
    const header = 'Total Tender Details';
    const title = '';  
    const pageWidth = doc.internal.pageSize.getWidth();
    const titleWidth = doc.getTextWidth(title);
    const xOffset = (pageWidth - titleWidth) / 2;
    const xOffset1 = (pageWidth - titleWidth) / 2;
    
    doc.setFontSize(18);
    doc.text(header, xOffset1-30, 10);
     // Centered title at position Y=20
  doc.setFontSize(15);
     
    doc.text(title, xOffset, 20);
    doc.setFontSize(15); 
    // Centered title at position Y=20

  // Set font size for the date and time
  doc.setFontSize(10);

  // Add the date and time to the top-left corner
  doc.text(`Date: ${dateString} Time: ${timeString}`, 10, 10); // Top-left at position X=10, Y=10

  const columns = [
    { title: 'S.No', dataKey: 'sno' },
    { title: 'Category', dataKey: 'categoryName' },
    { title: 'Scheme', dataKey: 'schemeName' },
    { title: 'Start Date', dataKey: 'startDt' },
    { title: 'End Date', dataKey: 'endDate' },
    { title: 'No. of Items', dataKey: 'noOfItems' },
    { title: 'No. of Bids (A)', dataKey: 'noOf_Bid_A' },
    { title: 'Tender Status', dataKey: 'tenderStatus' },
    { title: 'Remark', dataKey: 'tenderRemark' },
    { title: 'Status Entry Date', dataKey: 'statusEntryDate' },
  ];

  const rows = this.totaltenderList.map((row, index) => ({
    sno: index + 1,
    categoryName: row.categoryName,
    schemeName: row.schemeName,
    startDt: row.startDt,
    endDate: row.endDate,
    noOfItems: row.noOfItems,
    noOf_Bid_A: row.noOf_Bid_A,
    tenderStatus: row.tenderStatus,
    tenderRemark: row.tenderRemark || '-',
    statusEntryDate: row.statusEntryDate || '-',
  }));

  autoTable(doc, {
    columns: columns,
    body: rows,
    startY: 20,
    styles: {
      font: 'NotoSansDevanagari',
      fontSize: 8,
      overflow: 'linebreak',
      cellPadding: 1.5
    },
    theme: 'striped',
    headStyles: { fillColor: [22, 160, 133] },
  });

  doc.save('totaltenderList.pdf');
}

    
exportToPDFHODDetails() {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a3'
  });
  doc.setFont('NotoSansDevanagari');

  const columns = [
    { title: 'S.No', dataKey: 'sno' },
    { title: 'Tender ID', dataKey: 'tender_id' },
    { title: 'GEM Tender', dataKey: 'isGemTender' },
    { title: 'Tender No', dataKey: 'tender_no' },
    { title: 'Description', dataKey: 'tender_description' },
    { title: 'Tender Date', dataKey: 'tender_date' },
    { title: 'End Date', dataKey: 'endDate' },
    { title: 'Cover A', dataKey: 'cover_a' },
    { title: 'Cover B', dataKey: 'cover_b' },
    { title: 'Status', dataKey: 'cStatus' },
    { title: 'No. of Items', dataKey: 'cntItems' },
    { title: 'Tender Value', dataKey: 'tenderValue' },
    { title: 'Tender Status', dataKey: 'tenderstatus' },
    { title: 'Tender Remark', dataKey: 'tenderremark' },
    { title: 'Entry Date', dataKey: 'entrydate' }
  ];

  const rows = this.statusDetails.map((row, index) => ({
    sno: index + 1,
    tender_id: row.tender_id || '',
    isGemTender: row.isGemTender || '',
    tender_no: row.tender_no || '',
    tender_description: row.tender_description || '',
    tender_date: row.tender_date || '',
    endDate: row.endDate || '',
    cover_a: row.cover_a || '',
    cover_b: row.cover_b || '',
    cStatus: row.cStatus || '',
    cntItems: row.cntItems || '',
    tenderValue: row.tenderValue || '',
    tenderstatus: row.tenderstatus || '',
    tenderremark: row.tenderremark || '',
    entrydate: row.entrydate || ''
  }));

  autoTable(doc, {
    columns,
    body: rows,
    startY: 20,
    styles: {
      font: 'NotoSansDevanagari',
      fontSize: 8,
      overflow: 'linebreak',
      cellPadding: 1.5
    },
    columnStyles: {
      sno: { cellWidth: 10 },
      tender_id: { cellWidth: 20 },
      isGemTender: { cellWidth: 20 },
      tender_no: { cellWidth: 30 },
      tender_description: { cellWidth: 40 },
      tender_date: { cellWidth: 25 },
      endDate: { cellWidth: 25 },
      cover_a: { cellWidth: 20 },
      cover_b: { cellWidth: 20 },
      cStatus: { cellWidth: 15 },
      cntItems: { cellWidth: 15 },
      tenderValue: { cellWidth: 20 },
      tenderstatus: { cellWidth: 20 },
      tenderremark: { cellWidth: 35 },
      entrydate: { cellWidth: 25 }
    },
    headStyles: {
      fillColor: [22, 160, 133],
      textColor: 255,
      fontSize: 9
    },
    margin: { top: 20, left: 5, right: 5 },
    tableWidth: 'auto',
    horizontalPageBreak: true,
    didDrawPage: (data) => {
      doc.setFontSize(12);
      doc.text('Tender Status Report', data.settings.margin.left, 10);
    }
  });

  doc.save('TenderStatusReport.pdf');
}



exportToBeTenderDetails() {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a3'
  });

  doc.setFont('NotoSansDevanagari');

  const now = new Date();
  const dateString = now.toLocaleDateString();
  const timeString = now.toLocaleTimeString();

  // Title
  const header = 'Total Tender Item Details';
  const pageWidth = doc.internal.pageSize.getWidth();
  const titleWidth = doc.getTextWidth(header);
  const xOffset = (pageWidth - titleWidth) / 2;

  doc.setFontSize(18);
  doc.text(header, xOffset, 10);

  // Date/Time
  doc.setFontSize(10);
  doc.text(`Date: ${dateString} Time: ${timeString}`, 10, 10);

  // Updated columns
  const columns = [
    { title: 'S.No', dataKey: 'sno' },
    { title: 'Item Name', dataKey: 'itemname' },
    { title: 'Item Code', dataKey: 'itemcode' },
    { title: 'Strength', dataKey: 'strength' },
    { title: 'Unit', dataKey: 'unit' },
    { title: 'EDL', dataKey: 'edl' },
    { title: 'DHS Indent Qty', dataKey: 'dhsIndnetQty' },
    { title: 'DHS AI Value', dataKey: 'dhsaiValue' },
    { title: 'DME Indent Qty', dataKey: 'dmeIndentQty' },
    { title: 'DME AI Value', dataKey: 'dmeaiValue' },
    { title: 'Total Indent Qty', dataKey: 'totalIndentQty' },
    { title: 'Total AI Value', dataKey: 'totalAIValue' },
    { title: 'Scheme Code', dataKey: 'schemecode' },
    { title: 'Scheme Name', dataKey: 'schemename' },
    { title: 'Tender Ref', dataKey: 'tenderref' }
  ];

  const rows = this.toBeTenderDetails.map((row, index) => ({
    sno: index + 1,
    itemname: row.itemname || '-',
    itemcode: row.itemcode || '-',
    strength: row.strength || '-',
    unit: row.unit || '-',
    edl: row.edl || '-',
    dhsIndnetQty: row.dhsIndnetQty ?? '-',
    dhsaiValue: row.dhsaiValue ?? '-',
    dmeIndentQty: row.dmeIndentQty ?? '-',
    dmeaiValue: row.dmeaiValue ?? '-',
    totalIndentQty: row.totalIndentQty ?? '-',
    totalAIValue: row.totalAIValue ?? '-',
    schemecode: row.schemecode || '-',
    schemename: row.schemename || '-',
    tenderref: row.tenderref || '-'
  }));

  autoTable(doc, {
    columns: columns,
    body: rows,
    startY: 20,
    styles: {
      font: 'NotoSansDevanagari',
      fontSize: 8,
      overflow: 'linebreak',
      cellPadding: 1.5
    },
    theme: 'striped',
    headStyles: { fillColor: [22, 160, 133] }
  });

  doc.save('ToBeTender.pdf');
}


    
    exportToPDFPendingTracker() {
      
      const doc = new jsPDF('l', 'mm', 'a4');
    
      const columns = [
        { title: 'S.No', dataKey: 'sno' },
        { title: 'Item Code', dataKey: 'itemcode' },
        { title: 'Item Type Name', dataKey: 'itemtypename' },
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
        head: [columns.map(col => col.title)], // Table headers
        body: rows.map(row => columns.map(col => row[col.dataKey as keyof typeof row] || '')), // Table rows
        startY: 20,
        theme: 'grid',
        headStyles: { fillColor: [22, 160, 133], textColor: 255, fontSize: 12, fontStyle: 'bold' },
        styles: { textColor: [0, 0, 0], fontSize: 9, cellPadding: 3, overflow: 'linebreak' },
        columnStyles: {
          0: { cellWidth: 10 },  // S.No
          1: { cellWidth: 25 },  // Item Code
          2: { cellWidth: 40 },  // Item Type Name (Long Text)
          3: { cellWidth: 15 },  // Strength
          4: { cellWidth: 20 },  // Batch No
          5: { cellWidth: 15 },  // Nos WH
          6: { cellWidth: 15 },  // UQC Qty
          7: { cellWidth: 20 },  // Stock Value
          8: { cellWidth: 30 },  // Warehouse Rec DT
          9: { cellWidth: 30 },  // WH QC Issue DT
          10: { cellWidth: 30 }, // Courier Pick DT
          11: { cellWidth: 30 }, // Sample Receipt In HO DT
          12: { cellWidth: 30 }, // Lab Issue Date
          13: { cellWidth: 30 }, // Lab Receipt DT
          14: { cellWidth: 30 }, // HO QC Report Rec DT
          15: { cellWidth: 20 }, // Lab Result
          16: { cellWidth: 15 }, // Analysis Days
        },
        margin: { top: 20, left: 10, right: 10 },
      });
    
      doc.save('PendingTracker.pdf');
    }

    exportToPDF() {
      const doc = new jsPDF('l', 'mm', 'a4'); // Landscape orientation
    
      const columns = [
        { title: 'S.No', dataKey: 'sno' },
        { title: 'Scheme Code', dataKey: 'schemeCode' },
        { title: 'Scheme Name', dataKey: 'schemeName' },
        { title: 'Supplier ID', dataKey: 'supplierId' },
        { title: 'Supplier Name', dataKey: 'supplierName' },
        { title: 'Contact Person', dataKey: 'contactPerson' },
        { title: 'Address', dataKey: 'address' },
        { title: 'Phone 1', dataKey: 'phone1' },
        { title: 'Phone 2', dataKey: 'phone2' },
        { title: 'Email', dataKey: 'email' },
        { title: 'No. of Items', dataKey: 'noOfItems' },
      ];
    
      // Replace `this.data` with your actual data source
      const rows = this.noOfBidderslist.map((row: any, index: number) => ({
        sno: index + 1,
        schemeCode: row.schemeCode,
        schemeName: row.schemeName,
        supplierId: row.supplierId,
        supplierName: row.supplierName,
        contactPerson: row.contactPerson,
        address: row.address,
        phone1: row.phone1,
        phone2: row.phone2,
        email: row.email,
        noOfItems: row.noOfItems,
      }));
    
      autoTable(doc, {
        head: [columns.map(col => col.title)],
        body: rows.map(row => columns.map(col => row[col.dataKey as keyof typeof row] || '')), // Table rows
        startY: 20,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 10 },
        styles: { fontSize: 8, cellPadding: 2, textColor: [0, 0, 0] },
        columnStyles: {
          0: { cellWidth: 10 },  // S.No
          1: { cellWidth: 20 },  // Scheme Code
          2: { cellWidth: 30 },  // Scheme Name
          3: { cellWidth: 20 },  // Supplier ID
          4: { cellWidth: 30 },  // Supplier Name
          5: { cellWidth: 30 },  // Contact Person
          6: { cellWidth: 35 },  // Address
          7: { cellWidth: 22 },  // Phone 1
          8: { cellWidth: 22 },  // Phone 2
          9: { cellWidth: 35 },  // Email
          10: { cellWidth: 20 }, // ✅ Now this will fit: No. of Items
        },
        margin: { top: 20, left: 10, right: 10 },
      });
      
    
      doc.save('bidderDetails.pdf');
    }
    
    
    
            
        
      }
    
    
    
    
    
    
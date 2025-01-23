import { Component, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexStroke, ApexXAxis, ApexFill, ApexPlotOptions, ChartComponent } from 'ng-apexcharts';
import { ApiService } from 'src/app/service/api.service';
import { BasicAuthenticationService } from 'src/app/service/authentication/basic-authentication.service';
import { HardcodedAuthenticationService } from 'src/app/service/authentication/hardcoded-authentication.service'; // Assuming you have a service for getting the username
import { MenuServiceService } from 'src/app/service/menu-service.service';
import { ChartOptions } from '../card/card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions;
  title: string = 'welcome';
  username: any = '';
  menuItems: {  label: string; route: string; submenu?: { label: string; route: string }[], icon?: string }[] = [];
  expandedMenus: { [key: string]: boolean } = {};
  nosIndent: number = 0; // Default value
  nosfac: number = 0;    // Default value
  nositems: number = 0;
// Define an array of colors for the cards
// colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFC300', '#DAF7A6', '#C70039'];


   // Chart 1 - Daily Sales
   chart1 = {
    series: <ApexAxisChartSeries>[{
      name: "Sales",
      data: [10, 20, 15, 25, 30, 35]
    }],
    chart: <ApexChart>{
      type: 'line',
      height: 150
    },
    stroke: <ApexStroke>{
      curve: 'smooth'
    },
    xaxis: <ApexXAxis>{
      categories: ['M', 'T', 'W', 'T', 'F', 'S']
    },
    colors: ['#4caf50'],
    fill: <ApexFill>{
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: "vertical",
        gradientToColors: ['#4caf50'],
        stops: [0, 100]
      }
    }
  };

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
    'Seasonal Drugs':'assets/dash-icon/pill.png',
    'Health Facilities Coverage':'assets/dash-icon/medical-insurance.png',
    'Warehouse Information':'assets/dash-icon/data-warehouse.png',
    'Stock Abstract':'assets/dash-icon/packages.png',
    "Stock Details":'assets/dash-icon/inventory.png',
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
    'Work Order':'assets/dash-icon/cooperation.png'
  };
  constructor(  private api: ApiService,private menuService: MenuServiceService,private authService: HardcodedAuthenticationService,public basicAuthentication: BasicAuthenticationService) {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        stacked: false,
        height: 150
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      xaxis: {
        categories:{
          // color:'#d90429'
        },
        labels:{
          style:{
            colors:'#390099',
            fontWeight:'bold',
            fontSize:'30px'
          }
        },

        title: {
          text: 'Year',

        },
 
      },
      yaxis:{
        
        title: {
          text: '',
          style:{
            color:'#d90429'
          }
        },
        labels:{
          style:{
          fontWeight:'bold',
          fontSize:'15px',
          // colors:'#0000F'
          },
          // formatter: function (value) {
          //   return value.toFixed(0); // This will show the values without decimals
          // }
        },
        
        
        
        
      },
      dataLabels: {
        enabled: true,
        style: {
          // colors: ['#000814'] 
        }
      },
      stroke: {
        width: 1,
        // colors: ['#fff'],
      },
      title: {
        text:'',
        align: 'center',
        style: {
          fontWeight:'bold',
          fontSize: '16px',
          color:'rgb(50, 50, 164)'
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
        // fontWeight:'bold'
        show: false
      },
    };
  }

  ngOnInit() {
     this.username = sessionStorage.getItem('authenticatedUser');
     
     this.role = this.basicAuthentication.getRole().roleName; // Fetch dynamic role from the authentication service
     console.log('Role:', this.role);
     this.updateMenu();
    //  this.addIconsToMenu();
    debugger
    this.CGMSCIndentPending()
    this.loadData();

  }
  CGMSCIndentPending(){
    debugger
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
    debugger
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
    debugger
    // Toggle the clicked submenu, close all others
    for (const key in this.expandedMenus) {
      if (key !== menuLabel) {
        this.expandedMenus[key] = false;  // Collapse all other menus
      }
    }
    this.expandedMenus[menuLabel] = !this.expandedMenus[menuLabel];  // Toggle current menu
  }


  // loadData() {
  //   debugger
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
    debugger;
    const fromDate = '01-Jan-2025'; // Example date
    const toDate = '30-Jan-2025'; // Example date
        this.api.DeliveryInMonth(fromDate,toDate).subscribe(
          (data:any) => {
            const nooffacIndented: number[] = [];
            const nosindent: number[] = [];
            const indentIssued: number[] = [];
            const dropindentid: number[] = [];
            const dropfac: number[] = [];
            console.log('API Response:', data);
    
    
            data.forEach((item:any)=> {
               
              nooffacIndented.push(item.nooffacIndented);
              nosindent.push(item.nosindent);
              indentIssued.push(item.indentIssued);
              // dropindentid.push(item.dropindentid);
              dropfac.push(item.dropfac);
             
    
          
              
            });
    
    
            this.chartOptions.series = [
    
               
            
           
              { 
              name: 'No. of Facilities Indented', 
              data: nooffacIndented,
               
            },
              { 
                name: 'No. of Indents',
                data: nosindent ,
              },
              { 
                name: 'Indents Issued',
                data: indentIssued ,
              },
              { 
                name: 'Drop Facilities',
                data: dropfac ,
              },

    
    
              
            ];
    
            this.chartOptions.xaxis = {
              categories: '',
              labels:{
                style:{
                  // colors:'#390099',
                  fontWeight:'bold',
                  fontSize:'15px'
                }
              }
              
    
              
             };
            this.cO = this.chartOptions;
   
          },
          (error: any) => {
            console.error('Error fetching data', error);
            
          }
        );
      }
    
  }






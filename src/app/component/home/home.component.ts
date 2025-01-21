import { Component } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexStroke, ApexXAxis, ApexFill } from 'ng-apexcharts';
import { BasicAuthenticationService } from 'src/app/service/authentication/basic-authentication.service';
import { HardcodedAuthenticationService } from 'src/app/service/authentication/hardcoded-authentication.service'; // Assuming you have a service for getting the username
import { MenuServiceService } from 'src/app/service/menu-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title: string = 'welcome';
  username: any = '';
  menuItems: {  label: string; route: string; submenu?: { label: string; route: string }[], icon?: string }[] = [];
  expandedMenus: { [key: string]: boolean } = {};
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
  chart3 = {
    series: <ApexAxisChartSeries>[{
      name: "Tasks",
      data: [800, 600, 400, 200, 300, 100]
    }],
    chart: <ApexChart>{
      type: 'line',
      height: 150
    },
    stroke: <ApexStroke>{
      curve: 'smooth'
    },
    xaxis: <ApexXAxis>{
      categories: ['12p', '3p', '6p', '9p', '12a', '3a']
    },
    colors: ['#f44336'],
    fill: <ApexFill>{
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: "vertical",
        gradientToColors: ['#f44336'],
        stops: [0, 100]
      }
    }
  };


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
  constructor(private menuService: MenuServiceService,private authService: HardcodedAuthenticationService,public basicAuthentication: BasicAuthenticationService) {}

  ngOnInit() {
     this.username = sessionStorage.getItem('authenticatedUser');
     
     this.role = this.basicAuthentication.getRole().roleName; // Fetch dynamic role from the authentication service
     console.log('Role:', this.role);
     this.updateMenu();
    //  this.addIconsToMenu();
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






}

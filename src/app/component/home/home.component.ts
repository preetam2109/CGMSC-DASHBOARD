import { Component } from '@angular/core';
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
  menuItems: { label: string; route: string; submenu?: { label: string; route: string }[] }[] = [];
  expandedMenus: { [key: string]: boolean } = {};
// Define an array of colors for the cards
colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFC300', '#DAF7A6', '#C70039'];
  role:any=localStorage.getItem('roleName')

  constructor(private menuService: MenuServiceService,private authService: HardcodedAuthenticationService,public basicAuthentication: BasicAuthenticationService) {}

  ngOnInit() {
     this.username = sessionStorage.getItem('authenticatedUser');
     
     this.role = this.basicAuthentication.getRole().roleName; // Fetch dynamic role from the authentication service
     console.log('Role:', this.role);
     this.updateMenu();
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

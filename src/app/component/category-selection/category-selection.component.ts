import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from 'src/app/service/authentication/basic-authentication.service';
import { HardcodedAuthenticationService } from 'src/app/service/authentication/hardcoded-authentication.service';
import { MenuServiceService } from 'src/app/service/menu-service.service';
import { ApiService } from 'src/app/service/api.service';
// Define the Category type
type Category = 'DrugsConsumables' | 'EquipmentReagent' | 'Infrastructure' | 'Admin';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selection.component.html',
  styleUrls: ['./category-selection.component.css']
})
export class CategorySelectionComponent implements OnInit {
  // Available categories as cards with the Category type
  categories: Category[] = ['DrugsConsumables', 'EquipmentReagent', 'Infrastructure','Admin']; 
  selectedCategory: Category | '' = ''; // To store the selected category
  menuItems: { label: string; route: string }[] = [];
  role: any = ''; // Dynamic role
  isCardSelected: boolean = false;
  locationName=sessionStorage.getItem('firstname')
  userId=sessionStorage.getItem('authenticatedUser')
  userName='';
  userMobile=''
  

  constructor(
    public loginService:BasicAuthenticationService,
    private menuService: MenuServiceService,
    private authService: HardcodedAuthenticationService,
    private router: Router,   private api: ApiService,
  ) {}

  ngOnInit(): void {
   

    this.role = this.loginService.getRole().roleName;
    // Retrieve the selected category from localStorage on page refresh
    const storedCategory = this.menuService.getSelectedCategory(); // No need to directly access localStorage here
    if (storedCategory) {
      this.selectedCategory = storedCategory;
      this.updateMenu(); // Update the menu based on the stored category
    }
  }
  shouldDisplayCategory(category: string): boolean {
    if (this.role === 'HR') {
      return category === 'Admin';
    }
  
    if (this.role === 'CME' || this.role === 'DME1') {
      return category !== 'Admin';
    }
  
    return true;
  }
  
  
 
  

  // Card click handler
  selectCategory(category: Category) {
    
    this.selectedCategory = category; // Set the selected category
    localStorage.setItem('selectedCategory', category);
    this.menuService.setSelectedCategory(category); // Store the category in MenuService
    this.updateMenu(); // Update the menu items based on the selected category
    
    if(this.role==="DHS"){
      this.router.navigate(['/dhsdash']); // Redirect after selection

    }else if(this.role==="CME"){
      this.router.navigate(['/cmedash']); // Redirect after selection

    }else if(this.selectedCategory==='EquipmentReagent'){
      this.router.navigate(['/eqp-dash']); // Redirect after selection

    }else if(this.selectedCategory==='Admin'){  
      this.router.navigate(['/admin-dash']); // Redirect after selection

    }
    else
    {
      
      this.router.navigate(['/welcome']); // Redirect after selection
    }

  }

  // Update menu based on selected category
  private updateMenu() {
    this.menuItems = this.menuService.getMenuItems(this.role); // Get the menu items based on the selected category and role
  }

  // Method to return the correct image path based on category
  getImageForCategory(category: Category): string {
    switch (category) {
      case 'DrugsConsumables':
        return 'assets/images/doctor-s-hand-holding-pills.jpg';
      case 'EquipmentReagent':
        return 'assets/images/equipment-reagents.jpg';
      case 'Infrastructure':
        return 'assets/images/infrastructure.jpg';
      case 'Admin':
        return 'assets/images/admin.jpg';
      default:
        return 'assets/images/default-image.jpg';
    }
  }

  
}

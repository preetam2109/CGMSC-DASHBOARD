import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from 'src/app/service/authentication/basic-authentication.service';
import { HardcodedAuthenticationService } from 'src/app/service/authentication/hardcoded-authentication.service';
import { MenuServiceService } from 'src/app/service/menu-service.service';
import { InsertUserLoginLogmodal } from 'src/app/Model/DashLoginDDL';
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
  // InsertUserLoginLogData:InsertUserLoginLogmodal[]=[];
  InsertUserLoginLogData: InsertUserLoginLogmodal = new InsertUserLoginLogmodal();

  constructor(
    public loginService:BasicAuthenticationService,
    private menuService: MenuServiceService,
    private authService: HardcodedAuthenticationService,
    private router: Router,   private api: ApiService,
  ) {}

  ngOnInit(): void {
    // this.InsertUserLoginLog();

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

  // https://dpdmis.in/CGMSCHO_API2/api/LogAudit/InsertUserLoginLog
  // InsertUserLoginLog(){
  //   debugger;
    
  //   try {
  //     // "logId": 0,
  //     // "userId": 123,
  //     // "roleId": 5,
  //     // "roleIdName": "Admin",
  //     // "userName": "johnDoe",
  //     // "ipAddress": "192.168.1.100",
  //     // "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 
  //     // (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36"
     
  //     // this.FeedbackData.mobileNumber = this.FeedbackData.mobileNumber.toString();
  //     const roleIdName = localStorage.getItem('roleName');
  //     const userId =   sessionStorage.getItem('userid');
  //     const roleId =   sessionStorage.getItem('roleId');
  //     const userName =   sessionStorage.getItem('firstname');
  //     const ipAddress =   sessionStorage.getItem('ipAddress');
  //     const userAgent =   sessionStorage.getItem('userAgent');
  //     console.log('userAgent:', userAgent,'ipAddress:',ipAddress,'userName:',userName,'roleId:',roleId,'userId:',userId,'roleIdName:',roleIdName);
  //     // const formData = new FormData();
  //     // formData.append('UserId', '101');
  //     // formData.append('UserName', 'Lomeshwar');
  //     // formData.append('Browser', navigator.userAgent);
  //     // formData.append('IpAddress', '192.168.1.1'); // Example (replace with real)
  //     // this.InsertUserLoginLogData
    
  //     if (this.InsertUserLoginLogData!) {
  //       // const Feedbackdata = this.FeedbackData; 
  
  //       this.api.InsertUserLoginLogPOST(this.InsertUserLoginLogData).subscribe(
  //         (res: any) => {
  //           console.log('res:=', res);
          
  //           // this.submitted = false;
  //         },
  //         (err: any) => {
  //           console.error('Backend Error Message:', err.error);
  //         }
  //       );
  //     } else {
       
  //       console.log('Submission failed');
  //     }
  //   } catch (err: any) {
  //     console.log('error:=', err.message);
  //     // throw err;
  //   }
  // }

  InsertUserLoginLog() {
    try {
      const roleIdName = localStorage.getItem('roleName') || '';
      const userId = Number(sessionStorage.getItem('userid') || 0);
      const roleId = Number(sessionStorage.getItem('roleId') || 0);
      const userName = sessionStorage.getItem('firstname') || '';
      const ipAddress = sessionStorage.getItem('ipAddress') || '';
      const userAgent = navigator.userAgent; // Browser ka direct info
  
    
      // Model me values set karo
      this.InsertUserLoginLogData.logId = 0; // New log
      this.InsertUserLoginLogData.userId = userId;
      this.InsertUserLoginLogData.roleId = roleId;
      this.InsertUserLoginLogData.roleIdName = roleIdName;
      this.InsertUserLoginLogData.userName = userName;
      this.InsertUserLoginLogData.ipAddress = ipAddress;
      this.InsertUserLoginLogData.userAgent = userAgent;
      
  if(localStorage.getItem('Log Saved')|| ''!){

  }
      // API call
      this.api.InsertUserLoginLogPOST(this.InsertUserLoginLogData).subscribe({
        next: (res: any) => {
          console.log('Log Saved:',);
          const LogSaved='Log Saved'
          localStorage.setItem('Log Saved', LogSaved);
        },
        error: (err: any) => {
          console.error('Backend Error:', err.error);
        }
      });
  
    } catch (err: any) {
      console.error('Error:', err.message);
    }
  }
  
}

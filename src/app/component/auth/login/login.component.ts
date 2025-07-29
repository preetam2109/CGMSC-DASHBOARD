import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from 'src/app/service/authentication/hardcoded-authentication.service';
import { ToastrService } from 'ngx-toastr';
import { BasicAuthenticationService } from 'src/app/service/authentication/basic-authentication.service';
import { WarehouseInfo } from 'src/app/Model/WarehouseInfo';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ApiService } from 'src/app/service/api.service';
import { DelvieryDash } from 'src/app/Model/DelvieryDash';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

declare var google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,AfterViewInit  {
onButtonClick(arg0: string) {
throw new Error('Method not implemented.');
}
  @ViewChild('itemDetailsModal') itemDetailsModal: any;

  @ViewChild('captchaInput') captchaInput: ElementRef | undefined;  // Reference to CAPTCHA input
  @ViewChild(GoogleMap)


  googleMap: GoogleMap = new GoogleMap;  // Access Google Map instance
  warehouseid: any;
warehousePwd: any;
cgmsclUserId: any;
cgmsclPwd: any;
adminDropdownList:any=[];
cgmsclDropdownList:any=[];
InfraStructureDropdownList:any=[];
wHDropdownList:any=[];
captcha: string = '';
isPasswordVisible: boolean = false;
// captchaInput:any;
  otp: string = '';
  username:any;
  emailid: any;
  pwd: string = '';

  password:any;
  email:any
  id:any
  siMobile:any
  userid:any
  roleid:any
  rolename:any
  firstname:any
  errorMessage="Invalid Credential";
  invalidLogin=false;
  showFullText = false;
  dialogRef:any
  private approle : any| null = null;
  // hospitalIcon:string ='data:image/png;base64,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';
  // hospitalIcon: string = assets/images/hospital.png;
  hospitalIcon:any = {
    url: 'assets/images/hospital.png',  // Path to your image
    scaledSize: { width: 20, height: 20 },  // Set the width and height as per your requirement
  };
  



  dropInfo: DelvieryDash[] = [];
    parsedWarehouses: { lat: number; lng: number; name: string }[] = [];
    selectedWarehouse: any = null; // Holds the clicked warehouse details
    
    center = { lat: 22.1760124, lng: 82.1228984 }; // Default map center
    zoom = 8; // Default zoom level
    mapOptions: google.maps.MapOptions = {
      scrollwheel: true,
      disableDoubleClickZoom: false,
    };

     @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  
  constructor(public loginService:BasicAuthenticationService,public http:HttpClient,private dialog: MatDialog,
    private api: ApiService,
    private spinner: NgxSpinnerService
    ,private toastr: ToastrService,private router:Router,public  hardcodedAuthenticationService:HardcodedAuthenticationService){

      this.generateCaptcha();
  }


  // theme
  gradients: string[] = [
    'linear-gradient(1deg, rgb(18, 166, 210) 15%, rgb(49, 65, 252) 100%)',
    'linear-gradient(180deg, #FF6000 11%, #FFA559 100%)',
    'linear-gradient(rgb(93, 18, 210) 11%, rgb(184, 49, 252) 100%)'
  ];
  selectedColor:any;

  setTheme(gradient: string) {
    sessionStorage.setItem('selectedColor',gradient);
    document.documentElement.style.setProperty('--theme-gradient', gradient);
    
  }

  generateCaptcha(): void {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    this.captcha = Array.from({ length: 6 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');
  }
  days:any=0
  ngOnInit() {

    this.selectedColor = sessionStorage.getItem('selectedColor');
    if(this.selectedColor != 'linear-gradient(1deg, rgb(18, 166, 210) 15%, rgb(49, 65, 252) 100%)'){
      document.documentElement.style.setProperty('--theme-gradient', this.selectedColor );
    }

    this.adminLoginDropdown();
    this.cgmsclLoginDropdown();
    this.fetchActualDropInfo(this.days);
    this.wHlLoginDropdown();
    this.getDashLoginDDL();
  }
  adminLoginDropdown(){
    this.api.masddlUser('HOD').subscribe((res:any[])=>{
      console.log(' Admin API dropdown Response:', res);
      if (res && res.length > 0) {
        this.adminDropdownList = res.map(item => ({
          emailid: item.emailid, // Adjust key names if needed
          textfield: item.textfield,
          siMobile: item.siMobile,
          userid: item.userid,
          roleid: item.roleid,
          rolename: item.rolename,
          firstname: item.firstname
          
        }));
        // 
        // this.siMobile = this.adminDropdownList[0]?.siMobile || null; // Save siMobile of the first item
        // this.userid = this.adminDropdownList[0]?.userid || null; // Save siMobile of the first item
        // sessionStorage.setItem('firstname', this.adminDropdownList[0]?.firstname);
        // sessionStorage.setItem('roleId', this.adminDropdownList[0]?.roleId);
        // if (this.adminDropdownList[0]?.rolename) {
        //   this.setRole(this.adminDropdownList[0]?.rolename);
        // }

     


        console.log('adminDropdownList :', this.adminDropdownList);
      } else {
        console.error('No emailid found or incorrect structure:', res);
      }
    });  
  }

  onUserChange(event: Event): void {
    
    // const emailid = (event.target as HTMLSelectElement).value; // Get the selected email ID
    const selectedUser = this.adminDropdownList.find((user: { emailid: string }) => user.emailid === this.emailid); // Find the user object in the list
  
    console.log('Selected User:', selectedUser); // Log the selected user object properly
  
    if (selectedUser) {
      this.siMobile = selectedUser.siMobile || null;
      this.userid = selectedUser.userid || null;
      this.roleid = selectedUser.roleid || null;
      this.rolename = selectedUser.rolename || null;
      this.firstname = selectedUser.firstname || null;

      this.setRole(this.rolename);
      sessionStorage.setItem('firstname', this.firstname);
        sessionStorage.setItem('roleId', this.roleid);
        sessionStorage.setItem('authenticatedUser', this.emailid);

  
      // Log individual values to ensure they are being set correctly
      console.log('siMobile:', this.siMobile);
      console.log('userid:', this.userid);
      console.log('roleid:', this.roleid);
      console.log('rolename:', this.rolename);
      console.log('firstname:', this.firstname);
    } else {
      console.error('Selected user not found in the list.');
    }
  }
  onUserChangeCgmscl(event: Event): void {
    
    // const emailid = (event.target as HTMLSelectElement).value; // Get the selected email ID
    const selectedUser = this.cgmsclDropdownList.find((user: { emailid: string }) => user.emailid === this.emailid); // Find the user object in the list
  
    console.log('Selected User:', selectedUser); // Log the selected user object properly
  
    if (selectedUser) {
      this.siMobile = selectedUser.siMobile || null;
      this.userid = selectedUser.userid || null;
 
    } else {
      console.error('Selected user not found in the list.');
    }
  }
 
  onUserChangeWarehouse(event: Event): void {

    
    // const emailid = (event.target as HTMLSelectElement).value; // Get the selected email ID
    const selectedUser = this.wHDropdownList.find((user: { emailid: string }) => user.emailid === this.emailid); // Find the user object in the list
  
    console.log('Selected User:', selectedUser); // Log the selected user object properly
  
    if (selectedUser) {
      this.siMobile = selectedUser.siMobile || null;
      this.userid = selectedUser.userid || null;
 
    } else {
      console.error('Selected user not found in the list.');
    }
  }
  

  setRole( approle: string) {
    
    this.approle = approle;
    localStorage.setItem('roleName', approle);
  }

  setRolePublic(name:any){
    // alert(name)
    // return;



    
    if(name =='Public'){
      // return;
      this.rolename = 'Public'; 
      this.setRole(this.rolename);
      this.firstname = 'Public'
      sessionStorage.setItem('firstname', this.firstname);
      // hiding this beacause not using popup   this.openDialog();

      
      this.router.navigate(['public-view1'])

    }else if(name =='Equipment_Reagent_Public'){
alert('Public View Features of Equipment & Reagent is coming soon!')
    }else{
      // return;
      this.rolename = 'Infrastructure_Public'; 
      this.setRole(this.rolename);
      this.firstname = 'Public View of CGMSCL Infrastructure'
      sessionStorage.setItem('firstname', this.firstname);
      this.router.navigate(['/Infrastructure-Public-View'])
      //  hiding this beacause not using popup  this.openDialog();

    }

    


    

    


  }

  
  cgmsclLoginDropdown(){
    
    this.api.masddlUser(0).subscribe((res:any[])=>{
      console.log('API  CGMSCL dropdown Response:', res);
      if (res && res.length > 0) {
        this.cgmsclDropdownList = res.map(item => ({
          emailid: item.emailid, // Adjust key names if needed
          textfield: item.textfield,
          siMobile: item.siMobile,
          userid: item.userid,
        }));
        console.log('Processed cgmsclDropdownList:', this.cgmsclDropdownList);
      } else {
        console.error('No emailid found or incorrect structure:', res);
      }
    });  
  }
  wHlLoginDropdown(){
    this.api.masddlUser('WH').subscribe((res:any[])=>{
      console.log('API warehouse Response:', res);
      if (res && res.length > 0) {
        this.wHDropdownList = res.map(item => ({
          emailid: item.emailid, // Adjust key names if needed
          textfield: item.textfield, // Adjust key names if needed
          siMobile: item.siMobile,
          userid: item.userid,
          
        }));
        console.log('wHDropdownList wh:', this.cgmsclDropdownList);
      } else {
        console.error('No emailid found or incorrect structure:', res);
      }
    });  
  }
  getDashLoginDDL(){
    this.api.getDashLoginDDL().subscribe((res:any[])=>{
      console.log('API warehouse Response:', res);
      if (res && res.length > 0) {
        this.InfraStructureDropdownList = res.map(item => ({
          desig: item.desig, // Adjust key names if needed
          mobile: item.mobile,
          id:item.id,
          role:item.role
          // Adjust key names if needed
          
        }));
        console.log('InfraStructureDropdownList:',this.InfraStructureDropdownList);
      } else {
        console.error('No emailid found or incorrect structure:', res);
      }
    });  
  }



  ngAfterViewInit(): void {
    // Ensure the map is initialized before accessing it
    if (this.googleMap) {
      this.setChhattisgarhBounds();
    }
  }

  setChhattisgarhBounds() {
    const chhattisgarhBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(17.0, 80.5),  // Southwest corner (latitude, longitude)
      new google.maps.LatLng(24.5, 84.5)   // Northeast corner (latitude, longitude)
    );

    if (this.googleMap?.googleMap) {  // Check if the map is initialized
      const map = this.googleMap.googleMap;  // Access the map object
      map.fitBounds(chhattisgarhBounds);

      // Optional: Set zoom levels
      map.setOptions({
        minZoom: 6,
        maxZoom: 12,
      });
      
      // Restrict map dragging (optional)
      map.setOptions({
        restriction: {
          latLngBounds: chhattisgarhBounds,
          strictBounds: false,
        }
      });
    }
  }

  togglePassword(): void {
    // 
    this.isPasswordVisible = !this.isPasswordVisible; // Toggle visibility
    const passwordField = document.getElementById('pwd') as HTMLInputElement;
    if (passwordField) {
      passwordField.type = this.isPasswordVisible ? 'text' : 'password'; // Toggle input type
    }
  }

  verifyOTP() {
    
    if (this.otp.length === 5) {
      

      
      if(this.userid===2926){

        this.router.navigate(['/home']);
        return;

      }
  
      // Call the API to verify the OTP
      this.api.VerifyOTPLogin(this.otp, this.userid).subscribe(
        (res: any) => {
          console.log("Response", res);
  
          // Show SweetAlert for successful OTP verification
          Swal.fire({
            title: 'Login Successful!',
            text: 'You have successfully logged in.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Navigate to the home page after the SweetAlert is closed
            this.router.navigate(['/home']);
          });
        },
        (error) => {
          // Show SweetAlert for OTP verification error
          Swal.fire({
            title: 'Error',
            text: 'Invalid OTP! Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      // Show SweetAlert for invalid OTP input
      Swal.fire({
        title: 'Invalid OTP!',
        text: 'Please enter a 5-digit OTP.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }
  verifyOTP_SMIT() {
    
    if (this.otp.length === 5) {
      
  
      // Call the API to verify the OTP
      this.api.VerifyOTPLogin(this.otp, 2926).subscribe(
        (res: any) => {
          console.log("Response", res);
  
          // Show SweetAlert for successful OTP verification
          Swal.fire({
            title: 'Login Successful!',
            text: 'You have successfully logged in.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Navigate to the home page after the SweetAlert is closed
          if(this.rolename==='Public'){
            this.dialogRef.close();
            this.router.navigate(['public-view1'])  
            
            

          }else{
            this.dialogRef.close();
      this.router.navigate(['/Infrastructure-Public-View'])


          }
            // this.router.navigate(['/home']);
          });
        },
        (error) => {
          // Show SweetAlert for OTP verification error
          Swal.fire({
            title: 'Error',
            text: 'Invalid OTP! Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      // Show SweetAlert for invalid OTP input
      Swal.fire({
        title: 'Invalid OTP!',
        text: 'Please enter a 5-digit OTP.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }
  verifyOTPOther() {
    
    if (this.otp.length === 5) {
      
  
      // Call the API to verify the OTP
      this.api.VerifyOTPLogin(this.otp, this.userid).subscribe(
        (res: any) => {
          console.log("Response", res);
  
          // Show SweetAlert for successful OTP verification
          Swal.fire({
            title: 'Login Successful!',
            text: 'You have successfully logged in.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Navigate to the home page after the SweetAlert is closed
            // this.router.navigate(['home']);
          });
        },
        (error) => {
          // Show SweetAlert for OTP verification error
          
          Swal.fire({
            title: 'Error',
            text: 'Invalid OTP! Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      // Show SweetAlert for invalid OTP input
      Swal.fire({
        title: 'Invalid OTP!',
        text: 'Please enter a 5-digit OTP.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }
  handleLogin() {

    const captchaValue = this.captchaInput?.nativeElement.value;  // Get value from the input element
    console.log('Captcha Value:', captchaValue);
    
    
    
    // if (captchaValue !== this.captcha) {
    //   alert('Incorrect CAPTCHA. Please try again.');
    //   this.generateCaptcha(); // Refresh CAPTCHA
    //   return;
    // }
    // unhide after fully selly selection
    sessionStorage.removeItem
    localStorage.removeItem
    this.verifyOTP()
    
    //  console.log(this.username);
    //if(this.username==="SEC1" && this.password === '2025#cgmsc') {
  //     this.loginService.executeAuthenticationService(this.emailid, this.pwd).subscribe(
  //       res => {
  //   if (res.message === "Successfully Login"){
  //     //Redirect to Welcome Page
  //     this.invalidLogin = false
  //     // this.toastr.success('Logged in Successfully');
  //     console.log('login details',res)
  //     // this.router.navigate(['home'])
  //     this.router.navigate(['/otp']); // Redirect to category selector after login
  //   } else {
  //     this.invalidLogin = true
  //     this.toastr.error('Login Failed', 'Invalid Credentials');
  //   }
  // },
  // error => {
  //   this.invalidLogin = true;
  //   this.errorMessage = 'Invalid Credentials';
  //   console.error('Login error', error);
  // }

  // );
}
  handleLogin_SMIT() {

    const captchaValue = this.captchaInput?.nativeElement.value;  // Get value from the input element
    console.log('Captcha Value:', captchaValue);
    
    
    
    // if (captchaValue !== this.captcha) {
    //   alert('Incorrect CAPTCHA. Please try again.');
    //   this.generateCaptcha(); // Refresh CAPTCHA
    //   return;
    // }
    // unhide after fully selly selection
    sessionStorage.removeItem
    localStorage.removeItem
    // this.verifyOTP()
    this.verifyOTP_SMIT()
    
    //  console.log(this.username);
    //if(this.username==="SEC1" && this.password === '2025#cgmsc') {
  //     this.loginService.executeAuthenticationService(this.emailid, this.pwd).subscribe(
  //       res => {
  //   if (res.message === "Successfully Login"){
  //     //Redirect to Welcome Page
  //     this.invalidLogin = false
  //     // this.toastr.success('Logged in Successfully');
  //     console.log('login details',res)
  //     // this.router.navigate(['home'])
  //     this.router.navigate(['/otp']); // Redirect to category selector after login
  //   } else {
  //     this.invalidLogin = true
  //     this.toastr.error('Login Failed', 'Invalid Credentials');
  //   }
  // },
  // error => {
  //   this.invalidLogin = true;
  //   this.errorMessage = 'Invalid Credentials';
  //   console.error('Login error', error);
  // }

  // );
}
handleCgmsclLogin() {
  
  // Your logic for handling CGMSCL login
  sessionStorage.removeItem
  localStorage.removeItem
  this.verifyOTPOther()
  //  console.log(this.username);
  //if(this.username==="SEC1" && this.password === '2025#cgmsc') {
    this.loginService.executeAuthenticationService(this.emailid, this.pwd).subscribe(
      res => {
  if (res.message === "Successfully Login"){
    //Redirect to Welcome Page
    this.invalidLogin = false
    this.toastr.success('Logged in Successfully');
    console.log('login details',res)
    // this.router.navigate(['home'])
    this.router.navigate(['/home']);
    // Redirect to category selector after login
  } else {
    this.invalidLogin = true
    this.toastr.error('Login Failed', 'Invalid Credentials');
  }
},
error => {
  this.invalidLogin = true;
  this.errorMessage = 'Invalid Credentials';
  console.error('Login error', error);
}

);
}

handleWarehouseLogin() {
  
  // Your logic for handling CGMSCL login
  sessionStorage.removeItem
  localStorage.removeItem
  this.verifyOTPOther()
  //  console.log(this.username);
  //if(this.username==="SEC1" && this.password === '2025#cgmsc') {
    this.loginService.executeAuthenticationService(this.emailid, this.pwd).subscribe(
      res => {
  if (res.message === "Successfully Login"){
    //Redirect to Welcome Page
    this.invalidLogin = false
    this.toastr.success('Logged in Successfully');
    console.log('login details',res)
    this.router.navigate(['/welcome']); // Redirect to category selector after login
    // this.router.navigate(['home'])
  } else {
    this.invalidLogin = true
    this.toastr.error('Login Failed', 'Invalid Credentials');
  }
},
error => {
  this.invalidLogin = true;
  this.errorMessage = 'Invalid Credentials';
  console.error('Login error', error);
}

);
}
handleInfrastructureLogin() {
  
  // Your logic for handling CGMSCL login
  sessionStorage.removeItem
  localStorage.removeItem
  
    const loginPayload = {
      divisionID: this.id,
      remarks: '',
      pass: this.pwd,
      passcommon: this.pwd,
    };
    const SE = {
      agencyid: this.id,
  agencyname: '',
  pass: this.pwd,
  passcommon: this.pwd,
  emailid: 'SE',
  firstname: 'SE'
    };



    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if(this.id==="1001"){ 
      
      this.http.post('https://cgmsc.gov.in/HIMIS_APIN/api/Login', SE, { headers }).subscribe(
        (res:any) => {
          if (res.message === "Successfully Login"){
                //Redirect to Welcome Page
                
                this.invalidLogin = false
                this.router.navigate(['welcome']); // Redirect to category selector after login
                this.toastr.success('Logged in Successfully');
                console.log('login details',res)
                // this.router.navigate(['home'])
              } else {
                this.invalidLogin = true
  
                this.toastr.error('Login Failed', 'Invalid Credentials');
              }
            },
            error => {
              this.invalidLogin = true;
              this.errorMessage = 'Invalid Credentials';
              this.toastr.error('Login Failed', 'Invalid Credentials');

              console.error('Login error', error);
            }
      );
    }else{

      this.http.post('https://cgmsc.gov.in/HIMIS_APIN/api/FieldLogin/LoginField', loginPayload, { headers }).subscribe(
        (res:any) => {
          if (res.message === "Successfully Login"){
                //Redirect to Welcome Page
                
                this.invalidLogin = false
                this.router.navigate(['/welcome']); // Redirect to category selector after login
                this.toastr.success('Logged in Successfully');
                console.log('login details',res)
                // this.router.navigate(['home'])
              } else {
                this.invalidLogin = true
  
                this.toastr.error('Login Failed', 'Invalid Credentials');
              }
            },
            error => {
              this.invalidLogin = true;
              this.toastr.error('Login Failed', 'Invalid Credentials');
              this.errorMessage = 'Invalid Credentials';
              console.error('Login error', error);
            }
      );
    }
  
  //  console.log(this.username);
  //if(this.username==="SEC1" && this.password === '2025#cgmsc') {
//     this.loginService.executeAuthenticationService(this.warehouseid, this.pwd).subscribe(
//       res => {
//   if (res.message === "Successfully Login"){
//     //Redirect to Welcome Page
//     this.invalidLogin = false
//     this.toastr.success('Logged in Successfully');
//     console.log('login details',res)
//     // this.router.navigate(['home'])
//     this.router.navigate(['/home']); // Redirect to category selector after login
//   } else {
//     this.invalidLogin = true
//     this.toastr.error('Login Failed', 'Invalid Credentials');
//   }
// },
// error => {
//   this.invalidLogin = true;
//   this.errorMessage = 'Invalid Credentials';
//   console.error('Login error', error);
// }

// );
        
}

togglePasswordVisibility() {
  
  this.isPasswordVisible = !this.isPasswordVisible;
}

toggleText() {
  this.showFullText = !this.showFullText; // Toggle the visibility of full text
}

 onMarkerClick(warehouse: any, marker: MapMarker) {
    this.selectedWarehouse = warehouse; // Update the selected warehouse details
    if (this.infoWindow) {
      this.infoWindow.open(marker); // Open the InfoWindow at the clicked marker
    } else {
      console.error('InfoWindow instance not found');
    }
  }



  fetchActualDropInfo(days:any) {
    this.days=days
    // this.spinner.show()
    this.api.DelvieryDash(this.days).subscribe(
      (res) => {
        // this.spinner.hide()
        this.dropInfo = res.map((item: any) => ({
          ...item,
          position: {
            lat: parseFloat(item.latitude),
            lng: parseFloat(item.longitude),
          },
        }));
      },
      (error) => {
    // this.spinner.hide()

        console.error('Error fetching drop info:', error);
        this.toastr.error('Failed to load warehouse data');
      }
    );
  }

  getItemDetails() {
    console.log('Selected warehouse details:', this.selectedWarehouse);
    // You can perform additional logic here if required
  }

   sendOTP(): void {
      
      // Show a loading indicator
      Swal.fire({
        title: 'Sending OTP...',
        text: 'Please wait while we send the OTP to your registered mobile number \n'+this.siMobile,
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    
      // Call API to send OTP
      this.api.getOTPSaved(this.userid).subscribe(
        (res: any) => {
          // Close the loading indicator
          Swal.close();
    
          // Show success alert
          Swal.fire({
            title: 'OTP Sent!',
            text: 'An OTP has been sent to your registered mobile number \n'+this.siMobile,
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            // Navigate to the OTP page after confirmation
            // this.router.navigate(['/otp']); // Replace with your route
          });
        },
        (error: any) => {
          // Handle error and show failure alert
          Swal.fire({
            title: 'Error!',
            text: 'Failed to send OTP. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      );
    }
   sendOTP_PUblicView_For_SMIT(): void {
      
      // Show a loading indicator
      Swal.fire({
        title: 'Sending OTP...',
        text: 'Please wait while we send the OTP to your registered mobile number \n'
        +
        // this.siMobile
        9098533550
        ,
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    
      // Call API to send OTP
      this.api.getOTPSaved(2926).subscribe(
        (res: any) => {
          // Close the loading indicator
          Swal.close();
    
          // Show success alert
          Swal.fire({
            title: 'OTP Sent!',
            text: 'An OTP has been sent to your registered mobile number \n'
            +
        // this.siMobile
        9098533550
        ,
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            // Navigate to the OTP page after confirmation
            // this.router.navigate(['/otp']); // Replace with your route
          });
        },
        (error: any) => {
          // Handle error and show failure alert
          Swal.fire({
            title: 'Error!',
            text: 'Failed to send OTP. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      );
    }
    onUserChangeInfrastructure(event: Event): void {
    
      // const id = (event.target as HTMLSelectElement).value; // Get the selected email ID
      const selectedUser = this.InfraStructureDropdownList.find((user: { id: string }) => user.id === this.id); // Find the user object in the list
    
      console.log('Selected User:', selectedUser); // Log the selected user object properly
    
      if (selectedUser) {
        this.siMobile = selectedUser.mobile || null;
        this.id = selectedUser.id || null;
        this.rolename = selectedUser.role || null;
        this.firstname=selectedUser.desig || null;
        this.setRole(this.rolename);
        sessionStorage.setItem('firstname', this.firstname);
        sessionStorage.setItem('authenticatedUser',this.firstname);
        sessionStorage.setItem('divisionID',this.id)
  
   
      } else {
        console.error('Selected user not found in the list.');
      }
    }



 

    openDialog() {
      this.dialogRef = this.dialog.open(this.itemDetailsModal, {
        // width: '100%',
        // height: '100%',
        // maxWidth: '100%',
        // panelClass: 'full-screen-dialog', // Optional for additional styling
        // data: {
        //   /* pass any data here */
        // },
        width: '50%',
        maxWidth: '100%', // Override default maxWidth
        maxHeight: '100%', // Override default maxHeight
        // panelClass: 'full-screen-dialog' ,// Optional: Custom class for additional styling
        height: 'auto',
      });
      this.dialogRef.afterClosed().subscribe((result:any) => {
        console.log('Dialog closed');
      });
    }

    // oonUserChangeInfrastructure(event: Event): void {
    
    //   // const id = (event.target as HTMLSelectElement).value; // Get the selected email ID
    //   const selectedUser = this.InfraStructureDropdownList.find((user: { id: string }) => user.id === this.id); // Find the user object in the list
    
    //   console.log('Selected User:', selectedUser); // Log the selected user object properly
    
    //   if (selectedUser) {
    //     this.siMobile = selectedUser.mobile || null;
    //     this.id = selectedUser.id || null;
    //     this.rolename = selectedUser.role || null;
    //     this.firstname=selectedUser.desig || null;
    //     this.setRole(this.rolename);
    //     sessionStorage.setItem('firstname', this.firstname);
    //     sessionStorage.setItem('authenticatedUser',this.firstname);
  
  
   
    //   } else {
    //     console.error('Selected user not found in the list.');
    //   }
    // }
  
}
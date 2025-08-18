import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { BasicAuthenticationService } from 'src/app/service/authentication/basic-authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {
  otp: string = '';
  userid:any
  message: string = '';
  constructor(public loginService: BasicAuthenticationService,private router: Router, private api: ApiService) {}
  emailid: any;
  pwd: any;
  phonE1:any

  ngOnInit(): void {
   
  
  }


  

  // Method to verify the OTP entered by the user
  verifyOTP() {
    
    if (this.otp.length === 5) {
      // Retrieve user ID from session storage
      this.userid = sessionStorage.getItem('userid');

  
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
            this.router.navigate(['home']);
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
  

  sendOTP(): void {
    
    // Show a loading indicator
    Swal.fire({
      title: 'Sending OTP...',
      text: 'Please wait while we send the OTP to your registered mobile number \n'+this.phonE1,
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
          text: 'An OTP has been sent to your registered mobile number \n'+this.phonE1,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          // Navigate to the OTP page after confirmation
          this.router.navigate(['/otp']); // Replace with your route
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
  
}
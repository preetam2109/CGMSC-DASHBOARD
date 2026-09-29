import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InsertUserLoginLogmodal } from 'src/app/Model/DashLoginDDL';
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
  constructor(public loginService: BasicAuthenticationService,private router: Router, private api: ApiService,public http:HttpClient) {}
  emailid: any;
  pwd: any;
  phonE1:any
  macAddress:any='00:00:00:00:00:00'; // Placeholder

  ipAddress: string = '';

InsertUserLoginLogData: InsertUserLoginLogmodal = new InsertUserLoginLogmodal();
    
   mac:any 
   ip:any;
  
   

  ngOnInit(): void {

    this.InsertUserLoginLog()
  
  }


  

  // Method to verify the OTP entered by the user
  verifyOTP() {
    
    if (this.otp.length === 5) {
      // Retrieve user ID from session storage
      this.userid = sessionStorage.getItem('userid');

  
      // Call the API to verify the OTP strictly
      this.api.VerifyOTPLogin(this.otp, this.userid).subscribe(
        (res: any) => {
          console.log("Response", res);
          const isSuccess = res && (
            res === '1' || 
            res.toString().toLowerCase().includes('success') || 
            res.toString().toLowerCase().includes('verified') || 
            res.toString() === 'true'
          );

          if (isSuccess) {
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
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Invalid OTP! Please try again.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
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
  
    const currentIp = this.ipAddress || sessionStorage.getItem('ipAddress') || '127.0.0.1';
    // Call API to send OTP
    this.api.getOTPSaved(this.userid, currentIp).subscribe(
    // this.api.sendOTPWithSMS(this.userid, this.ipAddress, this.phonE1).subscribe(
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

  async getIPAddress() {
    const savedIp = sessionStorage.getItem('ipAddress');
    if (savedIp) {
      this.ipAddress = savedIp;
    }
    const services = [
      'https://api.ipify.org?format=json',
      'https://api.db-ip.com/v2/free/self',
      'https://ipapi.co/json/'
    ];
    for (const service of services) {
      try {
        const response = await fetch(service, { cache: 'no-store' });
        if (response.ok) {
          const data = await response.json();
          const ip = data.ip || data.ipAddress;
          if (ip) {
            this.ipAddress = ip;
            sessionStorage.setItem('ipAddress', ip);
            return;
          }
        }
      } catch (err) {
        // try next IP service
      }
    }
    if (!this.ipAddress) {
      this.ipAddress = '127.0.0.1';
      sessionStorage.setItem('ipAddress', '127.0.0.1');
    }
  }
  getBrowserInfo() {
    return {
      appName: navigator.appName,
      appVersion: navigator.appVersion,
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language
    };
  }

  InsertUserLoginLog() {
    try {

      // console.log("save data");
      // return;
      const roleIdName = localStorage.getItem('roleName') || '';
      const userId = Number(sessionStorage.getItem('userid') || 0);
      const roleId = Number(sessionStorage.getItem('roleId') || 0);
      const userName = sessionStorage.getItem('firstname') || '';
      const ipAddress = sessionStorage.getItem('ipAddress') || '';
      const userAgent = navigator.userAgent; 
      this.InsertUserLoginLogData.logId = 0; 
      this.InsertUserLoginLogData.userId = userId;
      this.InsertUserLoginLogData.roleId = roleId;
      this.InsertUserLoginLogData.roleIdName = roleIdName;
      this.InsertUserLoginLogData.userName = userName;
      this.InsertUserLoginLogData.ipAddress = ipAddress;
      this.InsertUserLoginLogData.userAgent = userAgent;
      // console.log('InsertUserLoginLogData=',this.InsertUserLoginLogData);
  // if(localStorage.getItem('Log Saved')|| ''!){

  // }
      // API call
      this.api.InsertUserLoginLogPOST(this.InsertUserLoginLogData).subscribe({
        next: (res: any) => {
          console.log('Log Saved:',res);
          // const LogSaved='Log Saved'
          // localStorage.setItem('Log Saved', LogSaved);
        },
        error: (err: any) => {
          console.error('Backend Error:', JSON.stringify(err.message));
        }
      });
  
    } catch (err: any) {
      console.error('Error:', err.message);
    }
  }
  
}
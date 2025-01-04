import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {
  private approle : any| null = null;

  constructor(private http: HttpClient) { }

  executeAuthenticationService(emailid: string, pwd: string) {
    
    return this.http.post<any>('https://dpdmis.in/CGMSCHO_API2/api/Login', { emailid, pwd }).pipe(
      map(
        data => {
          
          const userInfo = data.userInfo;
          sessionStorage.setItem('authenticatedUser', emailid);
          sessionStorage.setItem('firstname', userInfo.firstname);
          sessionStorage.setItem('facilityid', userInfo.facilityid);
          sessionStorage.setItem('roleId', userInfo.roleid);
          sessionStorage.setItem('districtid', userInfo.districtid);
          // 
          sessionStorage.setItem('userid', userInfo.userid);

          // sessionStorage.setItem('role',data.userInfo.approle);
          // this.authenticate(emailid,pwd)                                
          // Optionally, you can store the token or other user info

        // const userInfo = data.userInfo;
        // const facilityId = userInfo?.facilityid; // Use optional chaining for safety
        // sessionStorage.setItem('facilityId', facilityId 
        // // ? facilityId.toString() : ''
        // );
         // Convert to string for storage
        // sessionStorage.setItem('facilityTypeId', userInfo?.facilitytypeid?.toString() || ''); // Handle potential nulls
        // sessionStorage.setItem('warehouseId', ''); // Set warehouseId to null (empty string)
           // Save role if available
           if (userInfo?.rolename) {
            this.setRole(userInfo.rolename);
          }

          return data;
        }
      )
    );
  }

  // authenticate(emailid: any, pwd: any) {
    
  //   if (emailid === 'SEC1@dpdmis.in' && pwd === 'Admin@cgmsc123') {
  //     sessionStorage.setItem('authenticatedUser', emailid);
  //     sessionStorage.setItem('role', 'MD'); // Assign MD role
  //     return true;
  //   } else if (emailid === 'gmfin@dpdmis.in') {
  //     sessionStorage.setItem('authenticatedUser', emailid);
  //     sessionStorage.setItem('role', 'GM'); // Assign GM role
  //     return true;
  //   }else if(emailid==='gm@dpdmis.in'){
  //     sessionStorage.setItem('authenticatedUser', emailid);
  //     sessionStorage.setItem('role', 'GMT'); // Assign GT role
  //     return true;
  //   }
  //   return false;
  // }
    // Set role information
    setRole( approle: string) {
      this.approle = approle;
      localStorage.setItem('roleName', approle);
    }

     // Retrieve role information
  getRole() {
    return {
      roleName: this.approle ?? localStorage.getItem('roleName')
    };
  }



  isUserLogedIn() {
    let user = sessionStorage.getItem('authenticatedUser');
    return !(user === null);
  }
  getUserRole() {
    return sessionStorage.getItem('role');
  }

  logout() {
    sessionStorage.removeItem('authenticatedUser');
    sessionStorage.removeItem('role');
  }
}
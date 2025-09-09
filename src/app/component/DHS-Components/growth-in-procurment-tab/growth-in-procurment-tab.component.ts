import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { LabTimeTakenComponent } from "../lab-time-taken/lab-time-taken.component";
import { GrowthInProcurmentComponent } from "../growth-in-procurment/growth-in-procurment.component";
import { GrowthInProcurmentTwoComponent } from "../growth-in-procurment-two/growth-in-procurment-two.component";
import { DirectorateAIDetailsComponent } from "../directorate-aidetails/directorate-aidetails.component";
import { Router } from '@angular/router';
import { BasicAuthenticationService } from 'src/app/service/authentication/basic-authentication.service';

import { InsertUserPageViewLogmodal} from 'src/app/Model/DashLoginDDL';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/service/api.service';
@Component({
  selector: 'app-growth-in-procurment-tab',
  standalone: true,
  imports: [CommonModule, MatTabsModule, GrowthInProcurmentComponent, GrowthInProcurmentTwoComponent, DirectorateAIDetailsComponent],

  templateUrl: './growth-in-procurment-tab.component.html',
  styleUrl: './growth-in-procurment-tab.component.css'
})
export class GrowthInProcurmentTabComponent {
  
  selectedTabIndex: number = 0;
  isLoggedIn = this.loginService.isUserLogedIn() 
  InsertUserPageViewLogdata: InsertUserPageViewLogmodal = new InsertUserPageViewLogmodal();
  pageName: string = '';
  fullUrl: string = '';
    constructor(
      private loginService: BasicAuthenticationService,private api:ApiService,
      private router: Router,private location: Location,
    ) {
      this.pageName = this.location.path();
      this.fullUrl = window.location.href;

    }
    ngOnInit():void {
      this.InsertUserPageViewLog();
    }




     InsertUserPageViewLog() {
      try {
        // debugger
        const roleIdName = localStorage.getItem('roleName') || '';
        const userId = Number(sessionStorage.getItem('userid') || 0);
        const roleId = Number(sessionStorage.getItem('roleId') || 0);
        // const userName = sessionStorage.getItem('firstname') || '';
        const ipAddress = sessionStorage.getItem('ipAddress') || '';
        const userAgent = navigator.userAgent; 
        this.InsertUserPageViewLogdata.logId = 0; 
        this.InsertUserPageViewLogdata.userId = userId;
        this.InsertUserPageViewLogdata.roleId = roleId;
        this.InsertUserPageViewLogdata.roleIdName = roleIdName;
        this.InsertUserPageViewLogdata.pageName = this.pageName;
        this.InsertUserPageViewLogdata.pageUrl = this.fullUrl;
        this.InsertUserPageViewLogdata.viewTime = new Date().toISOString();
        this.InsertUserPageViewLogdata.ipAddress = ipAddress;
        this.InsertUserPageViewLogdata.userAgent = userAgent;
        //console.log('InsertUserPageViewLogdata=',this.InsertUserPageViewLogdata);
    // if(localStorage.getItem('Log Saved')|| ''!){
  
    // }
        // API call
        this.api.InsertUserPageViewLogPOST(this.InsertUserPageViewLogdata).subscribe({
          next: (res: any) => {
            console.log('Page View Log Saved:',res);
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
	
	
  selectedTabValue(event: any): void {
    
    this.selectedTabIndex = event.index;
  }
  home(){
    this.router.navigate(['welcome'])

  }
}
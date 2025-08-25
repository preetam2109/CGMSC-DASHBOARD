import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DistributionComponent } from '../../distribution/distribution.component';
import { MonthwiseIssuanceComponent } from "../monthwise-issuance/monthwise-issuance.component";
import { DiswiseIssuanceComponent } from "../diswise-issuance/diswise-issuance.component";
import { Router } from '@angular/router';
import { BasicAuthenticationService } from 'src/app/service/authentication/basic-authentication.service';
import { ConversationHodCgmscComponent } from "../../tender-status/conversation-hod-cgmsc/conversation-hod-cgmsc.component";
import { ConsumptionPatternTabComponent } from "./consumption-pattern-tab/consumption-pattern-tab.component";
import { InsertUserPageViewLogmodal} from 'src/app/Model/DashLoginDDL';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/service/api.service';
@Component({
  selector: 'app-distribution-tab',
  standalone: true,
  imports: [CommonModule, MatTabsModule, DistributionComponent, MonthwiseIssuanceComponent, DiswiseIssuanceComponent, ConversationHodCgmscComponent, ConsumptionPatternTabComponent],
  templateUrl: './distribution-tab.component.html',
  styleUrl: './distribution-tab.component.css'
})
export class DistributionTabComponent {
  selectedTabIndex: number = 0;
  isLoggedIn = this.loginService.isUserLogedIn() 
  InsertUserPageViewLogdata: InsertUserPageViewLogmodal = new InsertUserPageViewLogmodal();
  pageName: string = '';
  fullUrl: string = '';
  constructor(private loginService: BasicAuthenticationService,private router:Router,private location: Location,private api:ApiService){
    this.pageName = this.location.path();
    this.fullUrl = window.location.href;
  }
  ngOnInit():void {
    this.InsertUserPageViewLog();
  }
  selectedTabValue(event: any): void {
    
    this.selectedTabIndex = event.index;
  }
  home(){
    this.router.navigate(['welcome'])

  }

  backbutton(){
    
    if(localStorage.getItem('roleName')==='Public'){

      this.router.navigate(['public-view1'])
    }else{

      this.router.navigate(['welcome'])
    }
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


}
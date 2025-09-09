
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';

import { DistributionComponent } from 'src/app/component/distribution/distribution.component';
import { ConversationHodCgmscComponent } from 'src/app/component/tender-status/conversation-hod-cgmsc/conversation-hod-cgmsc.component';
import { BasicAuthenticationService } from 'src/app/service/authentication/basic-authentication.service';
import { DiswiseIssuanceComponent } from '../../diswise-issuance/diswise-issuance.component';
import { MonthwiseIssuanceComponent } from '../../monthwise-issuance/monthwise-issuance.component';
import { Component } from '@angular/core';
import { ConsumptionPatternMonthwiseTabComponent } from "../consumption-pattern-monthwise-tab/consumption-pattern-monthwise-tab.component";
import { ConsumptionPatternYearwiseTabComponent } from "../consumption-pattern-yearwise-tab/consumption-pattern-yearwise-tab.component";

import { InsertUserPageViewLogmodal} from 'src/app/Model/DashLoginDDL';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/service/api.service';
@Component({
  selector: 'app-consumption-pattern-tab',
  standalone: true,
  imports: [CommonModule, MatTabsModule, DistributionComponent, MonthwiseIssuanceComponent, DiswiseIssuanceComponent, ConversationHodCgmscComponent, ConsumptionPatternTabComponent, ConsumptionPatternMonthwiseTabComponent, ConsumptionPatternYearwiseTabComponent],
  templateUrl: './consumption-pattern-tab.component.html',
  styleUrl: './consumption-pattern-tab.component.css'
})
export class ConsumptionPatternTabComponent {
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
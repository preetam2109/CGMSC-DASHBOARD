import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { ConsumptionPatternTabComponent } from '../DHS-Components/distribution-tab/consumption-pattern-tab/consumption-pattern-tab.component';
import { DiswiseIssuanceComponent } from '../DHS-Components/diswise-issuance/diswise-issuance.component';
import { MonthwiseIssuanceComponent } from '../DHS-Components/monthwise-issuance/monthwise-issuance.component';
import { DistributionComponent } from '../distribution/distribution.component';
import { ConversationHodCgmscComponent } from '../tender-status/conversation-hod-cgmsc/conversation-hod-cgmsc.component';
import { AbcAnalysisComponent } from "../abc-analysis/abc-analysis.component";
import { VedAnalysisComponent } from "../ved-analysis/ved-analysis.component";
import { AnalysisGraphComponent } from "../analysis-graph/analysis-graph/analysis-graph.component";
import { InsertUserPageViewLogmodal} from 'src/app/Model/DashLoginDDL';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/service/api.service';
@Component({
  selector: 'app-analysis-tab',
  standalone: true,
  imports: [CommonModule, MatTabsModule, DistributionComponent, MonthwiseIssuanceComponent, DiswiseIssuanceComponent, ConversationHodCgmscComponent, ConsumptionPatternTabComponent, AbcAnalysisComponent, VedAnalysisComponent, AnalysisGraphComponent],
  templateUrl: './analysis-tab.component.html',
  styleUrl: './analysis-tab.component.css'
})
export class AnalysisTabComponent {
  selectedTabIndex: number = 0;
  InsertUserPageViewLogdata: InsertUserPageViewLogmodal = new InsertUserPageViewLogmodal();

  pageName: string = '';
  fullUrl: string = '';
  constructor(private router:Router,private location: Location,private api:ApiService){
    this.pageName = this.location.path();
    this.fullUrl = window.location.href;
  }
   ngOnInit() {
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
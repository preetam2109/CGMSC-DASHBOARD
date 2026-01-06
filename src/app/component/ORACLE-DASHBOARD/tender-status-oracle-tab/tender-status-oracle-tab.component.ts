import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { InsertUserPageViewLogmodal } from 'src/app/Model/DashLoginDDL';
import { ApiService } from 'src/app/service/api.service';
import { AbcAnalysisComponent } from '../../abc-analysis/abc-analysis.component';
import { AnalysisGraphComponent } from '../../analysis-graph/analysis-graph/analysis-graph.component';
import { VedAnalysisComponent } from '../../ved-analysis/ved-analysis.component';
import { Location } from '@angular/common';
import { PoPlanningMonthwiseOracleComponent } from "../po-planning-monthwise-oracle/po-planning-monthwise-oracle.component";
import { PoPlanningComponent } from "../po-planning/po-planning.component";
import { TenderStatusOracleComponent } from "../../tender-status-oracle/tender-status-oracle.component";
import { ItemTypeWiseTenderStatusComponent } from "../item-type-wise-tender-status/item-type-wise-tender-status.component";
import { DrugTenderStatusComponent } from "../drug-tender-status/drug-tender-status.component";
import { ItemWiseTenderStatusComponent } from "../item-wise-tender-status/item-wise-tender-status.component";
import { TenderDashboardComponent } from "../tender-dashboard/tender-dashboard.component";



@Component({
  selector: 'app-tender-status-oracle-tab',
  standalone: true,
  imports: [CommonModule, MatTabsModule, TenderStatusOracleComponent, ItemTypeWiseTenderStatusComponent, DrugTenderStatusComponent, ItemWiseTenderStatusComponent, TenderDashboardComponent],
  templateUrl: './tender-status-oracle-tab.component.html',
  styleUrl: './tender-status-oracle-tab.component.css'
})
export class TenderStatusOracleTabComponent {
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
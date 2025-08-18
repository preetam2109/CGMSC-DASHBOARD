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

@Component({
  selector: 'app-analysis-tab',
  standalone: true,
  imports: [CommonModule, MatTabsModule, DistributionComponent, MonthwiseIssuanceComponent, DiswiseIssuanceComponent, ConversationHodCgmscComponent, ConsumptionPatternTabComponent, AbcAnalysisComponent, VedAnalysisComponent],
  templateUrl: './analysis-tab.component.html',
  styleUrl: './analysis-tab.component.css'
})
export class AnalysisTabComponent {
  selectedTabIndex: number = 0;

  constructor(private router:Router){

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
}
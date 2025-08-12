
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

  constructor(private loginService: BasicAuthenticationService,private router:Router){

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
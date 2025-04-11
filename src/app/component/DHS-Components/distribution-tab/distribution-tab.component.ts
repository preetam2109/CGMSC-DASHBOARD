import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DistributionComponent } from '../../distribution/distribution.component';
import { MonthwiseIssuanceComponent } from "../monthwise-issuance/monthwise-issuance.component";
import { DiswiseIssuanceComponent } from "../diswise-issuance/diswise-issuance.component";
import { Router } from '@angular/router';
import { BasicAuthenticationService } from 'src/app/service/authentication/basic-authentication.service';
@Component({
  selector: 'app-distribution-tab',
  standalone: true,
  imports: [CommonModule, MatTabsModule, DistributionComponent, MonthwiseIssuanceComponent, DiswiseIssuanceComponent],
  templateUrl: './distribution-tab.component.html',
  styleUrl: './distribution-tab.component.css'
})
export class DistributionTabComponent {
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
    debugger
    if(localStorage.getItem('roleName')==='Public'){

      this.router.navigate(['public-view1'])
    }else{

      this.router.navigate(['welcome'])
    }
  }
}
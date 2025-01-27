import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DiswiseIssuanceComponent } from '../../DHS-Components/diswise-issuance/diswise-issuance.component';
import { MonthwiseIssuanceComponent } from '../../DHS-Components/monthwise-issuance/monthwise-issuance.component';
import { DistributionComponent } from '../../distribution/distribution.component';
import { CgmscSuppliesComponent } from "../cgmsc-supplies/cgmsc-supplies.component";
import { CgmscCurrentYearComponent } from "../cgmsc-current-year/cgmsc-current-year.component";
import { CgMapTestComponent } from "../cg-map-test/cg-map-test.component";
import { CgmscSuppliesDmeComponent } from "../cgmsc-supplies-dme/cgmsc-supplies-dme.component";
import { CgmscSuppliesAyushComponent } from "../cgmsc-supplies-ayush/cgmsc-supplies-ayush.component";
import { CgmscFacilityWiseSuppliesComponent } from "../cgmsc-facility-wise-supplies/cgmsc-facility-wise-supplies.component";
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cgmsc-supplies-dash',
  standalone: true,
   imports: [CommonModule,MatIconModule, MatTabsModule, DistributionComponent, MonthwiseIssuanceComponent, DiswiseIssuanceComponent, CgmscSuppliesComponent, CgmscCurrentYearComponent, CgMapTestComponent, CgmscSuppliesDmeComponent, CgmscSuppliesAyushComponent, CgmscFacilityWiseSuppliesComponent],
 
  templateUrl: './cgmsc-supplies-dash.component.html',
  styleUrl: './cgmsc-supplies-dash.component.css'
})
export class CgmscSuppliesDashComponent {

  constructor(private router: Router,){

  }
  selectedTabIndex: number = 0;
  selectedSubTabIndex: number = 0; 

  selectedTabValue(event: any): void {
    
    this.selectedTabIndex = event.index;
  }
  selectedSubTabValue(event: any): void {
    debugger
    this.selectedSubTabIndex = event.index;
  }




  home(){
    this.router.navigate(['home'])

  }
}



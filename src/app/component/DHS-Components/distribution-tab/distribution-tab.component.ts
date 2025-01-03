import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DistributionComponent } from '../../distribution/distribution.component';
import { MonthwiseIssuanceComponent } from "../monthwise-issuance/monthwise-issuance.component";
import { DiswiseIssuanceComponent } from "../diswise-issuance/diswise-issuance.component";
@Component({
  selector: 'app-distribution-tab',
  standalone: true,
  imports: [CommonModule, MatTabsModule, DistributionComponent, MonthwiseIssuanceComponent, DiswiseIssuanceComponent],
  templateUrl: './distribution-tab.component.html',
  styleUrl: './distribution-tab.component.css'
})
export class DistributionTabComponent {
  selectedTabIndex: number = 0;

  selectedTabValue(event: any): void {
    
    this.selectedTabIndex = event.index;
  }
}
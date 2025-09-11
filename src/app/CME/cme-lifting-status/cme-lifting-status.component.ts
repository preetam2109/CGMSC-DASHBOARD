import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { SlowMovingItemsagainstAnnualIndent2526Component } from "../slow-moving-itemsagainst-annual-indent25-26/slow-moving-itemsagainst-annual-indent25-26.component";

@Component({
  selector: 'app-cme-lifting-status',
  standalone: true,
  imports: [CommonModule, MatTabsModule, SlowMovingItemsagainstAnnualIndent2526Component],
  templateUrl: './cme-lifting-status.component.html',
  styleUrl: './cme-lifting-status.component.css'
})
export class CmeLiftingStatusComponent {
  selectedTabIndex: number = 0;

  constructor(private router:Router){
  
    }
    selectedTabValue(event: any): void {
      
      this.selectedTabIndex = event.index;
    }
   
  }
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { LabTimeTakenComponent } from "../lab-time-taken/lab-time-taken.component";
import { GrowthInProcurmentComponent } from "../growth-in-procurment/growth-in-procurment.component";
import { GrowthInProcurmentTwoComponent } from "../growth-in-procurment-two/growth-in-procurment-two.component";
import { DirectorateAIDetailsComponent } from "../directorate-aidetails/directorate-aidetails.component";
import { Router } from '@angular/router';
@Component({
  selector: 'app-growth-in-procurment-tab',
  standalone: true,
  imports: [CommonModule, MatTabsModule, GrowthInProcurmentComponent, GrowthInProcurmentTwoComponent, DirectorateAIDetailsComponent],

  templateUrl: './growth-in-procurment-tab.component.html',
  styleUrl: './growth-in-procurment-tab.component.css'
})
export class GrowthInProcurmentTabComponent {
  selectedTabIndex: number = 0;

   constructor(private router:Router){
  
    }
  selectedTabValue(event: any): void {
    
    this.selectedTabIndex = event.index;
  }
  home(){
    this.router.navigate(['welcome'])

  }
}
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dhs-lifting-status',
  standalone: true,
  imports: [CommonModule,MatTabsModule],
  templateUrl: './dhs-lifting-status.component.html',
  styleUrl: './dhs-lifting-status.component.css'
})
export class DhsLiftingStatusComponent {
  selectedTabIndex: number = 0;

  constructor(private router:Router){
  
    }
    selectedTabValue(event: any): void {
      
      this.selectedTabIndex = event.index;
    }
   
  }
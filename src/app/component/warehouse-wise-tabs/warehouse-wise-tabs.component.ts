import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { BatchWisePoDetailComponent } from "../batch-wise-po-detail/batch-wise-po-detail.component";
import { ItemWisePoDetailComponent } from "../item-wise-po-detail/item-wise-po-detail.component";

@Component({
  selector: 'app-warehouse-wise-tabs',
  standalone: true,
  imports: [CommonModule, MatTabsModule, BatchWisePoDetailComponent, ItemWisePoDetailComponent],
  templateUrl: './warehouse-wise-tabs.component.html',
  styleUrl: './warehouse-wise-tabs.component.css'
})
export class WarehouseWiseTabsComponent {
  selectedTabIndex: number = 0;

  constructor(private router:Router){
  
    }
    selectedTabValue(event: any): void {
      
      this.selectedTabIndex = event.index;
    }
   
  }
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { DmeFacNocSummaryComponent } from "../dme-fac-noc-summary/dme-fac-noc-summary.component";
import { AdminDashComponent } from "src/app/Admin-HR/admin-dash/admin-dash.component";
import { DmeFacNocComponent } from "../dme-fac-noc/dme-fac-noc.component";

@Component({
  selector: 'app-dme-fac-noc-dash',
  standalone: true,
  imports: [CommonModule, MatTabsModule, DmeFacNocSummaryComponent, AdminDashComponent, DmeFacNocComponent],
  templateUrl: './dme-fac-noc-dash.component.html',
  styleUrl: './dme-fac-noc-dash.component.css'
})
export class DmeFacNocDashComponent {
  selectedTabIndex: number = 0;

  constructor(private router:Router){
  
    }
    selectedTabValue(event: any): void {
      
      this.selectedTabIndex = event.index;
    }

}

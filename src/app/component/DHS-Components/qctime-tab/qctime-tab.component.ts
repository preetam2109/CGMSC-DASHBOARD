import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { QCTimeTakenYearwiseComponent } from "../qctime-taken-yearwise/qctime-taken-yearwise.component";
import { CommonModule } from '@angular/common';
import { LabTimeTakenComponent } from "../lab-time-taken/lab-time-taken.component";

@Component({
  selector: 'app-qctime-tab',
  standalone: true,
  imports: [CommonModule, MatTabsModule, QCTimeTakenYearwiseComponent, LabTimeTakenComponent],

  templateUrl: './qctime-tab.component.html',
  styleUrl: './qctime-tab.component.css'
})
export class QCTimeTabComponent {
  selectedTabIndex: number = 0;

  selectedTabValue(event: any): void {
    
    this.selectedTabIndex = event.index;
  }
}
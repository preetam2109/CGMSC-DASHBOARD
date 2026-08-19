import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleDeliveredLabReceiptPending } from '../sample-delivered-lab-receipt-pending/sample-delivered-lab-receipt-pending';

@Component({
  selector: 'app-qc-lab-monitoring',
  standalone: true,
  imports: [
    CommonModule,
    SampleDeliveredLabReceiptPending,
  ],
  templateUrl: './qc-lab-monitoring.html',
  styleUrl: './qc-lab-monitoring.css',
})
export class QcLabMonitoring {
  activeTab: string = 'tab1';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}

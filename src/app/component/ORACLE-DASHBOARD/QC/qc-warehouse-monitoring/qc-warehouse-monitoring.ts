import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleIssuePendingFromWarehouse } from '../sample-issue-pending-from-warehouse/sample-issue-pending-from-warehouse';
import { SamplePickupPendingInWarehouse } from '../sample-pickup-pending-in-warehouse/sample-pickup-pending-in-warehouse';

@Component({
  selector: 'app-qc-warehouse-monitoring',
  standalone: true,
  imports: [
    CommonModule,
    SampleIssuePendingFromWarehouse,
    SamplePickupPendingInWarehouse,
  ],
  templateUrl: './qc-warehouse-monitoring.html',
  styleUrl: './qc-warehouse-monitoring.css',
})
export class QcWarehouseMonitoring {
  activeTab: string = 'tab1';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}

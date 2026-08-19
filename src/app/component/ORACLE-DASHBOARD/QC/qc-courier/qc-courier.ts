import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleInTransitToLab } from '../sample-in-transit-to-lab/sample-in-transit-to-lab';
import { SampleDeliveryPendingAtQc } from '../sample-delivery-pending-at-qc/sample-delivery-pending-at-qc';
import { SamplePickupPendingAtQc } from '../sample-pickup-pending-at-qc/sample-pickup-pending-at-qc';

@Component({
  selector: 'app-qc-courier',
  standalone: true,
  imports: [
    CommonModule,
    SampleInTransitToLab,
    SampleDeliveryPendingAtQc,
    SamplePickupPendingAtQc,
  ],
  templateUrl: './qc-courier.html',
  styleUrl: './qc-courier.css',
})
export class QcCourier {
  activeTab: string = 'tab1';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}

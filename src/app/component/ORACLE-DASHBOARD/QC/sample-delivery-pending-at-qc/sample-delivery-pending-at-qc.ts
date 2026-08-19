import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sample-delivery-pending-at-qc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sample-delivery-pending-at-qc.html',
  styleUrl: './sample-delivery-pending-at-qc.css',
})
export class SampleDeliveryPendingAtQc {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

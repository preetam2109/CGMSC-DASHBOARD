import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courier-delivered-agency-receipt-pending-ho-qc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courier-delivered-agency-receipt-pending-ho-qc.html',
  styleUrl: './courier-delivered-agency-receipt-pending-ho-qc.css',
})
export class CourierDeliveredAgencyReceiptPendingHoQc {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

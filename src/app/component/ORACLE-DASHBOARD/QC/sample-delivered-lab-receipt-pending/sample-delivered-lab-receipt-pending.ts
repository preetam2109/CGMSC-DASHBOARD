import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sample-delivered-lab-receipt-pending',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sample-delivered-lab-receipt-pending.html',
  styleUrl: './sample-delivered-lab-receipt-pending.css',
})
export class SampleDeliveredLabReceiptPending {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

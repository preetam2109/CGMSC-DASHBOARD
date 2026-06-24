import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-batch-decision-pending-zero-qty-receipts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './batch-decision-pending-zero-qty-receipts.html',
  styleUrl: './batch-decision-pending-zero-qty-receipts.css',
})
export class BatchDecisionPendingZeroQtyReceipts {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

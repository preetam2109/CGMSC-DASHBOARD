import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zero-qty-final-approval-pending',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './zero-qty-final-approval-pending.html',
  styleUrl: './zero-qty-final-approval-pending.css',
})
export class ZeroQtyFinalApprovalPending {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

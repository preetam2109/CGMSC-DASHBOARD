import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-security-deposit-pending-monitoring',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './security-deposit-pending-monitoring.html',
  styleUrl: './security-deposit-pending-monitoring.css',
})
export class SecurityDepositPendingMonitoring {
  loading = true;

  onIframeLoad() {
    this.loading = false;
  }
}

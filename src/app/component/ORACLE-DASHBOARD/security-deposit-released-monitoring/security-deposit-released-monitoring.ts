import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-security-deposit-released-monitoring',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './security-deposit-released-monitoring.html',
  styleUrl: './security-deposit-released-monitoring.css',
})
export class SecurityDepositReleasedMonitoring {
  loading = true;

  onIframeLoad() {
    this.loading = false;
  }

}

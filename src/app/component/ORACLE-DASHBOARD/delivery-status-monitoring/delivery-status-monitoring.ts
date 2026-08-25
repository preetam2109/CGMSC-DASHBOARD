import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delivery-status-monitoring',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delivery-status-monitoring.html',
  styleUrl: './delivery-status-monitoring.css',
})
export class DeliveryStatusMonitoring {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }

  onIframeLoad() {
    // Backup fallback
  }
}

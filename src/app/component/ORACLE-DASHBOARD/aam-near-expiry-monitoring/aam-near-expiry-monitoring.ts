import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aam-near-expiry-monitoring',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aam-near-expiry-monitoring.html',
  styleUrl: './aam-near-expiry-monitoring.css',
})
export class AamNearExpiryMonitoring {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

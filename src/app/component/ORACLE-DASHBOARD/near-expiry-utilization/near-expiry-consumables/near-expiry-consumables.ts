import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-near-expiry-consumables',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './near-expiry-consumables.html',
  styleUrl: './near-expiry-consumables.css',
})
export class NearExpiryConsumables {
  loading: boolean = true;

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

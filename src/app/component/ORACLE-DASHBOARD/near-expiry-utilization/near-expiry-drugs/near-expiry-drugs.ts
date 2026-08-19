import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-near-expiry-drugs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './near-expiry-drugs.html',
  styleUrl: './near-expiry-drugs.css',
})
export class NearExpiryDrugs {
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

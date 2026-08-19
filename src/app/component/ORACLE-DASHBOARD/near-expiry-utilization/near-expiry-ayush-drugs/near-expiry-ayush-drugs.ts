import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-near-expiry-ayush-drugs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './near-expiry-ayush-drugs.html',
  styleUrl: './near-expiry-ayush-drugs.css',
})
export class NearExpiryAyushDrugs {
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

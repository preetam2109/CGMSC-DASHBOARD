import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-near-expiry-reagents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './near-expiry-reagents.html',
  styleUrl: './near-expiry-reagents.css',
})
export class NearExpiryReagents {
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

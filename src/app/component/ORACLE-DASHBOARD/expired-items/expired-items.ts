import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expired-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expired-items.html',
  styleUrl: './expired-items.css',
})
export class ExpiredItems {
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

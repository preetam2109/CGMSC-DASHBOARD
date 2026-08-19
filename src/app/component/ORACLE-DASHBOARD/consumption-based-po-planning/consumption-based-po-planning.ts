import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consumption-based-po-planning',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consumption-based-po-planning.html',
  styleUrl: './consumption-based-po-planning.css'
})
export class ConsumptionBasedPoPlanning {
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

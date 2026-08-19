import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inter-warehouse-alert-planning',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inter-warehouse-alert-planning.html',
  styleUrl: './inter-warehouse-alert-planning.css',
})
export class InterWarehouseAlertPlanning {
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

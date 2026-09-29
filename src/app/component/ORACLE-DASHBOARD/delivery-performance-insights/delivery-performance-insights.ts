import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delivery-performance-insights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delivery-performance-insights.html',
  styleUrl: './delivery-performance-insights.css',
})
export class DeliveryPerformanceInsights {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

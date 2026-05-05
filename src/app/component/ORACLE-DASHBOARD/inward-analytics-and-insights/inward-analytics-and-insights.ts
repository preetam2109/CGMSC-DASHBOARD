import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inward-analytics-and-insights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inward-analytics-and-insights.html',
  styleUrl: './inward-analytics-and-insights.css',
})
export class InwardAnalyticsAndInsights {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      // Hide the loader when we receive the message from the iframe
      this.loading = false;
    }
  }
}

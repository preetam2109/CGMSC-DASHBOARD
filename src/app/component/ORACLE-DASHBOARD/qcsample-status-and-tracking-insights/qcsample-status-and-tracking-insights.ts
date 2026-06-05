import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-qcsample-status-and-tracking-insights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qcsample-status-and-tracking-insights.html',
  styleUrl: './qcsample-status-and-tracking-insights.css',
})
export class QCSampleStatusAndTrackingInsights {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

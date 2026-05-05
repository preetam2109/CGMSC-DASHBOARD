import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sdacknowledgement-insights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sdacknowledgement-insights.html',
  styleUrl: './sdacknowledgement-insights.css',
})
export class SDAcknowledgementInsights {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

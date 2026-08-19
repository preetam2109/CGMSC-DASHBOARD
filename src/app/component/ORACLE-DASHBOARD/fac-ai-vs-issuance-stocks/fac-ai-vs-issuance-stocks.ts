import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fac-ai-vs-issuance-stocks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fac-ai-vs-issuance-stocks.html',
  styleUrl: './fac-ai-vs-issuance-stocks.css',
})
export class FacAiVsIssuanceStocks {
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

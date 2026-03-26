import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payement-status-insights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payement-status-insights.html',
  styleUrl: './payement-status-insights.css',
})
export class PayementStatusInsights {
 loading = true;
  onIframeLoad() {
    this.loading = false;
  }
}

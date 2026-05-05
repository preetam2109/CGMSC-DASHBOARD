import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-emd-monitoring-and-insights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emd-monitoring-and-insights.html',
  styleUrl: './emd-monitoring-and-insights.css',
})
export class EMdMonitoringAndInsights {
 loading = true;
  onIframeLoad() {
    this.loading = false;
  }
}

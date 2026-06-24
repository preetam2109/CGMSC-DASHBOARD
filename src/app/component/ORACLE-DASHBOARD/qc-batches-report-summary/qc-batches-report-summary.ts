import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-qc-batches-report-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qc-batches-report-summary.html',
  styleUrl: './qc-batches-report-summary.css',
})
export class QcBatchesReportSummary {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

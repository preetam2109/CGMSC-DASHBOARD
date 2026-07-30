import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-qc-pendency-monitoring',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qc-pendency-monitoring.html',
  styleUrl: './qc-pendency-monitoring.css',
})
export class QcPendencyMonitoring {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

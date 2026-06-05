import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-qc-performance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qc-performance.html',
  styleUrl: './qc-performance.css',
})
export class QcPerformance {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

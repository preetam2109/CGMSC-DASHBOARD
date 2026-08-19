import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sample-pickup-pending-at-qc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sample-pickup-pending-at-qc.html',
  styleUrl: './sample-pickup-pending-at-qc.css',
})
export class SamplePickupPendingAtQc {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

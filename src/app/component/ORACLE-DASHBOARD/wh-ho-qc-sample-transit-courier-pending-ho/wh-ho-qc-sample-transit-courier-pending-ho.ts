import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wh-ho-qc-sample-transit-courier-pending-ho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wh-ho-qc-sample-transit-courier-pending-ho.html',
  styleUrl: './wh-ho-qc-sample-transit-courier-pending-ho.css',
})
export class WhHoQcSampleTransitCourierPendingHo {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

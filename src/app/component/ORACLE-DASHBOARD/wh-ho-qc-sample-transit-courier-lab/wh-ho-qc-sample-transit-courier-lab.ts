import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wh-ho-qc-sample-transit-courier-lab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wh-ho-qc-sample-transit-courier-lab.html',
  styleUrl: './wh-ho-qc-sample-transit-courier-lab.css',
})
export class WhHoQcSampleTransitCourierLab {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-qcsample-status-lab-received-under-transit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qcsample-status-lab-received-under-transit.html',
  styleUrl: './qcsample-status-lab-received-under-transit.css'
})
export class QCSampleStatusLabReceivedUnderTransit {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

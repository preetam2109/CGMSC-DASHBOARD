import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-qcsample-stage-monitoring',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qcsample-stage-monitoring.html',
  styleUrl: './qcsample-stage-monitoring.css',
})
export class QCSampleStageMonitoring {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-current-sample-status-tatmonitoring',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './current-sample-status-tatmonitoring.html',
  styleUrl: './current-sample-status-tatmonitoring.css',
})
export class CurrentSampleStatusTATMonitoring {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

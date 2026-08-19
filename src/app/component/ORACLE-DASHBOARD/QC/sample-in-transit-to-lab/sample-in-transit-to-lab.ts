import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sample-in-transit-to-lab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sample-in-transit-to-lab.html',
  styleUrl: './sample-in-transit-to-lab.css',
})
export class SampleInTransitToLab {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

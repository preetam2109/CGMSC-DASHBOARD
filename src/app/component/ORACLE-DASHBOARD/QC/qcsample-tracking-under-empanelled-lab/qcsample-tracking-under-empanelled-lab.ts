import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-qcsample-tracking-under-empanelled-lab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qcsample-tracking-under-empanelled-lab.html',
  styleUrl: './qcsample-tracking-under-empanelled-lab.css'
})
export class QCSampleTrackingUnderEmpanelledLab {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

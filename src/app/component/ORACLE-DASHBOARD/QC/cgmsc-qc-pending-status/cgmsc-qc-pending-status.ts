import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cgmsc-qc-pending-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cgmsc-qc-pending-status.html',
  styleUrl: './cgmsc-qc-pending-status.css',
})
export class CgmscQcPendingStatus {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

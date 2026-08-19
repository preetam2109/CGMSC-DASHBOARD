import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sample-pickup-pending-in-warehouse',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sample-pickup-pending-in-warehouse.html',
  styleUrl: './sample-pickup-pending-in-warehouse.css',
})
export class SamplePickupPendingInWarehouse {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

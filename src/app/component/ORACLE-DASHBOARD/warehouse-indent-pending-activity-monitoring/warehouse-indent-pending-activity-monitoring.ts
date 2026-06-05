import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-warehouse-indent-pending-activity-monitoring',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './warehouse-indent-pending-activity-monitoring.html',
  styleUrl: './warehouse-indent-pending-activity-monitoring.css',
})
export class WarehouseIndentPendingActivityMonitoring {
 loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {

    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }

  }

}
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-warehouse-issuance-activity-monitoring',
 standalone: true,
  imports: [CommonModule],
  templateUrl: './warehouse-issuance-activity-monitoring.html',
  styleUrl: './warehouse-issuance-activity-monitoring.css',
})
export class WarehouseIssuanceActivityMonitoring {

 loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {

    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }

  }

}

import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sample-issue-pending-from-warehouse',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sample-issue-pending-from-warehouse.html',
  styleUrl: './sample-issue-pending-from-warehouse.css',
})
export class SampleIssuePendingFromWarehouse {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tender-status-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tender-status-dashboard.component.html',
  styleUrl: './tender-status-dashboard.component.css'
})
export class TenderStatusDashboardComponent {
  loading = true;

  onIframeLoad() {
    this.loading = false;
  }
}

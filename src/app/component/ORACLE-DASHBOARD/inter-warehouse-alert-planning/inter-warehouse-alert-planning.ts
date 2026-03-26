import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inter-warehouse-alert-planning',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inter-warehouse-alert-planning.html',
  styleUrl: './inter-warehouse-alert-planning.css',
})
export class InterWarehouseAlertPlanning {
  loading = true;

  onIframeLoad() {
    this.loading = false;
  }
}

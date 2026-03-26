import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consumption-based-po-planning',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consumption-based-po-planning.html',
  styleUrl: './consumption-based-po-planning.css'
})
export class ConsumptionBasedPoPlanning {
  loading = true;

  onIframeLoad() {
    this.loading = false;
  }
}

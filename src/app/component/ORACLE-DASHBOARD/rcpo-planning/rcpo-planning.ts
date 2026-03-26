import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rcpo-planning',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rcpo-planning.html',
  styleUrl: './rcpo-planning.css'
})
export class RCPOPlanning {
  loading = true;

  onIframeLoad() {
    this.loading = false;
  }
}

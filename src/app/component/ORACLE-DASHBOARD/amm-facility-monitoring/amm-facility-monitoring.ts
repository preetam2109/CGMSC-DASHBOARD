import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-amm-facility-monitoring',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './amm-facility-monitoring.html',
  styleUrl: './amm-facility-monitoring.css',
})
export class AmmFacilityMonitoring {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}


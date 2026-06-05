import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dhsstock-availability-and-monitoring',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dhsstock-availability-and-monitoring.html',
  styleUrl: './dhsstock-availability-and-monitoring.css',
})
export class DHSStockAvailabilityAndMonitoring implements OnInit {
  loading = true;

  ngOnInit(): void {}

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

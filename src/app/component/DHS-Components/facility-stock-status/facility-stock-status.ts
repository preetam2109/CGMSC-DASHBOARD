import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-facility-stock-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facility-stock-status.html',
  styleUrl: './facility-stock-status.css',
})
export class FacilityStockStatus implements OnInit {
  loading = true;

  ngOnInit(): void {}

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

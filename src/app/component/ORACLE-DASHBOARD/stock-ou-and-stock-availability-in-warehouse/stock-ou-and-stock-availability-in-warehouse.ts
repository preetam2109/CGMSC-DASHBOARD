import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-ou-and-stock-availability-in-warehouse',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-ou-and-stock-availability-in-warehouse.html',
  styleUrl: './stock-ou-and-stock-availability-in-warehouse.css',
})
export class StockOuAndStockAvailabilityInWarehouse implements OnInit {
  loading = true;

  ngOnInit(): void {}

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

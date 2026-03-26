import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-warehouse-stock-oracle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './warehouse-stock-oracle.html',
  styleUrl: './warehouse-stock-oracle.css',
})
export class WarehouseStockOracle {
  loading = true;

  onIframeLoad() {
    this.loading = false;
  }
}

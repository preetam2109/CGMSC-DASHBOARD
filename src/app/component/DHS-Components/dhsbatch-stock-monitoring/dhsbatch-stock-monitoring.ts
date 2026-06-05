import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dhsbatch-stock-monitoring',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dhsbatch-stock-monitoring.html',
  styleUrl: './dhsbatch-stock-monitoring.css',
})
export class DHSBatchStockMonitoring implements OnInit {
  loading = true;

  ngOnInit(): void {}

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

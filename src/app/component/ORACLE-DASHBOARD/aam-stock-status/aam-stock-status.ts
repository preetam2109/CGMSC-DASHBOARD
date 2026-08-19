import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aam-stock-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aam-stock-status.html',
  styleUrl: './aam-stock-status.css',
})
export class AamStockStatus {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

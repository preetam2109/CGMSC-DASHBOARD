import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-wise-stock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-wise-stock.html',
  styleUrl: './item-wise-stock.css',
})
export class ItemWiseStock implements OnInit {
  loading = true;

  ngOnInit(): void {}

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

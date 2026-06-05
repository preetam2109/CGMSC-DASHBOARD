import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dhsfacility-stock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dhsfacility-stock.html',
  styleUrl: './dhsfacility-stock.css',
})
export class DHSFacilityStock implements OnInit {
  loading = true;

  ngOnInit(): void {}

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

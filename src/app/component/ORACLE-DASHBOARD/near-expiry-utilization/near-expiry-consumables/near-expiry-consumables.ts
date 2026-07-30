import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-near-expiry-consumables',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './near-expiry-consumables.html',
  styleUrl: './near-expiry-consumables.css',
})
export class NearExpiryConsumables {
  loading: boolean = true;

  onIframeLoad() {
    this.loading = false;
  }
}

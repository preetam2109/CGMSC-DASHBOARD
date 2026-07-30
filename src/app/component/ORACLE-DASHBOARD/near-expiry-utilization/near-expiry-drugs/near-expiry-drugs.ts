import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-near-expiry-drugs',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './near-expiry-drugs.html',
  styleUrl: './near-expiry-drugs.css',
})
export class NearExpiryDrugs {
  loading: boolean = true;

  onIframeLoad() {
    this.loading = false;
  }
}

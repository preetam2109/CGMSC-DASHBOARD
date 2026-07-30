import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-near-expiry-ayush-drugs',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  templateUrl: './near-expiry-ayush-drugs.html',
  styleUrl: './near-expiry-ayush-drugs.css',
})
export class NearExpiryAyushDrugs {
  loading: boolean = true;

  onIframeLoad() {
    this.loading = false;
  }
}

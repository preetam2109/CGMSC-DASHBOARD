import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-near-expiry-reagents',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './near-expiry-reagents.html',
  styleUrl: './near-expiry-reagents.css',
})
export class NearExpiryReagents {
  loading: boolean = true;

  onIframeLoad() {
    this.loading = false;
  }
}

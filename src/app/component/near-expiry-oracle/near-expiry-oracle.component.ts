import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-near-expiry-oracle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './near-expiry-oracle.component.html',
  styleUrl: './near-expiry-oracle.component.css'
})
export class NearExpiryOracleComponent {
loading = true;

  onIframeLoad() {
    this.loading = false;
  }
}

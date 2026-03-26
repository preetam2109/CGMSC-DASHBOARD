import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-facility-information-oracle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facility-information-oracle.component.html',
  styleUrl: './facility-information-oracle.component.css'
})
export class FacilityInformationOracleComponent {
loading = true;

  onIframeLoad() {
    this.loading = false;
  }
}

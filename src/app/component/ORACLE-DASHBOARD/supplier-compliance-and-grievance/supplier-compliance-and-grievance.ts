import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supplier-compliance-and-grievance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supplier-compliance-and-grievance.html',
  styleUrl: './supplier-compliance-and-grievance.css',
})
export class SupplierComplianceAndGrievance {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

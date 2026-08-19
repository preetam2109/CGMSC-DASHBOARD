import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medical-college-hospital-noc-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medical-college-hospital-noc-analytics.html',
  styleUrl: './medical-college-hospital-noc-analytics.css',
})
export class MedicalCollegeHospitalNocAnalytics {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

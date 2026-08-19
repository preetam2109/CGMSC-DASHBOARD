import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lab-result-uploaded-final-qc-approval-pending',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lab-result-uploaded-final-qc-approval-pending.html',
  styleUrl: './lab-result-uploaded-final-qc-approval-pending.css',
})
export class LabResultUploadedFinalQcApprovalPending {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}

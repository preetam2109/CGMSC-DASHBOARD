import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabResultUploadedFinalQcApprovalPending } from '../lab-result-uploaded-final-qc-approval-pending/lab-result-uploaded-final-qc-approval-pending';
import { ZeroQtyFinalApprovalPending } from '../zero-qty-final-approval-pending/zero-qty-final-approval-pending';

@Component({
  selector: 'app-qc-final-approval-pending',
  standalone: true,
  imports: [
    CommonModule,
    LabResultUploadedFinalQcApprovalPending,
    ZeroQtyFinalApprovalPending,
  ],
  templateUrl: './qc-final-approval-pending.html',
  styleUrl: './qc-final-approval-pending.css',
})
export class QcFinalApprovalPending {
  activeTab: string = 'tab1';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}

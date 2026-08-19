import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabResultUploadedFinalQcApprovalPending } from './lab-result-uploaded-final-qc-approval-pending';

describe('LabResultUploadedFinalQcApprovalPending', () => {
  let component: LabResultUploadedFinalQcApprovalPending;
  let fixture: ComponentFixture<LabResultUploadedFinalQcApprovalPending>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabResultUploadedFinalQcApprovalPending]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabResultUploadedFinalQcApprovalPending);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

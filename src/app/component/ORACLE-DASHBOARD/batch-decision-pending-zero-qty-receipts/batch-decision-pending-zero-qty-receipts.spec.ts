import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchDecisionPendingZeroQtyReceipts } from './batch-decision-pending-zero-qty-receipts';

describe('BatchDecisionPendingZeroQtyReceipts', () => {
  let component: BatchDecisionPendingZeroQtyReceipts;
  let fixture: ComponentFixture<BatchDecisionPendingZeroQtyReceipts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchDecisionPendingZeroQtyReceipts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchDecisionPendingZeroQtyReceipts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

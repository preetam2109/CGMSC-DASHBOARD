import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZeroQtyFinalApprovalPending } from './zero-qty-final-approval-pending';

describe('ZeroQtyFinalApprovalPending', () => {
  let component: ZeroQtyFinalApprovalPending;
  let fixture: ComponentFixture<ZeroQtyFinalApprovalPending>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZeroQtyFinalApprovalPending]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZeroQtyFinalApprovalPending);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

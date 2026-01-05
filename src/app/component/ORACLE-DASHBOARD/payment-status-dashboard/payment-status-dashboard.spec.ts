import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStatusDashboard } from './payment-status-dashboard';

describe('PaymentStatusDashboard', () => {
  let component: PaymentStatusDashboard;
  let fixture: ComponentFixture<PaymentStatusDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentStatusDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentStatusDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityDepositPendingMonitoring } from './security-deposit-pending-monitoring';

describe('SecurityDepositPendingMonitoring', () => {
  let component: SecurityDepositPendingMonitoring;
  let fixture: ComponentFixture<SecurityDepositPendingMonitoring>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityDepositPendingMonitoring]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityDepositPendingMonitoring);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

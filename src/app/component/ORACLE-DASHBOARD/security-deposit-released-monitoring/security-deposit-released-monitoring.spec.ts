import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityDepositReleasedMonitoring } from './security-deposit-released-monitoring';

describe('SecurityDepositReleasedMonitoring', () => {
  let component: SecurityDepositReleasedMonitoring;
  let fixture: ComponentFixture<SecurityDepositReleasedMonitoring>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityDepositReleasedMonitoring]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityDepositReleasedMonitoring);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

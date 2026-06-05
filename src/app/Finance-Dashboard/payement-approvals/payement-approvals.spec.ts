import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayementApprovals } from './payement-approvals';

describe('PayementApprovals', () => {
  let component: PayementApprovals;
  let fixture: ComponentFixture<PayementApprovals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayementApprovals]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayementApprovals);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

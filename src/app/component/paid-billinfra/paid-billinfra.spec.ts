import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidBillinfra } from './paid-billinfra';

describe('PaidBillinfra', () => {
  let component: PaidBillinfra;
  let fixture: ComponentFixture<PaidBillinfra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaidBillinfra]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaidBillinfra);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

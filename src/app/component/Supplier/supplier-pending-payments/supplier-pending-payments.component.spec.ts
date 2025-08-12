import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPendingPaymentsComponent } from './supplier-pending-payments.component';

describe('SupplierPendingPaymentsComponent', () => {
  let component: SupplierPendingPaymentsComponent;
  let fixture: ComponentFixture<SupplierPendingPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierPendingPaymentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierPendingPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

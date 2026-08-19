import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourierDeliveredAgencyReceiptPendingHoQc } from './courier-delivered-agency-receipt-pending-ho-qc';

describe('CourierDeliveredAgencyReceiptPendingHoQc', () => {
  let component: CourierDeliveredAgencyReceiptPendingHoQc;
  let fixture: ComponentFixture<CourierDeliveredAgencyReceiptPendingHoQc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourierDeliveredAgencyReceiptPendingHoQc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourierDeliveredAgencyReceiptPendingHoQc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

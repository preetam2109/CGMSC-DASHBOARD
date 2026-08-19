import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SampleDeliveredLabReceiptPending } from './sample-delivered-lab-receipt-pending';

describe('SampleDeliveredLabReceiptPending', () => {
  let component: SampleDeliveredLabReceiptPending;
  let fixture: ComponentFixture<SampleDeliveredLabReceiptPending>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SampleDeliveredLabReceiptPending]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleDeliveredLabReceiptPending);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

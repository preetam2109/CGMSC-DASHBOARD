import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SampleDeliveryPendingAtQc } from './sample-delivery-pending-at-qc';

describe('SampleDeliveryPendingAtQc', () => {
  let component: SampleDeliveryPendingAtQc;
  let fixture: ComponentFixture<SampleDeliveryPendingAtQc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SampleDeliveryPendingAtQc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleDeliveryPendingAtQc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

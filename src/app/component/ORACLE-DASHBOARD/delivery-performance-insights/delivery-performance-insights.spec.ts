import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPerformanceInsights } from './delivery-performance-insights';

describe('DeliveryPerformanceInsights', () => {
  let component: DeliveryPerformanceInsights;
  let fixture: ComponentFixture<DeliveryPerformanceInsights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryPerformanceInsights]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryPerformanceInsights);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

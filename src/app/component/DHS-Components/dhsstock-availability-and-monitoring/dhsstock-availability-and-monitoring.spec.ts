import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DHSStockAvailabilityAndMonitoring } from './dhsstock-availability-and-monitoring';

describe('DHSStockAvailabilityAndMonitoring', () => {
  let component: DHSStockAvailabilityAndMonitoring;
  let fixture: ComponentFixture<DHSStockAvailabilityAndMonitoring>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DHSStockAvailabilityAndMonitoring]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DHSStockAvailabilityAndMonitoring);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

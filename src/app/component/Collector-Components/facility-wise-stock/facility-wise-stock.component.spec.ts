import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityWiseStockComponent } from './facility-wise-stock.component';

describe('FacilityWiseStockComponent', () => {
  let component: FacilityWiseStockComponent;
  let fixture: ComponentFixture<FacilityWiseStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilityWiseStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityWiseStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

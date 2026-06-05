import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockOuAndStockAvailabilityInWarehouse } from './stock-ou-and-stock-availability-in-warehouse';

describe('StockOuAndStockAvailabilityInWarehouse', () => {
  let component: StockOuAndStockAvailabilityInWarehouse;
  let fixture: ComponentFixture<StockOuAndStockAvailabilityInWarehouse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockOuAndStockAvailabilityInWarehouse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockOuAndStockAvailabilityInWarehouse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseStockOracle } from './warehouse-stock-oracle';

describe('WarehouseStockOracle', () => {
  let component: WarehouseStockOracle;
  let fixture: ComponentFixture<WarehouseStockOracle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseStockOracle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseStockOracle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

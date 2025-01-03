import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseStockDialogComponent } from './warehouse-stock-dialog.component';

describe('WarehouseStockDialogComponent', () => {
  let component: WarehouseStockDialogComponent;
  let fixture: ComponentFixture<WarehouseStockDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarehouseStockDialogComponent]
    });
    fixture = TestBed.createComponent(WarehouseStockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

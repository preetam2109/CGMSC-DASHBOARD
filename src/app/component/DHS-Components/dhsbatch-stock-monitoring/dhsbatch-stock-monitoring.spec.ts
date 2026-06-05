import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DHSBatchStockMonitoring } from './dhsbatch-stock-monitoring';

describe('DHSBatchStockMonitoring', () => {
  let component: DHSBatchStockMonitoring;
  let fixture: ComponentFixture<DHSBatchStockMonitoring>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DHSBatchStockMonitoring]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DHSBatchStockMonitoring);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

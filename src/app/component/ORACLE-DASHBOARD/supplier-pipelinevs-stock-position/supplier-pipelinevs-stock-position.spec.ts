import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPipelinevsStockPosition } from './supplier-pipelinevs-stock-position';

describe('SupplierPipelinevsStockPosition', () => {
  let component: SupplierPipelinevsStockPosition;
  let fixture: ComponentFixture<SupplierPipelinevsStockPosition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierPipelinevsStockPosition]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierPipelinevsStockPosition);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

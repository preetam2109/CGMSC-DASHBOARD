import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictWiseStockComponent } from './district-wise-stock.component';

describe('DistrictWiseStockComponent', () => {
  let component: DistrictWiseStockComponent;
  let fixture: ComponentFixture<DistrictWiseStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistrictWiseStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistrictWiseStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityStockStatus } from './facility-stock-status';

describe('FacilityStockStatus', () => {
  let component: FacilityStockStatus;
  let fixture: ComponentFixture<FacilityStockStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilityStockStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityStockStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgmscstockDetailsConsumablesComponent } from './cgmscstock-details-consumables.component';

describe('CgmscstockDetailsConsumablesComponent', () => {
  let component: CgmscstockDetailsConsumablesComponent;
  let fixture: ComponentFixture<CgmscstockDetailsConsumablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CgmscstockDetailsConsumablesComponent]
    });
    fixture = TestBed.createComponent(CgmscstockDetailsConsumablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

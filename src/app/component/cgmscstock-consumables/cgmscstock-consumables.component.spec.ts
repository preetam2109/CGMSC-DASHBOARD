import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgmscstockConsumablesComponent } from './cgmscstock-consumables.component';

describe('CgmscstockConsumablesComponent', () => {
  let component: CgmscstockConsumablesComponent;
  let fixture: ComponentFixture<CgmscstockConsumablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CgmscstockConsumablesComponent]
    });
    fixture = TestBed.createComponent(CgmscstockConsumablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhStockConsumablesComponent } from './wh-stock-consumables.component';

describe('WhStockConsumablesComponent', () => {
  let component: WhStockConsumablesComponent;
  let fixture: ComponentFixture<WhStockConsumablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WhStockConsumablesComponent]
    });
    fixture = TestBed.createComponent(WhStockConsumablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

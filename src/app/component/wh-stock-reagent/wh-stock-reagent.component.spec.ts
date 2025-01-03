import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhStockReagentComponent } from './wh-stock-reagent.component';

describe('WhStockReagentComponent', () => {
  let component: WhStockReagentComponent;
  let fixture: ComponentFixture<WhStockReagentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WhStockReagentComponent]
    });
    fixture = TestBed.createComponent(WhStockReagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

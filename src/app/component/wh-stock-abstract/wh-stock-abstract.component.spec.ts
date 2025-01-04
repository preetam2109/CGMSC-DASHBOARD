import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhStockAbstractComponent } from './wh-stock-abstract.component';

describe('WhStockAbstractComponent', () => {
  let component: WhStockAbstractComponent;
  let fixture: ComponentFixture<WhStockAbstractComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WhStockAbstractComponent]
    });
    fixture = TestBed.createComponent(WhStockAbstractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

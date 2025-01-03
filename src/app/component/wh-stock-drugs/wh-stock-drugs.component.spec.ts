import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhStockDrugsComponent } from './wh-stock-drugs.component';

describe('WhStockDrugsComponent', () => {
  let component: WhStockDrugsComponent;
  let fixture: ComponentFixture<WhStockDrugsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WhStockDrugsComponent]
    });
    fixture = TestBed.createComponent(WhStockDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

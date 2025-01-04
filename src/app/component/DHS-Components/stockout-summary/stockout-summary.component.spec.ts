import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockoutSummaryComponent } from './stockout-summary.component';

describe('StockoutSummaryComponent', () => {
  let component: StockoutSummaryComponent;
  let fixture: ComponentFixture<StockoutSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockoutSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockoutSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

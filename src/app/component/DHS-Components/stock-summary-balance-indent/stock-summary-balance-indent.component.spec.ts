import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSummaryBalanceIndentComponent } from './stock-summary-balance-indent.component';

describe('StockSummaryBalanceIndentComponent', () => {
  let component: StockSummaryBalanceIndentComponent;
  let fixture: ComponentFixture<StockSummaryBalanceIndentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockSummaryBalanceIndentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockSummaryBalanceIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

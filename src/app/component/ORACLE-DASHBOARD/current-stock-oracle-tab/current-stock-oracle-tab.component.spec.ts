import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentStockOracleTabComponent } from './current-stock-oracle-tab.component';

describe('CurrentStockOracleTabComponent', () => {
  let component: CurrentStockOracleTabComponent;
  let fixture: ComponentFixture<CurrentStockOracleTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentStockOracleTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentStockOracleTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

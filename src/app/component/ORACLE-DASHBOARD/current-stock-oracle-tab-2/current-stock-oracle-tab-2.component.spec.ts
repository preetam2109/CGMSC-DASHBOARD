import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentStockOracleTab2Component } from './current-stock-oracle-tab-2.component';

describe('CurrentStockOracleTab2Component', () => {
  let component: CurrentStockOracleTab2Component;
  let fixture: ComponentFixture<CurrentStockOracleTab2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentStockOracleTab2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentStockOracleTab2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

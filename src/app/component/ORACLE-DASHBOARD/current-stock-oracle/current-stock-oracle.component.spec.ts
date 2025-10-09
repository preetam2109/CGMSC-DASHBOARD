import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentStockOracleComponent } from './current-stock-oracle.component';

describe('CurrentStockOracleComponent', () => {
  let component: CurrentStockOracleComponent;
  let fixture: ComponentFixture<CurrentStockOracleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentStockOracleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentStockOracleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

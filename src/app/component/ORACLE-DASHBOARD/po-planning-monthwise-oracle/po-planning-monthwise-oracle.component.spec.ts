import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoPlanningMonthwiseOracleComponent } from './po-planning-monthwise-oracle.component';

describe('PoPlanningMonthwiseOracleComponent', () => {
  let component: PoPlanningMonthwiseOracleComponent;
  let fixture: ComponentFixture<PoPlanningMonthwiseOracleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoPlanningMonthwiseOracleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoPlanningMonthwiseOracleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

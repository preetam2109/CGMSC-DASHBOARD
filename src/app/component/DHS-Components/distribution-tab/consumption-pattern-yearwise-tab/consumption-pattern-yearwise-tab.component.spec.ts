import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionPatternYearwiseTabComponent } from './consumption-pattern-yearwise-tab.component';

describe('ConsumptionPatternYearwiseTabComponent', () => {
  let component: ConsumptionPatternYearwiseTabComponent;
  let fixture: ComponentFixture<ConsumptionPatternYearwiseTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumptionPatternYearwiseTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumptionPatternYearwiseTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

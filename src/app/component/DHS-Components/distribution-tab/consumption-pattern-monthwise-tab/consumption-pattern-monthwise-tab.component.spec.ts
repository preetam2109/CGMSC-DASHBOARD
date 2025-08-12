import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionPatternMonthwiseTabComponent } from './consumption-pattern-monthwise-tab.component';

describe('ConsumptionPatternMonthwiseTabComponent', () => {
  let component: ConsumptionPatternMonthwiseTabComponent;
  let fixture: ComponentFixture<ConsumptionPatternMonthwiseTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumptionPatternMonthwiseTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumptionPatternMonthwiseTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionPatternTabComponent } from './consumption-pattern-tab.component';

describe('ConsumptionPatternTabComponent', () => {
  let component: ConsumptionPatternTabComponent;
  let fixture: ComponentFixture<ConsumptionPatternTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumptionPatternTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumptionPatternTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

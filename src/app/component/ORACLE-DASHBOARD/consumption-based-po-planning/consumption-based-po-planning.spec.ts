import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionBasedPoPlanning } from './consumption-based-po-planning';

describe('ConsumptionBasedPoPlanning', () => {
  let component: ConsumptionBasedPoPlanning;
  let fixture: ComponentFixture<ConsumptionBasedPoPlanning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumptionBasedPoPlanning]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumptionBasedPoPlanning);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

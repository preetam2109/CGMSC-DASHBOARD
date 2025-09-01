import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlowMovingItemsagainstAnnualIndent2526Component } from './slow-moving-itemsagainst-annual-indent25-26.component';

describe('SlowMovingItemsagainstAnnualIndent2526Component', () => {
  let component: SlowMovingItemsagainstAnnualIndent2526Component;
  let fixture: ComponentFixture<SlowMovingItemsagainstAnnualIndent2526Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlowMovingItemsagainstAnnualIndent2526Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlowMovingItemsagainstAnnualIndent2526Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

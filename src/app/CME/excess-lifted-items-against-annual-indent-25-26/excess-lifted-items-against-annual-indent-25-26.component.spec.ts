import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcessLiftedItemsAgainstAnnualIndent2526Component } from './excess-lifted-items-against-annual-indent-25-26.component';

describe('ExcessLiftedItemsAgainstAnnualIndent2526Component', () => {
  let component: ExcessLiftedItemsAgainstAnnualIndent2526Component;
  let fixture: ComponentFixture<ExcessLiftedItemsAgainstAnnualIndent2526Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcessLiftedItemsAgainstAnnualIndent2526Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcessLiftedItemsAgainstAnnualIndent2526Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

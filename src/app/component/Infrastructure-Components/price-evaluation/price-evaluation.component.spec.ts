import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceEvaluationComponent } from './price-evaluation.component';

describe('PriceEvaluationComponent', () => {
  let component: PriceEvaluationComponent;
  let fixture: ComponentFixture<PriceEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceEvaluationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderEvaluationComponent } from './tender-evaluation.component';

describe('TenderEvaluationComponent', () => {
  let component: TenderEvaluationComponent;
  let fixture: ComponentFixture<TenderEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenderEvaluationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenderEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

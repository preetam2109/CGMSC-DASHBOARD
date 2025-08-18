import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbcAnalysisComponent } from './abc-analysis.component';

describe('AbcAnalysisComponent', () => {
  let component: AbcAnalysisComponent;
  let fixture: ComponentFixture<AbcAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbcAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbcAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

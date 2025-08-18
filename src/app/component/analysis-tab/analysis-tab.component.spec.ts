import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisTabComponent } from './analysis-tab.component';

describe('AnalysisTabComponent', () => {
  let component: AnalysisTabComponent;
  let fixture: ComponentFixture<AnalysisTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

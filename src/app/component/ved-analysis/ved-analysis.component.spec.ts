import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VedAnalysisComponent } from './ved-analysis.component';

describe('VedAnalysisComponent', () => {
  let component: VedAnalysisComponent;
  let fixture: ComponentFixture<VedAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VedAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VedAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

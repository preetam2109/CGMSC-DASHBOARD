import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ABCVEDSDEAnalysisOracleComponent } from './abc-ved-sde-analysis-oracle.component';

describe('ABCVEDSDEAnalysisOracleComponent', () => {
  let component: ABCVEDSDEAnalysisOracleComponent;
  let fixture: ComponentFixture<ABCVEDSDEAnalysisOracleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ABCVEDSDEAnalysisOracleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ABCVEDSDEAnalysisOracleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

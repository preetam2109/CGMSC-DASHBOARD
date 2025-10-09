import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QCAnalysisOracleComponent } from './qc-analysis-oracle.component';

describe('QCAnalysisOracleComponent', () => {
  let component: QCAnalysisOracleComponent;
  let fixture: ComponentFixture<QCAnalysisOracleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QCAnalysisOracleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QCAnalysisOracleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

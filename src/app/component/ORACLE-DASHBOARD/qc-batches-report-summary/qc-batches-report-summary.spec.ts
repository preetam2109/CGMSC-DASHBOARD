import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcBatchesReportSummary } from './qc-batches-report-summary';

describe('QcBatchesReportSummary', () => {
  let component: QcBatchesReportSummary;
  let fixture: ComponentFixture<QcBatchesReportSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QcBatchesReportSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QcBatchesReportSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

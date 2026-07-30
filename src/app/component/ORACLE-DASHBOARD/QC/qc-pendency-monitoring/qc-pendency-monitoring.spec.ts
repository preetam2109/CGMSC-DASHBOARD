import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcPendencyMonitoring } from './qc-pendency-monitoring';

describe('QcPendencyMonitoring', () => {
  let component: QcPendencyMonitoring;
  let fixture: ComponentFixture<QcPendencyMonitoring>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QcPendencyMonitoring]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QcPendencyMonitoring);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

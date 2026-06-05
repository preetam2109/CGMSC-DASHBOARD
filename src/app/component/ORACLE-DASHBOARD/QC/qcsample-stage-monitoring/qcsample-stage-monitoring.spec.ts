import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QCSampleStageMonitoring } from './qcsample-stage-monitoring';

describe('QCSampleStageMonitoring', () => {
  let component: QCSampleStageMonitoring;
  let fixture: ComponentFixture<QCSampleStageMonitoring>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QCSampleStageMonitoring]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QCSampleStageMonitoring);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

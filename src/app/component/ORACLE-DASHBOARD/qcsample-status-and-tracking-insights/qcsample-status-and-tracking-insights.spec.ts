import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QCSampleStatusAndTrackingInsights } from './qcsample-status-and-tracking-insights';

describe('QCSampleStatusAndTrackingInsights', () => {
  let component: QCSampleStatusAndTrackingInsights;
  let fixture: ComponentFixture<QCSampleStatusAndTrackingInsights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QCSampleStatusAndTrackingInsights]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QCSampleStatusAndTrackingInsights);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

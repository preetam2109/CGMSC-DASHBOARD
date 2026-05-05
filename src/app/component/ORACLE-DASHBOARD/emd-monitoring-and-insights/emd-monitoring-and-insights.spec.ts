import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMdMonitoringAndInsights } from './emd-monitoring-and-insights';

describe('EMdMonitoringAndInsights', () => {
  let component: EMdMonitoringAndInsights;
  let fixture: ComponentFixture<EMdMonitoringAndInsights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EMdMonitoringAndInsights]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EMdMonitoringAndInsights);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

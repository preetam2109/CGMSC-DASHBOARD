import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardAnalyticsAndInsights } from './inward-analytics-and-insights';

describe('InwardAnalyticsAndInsights', () => {
  let component: InwardAnalyticsAndInsights;
  let fixture: ComponentFixture<InwardAnalyticsAndInsights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InwardAnalyticsAndInsights]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InwardAnalyticsAndInsights);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

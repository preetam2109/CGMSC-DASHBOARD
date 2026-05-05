import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SDAcknowledgementInsights } from './sdacknowledgement-insights';

describe('SDAcknowledgementInsights', () => {
  let component: SDAcknowledgementInsights;
  let fixture: ComponentFixture<SDAcknowledgementInsights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SDAcknowledgementInsights]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SDAcknowledgementInsights);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

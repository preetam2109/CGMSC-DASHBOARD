import { ComponentFixture, TestBed } from '@angular/core/testing';

import { POFileStatusInsightsTechnical } from './pofile-status-insights-technical';

describe('POFileStatusInsightsTechnical', () => {
  let component: POFileStatusInsightsTechnical;
  let fixture: ComponentFixture<POFileStatusInsightsTechnical>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [POFileStatusInsightsTechnical]
    })
    .compileComponents();

    fixture = TestBed.createComponent(POFileStatusInsightsTechnical);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

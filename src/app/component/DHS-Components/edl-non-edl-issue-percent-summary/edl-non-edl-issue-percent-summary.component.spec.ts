import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdlNonEdlIssuePercentSummaryComponent } from './edl-non-edl-issue-percent-summary.component';

describe('EdlNonEdlIssuePercentSummaryComponent', () => {
  let component: EdlNonEdlIssuePercentSummaryComponent;
  let fixture: ComponentFixture<EdlNonEdlIssuePercentSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdlNonEdlIssuePercentSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdlNonEdlIssuePercentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

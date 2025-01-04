import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReagentIssueComponent } from './reagent-issue.component';

describe('ReagentIssueComponent', () => {
  let component: ReagentIssueComponent;
  let fixture: ComponentFixture<ReagentIssueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReagentIssueComponent]
    });
    fixture = TestBed.createComponent(ReagentIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

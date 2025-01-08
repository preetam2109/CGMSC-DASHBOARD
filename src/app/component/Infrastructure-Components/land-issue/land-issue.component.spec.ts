import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandIssueComponent } from './land-issue.component';

describe('LandIssueComponent', () => {
  let component: LandIssueComponent;
  let fixture: ComponentFixture<LandIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandIssueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

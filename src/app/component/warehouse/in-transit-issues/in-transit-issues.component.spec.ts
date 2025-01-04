import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InTransitIssuesComponent } from './in-transit-issues.component';

describe('InTransitIssuesComponent', () => {
  let component: InTransitIssuesComponent;
  let fixture: ComponentFixture<InTransitIssuesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InTransitIssuesComponent]
    });
    fixture = TestBed.createComponent(InTransitIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

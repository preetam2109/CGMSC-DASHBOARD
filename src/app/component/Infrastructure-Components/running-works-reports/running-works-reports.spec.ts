import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningWorksReports } from './running-works-reports';

describe('RunningWorksReports', () => {
  let component: RunningWorksReports;
  let fixture: ComponentFixture<RunningWorksReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunningWorksReports]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunningWorksReports);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

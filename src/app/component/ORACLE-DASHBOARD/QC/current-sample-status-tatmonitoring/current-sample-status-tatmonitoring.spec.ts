import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentSampleStatusTATMonitoring } from './current-sample-status-tatmonitoring';

describe('CurrentSampleStatusTATMonitoring', () => {
  let component: CurrentSampleStatusTATMonitoring;
  let fixture: ComponentFixture<CurrentSampleStatusTATMonitoring>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentSampleStatusTATMonitoring]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentSampleStatusTATMonitoring);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhHoQcSampleTransitCourierLab } from './wh-ho-qc-sample-transit-courier-lab';

describe('WhHoQcSampleTransitCourierLab', () => {
  let component: WhHoQcSampleTransitCourierLab;
  let fixture: ComponentFixture<WhHoQcSampleTransitCourierLab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhHoQcSampleTransitCourierLab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhHoQcSampleTransitCourierLab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

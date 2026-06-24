import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhHoQcSampleTransitCourierPendingHo } from './wh-ho-qc-sample-transit-courier-pending-ho';

describe('WhHoQcSampleTransitCourierPendingHo', () => {
  let component: WhHoQcSampleTransitCourierPendingHo;
  let fixture: ComponentFixture<WhHoQcSampleTransitCourierPendingHo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhHoQcSampleTransitCourierPendingHo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhHoQcSampleTransitCourierPendingHo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SamplePickupPendingAtQc } from './sample-pickup-pending-at-qc';

describe('SamplePickupPendingAtQc', () => {
  let component: SamplePickupPendingAtQc;
  let fixture: ComponentFixture<SamplePickupPendingAtQc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SamplePickupPendingAtQc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SamplePickupPendingAtQc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SamplePickupPendingInWarehouse } from './sample-pickup-pending-in-warehouse';

describe('SamplePickupPendingInWarehouse', () => {
  let component: SamplePickupPendingInWarehouse;
  let fixture: ComponentFixture<SamplePickupPendingInWarehouse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SamplePickupPendingInWarehouse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SamplePickupPendingInWarehouse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

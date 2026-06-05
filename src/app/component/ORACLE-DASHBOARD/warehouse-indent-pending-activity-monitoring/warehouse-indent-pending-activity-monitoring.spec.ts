import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseIndentPendingActivityMonitoring } from './warehouse-indent-pending-activity-monitoring';

describe('WarehouseIndentPendingActivityMonitoring', () => {
  let component: WarehouseIndentPendingActivityMonitoring;
  let fixture: ComponentFixture<WarehouseIndentPendingActivityMonitoring>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseIndentPendingActivityMonitoring]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseIndentPendingActivityMonitoring);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

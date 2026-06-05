import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseIssuanceActivityMonitoring } from './warehouse-issuance-activity-monitoring';

describe('WarehouseIssuanceActivityMonitoring', () => {
  let component: WarehouseIssuanceActivityMonitoring;
  let fixture: ComponentFixture<WarehouseIssuanceActivityMonitoring>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseIssuanceActivityMonitoring]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseIssuanceActivityMonitoring);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

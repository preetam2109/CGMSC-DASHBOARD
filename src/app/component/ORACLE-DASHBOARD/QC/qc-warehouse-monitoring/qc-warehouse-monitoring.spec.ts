import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QcWarehouseMonitoring } from './qc-warehouse-monitoring';

describe('QcWarehouseMonitoring', () => {
  let component: QcWarehouseMonitoring;
  let fixture: ComponentFixture<QcWarehouseMonitoring>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QcWarehouseMonitoring]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QcWarehouseMonitoring);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

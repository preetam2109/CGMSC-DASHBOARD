import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropAppWarehousePerformanceComponent } from './drop-app-warehouse-performance.component';

describe('DropAppWarehousePerformanceComponent', () => {
  let component: DropAppWarehousePerformanceComponent;
  let fixture: ComponentFixture<DropAppWarehousePerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropAppWarehousePerformanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropAppWarehousePerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

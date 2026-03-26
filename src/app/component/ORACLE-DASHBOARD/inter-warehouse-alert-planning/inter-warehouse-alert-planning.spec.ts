import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterWarehouseAlertPlanning } from './inter-warehouse-alert-planning';

describe('InterWarehouseAlertPlanning', () => {
  let component: InterWarehouseAlertPlanning;
  let fixture: ComponentFixture<InterWarehouseAlertPlanning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterWarehouseAlertPlanning]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterWarehouseAlertPlanning);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

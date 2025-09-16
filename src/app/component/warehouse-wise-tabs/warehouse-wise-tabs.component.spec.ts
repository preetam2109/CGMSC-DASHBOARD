import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseWiseTabsComponent } from './warehouse-wise-tabs.component';

describe('WarehouseWiseTabsComponent', () => {
  let component: WarehouseWiseTabsComponent;
  let fixture: ComponentFixture<WarehouseWiseTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseWiseTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseWiseTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

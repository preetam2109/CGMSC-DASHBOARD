import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseInfoComponent } from './warehouse-info.component';

describe('WarehouseInfoComponent', () => {
  let component: WarehouseInfoComponent;
  let fixture: ComponentFixture<WarehouseInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

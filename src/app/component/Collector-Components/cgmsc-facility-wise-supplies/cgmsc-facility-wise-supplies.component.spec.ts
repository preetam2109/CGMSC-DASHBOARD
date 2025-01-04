import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgmscFacilityWiseSuppliesComponent } from './cgmsc-facility-wise-supplies.component';

describe('CgmscFacilityWiseSuppliesComponent', () => {
  let component: CgmscFacilityWiseSuppliesComponent;
  let fixture: ComponentFixture<CgmscFacilityWiseSuppliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CgmscFacilityWiseSuppliesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CgmscFacilityWiseSuppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

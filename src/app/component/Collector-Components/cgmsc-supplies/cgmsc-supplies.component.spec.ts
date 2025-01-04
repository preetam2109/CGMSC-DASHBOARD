import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgmscSuppliesComponent } from './cgmsc-supplies.component';

describe('CgmscSuppliesComponent', () => {
  let component: CgmscSuppliesComponent;
  let fixture: ComponentFixture<CgmscSuppliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CgmscSuppliesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CgmscSuppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierComplianceAndGrievance } from './supplier-compliance-and-grievance';

describe('SupplierComplianceAndGrievance', () => {
  let component: SupplierComplianceAndGrievance;
  let fixture: ComponentFixture<SupplierComplianceAndGrievance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierComplianceAndGrievance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierComplianceAndGrievance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

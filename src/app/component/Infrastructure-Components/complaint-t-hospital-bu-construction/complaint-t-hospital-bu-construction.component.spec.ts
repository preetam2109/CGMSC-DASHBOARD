import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintTHospitalBuConstructionComponent } from './complaint-t-hospital-bu-construction.component';

describe('ComplaintTHospitalBuConstructionComponent', () => {
  let component: ComplaintTHospitalBuConstructionComponent;
  let fixture: ComponentFixture<ComplaintTHospitalBuConstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintTHospitalBuConstructionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintTHospitalBuConstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

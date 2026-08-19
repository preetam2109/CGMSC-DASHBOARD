import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicalCollegeHospitalNocAnalytics } from './medical-college-hospital-noc-analytics';

describe('MedicalCollegeHospitalNocAnalytics', () => {
  let component: MedicalCollegeHospitalNocAnalytics;
  let fixture: ComponentFixture<MedicalCollegeHospitalNocAnalytics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalCollegeHospitalNocAnalytics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalCollegeHospitalNocAnalytics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

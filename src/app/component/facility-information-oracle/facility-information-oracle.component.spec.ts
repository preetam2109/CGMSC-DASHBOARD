import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityInformationOracleComponent } from './facility-information-oracle.component';

describe('FacilityInformationOracleComponent', () => {
  let component: FacilityInformationOracleComponent;
  let fixture: ComponentFixture<FacilityInformationOracleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilityInformationOracleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityInformationOracleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

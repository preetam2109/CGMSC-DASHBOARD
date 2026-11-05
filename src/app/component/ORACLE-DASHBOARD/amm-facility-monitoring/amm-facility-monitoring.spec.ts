import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmmFacilityMonitoring } from './amm-facility-monitoring';

describe('AmmFacilityMonitoring', () => {
  let component: AmmFacilityMonitoring;
  let fixture: ComponentFixture<AmmFacilityMonitoring>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmmFacilityMonitoring]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmmFacilityMonitoring);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DHSFacilityStock } from './dhsfacility-stock';

describe('DHSFacilityStock', () => {
  let component: DHSFacilityStock;
  let fixture: ComponentFixture<DHSFacilityStock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DHSFacilityStock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DHSFacilityStock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

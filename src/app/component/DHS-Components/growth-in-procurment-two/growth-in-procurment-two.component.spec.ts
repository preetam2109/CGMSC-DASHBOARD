import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthInProcurmentTwoComponent } from './growth-in-procurment-two.component';

describe('GrowthInProcurmentTwoComponent', () => {
  let component: GrowthInProcurmentTwoComponent;
  let fixture: ComponentFixture<GrowthInProcurmentTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrowthInProcurmentTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrowthInProcurmentTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

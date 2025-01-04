import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthInProcurmentTabComponent } from './growth-in-procurment-tab.component';

describe('GrowthInProcurmentTabComponent', () => {
  let component: GrowthInProcurmentTabComponent;
  let fixture: ComponentFixture<GrowthInProcurmentTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrowthInProcurmentTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrowthInProcurmentTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

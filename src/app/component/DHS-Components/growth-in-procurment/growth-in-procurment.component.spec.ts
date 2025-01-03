import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthInProcurmentComponent } from './growth-in-procurment.component';

describe('GrowthInProcurmentComponent', () => {
  let component: GrowthInProcurmentComponent;
  let fixture: ComponentFixture<GrowthInProcurmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrowthInProcurmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrowthInProcurmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgmscstockDetailsReagentComponent } from './cgmscstock-details-reagent.component';

describe('CgmscstockDetailsReagentComponent', () => {
  let component: CgmscstockDetailsReagentComponent;
  let fixture: ComponentFixture<CgmscstockDetailsReagentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CgmscstockDetailsReagentComponent]
    });
    fixture = TestBed.createComponent(CgmscstockDetailsReagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

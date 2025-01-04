import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgmscstockReagentComponent } from './cgmscstock-reagent.component';

describe('CgmscstockReagentComponent', () => {
  let component: CgmscstockReagentComponent;
  let fixture: ComponentFixture<CgmscstockReagentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CgmscstockReagentComponent]
    });
    fixture = TestBed.createComponent(CgmscstockReagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

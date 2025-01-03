import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgmscstockDetailsDrugsComponent } from './cgmscstock-details-drugs.component';

describe('CgmscstockDetailsDrugsComponent', () => {
  let component: CgmscstockDetailsDrugsComponent;
  let fixture: ComponentFixture<CgmscstockDetailsDrugsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CgmscstockDetailsDrugsComponent]
    });
    fixture = TestBed.createComponent(CgmscstockDetailsDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

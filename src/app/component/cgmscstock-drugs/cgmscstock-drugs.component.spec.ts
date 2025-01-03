import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgmscstockDrugsComponent } from './cgmscstock-drugs.component';

describe('CgmscstockDrugsComponent', () => {
  let component: CgmscstockDrugsComponent;
  let fixture: ComponentFixture<CgmscstockDrugsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CgmscstockDrugsComponent]
    });
    fixture = TestBed.createComponent(CgmscstockDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

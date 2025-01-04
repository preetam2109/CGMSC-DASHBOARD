import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgmscstockDetailsAyushComponent } from './cgmscstock-details-ayush.component';

describe('CgmscstockDetailsAyushComponent', () => {
  let component: CgmscstockDetailsAyushComponent;
  let fixture: ComponentFixture<CgmscstockDetailsAyushComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CgmscstockDetailsAyushComponent]
    });
    fixture = TestBed.createComponent(CgmscstockDetailsAyushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

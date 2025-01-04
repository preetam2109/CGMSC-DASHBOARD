import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgmscstockAyushComponent } from './cgmscstock-ayush.component';

describe('CgmscstockAyushComponent', () => {
  let component: CgmscstockAyushComponent;
  let fixture: ComponentFixture<CgmscstockAyushComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CgmscstockAyushComponent]
    });
    fixture = TestBed.createComponent(CgmscstockAyushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

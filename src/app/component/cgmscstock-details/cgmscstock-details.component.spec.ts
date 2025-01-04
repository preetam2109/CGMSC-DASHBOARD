import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CGMSCStockDetailsComponent } from './cgmscstock-details.component';

describe('CGMSCStockDetailsComponent', () => {
  let component: CGMSCStockDetailsComponent;
  let fixture: ComponentFixture<CGMSCStockDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CGMSCStockDetailsComponent]
    });
    fixture = TestBed.createComponent(CGMSCStockDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

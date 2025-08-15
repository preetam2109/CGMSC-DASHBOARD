import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WHWiseStockOutComponent } from './wh-wise-stock-out.component';

describe('WHWiseStockOutComponent', () => {
  let component: WHWiseStockOutComponent;
  let fixture: ComponentFixture<WHWiseStockOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WHWiseStockOutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WHWiseStockOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

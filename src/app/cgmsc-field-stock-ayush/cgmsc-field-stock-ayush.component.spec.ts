import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgmscFieldStockAyushComponent } from './cgmsc-field-stock-ayush.component';

describe('CgmscFieldStockAyushComponent', () => {
  let component: CgmscFieldStockAyushComponent;
  let fixture: ComponentFixture<CgmscFieldStockAyushComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CgmscFieldStockAyushComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CgmscFieldStockAyushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

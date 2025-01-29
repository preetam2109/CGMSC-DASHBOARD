import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgmscFieldStockComponent } from './cgmsc-field-stock.component';

describe('CgmscFieldStockComponent', () => {
  let component: CgmscFieldStockComponent;
  let fixture: ComponentFixture<CgmscFieldStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CgmscFieldStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CgmscFieldStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

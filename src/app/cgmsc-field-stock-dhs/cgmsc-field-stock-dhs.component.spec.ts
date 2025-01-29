import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgmscFieldStockDhsComponent } from './cgmsc-field-stock-dhs.component';

describe('CgmscFieldStockDhsComponent', () => {
  let component: CgmscFieldStockDhsComponent;
  let fixture: ComponentFixture<CgmscFieldStockDhsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CgmscFieldStockDhsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CgmscFieldStockDhsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

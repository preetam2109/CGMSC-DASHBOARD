import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgmscFieldStockDmeComponent } from './cgmsc-field-stock-dme.component';

describe('CgmscFieldStockDmeComponent', () => {
  let component: CgmscFieldStockDmeComponent;
  let fixture: ComponentFixture<CgmscFieldStockDmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CgmscFieldStockDmeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CgmscFieldStockDmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

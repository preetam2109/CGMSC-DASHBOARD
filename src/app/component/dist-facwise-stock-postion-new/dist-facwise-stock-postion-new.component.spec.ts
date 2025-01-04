import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistFACwiseStockPostionNewComponent } from './dist-facwise-stock-postion-new.component';

describe('DistFACwiseStockPostionNewComponent', () => {
  let component: DistFACwiseStockPostionNewComponent;
  let fixture: ComponentFixture<DistFACwiseStockPostionNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistFACwiseStockPostionNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistFACwiseStockPostionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

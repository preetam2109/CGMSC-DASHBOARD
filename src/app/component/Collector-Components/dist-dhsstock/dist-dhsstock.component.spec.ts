import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistDHSStockComponent } from './dist-dhsstock.component';

describe('DistDHSStockComponent', () => {
  let component: DistDHSStockComponent;
  let fixture: ComponentFixture<DistDHSStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistDHSStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistDHSStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

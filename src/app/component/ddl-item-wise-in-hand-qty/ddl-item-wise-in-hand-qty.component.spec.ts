import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdlItemWiseInHandQtyComponent } from './ddl-item-wise-in-hand-qty.component';

describe('DdlItemWiseInHandQtyComponent', () => {
  let component: DdlItemWiseInHandQtyComponent;
  let fixture: ComponentFixture<DdlItemWiseInHandQtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DdlItemWiseInHandQtyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DdlItemWiseInHandQtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

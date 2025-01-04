import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTakenBySupplierComponent } from './time-taken-by-supplier.component';

describe('TimeTakenBySupplierComponent', () => {
  let component: TimeTakenBySupplierComponent;
  let fixture: ComponentFixture<TimeTakenBySupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeTakenBySupplierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeTakenBySupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

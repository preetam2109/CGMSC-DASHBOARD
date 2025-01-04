import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidTimeTakenComponent } from './paid-time-taken.component';

describe('PaidTimeTakenComponent', () => {
  let component: PaidTimeTakenComponent;
  let fixture: ComponentFixture<PaidTimeTakenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaidTimeTakenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaidTimeTakenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DhsLiftingStatusComponent } from './dhs-lifting-status.component';

describe('DhsLiftingStatusComponent', () => {
  let component: DhsLiftingStatusComponent;
  let fixture: ComponentFixture<DhsLiftingStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DhsLiftingStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DhsLiftingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

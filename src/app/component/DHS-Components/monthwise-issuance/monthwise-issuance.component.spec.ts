import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthwiseIssuanceComponent } from './monthwise-issuance.component';

describe('MonthwiseIssuanceComponent', () => {
  let component: MonthwiseIssuanceComponent;
  let fixture: ComponentFixture<MonthwiseIssuanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthwiseIssuanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthwiseIssuanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

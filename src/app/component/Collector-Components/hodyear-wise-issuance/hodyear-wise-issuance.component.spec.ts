import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HODYearWiseIssuanceComponent } from './hodyear-wise-issuance.component';

describe('HODYearWiseIssuanceComponent', () => {
  let component: HODYearWiseIssuanceComponent;
  let fixture: ComponentFixture<HODYearWiseIssuanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HODYearWiseIssuanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HODYearWiseIssuanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

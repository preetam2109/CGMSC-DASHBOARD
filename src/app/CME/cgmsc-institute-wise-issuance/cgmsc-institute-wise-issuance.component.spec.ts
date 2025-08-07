import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgmscInstituteWiseIssuanceComponent } from './cgmsc-institute-wise-issuance.component';

describe('CgmscInstituteWiseIssuanceComponent', () => {
  let component: CgmscInstituteWiseIssuanceComponent;
  let fixture: ComponentFixture<CgmscInstituteWiseIssuanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CgmscInstituteWiseIssuanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CgmscInstituteWiseIssuanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

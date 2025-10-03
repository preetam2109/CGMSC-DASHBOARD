import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmeFacNocSummaryComponent } from './dme-fac-noc-summary.component';

describe('DmeFacNocSummaryComponent', () => {
  let component: DmeFacNocSummaryComponent;
  let fixture: ComponentFixture<DmeFacNocSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DmeFacNocSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DmeFacNocSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

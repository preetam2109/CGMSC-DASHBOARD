import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgmscQcPendingStatus } from './cgmsc-qc-pending-status';

describe('CgmscQcPendingStatus', () => {
  let component: CgmscQcPendingStatus;
  let fixture: ComponentFixture<CgmscQcPendingStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CgmscQcPendingStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CgmscQcPendingStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

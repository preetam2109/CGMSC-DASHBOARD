import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundReleaseManagement } from './fund-release-management';

describe('FundReleaseManagement', () => {
  let component: FundReleaseManagement;
  let fixture: ComponentFixture<FundReleaseManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundReleaseManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundReleaseManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

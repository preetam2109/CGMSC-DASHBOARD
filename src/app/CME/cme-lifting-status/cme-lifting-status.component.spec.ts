import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmeLiftingStatusComponent } from './cme-lifting-status.component';

describe('CmeLiftingStatusComponent', () => {
  let component: CmeLiftingStatusComponent;
  let fixture: ComponentFixture<CmeLiftingStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmeLiftingStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmeLiftingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

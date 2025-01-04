import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmdPendingTenderwiseComponent } from './emd-pending-tenderwise.component';

describe('EmdPendingTenderwiseComponent', () => {
  let component: EmdPendingTenderwiseComponent;
  let fixture: ComponentFixture<EmdPendingTenderwiseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmdPendingTenderwiseComponent]
    });
    fixture = TestBed.createComponent(EmdPendingTenderwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

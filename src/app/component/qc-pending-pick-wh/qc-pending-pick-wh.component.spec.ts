import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcPendingPickWhComponent } from './qc-pending-pick-wh.component';

describe('QcPendingPickWhComponent', () => {
  let component: QcPendingPickWhComponent;
  let fixture: ComponentFixture<QcPendingPickWhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QcPendingPickWhComponent]
    });
    fixture = TestBed.createComponent(QcPendingPickWhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

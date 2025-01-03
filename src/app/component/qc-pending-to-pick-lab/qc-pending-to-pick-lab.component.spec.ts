import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcPendingToPickLabComponent } from './qc-pending-to-pick-lab.component';

describe('QcPendingToPickLabComponent', () => {
  let component: QcPendingToPickLabComponent;
  let fixture: ComponentFixture<QcPendingToPickLabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QcPendingToPickLabComponent]
    });
    fixture = TestBed.createComponent(QcPendingToPickLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

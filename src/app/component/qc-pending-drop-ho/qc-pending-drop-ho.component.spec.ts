import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcPendingDropHoComponent } from './qc-pending-drop-ho.component';

describe('QcPendingDropHoComponent', () => {
  let component: QcPendingDropHoComponent;
  let fixture: ComponentFixture<QcPendingDropHoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QcPendingDropHoComponent]
    });
    fixture = TestBed.createComponent(QcPendingDropHoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

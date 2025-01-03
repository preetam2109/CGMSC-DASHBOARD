import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcPendingsComponent } from './qc-pendings.component';

describe('QcPendingsComponent', () => {
  let component: QcPendingsComponent;
  let fixture: ComponentFixture<QcPendingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QcPendingsComponent]
    });
    fixture = TestBed.createComponent(QcPendingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

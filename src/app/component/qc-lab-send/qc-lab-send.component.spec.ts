import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QCLabSendComponent } from './qc-lab-send.component';

describe('QCLabSendComponent', () => {
  let component: QCLabSendComponent;
  let fixture: ComponentFixture<QCLabSendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QCLabSendComponent]
    });
    fixture = TestBed.createComponent(QCLabSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

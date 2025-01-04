import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NOCPendingAtCGMSCComponent } from './nocpending-at-cgmsc.component';

describe('NOCPendingAtCGMSCComponent', () => {
  let component: NOCPendingAtCGMSCComponent;
  let fixture: ComponentFixture<NOCPendingAtCGMSCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NOCPendingAtCGMSCComponent]
    });
    fixture = TestBed.createComponent(NOCPendingAtCGMSCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

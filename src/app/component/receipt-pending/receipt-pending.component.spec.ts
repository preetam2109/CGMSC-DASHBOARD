import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptPendingComponent } from './receipt-pending.component';

describe('ReceiptPendingComponent', () => {
  let component: ReceiptPendingComponent;
  let fixture: ComponentFixture<ReceiptPendingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceiptPendingComponent]
    });
    fixture = TestBed.createComponent(ReceiptPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

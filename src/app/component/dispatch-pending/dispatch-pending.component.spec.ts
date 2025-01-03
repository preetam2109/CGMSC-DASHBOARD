import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchPendingComponent } from './dispatch-pending.component';

describe('DispatchPendingComponent', () => {
  let component: DispatchPendingComponent;
  let fixture: ComponentFixture<DispatchPendingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DispatchPendingComponent]
    });
    fixture = TestBed.createComponent(DispatchPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

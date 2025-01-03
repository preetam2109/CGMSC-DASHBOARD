import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchPendingOneComponent } from './dispatch-pending-one.component';

describe('DispatchPendingOneComponent', () => {
  let component: DispatchPendingOneComponent;
  let fixture: ComponentFixture<DispatchPendingOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DispatchPendingOneComponent]
    });
    fixture = TestBed.createComponent(DispatchPendingOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

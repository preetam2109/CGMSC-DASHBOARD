import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmdPendingComponent } from './emd-pending.component';

describe('EmdPendingComponent', () => {
  let component: EmdPendingComponent;
  let fixture: ComponentFixture<EmdPendingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmdPendingComponent]
    });
    fixture = TestBed.createComponent(EmdPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

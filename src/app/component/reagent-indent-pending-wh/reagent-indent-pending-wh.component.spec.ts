import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReagentIndentPendingWhComponent } from './reagent-indent-pending-wh.component';

describe('ReagentIndentPendingWhComponent', () => {
  let component: ReagentIndentPendingWhComponent;
  let fixture: ComponentFixture<ReagentIndentPendingWhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReagentIndentPendingWhComponent]
    });
    fixture = TestBed.createComponent(ReagentIndentPendingWhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

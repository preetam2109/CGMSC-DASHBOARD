import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentPendingWHComponent } from './indent-pending-wh.component';

describe('IndentPendingWHComponent', () => {
  let component: IndentPendingWHComponent;
  let fixture: ComponentFixture<IndentPendingWHComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndentPendingWHComponent]
    });
    fixture = TestBed.createComponent(IndentPendingWHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

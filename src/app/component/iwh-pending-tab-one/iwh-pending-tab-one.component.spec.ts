import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IwhPendingTabOneComponent } from './iwh-pending-tab-one.component';

describe('IwhPendingTabOneComponent', () => {
  let component: IwhPendingTabOneComponent;
  let fixture: ComponentFixture<IwhPendingTabOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IwhPendingTabOneComponent]
    });
    fixture = TestBed.createComponent(IwhPendingTabOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

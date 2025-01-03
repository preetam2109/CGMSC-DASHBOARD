import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IwhPendingTabTwoComponent } from './iwh-pending-tab-two.component';

describe('IwhPendingTabTwoComponent', () => {
  let component: IwhPendingTabTwoComponent;
  let fixture: ComponentFixture<IwhPendingTabTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IwhPendingTabTwoComponent]
    });
    fixture = TestBed.createComponent(IwhPendingTabTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

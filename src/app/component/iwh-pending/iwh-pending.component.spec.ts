import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IwhPendingComponent } from './iwh-pending.component';

describe('IwhPendingComponent', () => {
  let component: IwhPendingComponent;
  let fixture: ComponentFixture<IwhPendingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IwhPendingComponent]
    });
    fixture = TestBed.createComponent(IwhPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

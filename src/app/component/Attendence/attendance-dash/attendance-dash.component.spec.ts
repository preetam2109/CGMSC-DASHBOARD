import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceDashComponent } from './attendance-dash.component';

describe('AttendanceDashComponent', () => {
  let component: AttendanceDashComponent;
  let fixture: ComponentFixture<AttendanceDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceDashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

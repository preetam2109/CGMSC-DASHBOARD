import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendancePresentAbsentComponent } from './attendance-present-absent.component';

describe('AttendancePresentAbsentComponent', () => {
  let component: AttendancePresentAbsentComponent;
  let fixture: ComponentFixture<AttendancePresentAbsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendancePresentAbsentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendancePresentAbsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

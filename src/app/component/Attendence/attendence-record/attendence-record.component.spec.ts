import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendenceRecordComponent } from './attendence-record.component';

describe('AttendenceRecordComponent', () => {
  let component: AttendenceRecordComponent;
  let fixture: ComponentFixture<AttendenceRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendenceRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendenceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

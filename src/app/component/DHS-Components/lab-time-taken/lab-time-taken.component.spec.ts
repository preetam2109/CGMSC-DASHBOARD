import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabTimeTakenComponent } from './lab-time-taken.component';

describe('LabTimeTakenComponent', () => {
  let component: LabTimeTakenComponent;
  let fixture: ComponentFixture<LabTimeTakenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabTimeTakenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabTimeTakenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

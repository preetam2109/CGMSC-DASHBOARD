import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningWorkComponent } from './running-work.component';

describe('RunningWorkComponent', () => {
  let component: RunningWorkComponent;
  let fixture: ComponentFixture<RunningWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunningWorkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunningWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

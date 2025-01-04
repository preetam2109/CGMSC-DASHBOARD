import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionProgressComponent } from './division-progress.component';

describe('DivisionProgressComponent', () => {
  let component: DivisionProgressComponent;
  let fixture: ComponentFixture<DivisionProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DivisionProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivisionProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

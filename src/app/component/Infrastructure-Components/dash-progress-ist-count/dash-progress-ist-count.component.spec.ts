import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashProgressIstCountComponent } from './dash-progress-ist-count.component';

describe('DashProgressIstCountComponent', () => {
  let component: DashProgressIstCountComponent;
  let fixture: ComponentFixture<DashProgressIstCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashProgressIstCountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashProgressIstCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

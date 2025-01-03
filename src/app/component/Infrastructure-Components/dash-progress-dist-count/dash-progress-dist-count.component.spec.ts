import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashProgressDistCountComponent } from './dash-progress-dist-count.component';

describe('DashProgressDistCountComponent', () => {
  let component: DashProgressDistCountComponent;
  let fixture: ComponentFixture<DashProgressDistCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashProgressDistCountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashProgressDistCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

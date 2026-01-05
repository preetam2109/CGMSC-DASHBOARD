import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RcStatusDashboardComponent } from './rc-status-dashboard.component';

describe('RcStatusDashboardComponent', () => {
  let component: RcStatusDashboardComponent;
  let fixture: ComponentFixture<RcStatusDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RcStatusDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RcStatusDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

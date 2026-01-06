import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderStatusDashboardComponent } from './tender-status-dashboard.component';

describe('TenderStatusDashboardComponent', () => {
  let component: TenderStatusDashboardComponent;
  let fixture: ComponentFixture<TenderStatusDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenderStatusDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenderStatusDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

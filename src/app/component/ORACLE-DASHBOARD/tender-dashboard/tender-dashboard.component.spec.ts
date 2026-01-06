import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderDashboardComponent } from './tender-dashboard.component';

describe('TenderDashboardComponent', () => {
  let component: TenderDashboardComponent;
  let fixture: ComponentFixture<TenderDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenderDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenderDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

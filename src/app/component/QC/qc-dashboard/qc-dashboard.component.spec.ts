import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcDashboardComponent } from './qc-dashboard.component';

describe('QcDashboardComponent', () => {
  let component: QcDashboardComponent;
  let fixture: ComponentFixture<QcDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QcDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QcDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmdDashboardComponent } from './emd-dashboard.component';

describe('EmdDashboardComponent', () => {
  let component: EmdDashboardComponent;
  let fixture: ComponentFixture<EmdDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmdDashboardComponent]
    });
    fixture = TestBed.createComponent(EmdDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

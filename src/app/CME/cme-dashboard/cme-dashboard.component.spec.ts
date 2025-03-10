import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMEDashboardComponent } from './cme-dashboard.component';

describe('CMEDashboardComponent', () => {
  let component: CMEDashboardComponent;
  let fixture: ComponentFixture<CMEDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CMEDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CMEDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderStatusDashCmeComponent } from './tender-status-dash-cme.component';

describe('TenderStatusDashCmeComponent', () => {
  let component: TenderStatusDashCmeComponent;
  let fixture: ComponentFixture<TenderStatusDashCmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenderStatusDashCmeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenderStatusDashCmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

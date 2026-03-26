import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayementStatusInsights } from './payement-status-insights';

describe('PayementStatusInsights', () => {
  let component: PayementStatusInsights;
  let fixture: ComponentFixture<PayementStatusInsights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayementStatusInsights]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayementStatusInsights);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceDashComponent } from './finance-dash.component';

describe('FinanceDashComponent', () => {
  let component: FinanceDashComponent;
  let fixture: ComponentFixture<FinanceDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceDashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

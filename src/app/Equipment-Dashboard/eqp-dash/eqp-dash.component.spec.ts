import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EqpDashComponent } from './eqp-dash.component';

describe('EqpDashComponent', () => {
  let component: EqpDashComponent;
  let fixture: ComponentFixture<EqpDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EqpDashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EqpDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

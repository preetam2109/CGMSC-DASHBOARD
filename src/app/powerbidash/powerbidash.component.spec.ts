import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerbidashComponent } from './powerbidash.component';

describe('PowerbidashComponent', () => {
  let component: PowerbidashComponent;
  let fixture: ComponentFixture<PowerbidashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PowerbidashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PowerbidashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

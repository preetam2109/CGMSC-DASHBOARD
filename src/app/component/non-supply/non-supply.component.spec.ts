import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonSupplyComponent } from './non-supply.component';

describe('NonSupplyComponent', () => {
  let component: NonSupplyComponent;
  let fixture: ComponentFixture<NonSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NonSupplyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

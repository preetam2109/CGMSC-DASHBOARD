import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuedPerWiseComponent } from './issued-per-wise.component';

describe('IssuedPerWiseComponent', () => {
  let component: IssuedPerWiseComponent;
  let fixture: ComponentFixture<IssuedPerWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssuedPerWiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssuedPerWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

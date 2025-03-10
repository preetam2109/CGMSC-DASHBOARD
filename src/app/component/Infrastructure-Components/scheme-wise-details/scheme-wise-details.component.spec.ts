import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeWiseDetailsComponent } from './scheme-wise-details.component';

describe('SchemeWiseDetailsComponent', () => {
  let component: SchemeWiseDetailsComponent;
  let fixture: ComponentFixture<SchemeWiseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchemeWiseDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchemeWiseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

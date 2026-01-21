import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitUnFit } from './fit-un-fit';

describe('FitUnFit', () => {
  let component: FitUnFit;
  let fixture: ComponentFixture<FitUnFit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitUnFit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitUnFit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

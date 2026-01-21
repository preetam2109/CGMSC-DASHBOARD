import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitUnFitInfrastructure } from './fit-un-fit-infrastructure';

describe('FitUnFitInfrastructure', () => {
  let component: FitUnFitInfrastructure;
  let fixture: ComponentFixture<FitUnFitInfrastructure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitUnFitInfrastructure]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitUnFitInfrastructure);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

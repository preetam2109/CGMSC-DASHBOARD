import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacCoverageComponent } from './fac-coverage.component';

describe('FacCoverageComponent', () => {
  let component: FacCoverageComponent;
  let fixture: ComponentFixture<FacCoverageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacCoverageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictProgressComponent } from './district-progress.component';

describe('DistrictProgressComponent', () => {
  let component: DistrictProgressComponent;
  let fixture: ComponentFixture<DistrictProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistrictProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistrictProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

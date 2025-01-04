import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgmscCurrentYearComponent } from './cgmsc-current-year.component';

describe('CgmscCurrentYearComponent', () => {
  let component: CgmscCurrentYearComponent;
  let fixture: ComponentFixture<CgmscCurrentYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CgmscCurrentYearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CgmscCurrentYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

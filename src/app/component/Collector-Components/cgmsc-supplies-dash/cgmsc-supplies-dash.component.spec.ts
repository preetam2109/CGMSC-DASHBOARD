import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgmscSuppliesDashComponent } from './cgmsc-supplies-dash.component';

describe('CgmscSuppliesDashComponent', () => {
  let component: CgmscSuppliesDashComponent;
  let fixture: ComponentFixture<CgmscSuppliesDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CgmscSuppliesDashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CgmscSuppliesDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgmscSuppliesDmeComponent } from './cgmsc-supplies-dme.component';

describe('CgmscSuppliesDmeComponent', () => {
  let component: CgmscSuppliesDmeComponent;
  let fixture: ComponentFixture<CgmscSuppliesDmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CgmscSuppliesDmeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CgmscSuppliesDmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

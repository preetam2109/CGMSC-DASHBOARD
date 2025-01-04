import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgmscSuppliesAyushComponent } from './cgmsc-supplies-ayush.component';

describe('CgmscSuppliesAyushComponent', () => {
  let component: CgmscSuppliesAyushComponent;
  let fixture: ComponentFixture<CgmscSuppliesAyushComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CgmscSuppliesAyushComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CgmscSuppliesAyushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

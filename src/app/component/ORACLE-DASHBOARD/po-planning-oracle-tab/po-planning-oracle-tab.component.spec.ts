import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoPlanningOracleTabComponent } from './po-planning-oracle-tab.component';

describe('PoPlanningOracleTabComponent', () => {
  let component: PoPlanningOracleTabComponent;
  let fixture: ComponentFixture<PoPlanningOracleTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoPlanningOracleTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoPlanningOracleTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

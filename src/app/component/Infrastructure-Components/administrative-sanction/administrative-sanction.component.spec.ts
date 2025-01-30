import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeSanctionComponent } from './administrative-sanction.component';

describe('AdministrativeSanctionComponent', () => {
  let component: AdministrativeSanctionComponent;
  let fixture: ComponentFixture<AdministrativeSanctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministrativeSanctionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrativeSanctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

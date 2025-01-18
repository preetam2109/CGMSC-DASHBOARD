import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalSanctionComponent } from './technical-sanction.component';

describe('TechnicalSanctionComponent', () => {
  let component: TechnicalSanctionComponent;
  let fixture: ComponentFixture<TechnicalSanctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicalSanctionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicalSanctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

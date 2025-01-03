import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiswiseIssuanceComponent } from './diswise-issuance.component';

describe('DiswiseIssuanceComponent', () => {
  let component: DiswiseIssuanceComponent;
  let fixture: ComponentFixture<DiswiseIssuanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiswiseIssuanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiswiseIssuanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

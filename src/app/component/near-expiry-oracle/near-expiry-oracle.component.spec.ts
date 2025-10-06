import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearExpiryOracleComponent } from './near-expiry-oracle.component';

describe('NearExpiryOracleComponent', () => {
  let component: NearExpiryOracleComponent;
  let fixture: ComponentFixture<NearExpiryOracleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NearExpiryOracleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NearExpiryOracleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

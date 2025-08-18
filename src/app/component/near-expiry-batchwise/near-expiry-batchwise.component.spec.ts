import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearExpiryBatchwiseComponent } from './near-expiry-batchwise.component';

describe('NearExpiryBatchwiseComponent', () => {
  let component: NearExpiryBatchwiseComponent;
  let fixture: ComponentFixture<NearExpiryBatchwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NearExpiryBatchwiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NearExpiryBatchwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

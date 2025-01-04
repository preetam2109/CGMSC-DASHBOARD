import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearExpiryComponent } from './near-expiry.component';

describe('NearExpiryComponent', () => {
  let component: NearExpiryComponent;
  let fixture: ComponentFixture<NearExpiryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NearExpiryComponent]
    });
    fixture = TestBed.createComponent(NearExpiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

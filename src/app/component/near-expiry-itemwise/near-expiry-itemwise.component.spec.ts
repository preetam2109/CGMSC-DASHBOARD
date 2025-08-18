import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearExpiryItemwiseComponent } from './near-expiry-itemwise.component';

describe('NearExpiryItemwiseComponent', () => {
  let component: NearExpiryItemwiseComponent;
  let fixture: ComponentFixture<NearExpiryItemwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NearExpiryItemwiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NearExpiryItemwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

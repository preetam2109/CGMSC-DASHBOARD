import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AamNearExpiryMonitoring } from './aam-near-expiry-monitoring';

describe('AamNearExpiryMonitoring', () => {
  let component: AamNearExpiryMonitoring;
  let fixture: ComponentFixture<AamNearExpiryMonitoring>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AamNearExpiryMonitoring]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AamNearExpiryMonitoring);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

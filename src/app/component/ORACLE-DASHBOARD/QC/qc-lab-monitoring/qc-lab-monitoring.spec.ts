import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QcLabMonitoring } from './qc-lab-monitoring';

describe('QcLabMonitoring', () => {
  let component: QcLabMonitoring;
  let fixture: ComponentFixture<QcLabMonitoring>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QcLabMonitoring]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QcLabMonitoring);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

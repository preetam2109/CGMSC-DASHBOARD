import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QCSampleTrackingUnderEmpanelledLab } from './qcsample-tracking-under-empanelled-lab';

describe('QCSampleTrackingUnderEmpanelledLab', () => {
  let component: QCSampleTrackingUnderEmpanelledLab;
  let fixture: ComponentFixture<QCSampleTrackingUnderEmpanelledLab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QCSampleTrackingUnderEmpanelledLab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QCSampleTrackingUnderEmpanelledLab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

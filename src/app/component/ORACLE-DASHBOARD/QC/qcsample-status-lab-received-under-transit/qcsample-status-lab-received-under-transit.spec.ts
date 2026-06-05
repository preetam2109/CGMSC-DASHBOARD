import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QCSampleStatusLabReceivedUnderTransit } from './qcsample-status-lab-received-under-transit';

describe('QCSampleStatusLabReceivedUnderTransit', () => {
  let component: QCSampleStatusLabReceivedUnderTransit;
  let fixture: ComponentFixture<QCSampleStatusLabReceivedUnderTransit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QCSampleStatusLabReceivedUnderTransit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QCSampleStatusLabReceivedUnderTransit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

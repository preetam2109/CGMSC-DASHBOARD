import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcPerformance } from './qc-performance';

describe('QcPerformance', () => {
  let component: QcPerformance;
  let fixture: ComponentFixture<QcPerformance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QcPerformance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QcPerformance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

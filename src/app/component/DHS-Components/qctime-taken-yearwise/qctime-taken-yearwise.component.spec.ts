import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QCTimeTakenYearwiseComponent } from './qctime-taken-yearwise.component';

describe('QCTimeTakenYearwiseComponent', () => {
  let component: QCTimeTakenYearwiseComponent;
  let fixture: ComponentFixture<QCTimeTakenYearwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QCTimeTakenYearwiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QCTimeTakenYearwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

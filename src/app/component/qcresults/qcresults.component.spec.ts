import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QCResultsComponent } from './qcresults.component';

describe('QCResultsComponent', () => {
  let component: QCResultsComponent;
  let fixture: ComponentFixture<QCResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QCResultsComponent]
    });
    fixture = TestBed.createComponent(QCResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

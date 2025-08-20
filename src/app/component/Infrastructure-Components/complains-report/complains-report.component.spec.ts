import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplainsReportComponent } from './complains-report.component';

describe('ComplainsReportComponent', () => {
  let component: ComplainsReportComponent;
  let fixture: ComponentFixture<ComplainsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplainsReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplainsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

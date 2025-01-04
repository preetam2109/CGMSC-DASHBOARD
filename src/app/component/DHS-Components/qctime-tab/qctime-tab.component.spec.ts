import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QCTimeTabComponent } from './qctime-tab.component';

describe('QCTimeTabComponent', () => {
  let component: QCTimeTabComponent;
  let fixture: ComponentFixture<QCTimeTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QCTimeTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QCTimeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

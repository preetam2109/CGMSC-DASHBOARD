import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QcCourier } from './qc-courier';

describe('QcCourier', () => {
  let component: QcCourier;
  let fixture: ComponentFixture<QcCourier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QcCourier]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QcCourier);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

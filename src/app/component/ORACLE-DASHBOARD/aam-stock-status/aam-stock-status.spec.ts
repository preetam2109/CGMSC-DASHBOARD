import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AamStockStatus } from './aam-stock-status';

describe('AamStockStatus', () => {
  let component: AamStockStatus;
  let fixture: ComponentFixture<AamStockStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AamStockStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AamStockStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

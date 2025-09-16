import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldBatchHistoryComponent } from './hold-batch-history.component';

describe('HoldBatchHistoryComponent', () => {
  let component: HoldBatchHistoryComponent;
  let fixture: ComponentFixture<HoldBatchHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoldBatchHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoldBatchHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

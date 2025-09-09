import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchWisePoDetailComponent } from './batch-wise-po-detail.component';

describe('BatchWisePoDetailComponent', () => {
  let component: BatchWisePoDetailComponent;
  let fixture: ComponentFixture<BatchWisePoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchWisePoDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchWisePoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

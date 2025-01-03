import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPipeLineDialogComponent } from './total-pipe-line-dialog.component';

describe('TotalPipeLineDialogComponent', () => {
  let component: TotalPipeLineDialogComponent;
  let fixture: ComponentFixture<TotalPipeLineDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalPipeLineDialogComponent]
    });
    fixture = TestBed.createComponent(TotalPipeLineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

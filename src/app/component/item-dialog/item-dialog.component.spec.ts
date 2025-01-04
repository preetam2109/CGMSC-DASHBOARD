import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDialogComponent } from './item-dialog.component';

describe('ItemDialogComponent', () => {
  let component: ItemDialogComponent;
  let fixture: ComponentFixture<ItemDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemDialogComponent]
    });
    fixture = TestBed.createComponent(ItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

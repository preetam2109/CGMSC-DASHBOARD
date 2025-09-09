import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWisePoDetailComponent } from './item-wise-po-detail.component';

describe('ItemWisePoDetailComponent', () => {
  let component: ItemWisePoDetailComponent;
  let fixture: ComponentFixture<ItemWisePoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemWisePoDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemWisePoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

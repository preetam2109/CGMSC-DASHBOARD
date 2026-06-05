import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWiseStock } from './item-wise-stock';

describe('ItemWiseStock', () => {
  let component: ItemWiseStock;
  let fixture: ComponentFixture<ItemWiseStock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemWiseStock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemWiseStock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

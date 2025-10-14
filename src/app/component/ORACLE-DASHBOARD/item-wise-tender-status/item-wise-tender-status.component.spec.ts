import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWiseTenderStatusComponent } from './item-wise-tender-status.component';

describe('ItemWiseTenderStatusComponent', () => {
  let component: ItemWiseTenderStatusComponent;
  let fixture: ComponentFixture<ItemWiseTenderStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemWiseTenderStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemWiseTenderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

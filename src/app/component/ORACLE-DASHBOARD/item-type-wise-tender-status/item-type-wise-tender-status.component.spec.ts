import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTypeWiseTenderStatusComponent } from './item-type-wise-tender-status.component';

describe('ItemTypeWiseTenderStatusComponent', () => {
  let component: ItemTypeWiseTenderStatusComponent;
  let fixture: ComponentFixture<ItemTypeWiseTenderStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemTypeWiseTenderStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemTypeWiseTenderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

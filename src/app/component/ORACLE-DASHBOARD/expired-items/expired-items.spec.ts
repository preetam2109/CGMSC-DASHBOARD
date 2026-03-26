import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredItems } from './expired-items';

describe('ExpiredItems', () => {
  let component: ExpiredItems;
  let fixture: ComponentFixture<ExpiredItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpiredItems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpiredItems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

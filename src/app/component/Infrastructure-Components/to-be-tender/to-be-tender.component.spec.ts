import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToBeTenderComponent } from './to-be-tender.component';

describe('ToBeTenderComponent', () => {
  let component: ToBeTenderComponent;
  let fixture: ComponentFixture<ToBeTenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToBeTenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToBeTenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

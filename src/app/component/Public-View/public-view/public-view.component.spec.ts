import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicViewComponent } from './public-view.component';

describe('PublicViewComponent', () => {
  let component: PublicViewComponent;
  let fixture: ComponentFixture<PublicViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

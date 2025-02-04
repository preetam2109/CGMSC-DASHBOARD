import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSearchComponent } from './home-search.component';

describe('HomeSearchComponent', () => {
  let component: HomeSearchComponent;
  let fixture: ComponentFixture<HomeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

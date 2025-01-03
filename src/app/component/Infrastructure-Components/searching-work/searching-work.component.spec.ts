import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchingWorkComponent } from './searching-work.component';

describe('SearchingWorkComponent', () => {
  let component: SearchingWorkComponent;
  let fixture: ComponentFixture<SearchingWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchingWorkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchingWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

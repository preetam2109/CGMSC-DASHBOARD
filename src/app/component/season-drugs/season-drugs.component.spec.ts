import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonDrugsComponent } from './season-drugs.component';

describe('SeasonDrugsComponent', () => {
  let component: SeasonDrugsComponent;
  let fixture: ComponentFixture<SeasonDrugsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonDrugsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeasonDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoPlanningComponent } from './po-planning.component';

describe('PoPlanningComponent', () => {
  let component: PoPlanningComponent;
  let fixture: ComponentFixture<PoPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoPlanningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

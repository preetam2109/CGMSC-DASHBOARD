import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PbiPoPlanningComponent } from './pbi-po-planning.component';

describe('PbiPoPlanningComponent', () => {
  let component: PbiPoPlanningComponent;
  let fixture: ComponentFixture<PbiPoPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PbiPoPlanningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PbiPoPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

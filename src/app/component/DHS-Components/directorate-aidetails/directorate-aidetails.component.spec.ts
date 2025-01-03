import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorateAIDetailsComponent } from './directorate-aidetails.component';

describe('DirectorateAIDetailsComponent', () => {
  let component: DirectorateAIDetailsComponent;
  let fixture: ComponentFixture<DirectorateAIDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectorateAIDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorateAIDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

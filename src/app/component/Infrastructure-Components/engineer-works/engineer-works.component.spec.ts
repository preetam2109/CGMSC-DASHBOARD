import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerWorksComponent } from './engineer-works.component';

describe('EngineerWorksComponent', () => {
  let component: EngineerWorksComponent;
  let fixture: ComponentFixture<EngineerWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngineerWorksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

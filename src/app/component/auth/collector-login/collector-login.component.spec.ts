import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectorLoginComponent } from './collector-login.component';

describe('CollectorLoginComponent', () => {
  let component: CollectorLoginComponent;
  let fixture: ComponentFixture<CollectorLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectorLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

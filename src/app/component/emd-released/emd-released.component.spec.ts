import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmdReleasedComponent } from './emd-released.component';

describe('EmdReleasedComponent', () => {
  let component: EmdReleasedComponent;
  let fixture: ComponentFixture<EmdReleasedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmdReleasedComponent]
    });
    fixture = TestBed.createComponent(EmdReleasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

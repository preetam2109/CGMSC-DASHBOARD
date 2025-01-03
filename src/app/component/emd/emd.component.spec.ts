import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmdComponent } from './emd.component';

describe('EmdComponent', () => {
  let component: EmdComponent;
  let fixture: ComponentFixture<EmdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmdComponent]
    });
    fixture = TestBed.createComponent(EmdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

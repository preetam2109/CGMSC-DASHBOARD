import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NOCComponent } from './noc.component';

describe('NOCComponent', () => {
  let component: NOCComponent;
  let fixture: ComponentFixture<NOCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NOCComponent]
    });
    fixture = TestBed.createComponent(NOCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

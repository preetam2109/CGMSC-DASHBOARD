import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DHSComponent } from './dhs.component';

describe('DHSComponent', () => {
  let component: DHSComponent;
  let fixture: ComponentFixture<DHSComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DHSComponent]
    });
    fixture = TestBed.createComponent(DHSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

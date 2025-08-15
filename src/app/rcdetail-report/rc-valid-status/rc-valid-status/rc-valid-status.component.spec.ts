import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RcValidStatusComponent } from './rc-valid-status.component';

describe('RcValidStatusComponent', () => {
  let component: RcValidStatusComponent;
  let fixture: ComponentFixture<RcValidStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RcValidStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RcValidStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

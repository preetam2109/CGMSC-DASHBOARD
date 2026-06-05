import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Qclab } from './qclab';

describe('Qclab', () => {
  let component: Qclab;
  let fixture: ComponentFixture<Qclab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Qclab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Qclab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

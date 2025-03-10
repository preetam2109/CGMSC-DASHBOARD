import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DhsdashComponent } from './dhsdash.component';

describe('DhsdashComponent', () => {
  let component: DhsdashComponent;
  let fixture: ComponentFixture<DhsdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DhsdashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DhsdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

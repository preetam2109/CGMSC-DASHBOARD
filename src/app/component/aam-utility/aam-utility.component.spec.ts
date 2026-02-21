import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AAMUtilityComponent } from './aam-utility.component';

describe('AAMUtilityComponent', () => {
  let component: AAMUtilityComponent;
  let fixture: ComponentFixture<AAMUtilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AAMUtilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AAMUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

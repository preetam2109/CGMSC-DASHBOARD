import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RCPOPlanning } from './rcpo-planning';

describe('RCPOPlanning', () => {
  let component: RCPOPlanning;
  let fixture: ComponentFixture<RCPOPlanning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RCPOPlanning]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RCPOPlanning);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

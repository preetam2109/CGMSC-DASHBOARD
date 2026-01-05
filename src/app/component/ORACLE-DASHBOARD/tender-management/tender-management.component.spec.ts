import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderManagementComponent } from './tender-management.component';

describe('TenderManagementComponent', () => {
  let component: TenderManagementComponent;
  let fixture: ComponentFixture<TenderManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenderManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenderManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationPendingComponent } from './installation-pending.component';

describe('InstallationPendingComponent', () => {
  let component: InstallationPendingComponent;
  let fixture: ComponentFixture<InstallationPendingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstallationPendingComponent]
    });
    fixture = TestBed.createComponent(InstallationPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

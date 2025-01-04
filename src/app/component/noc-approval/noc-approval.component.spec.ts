import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NocApprovalComponent } from './noc-approval.component';

describe('NocApprovalComponent', () => {
  let component: NocApprovalComponent;
  let fixture: ComponentFixture<NocApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NocApprovalComponent]
    });
    fixture = TestBed.createComponent(NocApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

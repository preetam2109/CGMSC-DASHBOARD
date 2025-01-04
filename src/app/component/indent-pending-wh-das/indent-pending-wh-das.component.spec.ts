import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentPendingWhDasComponent } from './indent-pending-wh-das.component';

describe('IndentPendingWhDasComponent', () => {
  let component: IndentPendingWhDasComponent;
  let fixture: ComponentFixture<IndentPendingWhDasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndentPendingWhDasComponent]
    });
    fixture = TestBed.createComponent(IndentPendingWhDasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

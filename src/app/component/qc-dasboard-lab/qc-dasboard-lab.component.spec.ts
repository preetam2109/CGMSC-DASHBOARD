import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcDasboardLabComponent } from './qc-dasboard-lab.component';

describe('QcDasboardLabComponent', () => {
  let component: QcDasboardLabComponent;
  let fixture: ComponentFixture<QcDasboardLabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QcDasboardLabComponent]
    });
    fixture = TestBed.createComponent(QcDasboardLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

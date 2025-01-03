import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgMapTestComponent } from './cg-map-test.component';

describe('CgMapTestComponent', () => {
  let component: CgMapTestComponent;
  let fixture: ComponentFixture<CgMapTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CgMapTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CgMapTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

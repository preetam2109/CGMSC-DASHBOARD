import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmeFacNocComponent } from './dme-fac-noc.component';

describe('DmeFacNocComponent', () => {
  let component: DmeFacNocComponent;
  let fixture: ComponentFixture<DmeFacNocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DmeFacNocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DmeFacNocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmeFacNocDashComponent } from './dme-fac-noc-dash.component';

describe('DmeFacNocDashComponent', () => {
  let component: DmeFacNocDashComponent;
  let fixture: ComponentFixture<DmeFacNocDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DmeFacNocDashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DmeFacNocDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

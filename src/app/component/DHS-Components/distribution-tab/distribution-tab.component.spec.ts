import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionTabComponent } from './distribution-tab.component';

describe('DistributionTabComponent', () => {
  let component: DistributionTabComponent;
  let fixture: ComponentFixture<DistributionTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistributionTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributionTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

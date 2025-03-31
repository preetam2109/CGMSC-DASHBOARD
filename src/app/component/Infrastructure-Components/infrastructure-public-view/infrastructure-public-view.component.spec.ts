import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfrastructurePublicViewComponent } from './infrastructure-public-view.component';

describe('InfrastructurePublicViewComponent', () => {
  let component: InfrastructurePublicViewComponent;
  let fixture: ComponentFixture<InfrastructurePublicViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfrastructurePublicViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfrastructurePublicViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

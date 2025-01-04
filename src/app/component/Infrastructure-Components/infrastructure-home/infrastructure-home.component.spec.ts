import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfrastructureHomeComponent } from './infrastructure-home.component';

describe('InfrastructureHomeComponent', () => {
  let component: InfrastructureHomeComponent;
  let fixture: ComponentFixture<InfrastructureHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfrastructureHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfrastructureHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

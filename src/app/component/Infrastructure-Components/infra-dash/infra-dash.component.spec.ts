import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraDashComponent } from './infra-dash.component';

describe('InfraDashComponent', () => {
  let component: InfraDashComponent;
  let fixture: ComponentFixture<InfraDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfraDashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfraDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

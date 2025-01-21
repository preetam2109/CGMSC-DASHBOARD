import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderGeneratedComponent } from './work-order-generated.component';

describe('WorkOrderGeneratedComponent', () => {
  let component: WorkOrderGeneratedComponent;
  let fixture: ComponentFixture<WorkOrderGeneratedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkOrderGeneratedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkOrderGeneratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

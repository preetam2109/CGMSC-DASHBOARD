import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineStatus } from './pipeline-status';

describe('PipelineStatus', () => {
  let component: PipelineStatus;
  let fixture: ComponentFixture<PipelineStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipelineStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipelineStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

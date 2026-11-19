import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugsPipelineStatusPOGiven } from './drugs-pipeline-status-po-given';

describe('DrugsPipelineStatusPOGiven', () => {
  let component: DrugsPipelineStatusPOGiven;
  let fixture: ComponentFixture<DrugsPipelineStatusPOGiven>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrugsPipelineStatusPOGiven]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrugsPipelineStatusPOGiven);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

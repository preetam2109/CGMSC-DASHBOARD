import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineSupplyTabs } from './pipeline-supply-tabs';

describe('PipelineSupplyTabs', () => {
  let component: PipelineSupplyTabs;
  let fixture: ComponentFixture<PipelineSupplyTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipelineSupplyTabs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipelineSupplyTabs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineSuppliesOracleComponent } from './pipeline-supplies-oracle.component';

describe('PipelineSuppliesOracleComponent', () => {
  let component: PipelineSuppliesOracleComponent;
  let fixture: ComponentFixture<PipelineSuppliesOracleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipelineSuppliesOracleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipelineSuppliesOracleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

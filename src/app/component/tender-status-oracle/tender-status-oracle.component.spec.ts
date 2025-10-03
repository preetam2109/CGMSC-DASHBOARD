import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderStatusOracleComponent } from './tender-status-oracle.component';

describe('TenderStatusOracleComponent', () => {
  let component: TenderStatusOracleComponent;
  let fixture: ComponentFixture<TenderStatusOracleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenderStatusOracleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenderStatusOracleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

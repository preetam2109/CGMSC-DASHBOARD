import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderStatusOracleTabComponent } from './tender-status-oracle-tab.component';

describe('TenderStatusOracleTabComponent', () => {
  let component: TenderStatusOracleTabComponent;
  let fixture: ComponentFixture<TenderStatusOracleTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenderStatusOracleTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenderStatusOracleTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

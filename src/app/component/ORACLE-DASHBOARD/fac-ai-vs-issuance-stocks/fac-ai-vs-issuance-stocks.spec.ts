import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FacAiVsIssuanceStocks } from './fac-ai-vs-issuance-stocks';

describe('FacAiVsIssuanceStocks', () => {
  let component: FacAiVsIssuanceStocks;
  let fixture: ComponentFixture<FacAiVsIssuanceStocks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacAiVsIssuanceStocks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacAiVsIssuanceStocks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

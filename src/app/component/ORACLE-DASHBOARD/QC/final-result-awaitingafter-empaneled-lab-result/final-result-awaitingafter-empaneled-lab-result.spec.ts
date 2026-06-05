import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalResultAwaitingafterEmpaneledLabResult } from './final-result-awaitingafter-empaneled-lab-result';

describe('FinalResultAwaitingafterEmpaneledLabResult', () => {
  let component: FinalResultAwaitingafterEmpaneledLabResult;
  let fixture: ComponentFixture<FinalResultAwaitingafterEmpaneledLabResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalResultAwaitingafterEmpaneledLabResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalResultAwaitingafterEmpaneledLabResult);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

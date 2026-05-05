import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveSupplyChain } from './executive-supply-chain';

describe('ExecutiveSupplyChain', () => {
  let component: ExecutiveSupplyChain;
  let fixture: ComponentFixture<ExecutiveSupplyChain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutiveSupplyChain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveSupplyChain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

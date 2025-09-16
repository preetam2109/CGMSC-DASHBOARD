import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderStatusPbiComponent } from './tender-status-pbi.component';

describe('TenderStatusPbiComponent', () => {
  let component: TenderStatusPbiComponent;
  let fixture: ComponentFixture<TenderStatusPbiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenderStatusPbiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenderStatusPbiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugTenderStatusComponent } from './drug-tender-status.component';

describe('DrugTenderStatusComponent', () => {
  let component: DrugTenderStatusComponent;
  let fixture: ComponentFixture<DrugTenderStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrugTenderStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrugTenderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

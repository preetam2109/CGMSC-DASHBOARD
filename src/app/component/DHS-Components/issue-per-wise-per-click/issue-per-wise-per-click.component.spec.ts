import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuePerWisePerClickComponent } from './issue-per-wise-per-click.component';

describe('IssuePerWisePerClickComponent', () => {
  let component: IssuePerWisePerClickComponent;
  let fixture: ComponentFixture<IssuePerWisePerClickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssuePerWisePerClickComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssuePerWisePerClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

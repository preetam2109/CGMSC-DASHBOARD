import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TenderStatusDashComponent } from './tender-status-dash.component';


describe('TenderStatusDashComponent', () => {
  let component: TenderStatusDashComponent;
  let fixture: ComponentFixture<TenderStatusDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenderStatusDashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenderStatusDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SampleInTransitToLab } from './sample-in-transit-to-lab';

describe('SampleInTransitToLab', () => {
  let component: SampleInTransitToLab;
  let fixture: ComponentFixture<SampleInTransitToLab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SampleInTransitToLab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleInTransitToLab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveTenderComponent } from './live-tender.component';

describe('LiveTenderComponent', () => {
  let component: LiveTenderComponent;
  let fixture: ComponentFixture<LiveTenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveTenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveTenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

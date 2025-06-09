import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationHodCgmscComponent } from './conversation-hod-cgmsc.component';

describe('ConversationHodCgmscComponent', () => {
  let component: ConversationHodCgmscComponent;
  let fixture: ComponentFixture<ConversationHodCgmscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversationHodCgmscComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversationHodCgmscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmewithoutaiComponent } from './cmewithoutai.component';

describe('CmewithoutaiComponent', () => {
  let component: CmewithoutaiComponent;
  let fixture: ComponentFixture<CmewithoutaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmewithoutaiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmewithoutaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

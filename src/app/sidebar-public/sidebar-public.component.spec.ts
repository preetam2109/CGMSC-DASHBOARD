import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPublicComponent } from './sidebar-public.component';

describe('SidebarPublicComponent', () => {
  let component: SidebarPublicComponent;
  let fixture: ComponentFixture<SidebarPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarPublicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

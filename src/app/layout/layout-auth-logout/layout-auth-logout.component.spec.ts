import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAuthLogoutComponent } from './layout-auth-logout.component';

describe('LayoutAuthLogoutComponent', () => {
  let component: LayoutAuthLogoutComponent;
  let fixture: ComponentFixture<LayoutAuthLogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutAuthLogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutAuthLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

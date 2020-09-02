import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAuthRegistrationWrapperComponent } from './layout-auth-registration-wrapper.component';

describe('LayoutAuthRegistrationWrapperComponent', () => {
  let component: LayoutAuthRegistrationWrapperComponent;
  let fixture: ComponentFixture<LayoutAuthRegistrationWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutAuthRegistrationWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutAuthRegistrationWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

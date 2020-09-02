import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAuthRegistrationFormComponent } from './layout-auth-registration-form.component';

describe('LayoutAuthRegistrationFormComponent', () => {
  let component: LayoutAuthRegistrationFormComponent;
  let fixture: ComponentFixture<LayoutAuthRegistrationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutAuthRegistrationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutAuthRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

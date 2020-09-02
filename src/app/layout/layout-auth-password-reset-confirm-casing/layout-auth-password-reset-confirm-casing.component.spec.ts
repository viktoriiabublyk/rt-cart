import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAuthPasswordResetConfirmCasingComponent } from './layout-auth-password-reset-confirm-casing.component';

describe('LayoutAuthPasswordResetConfirmCasingComponent', () => {
  let component: LayoutAuthPasswordResetConfirmCasingComponent;
  let fixture: ComponentFixture<LayoutAuthPasswordResetConfirmCasingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutAuthPasswordResetConfirmCasingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutAuthPasswordResetConfirmCasingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

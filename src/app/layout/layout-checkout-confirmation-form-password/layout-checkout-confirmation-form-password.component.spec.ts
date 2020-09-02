import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCheckoutConfirmationFormPasswordComponent } from './layout-checkout-confirmation-form-password.component';

describe('LayoutCheckoutConfirmationFormPasswordComponent', () => {
  let component: LayoutCheckoutConfirmationFormPasswordComponent;
  let fixture: ComponentFixture<LayoutCheckoutConfirmationFormPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutCheckoutConfirmationFormPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutCheckoutConfirmationFormPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

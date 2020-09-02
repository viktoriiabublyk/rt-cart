import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCheckoutConfirmationOfPaymentWrapComponent } from './layout-checkout-confirmation-of-payment-wrap.component';

describe('LayoutCheckoutConfirmationOfPaymentWrapComponent', () => {
  let component: LayoutCheckoutConfirmationOfPaymentWrapComponent;
  let fixture: ComponentFixture<LayoutCheckoutConfirmationOfPaymentWrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutCheckoutConfirmationOfPaymentWrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutCheckoutConfirmationOfPaymentWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCheckoutPaymentWrapComponent } from './layout-checkout-payment-wrap.component';

describe('CheckoutPaymentWrapComponent', () => {
  let component: LayoutCheckoutPaymentWrapComponent;
  let fixture: ComponentFixture<LayoutCheckoutPaymentWrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutCheckoutPaymentWrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutCheckoutPaymentWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

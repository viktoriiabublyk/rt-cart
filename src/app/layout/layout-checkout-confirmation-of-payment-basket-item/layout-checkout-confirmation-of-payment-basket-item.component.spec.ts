import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCheckoutConfirmationOfPaymentBasketItemComponent } from './layout-checkout-confirmation-of-payment-basket-item.component';

describe('LayoutCheckoutConfirmationOfPaymentBasketItemComponent', () => {
  let component: LayoutCheckoutConfirmationOfPaymentBasketItemComponent;
  let fixture: ComponentFixture<LayoutCheckoutConfirmationOfPaymentBasketItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutCheckoutConfirmationOfPaymentBasketItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutCheckoutConfirmationOfPaymentBasketItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

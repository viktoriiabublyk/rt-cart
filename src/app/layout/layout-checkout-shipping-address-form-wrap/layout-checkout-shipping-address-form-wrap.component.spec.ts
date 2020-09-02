import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCheckoutShippingAddressFormWrapComponent } from './layout-checkout-shipping-address-form-wrap.component';

describe('LayoutCheckoutShippingAddressFormWrapComponent', () => {
  let component: LayoutCheckoutShippingAddressFormWrapComponent;
  let fixture: ComponentFixture<LayoutCheckoutShippingAddressFormWrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutCheckoutShippingAddressFormWrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutCheckoutShippingAddressFormWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

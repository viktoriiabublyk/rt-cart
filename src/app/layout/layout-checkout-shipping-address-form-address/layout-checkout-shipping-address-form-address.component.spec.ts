import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCheckoutShippingAddressFormAddressComponent } from './layout-checkout-shipping-address-form-address.component';

describe('LayoutCheckoutShippingAddressFormAddressComponent', () => {
  let component: LayoutCheckoutShippingAddressFormAddressComponent;
  let fixture: ComponentFixture<LayoutCheckoutShippingAddressFormAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutCheckoutShippingAddressFormAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutCheckoutShippingAddressFormAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

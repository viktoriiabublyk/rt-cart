import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCheckoutShippingAddressFormBtnComponent } from './layout-checkout-shipping-address-form-btn.component';

describe('LayoutCheckoutShippingAddressFormBtnComponent', () => {
  let component: LayoutCheckoutShippingAddressFormBtnComponent;
  let fixture: ComponentFixture<LayoutCheckoutShippingAddressFormBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutCheckoutShippingAddressFormBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutCheckoutShippingAddressFormBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

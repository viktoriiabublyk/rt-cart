import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCheckoutPreviewShippingAddressComponent } from './layout-checkout-preview-shipping-address.component';

describe('LayoutCheckoutPreviewShippingAddressComponent', () => {
  let component: LayoutCheckoutPreviewShippingAddressComponent;
  let fixture: ComponentFixture<LayoutCheckoutPreviewShippingAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutCheckoutPreviewShippingAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutCheckoutPreviewShippingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

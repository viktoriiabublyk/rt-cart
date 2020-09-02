import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { loadContent } from './../../app.animations';

@Component({
  selector: 'app-layout-checkout-shipping-address-form-wrap',
  templateUrl: './layout-checkout-shipping-address-form-wrap.component.html',
  styleUrls: ['./layout-checkout-shipping-address-form-wrap.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    loadContent
  ],
})
export class LayoutCheckoutShippingAddressFormWrapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

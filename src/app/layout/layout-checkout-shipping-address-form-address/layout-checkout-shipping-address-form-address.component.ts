import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { dropItem } from '../../app.animations';

@Component({
  selector: 'app-layout-checkout-shipping-address-form-address',
  templateUrl: './layout-checkout-shipping-address-form-address.component.html',
  styleUrls: ['./layout-checkout-shipping-address-form-address.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    dropItem
  ],
})
export class LayoutCheckoutShippingAddressFormAddressComponent implements OnInit {

  @Input() item;

  constructor() { }

  ngOnInit(): void {
  }

}

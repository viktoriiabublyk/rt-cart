import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-layout-checkout-preview-shipping-address',
  templateUrl: './layout-checkout-preview-shipping-address.component.html',
  styleUrls: ['./layout-checkout-preview-shipping-address.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutCheckoutPreviewShippingAddressComponent implements OnInit {

  @Input() address;

  constructor() { }

  ngOnInit(): void {
  }

}

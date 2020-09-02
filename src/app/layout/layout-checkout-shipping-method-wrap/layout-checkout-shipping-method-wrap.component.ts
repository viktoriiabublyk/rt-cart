import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { loadContent } from '../../app.animations';

@Component({
  selector: 'app-layout-checkout-shipping-method-wrap',
  templateUrl: './layout-checkout-shipping-method-wrap.component.html',
  styleUrls: ['./layout-checkout-shipping-method-wrap.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    loadContent,
  ],
})
export class LayoutCheckoutShippingMethodWrapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

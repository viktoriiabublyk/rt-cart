import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { dropItem } from './../../app.animations';

@Component({
  selector: 'app-layout-checkout-confirmation-of-payment-basket-item',
  templateUrl: './layout-checkout-confirmation-of-payment-basket-item.component.html',
  styleUrls: ['./layout-checkout-confirmation-of-payment-basket-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    dropItem
  ],
})
export class LayoutCheckoutConfirmationOfPaymentBasketItemComponent implements OnInit {

  @Input() item;
  @Input() calcPrice;

  constructor() { }

  ngOnInit(): void {
  }

}

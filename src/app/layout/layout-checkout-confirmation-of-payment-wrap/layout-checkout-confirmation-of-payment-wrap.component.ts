import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { loadContent } from './../../app.animations';

@Component({
  selector: 'app-layout-checkout-confirmation-of-payment-wrap',
  templateUrl: './layout-checkout-confirmation-of-payment-wrap.component.html',
  styleUrls: ['./layout-checkout-confirmation-of-payment-wrap.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    loadContent
  ],
})
export class LayoutCheckoutConfirmationOfPaymentWrapComponent implements OnInit {

  @Input() confirmationInfo;
  @Input() total;

  constructor() { }

  ngOnInit(): void {
  }

}

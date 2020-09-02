import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { loadContent } from '../../app.animations';

@Component({
  selector: 'app-layout-checkout-payment-wrap',
  templateUrl: './layout-checkout-payment-wrap.component.html',
  styleUrls: ['./layout-checkout-payment-wrap.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    loadContent,
  ],
})
export class LayoutCheckoutPaymentWrapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

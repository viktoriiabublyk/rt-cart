import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentPaypalComponent } from './payment-paypal/payment-paypal.component';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
  declarations: [PaymentPaypalComponent],
  imports: [
    CommonModule,
    NgxPayPalModule,
  ],
  exports: [
    PaymentPaypalComponent,
  ]
})
export class PaymentPaypalModule { }

import { ConfirmationComponent } from './container/confirmation/confirmation.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShippingAddressFormComponent } from './container/shipping-address-form/shipping-address-form.component';
import { ShippingMethodComponent } from './container/shipping-method/shipping-method.component';
import { PaymentComponent } from './container/payment/payment.component';
import { PreviewComponent } from './container/preview/preview.component';
import { ConfirmationOfPaymentComponent } from './container/confirmation-of-payment/confirmation-of-payment.component';

export const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    children: [
      {
        path: '',
        component: ConfirmationComponent,
      },
      {
        path: 'redirect:params',
        // canActivate: [AuthGuard],
        component: ShippingAddressFormComponent,
      },
      {
        path: 'shipping-address',
        // canActivate: [AuthGuard],
        component: ShippingAddressFormComponent,
      },
      {
        path: 'shipping-methods',
        // canActivate: [AuthGuard],
        component: ShippingMethodComponent,
      },
      {
        path: 'payment-details',
        component: PaymentComponent,
      },
      {
        path: 'preview',
        component: PreviewComponent,
      },
      {
        path: 'preview:id',
        component: PreviewComponent,
      },
      {
        path: 'thank-you',
        component: ConfirmationOfPaymentComponent,
      },
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CheckoutRoutingModule { }
import { WizardPipe } from './wizard.pipe';
import { PaymentControllerModule } from './../payment/payment-controller.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ShippingAddressFormComponent } from './container/shipping-address-form/shipping-address-form.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { RtFormsModule } from '../rt-forms/rt-forms.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ShippingMethodComponent } from './container/shipping-method/shipping-method.component';
import { ConfirmationComponent } from './container/confirmation/confirmation.component';
import { CheckoutState } from './state/checkout.state';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
import { PaymentComponent } from './container/payment/payment.component';
import { PreviewComponent } from './container/preview/preview.component';
import { ConfirmationOfPaymentComponent } from './container/confirmation-of-payment/confirmation-of-payment.component';
import { LayoutCheckoutNavComponent } from './../layout/layout-checkout-nav/layout-checkout-nav.component';
import { LayoutCheckoutShippingAddressFormWrapComponent } from './../layout/layout-checkout-shipping-address-form-wrap/layout-checkout-shipping-address-form-wrap.component';
import { LayoutCheckoutShippingAddressFormAddressComponent } from './../layout/layout-checkout-shipping-address-form-address/layout-checkout-shipping-address-form-address.component';
import { LayoutCheckoutShippingAddressFormBtnComponent } from './../layout/layout-checkout-shipping-address-form-btn/layout-checkout-shipping-address-form-btn.component';
import { LayoutCheckoutShippingMethodWrapComponent } from './../layout/layout-checkout-shipping-method-wrap/layout-checkout-shipping-method-wrap.component';
import { LayoutCheckoutPaymentWrapComponent } from './../layout/layout-checkout-payment-wrap/layout-checkout-payment-wrap.component';
import { LayoutCheckoutPreviewWrapComponent } from './../layout/layout-checkout-preview-wrap/layout-checkout-preview-wrap.component';
import { LayoutCheckoutPreviewShippingAddressComponent } from './../layout/layout-checkout-preview-shipping-address/layout-checkout-preview-shipping-address.component';
import { LayoutCheckoutPreviewBasketItemComponent } from './../layout/layout-checkout-preview-basket-item/layout-checkout-preview-basket-item.component';
import { LayoutCheckoutConfirmationOfPaymentWrapComponent } from './../layout/layout-checkout-confirmation-of-payment-wrap/layout-checkout-confirmation-of-payment-wrap.component';
import { LayoutCheckoutConfirmationOfPaymentBasketItemComponent } from './../layout/layout-checkout-confirmation-of-payment-basket-item/layout-checkout-confirmation-of-payment-basket-item.component';
import { LayoutCheckoutConfirmationWrapComponent } from './../layout/layout-checkout-confirmation-wrap/layout-checkout-confirmation-wrap.component';
import { LayoutCheckoutConfirmationFormPasswordComponent } from './../layout/layout-checkout-confirmation-form-password/layout-checkout-confirmation-form-password.component';


@NgModule({
  declarations: [
    CheckoutComponent,
    ShippingAddressFormComponent,
    ShippingMethodComponent,
    ConfirmationComponent,
    PaymentComponent,
    PreviewComponent,
    ConfirmationOfPaymentComponent,
    WizardPipe,
    LayoutCheckoutNavComponent,
    LayoutCheckoutShippingAddressFormWrapComponent,
    LayoutCheckoutShippingAddressFormAddressComponent,
    LayoutCheckoutShippingAddressFormBtnComponent,
    LayoutCheckoutShippingMethodWrapComponent,
    LayoutCheckoutPaymentWrapComponent,
    LayoutCheckoutPreviewWrapComponent,
    LayoutCheckoutPreviewShippingAddressComponent,
    LayoutCheckoutPreviewBasketItemComponent,
    LayoutCheckoutConfirmationOfPaymentWrapComponent,
    LayoutCheckoutConfirmationOfPaymentBasketItemComponent,
    LayoutCheckoutConfirmationWrapComponent,
    LayoutCheckoutConfirmationFormPasswordComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RtFormsModule,
    MatButtonModule,
    NgxsModule.forFeature([CheckoutState]),
    NgxsRouterPluginModule.forRoot(),
    PaymentControllerModule.forRoot({module: ['paypal', 'card']}),
  ]
})
export class CheckoutModule { }

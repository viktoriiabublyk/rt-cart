import { State, Store, Action, StateContext, Selector } from '@ngxs/store';
import { CheckoutStateModel, ShippingAddressForm, CountryData } from '../models/checkout.model';
import { CheckoutService } from '../service/checkout.service';
import { SendShippingAddress,
  SendShippingAddressSuccess,
  SaveGuestEmail,
  SaveShippingAddress,
  SaveShippingMethod,
  SavePaymentDetails,
  LoadShippingAddress,
  LoadShippingAddressSuccess,
  SelectedShippingAddress,
  LoadCountry,
  LoadCountrySuccess,
  SetWizardStep,
  DeleteAddressById,
  SaveConfirmationInfo
} from './checkout.actions';
import { Navigate } from '@ngxs/router-plugin';
import {BackendError, SuccessMessage} from "../../messages/messages.actions";
import { Injectable } from '@angular/core';

@State<CheckoutStateModel>({
  name: 'checkout',
  defaults: {
    guest_email: null,
    shipping_address: null,
    address_list: [],
    country_data: null,
    confirmation: null,
    step: 1,
  },
})
@Injectable()
export class CheckoutState {

  constructor(
    private store: Store,
    private checkoutService: CheckoutService
  ) { }

  @Selector()
  static getGuestEmail(state: CheckoutStateModel): string {
    return state.guest_email;
  }

  @Selector()
  static getStep(state: CheckoutStateModel): number {
    return state.step;
  }

  @Selector()
  static getConfirmationInfo(state: CheckoutStateModel) {
    return state.confirmation;
  }

  @Selector()
  static getShippingAddress(state: CheckoutStateModel): ShippingAddressForm {
    return state.shipping_address;
  }

  @Selector()
  static getCountry(state: CheckoutStateModel): CountryData {
    return state.country_data;
  }

  @Selector()
  static getAddressList(state: CheckoutStateModel): ShippingAddressForm[] {
    return state.address_list;
  }

  @Action(SendShippingAddress)
  onSendShippingAddress(ctx: StateContext<CheckoutStateModel>, { formValue }: SendShippingAddress) {
    this.checkoutService.post(formValue).subscribe(
      response => ctx.dispatch(new SendShippingAddressSuccess(response)),
      err => ctx.dispatch(new BackendError(err)),
    );
  }

  @Action(LoadShippingAddress)
  onLoadShippingAddress(ctx: StateContext<CheckoutStateModel>) {
    const address = ctx.getState().shipping_address;
    if (!address) {
      this.checkoutService.getAddress().subscribe(
        response => ctx.dispatch(new LoadShippingAddressSuccess(response)),
        err => ctx.dispatch(new BackendError(err)),
      );
    }
  }

  @Action(LoadShippingAddressSuccess)
  onLoadShippingAddressSuccess(ctx: StateContext<CheckoutStateModel>, { response }: LoadShippingAddressSuccess) {
    ctx.patchState({
      address_list: response,
      // shipping_address: response[0]
    });
    if (response && response.length) {
      response.forEach(value => {
        ctx.dispatch(new LoadCountry(value.country, value.id));
      });
    }
  }

  @Action(LoadCountry)
  onLoadCountry(ctx: StateContext<CheckoutStateModel>, {url, id}: LoadCountry) {
    this.checkoutService.getCountry(url).subscribe(
      response => ctx.dispatch(new LoadCountrySuccess(response, id)),
      err => ctx.dispatch(new BackendError(err)),
    );
  }

  @Action(LoadCountrySuccess)
  onLoadCountrySuccess(ctx: StateContext<CheckoutStateModel>, { response, id }: LoadCountrySuccess) {
    const list = ctx.getState().address_list;
    ctx.patchState({
      country_data: response
    });
  }

  @Action(SelectedShippingAddress)
  onSelectedShippingAddress(ctx: StateContext<CheckoutStateModel>, { id }: SelectedShippingAddress) {
    const address = ctx.getState().address_list.filter(x => x.id === id);
    ctx.patchState({
      shipping_address: address[0]
    });
    // ctx.dispatch(new LoadCountry());
    ctx.dispatch(new Navigate(['/checkout/shipping-methods']));
  }

  @Action(SaveShippingAddress)
  onSaveShippingAddress(ctx: StateContext<CheckoutStateModel>, { formValue }: SaveShippingAddress) {
    ctx.patchState({
      shipping_address: formValue
    });
    ctx.dispatch(new Navigate(['/checkout/shipping-methods']));
  }

  @Action(SaveGuestEmail)
  onSaveGuestEmail(ctx: StateContext<CheckoutStateModel>, { email }: SaveGuestEmail) {
    ctx.patchState({
      guest_email: email
    });
    ctx.dispatch(new Navigate(['/checkout/shipping-address']));
  }

  @Action(SaveShippingMethod)
  onSaveShippingMethod(ctx: StateContext<CheckoutStateModel>, { value }: SaveShippingMethod) {
    // ctx.patchState({
    // });
    ctx.dispatch(new Navigate(['/checkout/payment-details']));
  }


  @Action(SavePaymentDetails)
  onSavePaymentDetails(ctx: StateContext<CheckoutStateModel>, { value }: SavePaymentDetails) {
    // ctx.patchState({
    // });
    ctx.dispatch(new Navigate(['/checkout/preview']));
  }

  @Action(SetWizardStep)
  onSetWizardStep(ctx: StateContext<CheckoutStateModel>, {value}: SetWizardStep) {
    ctx.patchState({
      step: value,
    });
  }

  @Action(DeleteAddressById)
  onDeleteAddressById(ctx: StateContext<CheckoutStateModel>, {id}: DeleteAddressById) {
    const list = ctx.getState().address_list;
    const filteredList = list.filter(value => value.id !== id);

    this.checkoutService.deleteAddress(id).subscribe(
      () => {
        ctx.dispatch(new SuccessMessage('Address was deleted successfully'));
        ctx.patchState({
          address_list: filteredList
        });
      },
      err => ctx.dispatch(new BackendError(err)),
    );
  }

  @Action(SaveConfirmationInfo)
  onSaveConfirmationInfo(ctx: StateContext<CheckoutStateModel>, {data}: SaveConfirmationInfo) {
    ctx.patchState({
      confirmation: data,
    });
    ctx.dispatch(new Navigate(['/checkout/thank-you']));
  }
}

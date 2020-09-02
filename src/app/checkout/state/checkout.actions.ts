import { ShippingAddressForm, CountryData } from '../models/checkout.model';

export class SendShippingAddress {
  static type = '[Checkout] SendShippingAddress';
  constructor(public formValue: any) { }
}

export class LoadShippingAddress {
  static type = '[Checkout] LoadShippingAddress';
}

export class LoadShippingAddressSuccess {
  static type = '[Checkout] LoadShippingAddressSuccess';
  constructor(public response: ShippingAddressForm[]) { }
}

export class LoadCountry {
  static type = '[Checkout] LoadCountry';
  constructor(public url: string, public id: number) { }
}

export class LoadCountrySuccess {
  static type = '[Checkout] LoadCountrySuccess';
  constructor(public response: CountryData, public id: number) { }
}

export class SelectedShippingAddress {
  static type = '[Checkout] SelectedShippingAddress';
  constructor(public id: number) { }
}

export class SaveShippingAddress {
  static type = '[Checkout] SaveShippingAddress';
  constructor(public formValue: any) { }
}

export class SendShippingAddressSuccess {
  static type = '[Checkout] SendShippingAddressSuccess';
  constructor(public response: any) { }
}

export class SaveGuestEmail {
  static type = '[Checkout] SaveGuestEmail';
  constructor(public email: string) { }
}

export class SaveShippingMethod {
  static type = '[Checkout] SaveShippingMethod';
  constructor(public value: any) { }
}

export class SavePaymentDetails {
  static type = '[Checkout] SavePaymentDetails';
  constructor(public value: any) { }
}

export class SetWizardStep {
  static type = '[Checkout] SetWizardStep';
  constructor(public value: number) { }
}

export class DeleteAddressById {
  static type = '[Checkout] DeleteAddressById';
  constructor(public id: number) { }
}

export class SaveConfirmationInfo {
  static type = '[Checkout] SaveConfirmationInfo';
  constructor(public data: any) { }
}

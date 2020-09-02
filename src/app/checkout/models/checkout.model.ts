export interface CheckoutStateModel {
  guest_email: string;
  shipping_address: ShippingAddressForm;
  address_list: ShippingAddressForm[];
  country_data: CountryData;
  step: number;
  confirmation: any;
}

export interface ShippingAddressForm {
  id?: number;
  country: string;
  first_name: string;
  last_name: string;
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  notes: string;
  phone_number: string;
  postcode: string;
  state: string;
  title: string;
  search_text?: string;
  is_default_for_shipping?: boolean;
  is_default_for_billing?: boolean;
  url?: string;
}

export interface CountryData {
  url: string;
  iso_3166_1_a3: string;
  iso_3166_1_numeric: string;
  printable_name: string;
  name: string;
  display_order: number;
  is_shipping_country: boolean;
}

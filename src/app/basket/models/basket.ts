import { IPayee, IUnitAmount, IPaymentInstructions, ITransactionItem, IShipping } from 'ngx-paypal';
import {Product} from "../../catalog/models/product.model";

export interface ItemList {
  id?: number;
  quantity?: number;
  total?: number;
}

export interface Basket {
  id: number;
  owner: string;
  status: string;
  lines: string;
  url: string;
  total_excl_tax: string;
  total_excl_tax_excl_discounts: string;
  total_incl_tax: string;
  total_incl_tax_excl_discounts: string;
  total_tax: string;
  currency: string;
  voucher_discounts: any[];
  offer_discounts: OfferDiscounts[];
  is_tax_known: boolean;
}

export interface OfferDiscounts {
  description: string;
  name: string;
  amount: string;
}

export interface BasketProductLinesList {
  id: number;
  url: string;
  product: Product;
  quantity: number;
  attributes: any[];
  price_currency: string;
  price_excl_tax: string;
  price_incl_tax: string;
  price_incl_tax_excl_discounts: string;
  price_excl_tax_excl_discounts: string;
  is_tax_known: boolean;
  warning: string;
  basket: string;
  stockrecord: string;
  date_created: string;
}

export interface PurchaseUnit {
  amount: IUnitAmount;
  reference_id?: string;
  payee?: IPayee;
  payment_instruction?: IPaymentInstructions;
  description?: string;
  custom_id?: string;
  invoice_id?: string;
  soft_descriptor?: string;
  items: ITransactionItem[];
  shipping?: IShipping;
}
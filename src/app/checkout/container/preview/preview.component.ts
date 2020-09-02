import { CheckoutState } from './../../state/checkout.state';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { LoadShippingAddress, SetWizardStep } from '../../state/checkout.actions';
import { CountryData, ShippingAddressForm } from '../../models/checkout.model';
import {BasketState} from "../../../basket/basket.state";
import {Product} from "../../../catalog/models/product.model";
import {settings} from "../../../../environments/environment";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewComponent implements OnInit {

  constructor(private store: Store) { }

  @Select(BasketState.getBasketData) basket$: Observable<[{ [key: number]: Product[] }]>;
  @Select(BasketState.getBasketTotalPrice) total$: Observable<number>;
  @Select(CheckoutState.getShippingAddress) shippingAddress$: Observable<ShippingAddressForm>;
  @Select(CheckoutState.getCountry) countryData$: Observable<CountryData>;


  ngOnInit() {
    this.store.dispatch([new LoadShippingAddress(), new SetWizardStep(4)]);
  }

  calculatePrice(item) {
    if (item.price_data) {
      if (settings.isNumber(item.quantity) && settings.isNumber(item.price_data.excl_tax)) {
      return item.quantity * item.price_data.excl_tax;
      }
    }
  }

  basketItemId(index) {
    return index;
  }

}

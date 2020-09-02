import { settings } from './../../../../environments/environment';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { CheckoutState } from '../../state/checkout.state';
import { Observable, Subscription } from 'rxjs';
import { LoadShippingAddress, SetWizardStep } from '../../state/checkout.actions';
import { CountryData, ShippingAddressForm } from '../../models/checkout.model';
import { ActivatedRoute } from '@angular/router';
import {BasketState} from "../../../basket/basket.state";
import {Product} from "../../../catalog/models/product.model";

@Component({
  selector: 'app-confirmation-of-payment',
  templateUrl: './confirmation-of-payment.component.html',
  styleUrls: ['./confirmation-of-payment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationOfPaymentComponent implements OnInit, OnDestroy {

  constructor(private store: Store, private route: ActivatedRoute, ) { }

  @Select(BasketState.getBasketData) basket$: Observable<[{ [key: number]: Product[] }]>;
  @Select(BasketState.getBasketTotalPrice) total$: Observable<number>;
  @Select(CheckoutState.getShippingAddress) shippingAddress$: Observable<ShippingAddressForm>;
  @Select(CheckoutState.getCountry) countryData$: Observable<CountryData>;
  @Select(CheckoutState.getConfirmationInfo) confirmationInfo$: Observable<any>;

  private subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
      this.confirmationInfo$.subscribe(params => {
        console.log(params);
      })
    );
    this.store.dispatch([new LoadShippingAddress(), new SetWizardStep(5)]);
  }

  calculatePrice(item) {
    if (item.price_data){
      if (settings.isNumber(item.quantity) && settings.isNumber(item.price_data.excl_tax)) {
        return item.quantity * item.price_data.excl_tax;
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  basketItemId(index) {
    return index;
  }

}

import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BasketState } from '../../basket/basket.state';
import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { BasketProductLinesList, Basket } from '../../basket/models/basket';
import { filter, take } from 'rxjs/operators';
import { IPurchaseUnit } from 'ngx-paypal';

@Component({
  selector: 'app-payment-controller',
  templateUrl: './payment-controller.component.html',
  styleUrls: ['./payment-controller.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentControllerComponent implements OnInit {

  constructor(private cd: ChangeDetectorRef) { }
  @Select(BasketState.getProductLines) productLines$: Observable<BasketProductLinesList[]>;
  @Select(BasketState.getBasket) basket$: Observable<Basket>;
  data: IPurchaseUnit[] = [];
  ready = false;
  ngOnInit() {
    combineLatest(this.basket$, this.productLines$).pipe(filter(([x, y]) => !!x && !!y), take(1))
    .subscribe(([basket, products]) => {
      console.log(products, basket);
      const amount = {
        currency_code: basket.currency !== 'GBP' ? basket.currency : 'EUR',
        value: basket.total_incl_tax,
        breakdown: {
          item_total: {
            currency_code: basket.currency !== 'GBP' ? basket.currency : 'EUR',
            value: basket.total_excl_tax
          },
          tax_total: {
            currency_code: basket.currency !== 'GBP' ? basket.currency : 'EUR',
            value: basket.total_tax
          },
        }
      };
      const items = [];
      products.forEach(product => {
        items.push({
          name: product.product.id,
          description: product.product.title,
          quantity:  product.quantity,
          unit_amount: {
            currency_code: product.product.price_data.currency !== 'GBP' ? basket.currency : 'EUR',
            value:  product.product.price_data.excl_tax,
          },
          tax: {
            currency_code: product.product.price_data.currency !== 'GBP' ? basket.currency : 'EUR',
            value:  product.product.price_data.tax,
          },
        });
      });
      this.data.push({reference_id: basket.id.toString(), amount, items});
      this.ready = true;
      this.cd.detectChanges();
    });
  }

}

import { CheckoutState } from './../../state/checkout.state';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, take } from 'rxjs/operators';
import { BasketState } from '../../../basket/basket.state';
import { Basket } from '../../../basket/models/basket';
import { LoadBasket, LoadProductLinesList } from '../../../basket/basket.actions';
import { isEqual } from 'lodash';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent implements OnInit, OnDestroy {

  @Select(CheckoutState.getStep) step$: Observable<number>;
  @Select(BasketState.getBasket) currentBasket$: Observable<Basket>;
  stepWizard;
  constructor(private store: Store, private cd: ChangeDetectorRef) { }
  private subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
      this.currentBasket$.pipe(distinctUntilChanged(isEqual)).subscribe(data => {
        if (!data) {
          this.store.dispatch(new LoadBasket());
        }
      })
    );
    this.currentBasket$.pipe(filter(x => !!x), distinctUntilChanged(isEqual), take(1)).subscribe(data => {
        this.store.dispatch(new LoadProductLinesList(data));
    });
    this.subscription.add(
      this.step$.subscribe(value => {
        this.stepWizard = value;
        this.cd.detectChanges();
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
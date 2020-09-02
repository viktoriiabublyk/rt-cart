import { Component, OnInit, OnDestroy, EventEmitter, Output,
  HostBinding, OnChanges, ViewChild, ElementRef,
  ChangeDetectorRef, DoCheck, AfterViewChecked, AfterContentChecked, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { BasketState } from '../../basket.state';
import { BasketUpdateProductQuantity, LoadBasket, LoadProductLinesList } from '../../basket.actions';
import { isEqual } from 'lodash';
import { distinctUntilChanged, filter, take } from 'rxjs/operators';
import { BasketProductLinesList, ItemList, Basket } from '../../models/basket';
import {dropItem, loadContent} from '../../../app.animations';
import {settings} from '../../../../environments/environment';
import {Settings} from '../../../../conf/settings';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
  animations: [
    dropItem,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketComponent implements OnInit, OnDestroy {
  mustBeResize = false;
  startHeight: number;
  localLineList = null;
  isFirst = true;
  constructor(
    private cd: ChangeDetectorRef,
    private store: Store,
    private settings: Settings,
    private title: Title,
  ) { }

  @ViewChild('basketItems') basketItems: ElementRef;

  private subscriptions = new Subscription();
  @Select(BasketState.getBasket) currentBasket$: Observable<Basket>;
  @Select(BasketState.getBasketData) basketProduct$: Observable<BasketProductLinesList[]>;
  @Select(BasketState.getBasketItemsIds) idList$: Observable<number[]>;
  @Select(BasketState.getBasketTotalPrice) total$: Observable<number>;
  @Select(BasketState.getProductLines) basket$: Observable<BasketProductLinesList[]>;

  ngOnInit() {
    this.title.setTitle(this.settings.formatTitle('Basket'));
    this.subscriptions.add(
      this.currentBasket$.pipe(distinctUntilChanged(isEqual)).subscribe(data => {
        if (!data) {
          this.store.dispatch(new LoadBasket());
        }
      })
    );
    this.subscriptions.add(
      this.currentBasket$.pipe(filter(x => !!x), distinctUntilChanged(isEqual), take(1)).subscribe(data => {
          this.store.dispatch(new LoadProductLinesList(data));
      })
    );
  }

  updateQuantity(item, q: number) {
    this.store.dispatch(new BasketUpdateProductQuantity(item.id, q));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  removeItem(id: number) {
    this.store.dispatch(new BasketUpdateProductQuantity(id, 0));
  }

  calculatePrice(item) {
    if (settings.isNumber(item.quantity) && settings.isNumber(item.product.price_data.excl_tax)) {
      return item.quantity * item.product.price_data.excl_tax;
    }
  }

  trackById(index, item) {
    return item.id;
  }

  trackByFn(index, item) {
    return index;
  }
}

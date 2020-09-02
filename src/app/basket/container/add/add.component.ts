import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BasketState } from '../../basket.state';
import { Select, Store } from '@ngxs/store';
import { Settings } from '../../../../conf/settings';
import { SetCurrentProduct, LoadRecommended, ClearingRecommended } from '../../basket.actions';
import {Product} from '../../../catalog/models/product.model';
import {loadContent} from '../../../app.animations';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  animations: [loadContent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddComponent implements OnInit, OnDestroy {


  @Select(state => state.basket.recommended) recommended$: Observable<Product[]>;
  @Select(BasketState.getData) productData$: Observable<any>;
  private subscriptions = new Subscription();
  recommended: Product[];

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    public settings: Settings,
  ) { }

  ngOnInit() {
    const params$ = this.route.params;

    this.subscriptions.add(
      params$.subscribe(x => {
        this.store.dispatch([
          new SetCurrentProduct(Number(x.id)),
          new LoadRecommended()
        ]);
      })
    );
    this.subscriptions.add(
      this.recommended$.subscribe(data => this.recommended = data)
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.store.dispatch(new  ClearingRecommended());
  }

  trackByFn(index) {
    return index;
  }
}

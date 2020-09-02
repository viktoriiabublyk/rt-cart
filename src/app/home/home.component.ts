import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, from } from 'rxjs';
import { Product } from '../catalog/models/product.model';
import { LoadProductsForHomePage } from './home.action';
import {Settings} from '../../conf/settings';
import { MessagesState } from '../messages/messages.state';
import { LoadCategory } from '../catalog/state/category.action';
import { CategoryState } from '../catalog/state/category.state';
import { ProductState } from '../catalog/state/product.state';
import { Category } from '../catalog/models/category.model';
import { loadContent } from '../app.animations';
import {Title} from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    loadContent
  ],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HomeComponent implements OnInit {

  hasClickedShowMore = false;

  product$: Observable<Product[]>;

  @Select(ProductState.getProductsForHomePage) firstPartProducts$: Observable<Product[]>;
  @Select (ProductState.getProductList) products$: Observable<Product[]>;
  @Select (CategoryState.getCategories) categories$: Observable<Category[]>;
  @Select (state => state.product.length) length$: Observable<number>;
  @Select(MessagesState.getMessages) messages$: Observable<any>;
  constructor(
      private store: Store,
      private settings: Settings,
      private title: Title,
  ) { }

  ngOnInit() {
    this.title.setTitle(this.settings.formatTitle('Home'));
    this.store.dispatch([
      new LoadProductsForHomePage(),
      new LoadCategory()
    ]
    );
    this.product$ = this.firstPartProducts$;
  }

  showMore() {
    this.hasClickedShowMore = true;
    // TODO такое надо делать через state
    this.product$ = this.products$;
  }

  showLess() {
    this.hasClickedShowMore = false;
    this.product$ = this.firstPartProducts$;
  }

  trackByFn(index) {
    return index;
  }

}

import { Component, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Product } from '../../models/product.model';
import { Category, CategoryData } from '../../models/category.model';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { ProductState } from '../../state/product.state';
import { CategoryState } from '../../state/category.state';
import { ShowFirst, ShowMore, Searching, RemoveSearchingParam } from '../../state/product.action';
import { LoadCategory, SetCurrentCategory, RemoveCurrentCategory } from '../../state/category.action';
import { TdLoadingService } from '@covalent/core/loading';
import {loadContent, loading} from '../../../app.animations';
import {Settings} from '../../../../conf/settings';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [
    loadContent,
    loading
  ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  param: string;
  overlayStarSyntax = false;
  countItem;
  isOpen = false;
  @Output() item;
  @Select(ProductState.getShowMoreDisplay) next$: Observable<boolean>; // todo type
  @Select(ProductState.getProductList) products$: Observable<Product[]>;
  @Select(CategoryState.getCategories) categories$: Observable<Category[]>;
  @Select(CategoryState.getPathDataById) breadscrumbsData$: Observable<any>;
  @Select(state => state.category.categoryDict) categoryDict$: Observable<CategoryData>;
  @Select(state => state.category.breadscrumbs) breadscrumbs$: Observable<number[]>;
  @Select(state => state.category.currentCategory) currentCategory$: Observable<number>;
  @Select(state => state.product.length) length$: Observable<number>;
  @Select(ProductState.getCountByItemKey) count$: Observable<number>;
  @Select(state => state.product.selectedPage) page$: Observable<number>;
  @Select(state => state.product.selectedSearch) searchParam$: Observable<number>;


  constructor(
      private route: ActivatedRoute,
      private store: Store,
      private loadingService: TdLoadingService,
      private titleService: Title,
      public settings: Settings,
  ) { }

  private subscriptions = new Subscription();

  ngOnInit() {
    this.titleService.setTitle(this.settings.formatTitle('Catalogue'));
    this.loadingService.register('overlayStarSyntax');
    this.subscriptions.add(
      this.route.params.subscribe(
        params => {
          const param = params.nameCatWithID;
          if (param) {
            this.loadingService.register('overlayStarSyntax');
            const id = params.nameCatWithID.split('_')[1];
            this.store.dispatch(new SetCurrentCategory(id));
          } else {
            this.loadingService.register('overlayStarSyntax');
            this.store.dispatch(new RemoveCurrentCategory());
          }
        }
      )
    );
    this.subscriptions.add(
      this.route.queryParams
        .subscribe(params => {
          if (params.hasOwnProperty('q')) {
            this.titleService.setTitle(this.settings.formatTitle(`Results of searching "${params.q}"`));
            if (this.countItem !== 0) {
              this.loadingService.register('overlayStarSyntax');
            }
            this.store.dispatch(new Searching(params.q));
          } else {
            this.loadingService.register('overlayStarSyntax');
            this.store.dispatch([
              new RemoveSearchingParam(),
              new ShowFirst()
            ]);
          }
        })
    );
    this.store.dispatch(new LoadCategory());
    this.subscriptions.add(
      this.products$.subscribe(x => {
        if (x && x.length) {
          this.loadingService.resolve('overlayStarSyntax');
        }
      })
    );
    this.subscriptions.add(
      this.count$.subscribe(x => {
        this.countItem = x;
        if (x < 1) {
          this.loadingService.resolve('overlayStarSyntax');
        }
      })
    );
    this.subscriptions.add(
        this.breadscrumbsData$.subscribe(bsData => {
          if (bsData) {
            let title = bsData.map(item => item.name);
            title = title.reverse();
            this.titleService.setTitle(this.settings.formatTitle(title));
          }
        })
    );
  }
  choiseBreadscrum(data) {
    this.store.dispatch([
      new SetCurrentCategory(data.id),
      new Navigate(['/catalogue/category/', `${data.slug}_${data.id}`])
    ]);
  }
  showMore() {
    this.store.dispatch(
      new ShowMore(),
    );
  }

  productId(_, item) {
    return item.id;
  }

  trackByFn(index) {
    return index;
  }
}

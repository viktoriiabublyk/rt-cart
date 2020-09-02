import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Title } from '@angular/platform-browser';
import { Product } from '../../models/product.model';
import { Observable, Subscription } from 'rxjs';
import { Review } from '../../models/reviews.model';
import { filter, map, startWith } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';
import { LoadProduct } from '../../container/details/details.actions';
import { IPageChangeEvent, TdPagingBarComponent } from '@covalent/core/paging';
import { ProductState } from '../../state/product.state';
import { ReviewState } from '../../state/review.state';
import { LoadReviews, SetCurrentReview, RemoveCurrentReview, SetCurrentReviewPage,
         LoadSelectedReview, LoadSortedReviews } from '../../state/review.action';
import { SetCurrentCategory } from '../../state/category.action';
import { FormControl } from '@angular/forms';
import {loading} from "../../../app.animations";
import {Settings} from "../../../../conf/settings";

export interface SortOprions {
  name: string;
}

@Component({
  selector: 'app-customer-reviews',
  templateUrl: './customer-reviews.component.html',
  styleUrls: ['./customer-reviews.component.css'],
  animations: [loading],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CustomerReviewsComponent implements OnInit, OnDestroy {
  eventLinks: IPageChangeEvent;
  rating: number;
  countReviews: number;
  reviewId: number;
  showReviewForm = false;
  first = false;
  param: string;
  page: number;
  sortOption = null;
  review$: Observable<any>;
  sortParam = null;
  elem: any;
  myControl = new FormControl();
  options: SortOprions[] = [
    { name: 'Score' },
    { name: 'Recency' },
  ];
  filteredOptions: Observable<SortOprions[]>;

  @ViewChild('inputSort', { read: ElementRef }) inputSort: ElementRef;
  @ViewChild(TdPagingBarComponent) pagingBarLinks: TdPagingBarComponent;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private titleService: Title,
    public settings: Settings,
  ) {
    this.first = false;
  }
  @Select(state => state.product.dict[state.product.currentElement]) product$: Observable<Product>;
  @Select(ProductState.isImageLoadFail) isImageLoadFail$: Observable<boolean>;
  @Select(ProductState.isImageLoading) isImageLoading$: Observable<boolean>;
  @Select(ProductState.isImageLoaded) isImageLoaded$: Observable<boolean>;
  @Select(ReviewState.getCountByItemKey) countReviews$: Observable<number>;
  @Select(ReviewState.getPage) selectedPage$: Observable<number>;
  @Select(ReviewState.getAllReviewsByKey) reviewsList$: Observable<any>;

  private subscriptions = new Subscription();

  ngOnInit() {
    this.subscriptions.add(
      this.selectedPage$.pipe(filter(x => !!x)).subscribe(data => {
        this.page = data;
      })
    );
    this.subscriptions.add(
      this.route.params.subscribe(
        params => {
          this.param = params.titleWithId;
          this.reviewId = Number(params.id);
          if (params.titleWithId) {
            const id = params.titleWithId.split('_')[1]; // #FIXME move it to config file
            this.store.dispatch(new LoadProduct(id));
          }
          if (this.reviewId) {
            this.store.dispatch(new SetCurrentReview(this.reviewId));
            this.store.dispatch(new LoadSelectedReview(this.reviewId));
          } else {
            this.store.dispatch(new RemoveCurrentReview());
          }
        }
      ));
    this.subscriptions.add(
        this.route.queryParams
          .subscribe(params => {
            if (params.sort_by) {
              this.sortOption = params.sort_by;
              this.store.dispatch(new LoadSortedReviews(1, this.sortOption));
              const item = this.options.filter(option => option.name.toLowerCase() === params.sort_by);
              this.myControl.setValue(item[0]);
              if (this.pagingBarLinks) {
                this.pagingBarLinks.navigateToPage(1);
              }
            } else {
              this.removeSortOption();
            }
          })
      );

    this.subscriptions.add(
      this.product$.subscribe(data => {
        if (data) {
          this.titleService.setTitle(this.settings.formatTitle(data.title));
        }
      })
    );
    this.subscriptions.add(
      this.product$.pipe(filter(x => !!x)).subscribe(data => {
        this.rating = data.rating;
      })
    );
    this.subscriptions.add(
      this.countReviews$.subscribe(data => {
        this.countReviews = data;
        if (data === 1) {
          this.first = true;
        } else {
          this.first = false;
        }
      })
    );
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(names => {
          if (names) {
            const item = this.options.filter(option => option.name.toLowerCase() === names.toLowerCase());
            if (item && item.length !== 0) {
              this.sortParam = names.toLowerCase();
            } else {
              this.sortParam = null;
            }
            return this._filter(names);
          } else {
            return this.options.slice();
          }
        })
      );
  }
  changeLinks(event: IPageChangeEvent): void {
    this.eventLinks = event;
    if (this.eventLinks.page) {
      this.store.dispatch(new SetCurrentReviewPage(this.eventLinks.page, this.sortOption));
    }
  }

  choiseBreadscrum(data) {
    this.store.dispatch([
      new SetCurrentCategory(data.id),
      new Navigate(['/catalogue/category/', `${data.slug}_${data.id}`])
    ]);
    this.removeCurrentReview();
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.removeCurrentReview();
  }

  removeCurrentReview() {
    if (this.reviewId) {
      this.store.dispatch(new SetCurrentReviewPage(1, this.sortOption));
      this.store.dispatch(new RemoveCurrentReview());
    }
  }
  removeSortOption() {
    if (this.sortParam || this.sortOption) {
      this.sortParam = null;
      this.sortOption = null;
      this.store.dispatch(new LoadReviews(1));
      this.inputSort.nativeElement.value = '';
      this.pagingBarLinks.navigateToPage(1);
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(names => {
            if (names) {
              const item = this.options.filter(option => option.name.toLowerCase() === names.toLowerCase());
              if (item && item.length !== 0) {
                this.sortParam = names.toLowerCase();
              } else {
                this.sortParam = null;
              }
              return this._filter(names);
            } else {
              return this.options.slice();
            }
          })
        );
    } else {
      this.store.dispatch(new SetCurrentReviewPage(1, this.sortOption));
      this.store.dispatch(new LoadReviews(1));
    }
  }
  setPage() {
    this.store.dispatch(new SetCurrentReviewPage(1, this.sortOption));
    if (this.reviewId) {
      this.store.dispatch(new RemoveCurrentReview());
    }
  }
  displayFn(search?: SortOprions): string | undefined {
    return search ? search.name : undefined;
  }

  private _filter(name: string): SortOprions[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  
  trackByFn(index) {
    return index; 
  }
}

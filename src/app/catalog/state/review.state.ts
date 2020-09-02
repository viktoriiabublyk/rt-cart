import { Review, Item } from '../models/reviews.model';
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import {
  LoadReviewsOnPageSuccess, AddReview, AddReviewSuccess, LoadReviews, SetCurrentReviewPage,
  SetLastPage, LoadReviewsSuccess, RemoveCurrentReview, LoadReviewsOnLastPage, RemoveAddStatus,
  SetCurrentReview,
  LoadSelectedReview,
  LoadSelectedReviewSuccess,
  LoadSortedReviews
} from './review.action';
import { ReviewsService } from '../services/reviews.service';
import { forOwn, hasIn, has } from 'lodash';
import { ProductState, ProductStateModel } from './product.state';
import { LoadProductDataAfterAddReview } from './product.action';
import { Injectable } from '@angular/core';
import {BackendError} from "../../messages/messages.actions";

export class ReviewStateModel {
  dict: { [dict: string]: Review };
  items: { [key: string]: Item };
  countDict: { [dict: string]: number };
  selectedPage: number;
  selectedReview: number;
  currentItemKey?: string;
  selectedSearch: string;
  loadedPages?: { [key: number]: boolean };
  addStatus: boolean;
  lastReviewsPage: number;
}

@State<ReviewStateModel>({
  name: 'review',
  defaults: {
    dict: {},
    items: {},
    countDict: {},
    selectedPage: 1,
    selectedReview: null,
    currentItemKey: null,
    selectedSearch: null,
    loadedPages: {},
    addStatus: false,
    lastReviewsPage: null,
  },
})
@Injectable()
export class ReviewState {

  constructor(
    private store: Store,
    private reviewService: ReviewsService
  ) { }
  static itemKey(prodId: number, page: number, searchText = null, sorting = null, ordering = null) {
    return `prod_${prodId}_page_${page}_search_${searchText}_sort_${sorting}_order_${ordering}`;
  }
  @Selector([ProductState])
  static getCountByItemKey(ctx: ReviewStateModel, productState: ProductStateModel) {
    return ctx.countDict[productState.currentElement];
  }
  @Selector()
  static getPage(ctx: ReviewStateModel) {
    return ctx.selectedPage;
  }
  @Selector()
  static getAllReviewsByKey(ctx: ReviewStateModel) {
    const key = ctx.currentItemKey;
    const selectedReview = ctx.selectedReview;
    const results = ctx.items[key].list.reduce((previous, current) => {
      previous.push(ctx.dict[current]);
      return previous;
    }, []);

    return selectedReview ?
      Object.values(ctx.dict).filter(x => x.id === selectedReview)
      : results;

  }

  @Action(AddReview)
  onAddReview(ctx: StateContext<ReviewStateModel>, { form }: AddReview) {
    if (!!form && !form.product) {
      return;
    }
    this.reviewService.setReview(form).subscribe(
      data => ctx.dispatch(new AddReviewSuccess(data)),
      err => ctx.dispatch(new BackendError(err)),
    );

  }
  @Action(AddReviewSuccess)
  onAddReviewSuccess(ctx: StateContext<ReviewStateModel>, { data }: AddReviewSuccess) {
    const state = ctx.getState();
    const page = state.lastReviewsPage ? state.lastReviewsPage : 1;
    const key = ReviewState.itemKey(data.product, page);

    ctx.patchState({
      addStatus: true,
    });
    ctx.dispatch(new LoadReviewsOnLastPage(data, page, key));
    ctx.dispatch(new LoadProductDataAfterAddReview(data.product));
  }

  @Action(LoadReviewsOnLastPage)
  onLoadReviewsOnLastPage(ctx: StateContext<ReviewStateModel>, { review, page, key }) {
    const state = ctx.getState();
    const prod = review.product;
    const isKey = hasIn(state.items, key);
    if (!isKey) {
      ctx.dispatch(new LoadReviews(page));
    } else {
      const newList = [];
      const result = {};

      result[review.id] = review;
      newList.push(review.id);
      const count = {};
      count[prod] = state.countDict[prod] + 1;

      const itemList = state.items[key].list.concat(newList);
      ctx.patchState({
        selectedPage: page,
        currentItemKey: key,
        dict: {
          ...state.dict,
          ...result
        },
        countDict: {
          ...state.countDict,
          ...count
        },
        items: {
          ...state.items,
          [key]: {
            ts: 12212,
            loading: false,
            loaded: true,
            next: null,
            list: itemList
          }
        },
        loadedPages: {
          [page]: true,
        }
      });
    }
  }
  @Action(RemoveAddStatus)
  onRemoveAddState(ctx: StateContext<ReviewStateModel>) {
    ctx.patchState({
      addStatus: false
    });
  }
  @Action(SetCurrentReviewPage)
  onSetCurrentReviewPage(ctx: StateContext<ReviewStateModel>, { page, sort }: SetCurrentReviewPage) {
    const state = ctx.getState();
    const currentPage = state.selectedPage;
    const prod = this.store.selectSnapshot(ProductState.getCurrentElement);
    if (currentPage !== page) {
      const key = ReviewState.itemKey(prod, page, null, sort);
      const items = state.items;
      const isKey = hasIn(items, key);
      if (!isKey) {
        if (sort) {
        ctx.dispatch(new LoadSortedReviews(page, sort));
        } else {
          ctx.dispatch(new LoadReviews(page));
         }
      } else {
        ctx.patchState({
          selectedPage: page,
          currentItemKey: key
        });
      }
    }
  }
  @Action(SetLastPage)
  onSetLastPage(ctx: StateContext<ReviewStateModel>, { page }: SetLastPage) {

    if (page > 1) {
      ctx.patchState({
        lastReviewsPage: page
      });
    } else {
      ctx.patchState({
        lastReviewsPage: null
      });
    }
    if (page === 0) {
      ctx.patchState({
        lastReviewsPage: null
      });
    }

  }
  @Action(LoadReviews)
  onLoadReviews(ctx: StateContext<ReviewStateModel>, { page }: LoadReviews) {
    const prod = this.store.selectSnapshot(ProductState.getCurrentElement);
    const state = ctx.getState();
    const key = ReviewState.itemKey(prod, page);
    const items = state.items;
    const isKey = hasIn(items, key);
    if (!isKey) {
      this.reviewService.getReviewsOnPage(prod, page).subscribe(
        data => ctx.dispatch(new LoadReviewsOnPageSuccess(data, prod, page, key)),
        err => ctx.dispatch(new BackendError(err)),
      );
    } else {
      ctx.patchState({
        selectedPage: page,
        currentItemKey: key,
        loadedPages: {
          [page]: true,
        }
      });
    }
  }
  @Action(LoadSortedReviews)
  onLoadSortedReviews(ctx: StateContext<ReviewStateModel>, { page, sort }: LoadSortedReviews) {
    const prod = this.store.selectSnapshot(ProductState.getCurrentElement);
    const state = ctx.getState();
    const key = ReviewState.itemKey(prod, page, null, sort);
    const items = state.items;
    const isKey = hasIn(items, key);
    if (!isKey) {
      this.reviewService.getSortedReviewsOnPage(prod, page, sort).subscribe(
        data => ctx.dispatch(new LoadReviewsOnPageSuccess(data, prod, page, key)),
        err => ctx.dispatch(new BackendError(err)),
      );
    } else {
      ctx.patchState({
        selectedPage: page,
        currentItemKey: key,
        loadedPages: {
          [page]: true,
        }
      });
    }
  }
  @Action(LoadReviewsSuccess)
  onLoadReviewsSuccess(ctx: StateContext<ReviewStateModel>, { data, prod, page, key }: LoadReviewsSuccess) {
    const state = ctx.getState();
    const reviews = data.results;
    const newList = [];
    const result = {};
    const count = {};
    count[prod] = data.count;

    forOwn(reviews, (review) => {
      const reviewItem = review as Review;
      result[reviewItem.id] = reviewItem;
      newList.push(reviewItem.id);
    });
    ctx.patchState({
      loadedPages: {
        [page]: true
      },
      currentItemKey: key,
      selectedPage: page,
      dict: {
        ...state.dict,
        ...result
      },
      countDict: {
        ...state.countDict,
        ...count
      },
      items: {
        ...state.items,
        [key]: {
          ts: 12212,
          loading: false,
          loaded: true,
          next: data.next,
          list: newList
        }
      }

    });
  }
  @Action(LoadReviewsOnPageSuccess)
  onLoadReviewsOnPageSuccess(ctx: StateContext<ReviewStateModel>, { data, prod, page, key }: LoadReviewsOnPageSuccess) {
    const state = ctx.getState();
    const reviews = data.results;
    const newList = [];
    const result = {};
    const count = {};
    count[prod] = data.count;

    forOwn(reviews, (review) => {
      const reviewItem = review as Review;
      result[reviewItem.id] = reviewItem;
      newList.push(reviewItem.id);
    });
    ctx.patchState({
      loadedPages: {
        [page]: true
      },
      currentItemKey: key,
      selectedPage: page,
      dict: {
        ...state.dict,
        ...result
      },
      countDict: {
        ...state.countDict,
        ...count
      },
      items: {
        ...state.items,
        [key]: {
          ts: 12212,
          loading: false,
          loaded: true,
          next: data.next,
          list: newList
        }
      }

    });

  }
  @Action(SetCurrentReview)
  oSetCurrentReview(ctx: StateContext<ReviewStateModel>, { id }: SetCurrentReview) {
    if (ctx.getState().selectedReview !== id) {
      ctx.patchState({
        selectedReview: id,
      });
    }
  }
  @Action(LoadSelectedReview)
  onLoadSelectedReview(ctx: StateContext<ReviewStateModel>, { id }: LoadSelectedReview) {
    if (has(ctx, `dict.${id}`)) {
      this.store.dispatch(new SetCurrentReview(id));
    } else {
      this.reviewService.getSelectedReview(id).subscribe(
        data => ctx.dispatch(new LoadSelectedReviewSuccess(data)),
        err => ctx.dispatch(new BackendError(err)),
      );
    }
  }
  @Action(LoadSelectedReviewSuccess)
  onLoadSelectedReviewSuccess(ctx: StateContext<ReviewStateModel>, { data }: LoadSelectedReviewSuccess) {
    const state = ctx.getState();
    const result = {};
    result[data.id] = data;
    ctx.patchState({
      dict: {
        ...state.dict,
        ...result
      }
    });
  }

  @Action(RemoveCurrentReview)
  onRemoveCurrentReview(ctx: StateContext<ReviewStateModel>) {
    if (ctx.getState().selectedReview) {
      ctx.patchState({
        selectedReview: null,
      });
    }
  }
}

import { ReviewStateModel, ReviewState } from './review.state';
import { Review } from '../models/reviews.model';
import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NgxsModule, Store, StateContext, Actions } from '@ngxs/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, Observable } from 'rxjs';
import {settings} from '../../../environments/environment';
import {Settings} from '../../../conf/settings';
import { filter } from 'rxjs/operators';
import { ReviewsService } from '../services/reviews.service';
import { AddReview, AddReviewSuccess, LoadReviewsOnLastPage, LoadReviews, SetLastPage } from './review.action';
import { ProductStateModel } from './product.state';
import { NOT_DOWLOADED } from '../models/product.model';
import { LoadProductDataAfterAddReview } from './product.action';

class MockStateContext<T> implements StateContext<T> {
  sets = [];
  patches = [];
  dispatches = [];

  constructor(private _STATE: any) {}

  getState() {
      return this._STATE as T;
  }
  /**
   * Reset the state to a new value.
   */
  setState(state) {
      this.sets.push(state);
      this._STATE = state;
      return this._STATE as T;
  }
  /**
   * Patch the existing state with the provided value.
   */
  patchState(partial) {
      this.patches.push(partial);
      this._STATE = {
          ...this._STATE,
          ...partial
      };
      return this._STATE as T;
  }
  /**
   * Dispatch a new action and return the dispatched observable.
   */
  dispatch(actions: any | any[]) {
    this.dispatches.push(actions);
    return of() as Observable<void>;
  }
}
export const REVIEW_DATA: Review = {
  id: 191,
  product: 209,
  score: 5,
  title: 'Something amazing',
  body: 'Perfect',
  user: null,
  username: '',
  name: 'Cristian',
  email: 'crist@fu.uk',
  homepage: '',
  status: 1,
  total_votes: 0,
  delta_votes: 0,
  date_created: '2019-03-13T14:07:19.661264Z'

};

export const REVIEW_FORM: Review = {
    product: 209,
    score: 5,
    title: 'Something amazing',
    body: 'Perfect',
    user: null,
    username: '',
    name: 'Cristian',
    email: 'crist@fu.uk',
    homepage: '',
    status: 0,
    total_votes: 0,
    delta_votes: 0,
    date_created: ''
};

export const SOME_DESIRED_REVIEW_STATE: ReviewStateModel = {
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
};
const EXAMPLE_REVIEW_STATE: ReviewStateModel = SOME_DESIRED_REVIEW_STATE;

describe('ReviewState', () => {
    let reviewState: ReviewState;
    let store: Store;
    let reviewsService: ReviewsService;
    let ctx: StateContext<ReviewStateModel>;
    let ctxMock: MockStateContext<ReviewStateModel>;
    let actions$: Actions;
    let dispatched = [];


    beforeEach( async(() => {
      TestBed.configureTestingModule({
        imports: [
            NgxsModule.forRoot([ReviewState]),
            HttpClientTestingModule],
        providers: [
          {provide: Settings, useValue: settings},
        ]
      }).compileComponents();

      store = TestBed.get(Store);
      store.reset({review: EXAMPLE_REVIEW_STATE});
      reviewsService = TestBed.get(ReviewsService);
      reviewState = new ReviewState(store, reviewsService);
      // spyOn(store, 'dispatch');

      actions$ = TestBed.get(Actions);
      dispatched = [];
      actions$.pipe(
      filter(x => x.status === 'DISPATCHED')
    ).subscribe(x => dispatched.push(x.action));
    }));

    it('should create', () => {
      expect(reviewState).toBeTruthy();
    });

    it('should dispatch AddReviewSuccess after called AddReview action', fakeAsync(() => {
      spyOn(reviewsService, 'setReview').and.returnValue(of(REVIEW_DATA));
      spyOn(store, 'dispatch');
      ctx = new MockStateContext(reviewState) as StateContext<ReviewStateModel>;
      store.dispatch(new AddReview(REVIEW_FORM));
      tick();
      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(AddReview));
      reviewsService.setReview(REVIEW_FORM).subscribe(x => {
      store.dispatch(new AddReviewSuccess(x));
      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(AddReviewSuccess));
      });
      expect(reviewsService.setReview).toHaveBeenCalled();
    }));

    it('should add addStatus to state with AddReviewSuccess action', fakeAsync(() => {
      ctxMock = new MockStateContext(reviewState);
      // reviewState.onAddReviewSuccess(ctx, ['REVIEW_DATA'] as unknown as AddReviewSuccess);
      store.dispatch(new AddReviewSuccess(REVIEW_DATA));
      tick();
      ctxMock.patchState({ addStatus: true});
      expect(ctxMock.patches[0].addStatus).toEqual(true);
      expect(dispatched[0] instanceof AddReviewSuccess ).toBeTruthy();
      expect(dispatched[1] instanceof LoadReviewsOnLastPage ).toBeTruthy();
      expect(dispatched[2] instanceof LoadProductDataAfterAddReview ).toBeTruthy();
      expect(dispatched[3] instanceof LoadReviews ).toBeTruthy();

    }));


    it('should dispatch LoadReviewsOnLastPage', fakeAsync(() => {
      const key = ReviewState.itemKey(REVIEW_DATA.product, 1, null, null, null);
      store.dispatch(new LoadReviewsOnLastPage(REVIEW_DATA, 1, key));
      tick();
      expect(dispatched[1] instanceof LoadReviews ).toBeTruthy();
    }));

    it('should remove addStatus to state with RemoveAddStatus action', fakeAsync(() => {
      ctxMock = new MockStateContext(reviewState);
      reviewState.onRemoveAddState(ctxMock);
      tick();
      ctxMock.patchState({ addStatus: false });
      expect(ctxMock.patches[0].addStatus).toEqual(false);

    }));

    it('should set page when called SetLastPage action', fakeAsync(() => {
      store = TestBed.get(Store);
      spyOn(store, 'dispatch');
      store.dispatch(new SetLastPage(2));
      tick();
      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(SetLastPage));
      EXAMPLE_REVIEW_STATE.lastReviewsPage = 2;
      store.reset({ review: EXAMPLE_REVIEW_STATE });
      const state = store.snapshot();
      expect(state.review.lastReviewsPage).toEqual(2);
    }));

  });


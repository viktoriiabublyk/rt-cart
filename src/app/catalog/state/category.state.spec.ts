import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NgxsModule, Store, StateContext, Actions } from '@ngxs/store';
// import { CatalogState, CatalogStateModel } from './catalog.state';
import { ProductService } from '../services/product.service';
import { ShowFirst, ShowMore, LoadCatalogSuccess, LoadCatalog, LoadProductsPageById, AfterRemoveCategory } from './product.action';
import { ProductListResponse, Product } from '../models/product.model';
import { NOT_DOWLOADED, DOWNLOADING_IN_PROGRESS, SUCCESS_DOWNLOADED, FAIL_DOWNLOAD } from '../models/product.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, Observable } from 'rxjs';
import { LoadProductData, LoadProduct, LoadProductDataSuccess, LoadPropertyFail, RecentViewed } from '../container/details/details.actions';
import {settings} from '../../../environments/environment';
import {Settings} from '../../../conf/settings';
import { category } from '../components/category/category.component.spec';
import { ProductState, ProductStateModel } from './product.state';
import { LoadCategory, LoadCategorySuccess, SetCurrentCategory, RemoveCurrentCategory } from './category.action';
import { CategoryStateModel, CategoryState } from './category.state';
import { CategoryService } from '../services/category.service';
import { filter } from 'rxjs/operators';
import { Category, CategoryData } from '../models/category.model';

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

export const categoryData: CategoryData = {
  name: 'Books',
  description: '',
  image: '',
  slug: 'books',
  id: 2
};
export const categoria: Category = {
  data: categoryData,
  id: 2,
  children: []
};
export const categoryTree: Category = {
  data: categoryData,
  id: 2,
  children: [categoria]
};

export const SOME_DESIRED_CAT_STATE: CategoryStateModel = {
    categories: null,
    categoryDict: {},
    breadscrumbs: {},
    currentCategory: 1,
};
const EXAMPLE_CATEGORY_STATE: CategoryStateModel = SOME_DESIRED_CAT_STATE;
const failRequest = {
  detail: 'Not found.'
};

describe('CategoryState', () => {
    let categoryState: CategoryState;
    let store: Store;
    let categoryService: CategoryService;
    let ctxMock: MockStateContext<CategoryStateModel>;
    let actions$: Actions;
    let dispatched = [];


    beforeEach( async(() => {
      TestBed.configureTestingModule({
        imports: [ NgxsModule.forRoot([CategoryState]), HttpClientTestingModule],
        providers: [
          {provide: Settings, useValue: settings},
        ]
      }).compileComponents();

      store = TestBed.get(Store);
      store.reset({category: EXAMPLE_CATEGORY_STATE});
      categoryService = TestBed.get(CategoryService);
      categoryState = new CategoryState(store, categoryService);

      actions$ = TestBed.get(Actions);
      dispatched = [];
      actions$.pipe(
      filter(x => x.status === 'DISPATCHED')
    ).subscribe(x => dispatched.push(x.action));
    }));

    it('should dispatch LoadCategory', fakeAsync(() => {
      store = TestBed.get(Store);
      spyOn(store, 'dispatch');
      store.dispatch(new LoadCategory());
      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(LoadCategory));
    }));

    it('should add CATEGORIES to state with LoadCategorySuccess action', fakeAsync(() => {
      store.dispatch(new LoadCategory());
      store.dispatch(new LoadCategorySuccess([category]));
      tick();
      const state = store.snapshot();
      expect(state.category.categories).toEqual([category]);
    }));


    it('should dispatch RemoveCurrentCategory', fakeAsync(() => {
      store = TestBed.get(Store);
      spyOn(store, 'dispatch');
      store.dispatch(new RemoveCurrentCategory());
      tick();
      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(RemoveCurrentCategory));
    }));

    it('should test the action remove and after remove', fakeAsync(() => {
      store = TestBed.get(Store);
      spyOn(store, 'dispatch');
      ctxMock = new MockStateContext(categoryState);
      categoryState.onRemoveCurrentCategory(ctxMock);
      tick();
      ctxMock.patchState({ currentCategory: null});
      expect(ctxMock.patches[0].currentCategory).toEqual(null);

      store.dispatch(new AfterRemoveCategory());
      tick();
      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(AfterRemoveCategory));
    }));

    it('should test the action load and load success', fakeAsync(() => {
      spyOn(categoryService, 'getCategoriesList').and.returnValue(of([categoryTree]));
      store.dispatch(new LoadCategory());
      tick();
      expect(dispatched.length).toEqual(2);
      expect(dispatched[1] instanceof LoadCategorySuccess ).toBeTruthy();
      expect(dispatched[1].data).toEqual([categoryTree]);
    }));

    it('should test action ShowMore', fakeAsync(() => {
      const state = store.snapshot();
      spyOn(categoryService, 'getCategoriesList').and.returnValue(of([categoryTree]));
      const categories = state.category.categories;
      if (!categories) {
        store.dispatch(new LoadCategory());
        tick();
        expect(categoryService.getCategoriesList).toHaveBeenCalledTimes(1);
      } else {
        expect(categoryService.getCategoriesList).toHaveBeenCalledTimes(0);
      }
    }));
  });

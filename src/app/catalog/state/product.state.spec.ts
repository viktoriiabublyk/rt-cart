import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ProductService } from '../services/product.service';
import { LoadCatalogSuccess, LoadCatalog, LoadProductsPageById, SetSelectedImage,
  RemoveSelectedImage, Searching, SearchingSuccess } from './product.action';
import { ProductListResponse, Product } from '../models/product.model';
import { NOT_DOWLOADED } from '../models/product.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { LoadProductData, LoadProduct, LoadProductDataSuccess, LoadPropertyFail, RecentViewed } from '../container/details/details.actions';
import { settings } from '../../../environments/environment';
import { Settings } from '../../../conf/settings';
import { ProductState, ProductStateModel } from './product.state';
import { SetCurrentCategory } from './category.action';
import { CategoryStateModel } from './category.state';
import { Navigate } from '@ngxs/router-plugin';


export const PRODUCT: Product = {
  url: 'http://localhost:8000/api/products/209/',
  id: 209,
  title: 'The shellcoder\'s handbook',
  description: 'The Shellcoder\s Handbook shows you how to: Non-Find out where security ',
  slug: 'the-shellcoders-handbook',
  images: [{
      id: 99,
      original: 'http://localhost:8000/media/images/products/2018/10/9780764544682.jpg',
      caption: '',
      display_order: 0,
      date_created: '2018-10-05T11:14:34.270488+01:00',
      product: 209
  }],
  price_data: {
    currency: 'GBP',
    excl_tax: '9.99',
    incl_tax: '9.99',
    tax: '0.00'
  }
};
export const PRODUCT_DATA: Product = {
  id: 209,
  upc: '9780764544682',
  title: 'The shellcoder\'s handbook',
  description: 'The Shellcoder\'s Handbook shows',
  structure: 'standalone',
  date_created: '2018-10-05T11:14:32.920741+01:00',
  date_updated: '2019-03-13T14:09:26.421513Z',
  recommended_products: [],
  attributes: [],
  categories: [
      'Books > Non-Fiction > Hacking'
  ],
  category_list: [
      {
          id: 2,
          name: 'Books',
          description: '',
          slug: 'books'
      },
      {
          id: 5,
          name: 'Non-Fiction',
          description: '',
          slug: 'non-fiction'
      },
      {
          id: 7,
          name: 'Hacking',
          description: '',
          slug: 'hacking'
      }
  ],
  product_class: 'Book',
  stockrecords: 'http://localhost:8000/api/products/209/stockrecords/',
  images: [
      {
          id: 99,
          original: 'http://localhost:8000/media/images/products/2018/10/9780764544682.jpg',
          caption: '',
          display_order: 0,
          date_created: '2018-10-05T11:14:34.270488+01:00',
          product: 209
      }
  ],
  price: 'http://localhost:8000/api/products/209/price/',
  availability: 'http://localhost:8000/api/products/209/availability/',
  options: [],
  children: [],
  rating: 4.75
};

const list: ProductListResponse = {
  count: 209,
  next: null,
  previous: '',
  results: [PRODUCT],
};
const listAfterSearch: ProductListResponse = {
  count: 43,
  next: null,
  previous: '',
  results: [PRODUCT, PRODUCT],
};

export const SOME_DESIRED_PROD_STATE: ProductStateModel = {
    dict: {},
    items: {},
    selectedPage: 1,
    selectedCategory: null,
    selectedSearch: null,
    selectedImage: null,
    loadedPages: {},
    currentItemKey: null,
    currentElement: null,
    length: 50,
    imgStatus: NOT_DOWLOADED,
    recentlyViewed: [],
};
export const SOME_DESIRED_CAT_STATE: CategoryStateModel = {
    categories: null,
    categoryDict: {},
    breadscrumbs: {},
    currentCategory: 1,
};
const EXAMPLE_PRODUCT_STATE: ProductStateModel = SOME_DESIRED_PROD_STATE;
const EXAMPLE_CATEGORY_STATE: CategoryStateModel = SOME_DESIRED_CAT_STATE;
const failRequest = {
  detail: 'Not found.'
};

describe('ProductState', () => {
    let productState: ProductState;
    let store: Store;
    let productService: ProductService;



    beforeEach( async(() => {
      TestBed.configureTestingModule({
        imports: [ NgxsModule.forRoot([ProductState]), HttpClientTestingModule],
        providers: [
          {provide: Settings, useValue: settings},
        ]
      }).compileComponents();

      store = TestBed.get(Store);
      store.reset({product: EXAMPLE_PRODUCT_STATE, category: EXAMPLE_CATEGORY_STATE});
      productService = TestBed.get(ProductService);
      productState = new ProductState(store, productService);
    }));

    it('should test the action LoadCatalogSuccess', fakeAsync(() => {
      const key = ProductState.itemKey(null, 2);
      store.dispatch(new LoadCatalogSuccess(list, 2, key));
      tick();
      const state = store.snapshot();
      expect(state.product.dict[209]).toEqual(PRODUCT);
      expect(state.product.items[state.product.currentItemKey].list).toEqual([209]);
      expect(state.product.loadedPages).toEqual({2: true});
    }));

    it('should test the action SetSelectedImage for images[2]', fakeAsync(() => {
      const state = store.snapshot();
      expect(state.product.selectedImage).toEqual(null);
      store.dispatch(new SetSelectedImage(2));
      tick();
      const newState = store.snapshot();
      expect(newState.product.selectedImage).not.toEqual(null);
      expect(newState.product.selectedImage).not.toEqual(1);
      expect(newState.product.selectedImage).toEqual(2);

    }));

    it('should test the action SetSelectedImage for images[3]', fakeAsync(() => {
      store.dispatch(new SetSelectedImage(3));
      tick();
      const state = store.snapshot();
      expect(state.product.selectedImage).not.toEqual(2);
      expect(state.product.selectedImage).toEqual(3);
    }));

    it('should test the action RemoveSelectedImage after choose image', fakeAsync(() => {
      store.dispatch(new SetSelectedImage(3));
      tick();
      const state = store.snapshot();
      expect(state.product.selectedImage).not.toEqual(2);
      expect(state.product.selectedImage).toEqual(3);
      store.dispatch(new RemoveSelectedImage());
      tick();
      const newState = store.snapshot();
      expect(newState.product.selectedImage).not.toEqual(3);
      expect(newState.product.selectedImage).toEqual(null);


    }));


    it('should test action LoadCatalogSuccess', fakeAsync(() => {
      const key = ProductState.itemKey(null, 1);
      store.dispatch(new LoadCatalogSuccess(list, 1, key));
      tick();
      const state = store.snapshot();
      expect(state.product.dict[209]).toEqual(PRODUCT);
      expect(state.product.items[state.product.currentItemKey].list).toEqual([209]);
      expect(state.product.loadedPages).toEqual({1: true});

    }));

    it('should test action LoadCatalogSuccess', fakeAsync(() => {
      const key = ProductState.itemKey(null, 1);
      store.dispatch(new LoadCatalogSuccess(list, 1, key));
      tick();
      const state = store.snapshot();
      expect(state.product.currentItemKey).toEqual(key);
      expect(state.product.items[state.product.currentItemKey].next).toEqual(list.next);
      expect(state.product.selectedPage).toEqual(1);
      expect(state.product.items[state.product.currentItemKey].count).toEqual(list.count);
      expect(state.product.items[state.product.currentItemKey].list.length).toEqual(1);

    }));

    it('should test selector getProductList', fakeAsync(() => {
      store.dispatch(new SetCurrentCategory(1));
      tick();
      const state = store.snapshot();
      expect(ProductState.getProductList(state.product, state.category)).toEqual([]);
    }));

    it('should test selector getShowMoreDisplay', fakeAsync(() => {
      const key = ProductState.itemKey(null, 1);
      store.dispatch(new LoadCatalogSuccess(list, 1, key));
      tick();
      const state = store.snapshot();
      const next = state.product.items[state.product.currentItemKey].next;
      if (next) {
        expect(ProductState.getShowMoreDisplay(state.product)).toBe(true);
      } else {
          expect(ProductState.getShowMoreDisplay(state.product)).toBe(false);
        }
    }));

    it('should test action ShowFirst', () => {
      spyOn(productService, 'getProductList').and.returnValue(of(list));
      store.dispatch(new LoadCatalog(1));
      expect(productService.getProductList).toHaveBeenCalledTimes(1);
    });

    it('should test action ShowMore', fakeAsync(() => {
      const key = ProductState.itemKey(null, 1);
      store.dispatch(new LoadCatalogSuccess(list, 1, key));
      tick();
      const state = store.snapshot();
      spyOn(productService, 'getProductList').and.returnValue(of(list));
      const next = state.product.items[state.product.currentItemKey].next;
      if (next) {
        store.dispatch(new LoadCatalog(2));
        tick();
        expect(productService.getProductList).toHaveBeenCalledTimes(1);
      } else { expect(productService.getProductList).toHaveBeenCalledTimes(0); }
    }));

    it('should test action ShowMore for  products of current category', fakeAsync(() => {
      const key = ProductState.itemKey(null, 1);
      store.dispatch(new LoadCatalogSuccess(list, 1, key));
      tick();
      const state = store.snapshot();
      spyOn(productService, 'getProductsPageByIdCat').and.returnValue(of(list));
      const next = state.product.items[state.product.currentItemKey].next;
      if (next && state.category.currentCategory) {
        store.dispatch(new LoadProductsPageById(2, state.category.currentCategory));
        tick();
        expect(productService.getProductsPageByIdCat).toHaveBeenCalledTimes(1);
      } else { expect(productService.getProductsPageByIdCat).toHaveBeenCalledTimes(0); }
    }));

    it('should dispatch LoadProduct', fakeAsync(() => {
      store = TestBed.get(Store);
      spyOn(store, 'dispatch');
      store.dispatch(new LoadProduct(209));
      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(LoadProduct));
    }));

    it('should dispatch Searching', fakeAsync(() => {
      store = TestBed.get(Store);
      spyOn(store, 'dispatch');
      spyOn(productService, 'getSearchProducts').and.returnValue(of(list));
      store.dispatch(new Searching('book'));
      tick();
      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(Searching));
      productService.getSearchProducts('book');
      expect(productService.getSearchProducts).toHaveBeenCalledTimes(1);
      const key = ProductState.itemKey(null, 1, 'book');
      store.dispatch(new SearchingSuccess(list, 'book', key));
      tick();
      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(SearchingSuccess));
      store.dispatch(new Navigate(['/catalogue' ], [`${'book'}`]));
      tick();
      expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(Navigate));
    }));

    it('should test action SearchingSuccess', fakeAsync(() => {
      const key = ProductState.itemKey(null, 1, 'book');
      store.dispatch(new SearchingSuccess(listAfterSearch, 'book', key));
      tick();
      const state = store.snapshot();
      expect(state.product.items).not.toEqual(null);
      expect(state.product.items[state.product.currentItemKey].next).toEqual(listAfterSearch.next);
      expect(state.product.selectedSearch).toEqual('book');
      expect(state.product.items[state.product.currentItemKey].count).toEqual(listAfterSearch.count);
      expect(state.product.items[state.product.currentItemKey].list.length).toEqual(listAfterSearch.results.length);
      expect(state.product.items[state.product.currentItemKey].list[0]).toEqual(listAfterSearch.results[0].id);
      expect(state.product.items[state.product.currentItemKey].list[1]).toEqual(listAfterSearch.results[1].id);
      expect(state.product.dict[PRODUCT.id]).toEqual(listAfterSearch.results[1]);

    }));
    it('should test action Searching if item already exist', fakeAsync(() => {
      const key = ProductState.itemKey(null, 1, 'book');
      store.dispatch(new SearchingSuccess(listAfterSearch, 'book', key));
      tick();
      store.dispatch(new Searching('book'));
      tick();
      const state = store.snapshot();
      expect(state.product.items).not.toEqual(null);
      expect(state.product.selectedSearch).toEqual('book');
      expect(state.product.currentItemKey).toEqual(key);
      expect(state.product.selectedPage).toEqual(1);
    }));

    it('should add PRODUCT to state with LoadProductDataSuccess action', fakeAsync(() => {
      store.dispatch(new LoadProductData(209));
      store.dispatch(new LoadProductDataSuccess(PRODUCT));
      tick();
      const state = store.snapshot();
      expect(state.product.dict[209]).toEqual(PRODUCT);
    }));

    it('check dispatch LoadPropertyFail action', fakeAsync(() => {
      spyOn(store, 'dispatch');
      store.dispatch(new LoadPropertyFail(failRequest, 99999999999999999999));
      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(LoadPropertyFail));
    }));

    it('check dispatch RecentViewed action', fakeAsync(() => {
      spyOn(store, 'dispatch');
      store.dispatch(new RecentViewed('1'));
      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(RecentViewed));
    }));
});

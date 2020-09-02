import {
  Product, NOT_DOWLOADED, SUCCESS_DOWNLOADED,
  DOWNLOADING_IN_PROGRESS, FAIL_DOWNLOAD, EMPTY_PRODUCT, Item, ImageArray} from '../models/product.model';
import {State, Store, StateContext, Selector, Action} from '@ngxs/store';
import { ProductService } from '../services/product.service';
import { produce } from '@ngxs-labs/immer-adapter';
import {
  LoadProduct, LoadProductData, LoadProperty, LoadProductDataSuccess,
  LoadPropertyFail, LoadPropertySuccess, RecentViewed, LoadProductDataFromBasket } from '../container/details/details.actions';
import {
  ShowFirst, LoadProductsPageByIdSuccess, LoadCatalog, LoadCatalogSuccess,
  LoadCatalogFail, LoadProductsPageById, ShowMore, ChangeCurrentElement,
  LoadProductsByIdCategory, LoadProductsByIdCategorySuccess, Loading, Loaded,
  AfterRemoveCategory,
  LoadProductDataAfterAddReview,
  Searching,
  SearchingSuccess,
  RemoveSearchingParam,
  SetSelectedImage,
  RemoveSelectedImage
} from './product.action';
import { CategoryStateModel, CategoryState } from './category.state';
import { has, forOwn, hasIn } from 'lodash';
import { state } from '@angular/animations';
import { Navigate } from '@ngxs/router-plugin';
import { Injectable } from '@angular/core';
import {settings} from "../../../environments/environment";
import {BackendError} from "../../messages/messages.actions";
import {LoadProductsForHomePage} from "../../home/home.action";

export interface ProductStateModel {
  dict: {[dict: string]: Product};
  items: {[key: string]: Item};
  selectedPage: number;
  selectedCategory: number;
  selectedSearch: string;
  selectedImage: number;
  loadedPages?: { [key: number]: boolean };
  currentItemKey?: string;
  currentElement?: number;
  length?: number;
  imgStatus?: number;
  recentlyViewed?: string[];
}
@State<ProductStateModel>({
  name: 'product',
  defaults: {
    dict: {},
    items: {},
    selectedPage: null,
    selectedCategory: null,
    selectedSearch: null,
    selectedImage: null,
    loadedPages: {},
    currentItemKey: null,
    currentElement: null,
    length: 50,
    imgStatus: NOT_DOWLOADED,
    recentlyViewed: [],
  }
})
@Injectable()
export class ProductState {
  constructor(
    private store: Store,
    private productService: ProductService,
  ) { }

  static itemKey(categoryId, page, searchText = null, sorting = null, ordering = null) {
    return `cat_${categoryId}_page_${page}_search_${searchText}_sort_${sorting}_order_${ordering}`;
  }
  @Selector()
  static getCurrentElement(ctx: ProductStateModel) {
    return ctx.currentElement;
  }
  @Selector()
  static getCountByItemKey(ctx: ProductStateModel) {
    return ctx.items[ctx.currentItemKey].count;
  }
  @Selector()
  static getLength(ctx: ProductStateModel) {
    return ctx.length;
  }
  @Selector()
  static getProductsForHomePage(ctx: ProductStateModel) {
    const result: Product[] = [];
    const dataKeys = Object.keys(ctx.dict).slice(-settings.HOME_PRODUCT_LENGTH);
    dataKeys.forEach(idx => result.push(ctx.dict[idx]));
    return result.reverse();
  }
  @Selector()
  static getImageForSlider(ctx: ProductStateModel) {

    if (ctx.dict[ctx.currentElement].images[0]) {
      const imagesArray = ctx.dict[ctx.currentElement].images.reduce((previous, current) => {
        const imagesProduct = {};
        const item = imagesProduct as ImageArray;
        item.image = current.original;
        item.thumbImage = current.large_thumb;
        previous.push(item);
        return previous;
      }, []);
      return imagesArray;
    } else {
      return [];
    }
  }
  @Selector()
  static getSelectedThumbImage(ctx: ProductStateModel) {
    if (ctx.selectedImage) {
      return ctx.dict[ctx.currentElement].images[ctx.selectedImage].large_thumb;
    } else {
      return ctx.dict[ctx.currentElement].images[0].large_thumb;
    }
  }
  @Selector()
  static getSelectedFullImage(ctx: ProductStateModel) {
    if (ctx.selectedImage) {
      return ctx.dict[ctx.currentElement].images[ctx.selectedImage].original;
    } else {
      return ctx.dict[ctx.currentElement].images[0].original;
    }
  }
  @Selector([CategoryState])
  static getProductList(ctx: ProductStateModel, categoryState: CategoryStateModel) {
      const page = ctx.selectedPage;
      const items = ctx.items;
      const categoryId = categoryState.currentCategory;
      const search = ctx.selectedSearch;
      const keysList = [];

      for (let index = 0; index <= page; index++) {
        const element = ProductState.itemKey(categoryId, index, search);
        if (items[element]) {
          keysList.push(element);
        }
      }
      const allListsIds = keysList.reduce((prev, k) => prev.concat(items[k].list), []);
      if (allListsIds.length) {
      ctx.length = allListsIds.length;
      }

      const results = allListsIds.reduce((previous, current) => {
        previous.push(ctx.dict[current]);
        return previous;
      }, []);
      return  results;

  }
  @Selector()
  static getShowMoreDisplay(ctx: ProductStateModel) {
    return ctx.items[ctx.currentItemKey].next !== null;
  }
  @Selector()
  static isImageLoaded(ctx: ProductStateModel): boolean {
    return ctx.imgStatus === SUCCESS_DOWNLOADED;
  }
  @Selector()
  static isImageLoading(ctx: ProductStateModel): boolean {
    return ctx.imgStatus === DOWNLOADING_IN_PROGRESS;
  }
  @Selector()
  static isImageLoadFail(ctx: ProductStateModel): boolean {
    return ctx.imgStatus === FAIL_DOWNLOAD;
  }
  @Selector()
  static getRecentlyViewed(ctx: ProductStateModel): Product[] {
    const result: Product[] = [];
    ctx.recentlyViewed.forEach(el => {
      result.push(ctx.dict[el]);

    });
    result.pop();
    return result;
  }
  @Action(LoadProduct)
  coreProductAction(ctx: StateContext<ProductStateModel>, { id }: LoadProduct) {
    const stateContext = ctx.getState();
    ctx.patchState({
      ...stateContext,
      currentElement: id,
    });
    ctx.dispatch(new LoadProductData(id));
    ctx.dispatch(new LoadProperty(id, 'price'));
    ctx.dispatch(new LoadProperty(id, 'availability'));
    ctx.dispatch(new LoadProperty(id, 'stockrecords'));
  }
  @Action(LoadProductData)
  loadMainProductData(ctx: StateContext<ProductStateModel>, { id }: LoadProduct) {
    const stateContext = ctx.getState();
    const currentElement = stateContext.dict[id];

    if (currentElement === undefined || currentElement.categories === undefined) {
      ctx.patchState({
        ...state,
        imgStatus: DOWNLOADING_IN_PROGRESS
      });
      return this.productService.getProductItem(id).subscribe(
        data => ctx.dispatch(new LoadProductDataSuccess(data)),
        error => ctx.dispatch(new LoadPropertyFail(error, id)),
      );
    }
  }
  @Action(LoadProductDataAfterAddReview)
  loadMainProductDataAfterAddReview(ctx: StateContext<ProductStateModel>, { id }: LoadProductDataAfterAddReview) {
      this.productService.getProductItem(id).subscribe(
         data => ctx.dispatch(new LoadProductDataSuccess(data)),
         error => ctx.dispatch(new LoadPropertyFail(error, id)),
    );
  }

  @Action(LoadProductDataSuccess)
  onLoadProductDataSuccess(ctx: StateContext<ProductStateModel>, { dataSet }: LoadProductDataSuccess) {
    const stateContext = ctx.getState();
    const data = dataSet as Product;
    const id = data.id as number;
    const rez = { [id]: { ...stateContext.dict[id], ...data } };
    const imageStatus = data.images.length > 0 ? SUCCESS_DOWNLOADED : FAIL_DOWNLOAD;
    ctx.patchState({
      ...state,
      dict: { ...stateContext.dict, ...rez },
      imgStatus: imageStatus
    });
  }

  @Action(LoadProductDataFromBasket)
  onLoadProductDataFromBasket(ctx: StateContext<ProductStateModel>, { dataSet }: LoadProductDataFromBasket) {
    const dict = ctx.getState().dict;
    const data = dataSet as Product;
    const id = data.id as number;
    if (!hasIn(dict, id)) {
      const rez = { [id]: {...data } };
      ctx.patchState({
        dict: { ...dict, ...rez },
      });
    }
  }

  @Action(LoadProperty)
  loadProductPriceProperty(ctx: StateContext<ProductStateModel>, { id, property }: LoadProperty) {
    const stateContext = ctx.getState();
    if (!has(stateContext.dict[id], `${property}_data`)) {
      return this.productService.getProductProperty(id, property).subscribe(
        data => ctx.dispatch(new LoadPropertySuccess(data, id, property)),
        error => ctx.dispatch(new LoadPropertyFail(error, id)),
      );
    }
  }
  @Action(LoadCatalog)
  load(ctx: StateContext<ProductStateModel>, { page }: LoadCatalog) {
    const stateContext = ctx.getState();
    const key = ProductState.itemKey(null, page);
    const items = ctx.getState().items;
    const isKey = hasIn(items, key);
    if (!isKey) {
      this.productService.getProductList(page).subscribe(
        data => ctx.dispatch(new LoadCatalogSuccess(data, page, key)),
        err => ctx.dispatch(new LoadCatalogFail(err)),
      );
    } else {
        ctx.patchState({
          selectedPage: page,
          currentItemKey: key,
          loadedPages: {
            ...stateContext.loadedPages,
            [page]: true,
          }
        });
    }
  }
  @Action(Searching)
  searching(ctx: StateContext<ProductStateModel>, { search }: Searching) {
    const searchText = search.toLowerCase();
    const stateContext = ctx.getState();
    const key = ProductState.itemKey(null, 1, searchText);
    const items = ctx.getState().items;
    const isKey = hasIn(items, key);
    if (!isKey) {
      this.productService.getSearchProducts(searchText).subscribe(
        data => ctx.dispatch(new SearchingSuccess(data, searchText, key)),
        err => ctx.dispatch(new LoadCatalogFail(err)),
      );
    } else {
        ctx.patchState({
          selectedPage: 1,
          selectedSearch: searchText,
          currentItemKey: key,
          loadedPages: {
            ...stateContext.loadedPages,
            [1]: true,
          }
        });
        this.store.dispatch(
          new Navigate(['/catalogue' ], {q: `${searchText}`})
        );
    }
  }
  @Action(SearchingSuccess)
  SearchingSuccess(ctx: StateContext<ProductStateModel>, { searchProducts, search, key }: SearchingSuccess) {
    this.store.dispatch(
      new Navigate(['/catalogue' ], {q: `${search}`})
    );
    const stateContext = ctx.getState();
    const products = searchProducts.results;
    const newList = [];
    const result = {};

    forOwn(products, (product) => {
      const productItem = product as Product;
      result[productItem.id] = productItem;
      newList.push(productItem.id);
    });

    ctx.patchState({
      loadedPages: {
        ...stateContext.loadedPages,
        [1]: true,
      },
      length: newList.length,
      currentItemKey: key,
      selectedPage: 1,
      selectedSearch: search,
      dict: {
        ...stateContext.dict,
        ...result
      },
      items: {
        ...stateContext.items,
        [key]: {
          ts: 12212,
          loading: false,
          loaded: true,
          next:  searchProducts.next,
          count: searchProducts.count,
          list: newList
          }
      },
    });
  }
  @Action(LoadCatalogSuccess)
  loadSuccess(ctx: StateContext<ProductStateModel>, { productData, page, key }: LoadCatalogSuccess) {
    const stateContext = ctx.getState();
    const products = productData.results;
    const newList = [];
    const result = {};

    forOwn(products, (product) => {
      const productItem = product as Product;
      result[productItem.id] = productItem;
      newList.push(productItem.id);
    });

    ctx.patchState({
      loadedPages: {
        ...stateContext.loadedPages,
        [page]: true,
      },
      currentItemKey: key,
      selectedPage: page,
      dict: {
        ...stateContext.dict,
        ...result
      },
      items: {
        ...stateContext.items,
        [key]: {
          ts: 12212,
          loading: false,
          loaded: true,
          next:  productData.next,
          count: productData.count,
          list: newList
          }
      },
    });
  }
  @Action(LoadCatalogFail)
  LoadFail(ctx: StateContext<ProductStateModel>, err: LoadCatalogFail) {
    const stateContext = ctx.getState();
    // produce(ctx, draft => {
    //      const item = draft[stateContext.currentItemKey];
    //      item.loading = false;
    //  });
  }
  @Action(LoadProductsPageById)
  loadPage(ctx: StateContext<ProductStateModel>, { page, id }: LoadProductsPageById) {
    const stateContext = ctx.getState();
    const key = ProductState.itemKey(id, page);
    const items = ctx.getState().items;
    const isKey = hasIn(items, key);
    if (!isKey) {
    this.productService.getProductsPageByIdCat(page, id).subscribe(
      data => ctx.dispatch(new LoadProductsPageByIdSuccess(data, page, key)),
      err => ctx.dispatch(new LoadCatalogFail(err)),
    );
    } else {
      ctx.patchState({
        currentItemKey: key,
        selectedPage: page,
        loadedPages: {
          ...stateContext.loadedPages,
          [page]: true,
        }
      });
  }
  }
  @Action(LoadProductsPageByIdSuccess)
  loadPageSuccess(ctx: StateContext<ProductStateModel>, { productsOnPage, page, key }: LoadProductsPageByIdSuccess) {
    const stateContext = ctx.getState();
    const newList = [];
    const result = {};
    const products = productsOnPage.results;
    forOwn(products, (product) => {
      const productItem = product as Product;
      result[productItem.id] = productItem;
      newList.push(productItem.id);
    });

    ctx.patchState({
      currentItemKey: key,
      selectedPage: page,
      loadedPages: {
        ...stateContext.loadedPages,
        [page]: true,
      },
      dict: {
        ...stateContext.dict,
        ...result
      },
      items: {
        ...stateContext.items,
        [key]: {
          ts: 12212,
          next:  productsOnPage.next,
          count: productsOnPage.count,
          loading: false,
          loaded: true,
          list: newList
          }
      },
    });
  }
  @Action(ShowFirst)
  show_first(ctx: StateContext<ProductStateModel>) {
    const stateContext = ctx.getState();
    const idCat = this.store.selectSnapshot(CategoryState.getCurrentCategory);
    if (!stateContext.loadedPages[1] && !idCat && !stateContext.selectedSearch) {
      ctx.dispatch(new LoadCatalog(1));
    }
  }
  @Action(ShowMore)
  show_more(ctx: StateContext<ProductStateModel>) {
    const stateContext = ctx.getState();
    const page = ctx.getState().selectedPage;
    const idCat = this.store.selectSnapshot(CategoryState.getCurrentCategory);

    if (stateContext.items[stateContext.currentItemKey].next && !idCat) {
      ctx.dispatch(new LoadCatalog(page + 1));
    }
    if (stateContext.items[stateContext.currentItemKey].next && idCat) {
       const categoriesPage = ctx.getState().selectedPage;
       ctx.dispatch(new LoadProductsPageById(categoriesPage + 1, idCat));

    }
  }
  @Action(LoadPropertySuccess)
  LoadPropertySuccess(ctx: StateContext<ProductStateModel>, { dataSet, id, property }: LoadPropertySuccess) {
    const stateContext = ctx.getState();
    const dict = stateContext.dict[id] || { ...EMPTY_PRODUCT, id };
    const rez = { ...dict, [property + '_data']: { ...dataSet } } as Product;
    ctx.patchState({
      dict: {
        ...stateContext.dict,
        [id]: { ...stateContext.dict[id], ...rez }
      }
    });
  }
  @Action(ChangeCurrentElement)
  changeCurrentElement({ patchState }: StateContext<ProductStateModel>, { payload }: ChangeCurrentElement) {
    patchState({
      currentElement: payload,
    });
  }
  @Action(SetSelectedImage)
  setSelectedImage(ctx: StateContext<ProductStateModel>, { index }: SetSelectedImage) {
    if (ctx.getState().selectedImage !== index) {
      ctx.patchState({
        selectedImage: index,
      });
    }
  }
  @Action(RemoveSelectedImage)
  RemoveSelectedImage(ctx: StateContext<ProductStateModel>) {
    if (ctx.getState().selectedImage) {
      ctx.patchState({
        selectedImage: null,
      });
     }
  }
  @Action(LoadProductsByIdCategory)
  LoadProductsByIdCategory(ctx: StateContext<ProductStateModel>, { id }: LoadProductsByIdCategory) {
        const key = ProductState.itemKey(id, 1 , null, null , null);
        const items = ctx.getState().items;
        const isKey = hasIn(items, key);
        if (!isKey) {
          this.productService.getProductsListByIdCategory(id).subscribe(
            data => ctx.dispatch(new LoadProductsByIdCategorySuccess(data, key)),
            err => ctx.dispatch(new BackendError(err)),
          );
        } else {
            ctx.patchState({
              selectedPage: 1,
              currentItemKey: key,
              loadedPages: {
                [1]: true
              }
            });
        }
  }
  @Action(LoadProductsByIdCategorySuccess)
  LoadProductsListByIdCategorySuccess(ctx: StateContext<ProductStateModel>, { data, key }: LoadProductsByIdCategorySuccess) {
    const stateContext = ctx.getState();
    const products = data.results;
    const result = {};
    const listProd = [];
    forOwn(products, (product) => {
      const productItem = product as Product;
      result[productItem.id] = productItem;
      listProd.push(productItem.id);
    });

    ctx.patchState({
      loadedPages: {
        [1]: true,
      },
      currentItemKey: key,
      selectedPage: 1,
       dict: {
        ...stateContext.dict,
        ...result
      },
      items: {
        ...stateContext.items,
        [key]: {
          ts: 12212,
          next:  data.next,
          count: data.count,
          loading: false,
          loaded: true,
          list: listProd
          }
      },
    });
  }
  @Action([Loading])
  onLoading(ctx: StateContext<ProductStateModel>) {
    const stateContext = ctx.getState();
    produce(ctx, draft => {
      const item = draft[stateContext.currentItemKey];
      item.loading = true;
  });
  }
  @Action([Loaded])
  onLoaded(ctx: StateContext<ProductStateModel>) {
    const stateContext = ctx.getState();
    produce(ctx, draft => {
      const item = draft[stateContext.currentItemKey];
      item.loading = false;
  });
  }
  @Action(RecentViewed)
  add(ctx: StateContext<ProductStateModel>, { id }: RecentViewed) {
    const stateContext = ctx.getState();
    const recentViewedArr = [...stateContext.recentlyViewed];
    let result: string[] = [];

    if (recentViewedArr.includes(id)) {
      const index = recentViewedArr.indexOf(id);
      recentViewedArr.splice(index, 1);
    }

    if (recentViewedArr.length === settings.CATALOG_RECENTLY_VIEWED_LENGTH) {
      result = recentViewedArr.slice(1);
    } else {
      result = recentViewedArr;
    }
    result.push(id);
    ctx.patchState({
      recentlyViewed: result,
    });
  }

  @Action(LoadProductsForHomePage)
  LoadProducts(ctx: StateContext<ProductStateModel>) {
      ctx.dispatch(new ShowFirst());
  }

  @Action(AfterRemoveCategory)
  afterRemoveCategory(ctx: StateContext<ProductStateModel>) {
    const key = ProductState.itemKey(null, 1);
    ctx.patchState({
      loadedPages: {  },
      selectedPage: 1,
      selectedSearch: null,
      currentItemKey: key,
      recentlyViewed: [],
    });
  }
  @Action(RemoveSearchingParam)
  RemoveSearchingParam(ctx: StateContext<ProductStateModel>) {
    const category = this.store.selectSnapshot(CategoryState.getCurrentCategory);
    if (ctx.getState().selectedSearch) {
      const key = ProductState.itemKey(category, 1);
      ctx.patchState({
      loadedPages: {  },
      selectedPage: 1,
      selectedSearch: null,
      currentItemKey: key,
      recentlyViewed: [],
    });
    }
  }
}


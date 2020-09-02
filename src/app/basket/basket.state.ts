import { NgxsOnInit, StateContext, State, Store, Selector, Action } from '@ngxs/store';
import { ItemList, BasketProductLinesList, Basket } from './models/basket';
import {
  AddToBasket, LoadProductLinesList,
  BasketUpdateProductQuantity, LoadBasket,
  SetCurrentProduct,
  LoadRecommended,
  LoadRecommendedSuccess,
  ClearingRecommended,
  AddToBasketSuccess,
  AddToBasketFail,
  BasketLoadProductProperty,
  BasketLoadProductPropertySuccess,
  LoadProductLinesListSuccess,
} from './basket.actions';
import { LoadProperty, LoadProductDataFromBasket } from '../catalog/container/details/details.actions';
import { trimEnd, endsWith, forEach, has, isEqual, findIndex } from 'lodash';
import { Navigate } from '@ngxs/router-plugin';
import { ProductState, ProductStateModel } from '../catalog/state/product.state';
import { BackendError, ClearMessages, SuccessMessage } from '../messages/messages.actions';
import { BasketService } from './service/basket.service';
import { Product } from '../catalog/models/product.model';
import { Injectable } from '@angular/core';
import { ErrorMessage } from './../messages/messages.actions';

export class BasketStateModel {
  data: {
    [id: number]: ItemList,
  };
  selectedProduct: number;
  recommended: Product[];
  basket: Basket;
  productLines: BasketProductLinesList[];
  products: any[];
  loading?: boolean;
}

@State<BasketStateModel>({
  name: 'basket',
  defaults: {
    loading: false,
    data: {},
    selectedProduct: null,
    recommended: [],
    basket: null,
    productLines: null,
    products: [],
  }
})
@Injectable()
export class BasketState implements NgxsOnInit {
  constructor(
    private store: Store,
    private basketService: BasketService
  ) { }

  @Selector()
  static getBasketItemsIds(state: BasketStateModel) {
    return Object.keys(state.data).map(id => parseInt(id, 10));
  }

  @Selector()
  static getLoadingStatus(state: BasketStateModel) {
    return state.loading;
  }

  @Selector()
  static getProducts(state: BasketStateModel) {
    // const result = [];

    // if (state && state.data) {
    //   forEach(state.productlines, (el) => {
    //     let item: any;
    //     if (has(state.productlines, `${el.id}`)) {
    //       item = Object.assign(state.productlines[el.id], el);
    //     } else {
    //       item = { ...el };
    //     }
    //     result.push(item);
    //   });
    // }

    return state.products;
  }

  @Selector()
  static getBasket(state: BasketStateModel) {
    // const result = [];

    // if (state && state.data) {
    //   forEach(state.productlines, (el) => {
    //     let item: any;
    //     if (has(state.productlines, `${el.id}`)) {
    //       item = Object.assign(state.productlines[el.id], el);
    //     } else {
    //       item = { ...el };
    //     }
    //     result.push(item);
    //   });
    // }

    return state.basket;
  }

  @Selector()
  static getProductLines(state: BasketStateModel) {
    return state.productLines;
  }

  @Selector([ProductState])
  static getData(state: BasketStateModel, productState: ProductStateModel) {
    if (has(productState, `dict.${state.selectedProduct}`) && (has(state, `data.${state.selectedProduct}`))) {
      return { ...productState.dict[state.selectedProduct], ...state.data[state.selectedProduct] };
    }
  }
  @Selector([ProductState])
  static getBasketData(state: BasketStateModel, productState: ProductStateModel) {
    const result = [];

    if (state && state.data) {
      forEach(state.data, (el) => {
        let item: any;
        if (has(productState, `dict.${el.id}`)) {
          item = Object.assign(productState.dict[el.id], el);
        } else {
          item = { ...el };
        }
        result.push(item);
      });
    }

    return result;
  }

  @Selector([ProductState])
  static getBasketTotalPrice(state: BasketStateModel, productState: ProductStateModel) {
    const data = BasketState.getBasketData(state, productState);
    return data.filter(el => has(el, `price_data.excl_tax`))
      .reduce((acc, el) => acc += el.quantity * el.price_data.excl_tax, 0);
  }

  @Action(AddToBasket)
  onAddToBasket(ctx: StateContext<BasketStateModel>, { id, quantity, name }: AddToBasket) {
    const state = ctx.getState();
    quantity = Math.floor(quantity);

    if (quantity >= 1) {
      const product = {url: '/api/products/' + id + '/', quantity};
      if (state && state.data && state.data[id]) {
        quantity += state.data[id].quantity;
      }

      const newItem = { [id]: { id, quantity } as ItemList };
      ctx.patchState({
        data: { ...state.data, ...newItem }
      });
      this.basketService.addProduct(product).subscribe(
        data => ctx.dispatch(new AddToBasketSuccess(data, id, name)),
        err => ctx.dispatch(new AddToBasketFail(err))
      );
    }
  }

  @Action(AddToBasketSuccess)
  addToBasketSuccess(ctx: StateContext<BasketStateModel>, { data, id, name }: AddToBasketSuccess) {
    ctx.patchState({
      basket: data,
    });
    ctx.dispatch([
      new Navigate(['/basket/add', id]), 
      new SuccessMessage( name + ' has been added to your basket.')
    ]);
    // ctx.dispatch(new BasketLoadProductLinesList(data));
  }

  @Action(AddToBasketFail)
  addToBaskeFail(ctx: StateContext<BasketStateModel>, { err }: AddToBasketFail) {
    ctx.dispatch([
      new BackendError(err),
      new ClearMessages(),
      new ErrorMessage(err.error.reason),
    ]);
  }

  @Action(LoadProductLinesList)
  onLoadProductLinesList(ctx: StateContext<BasketStateModel>, { data }: LoadProductLinesList) {

    this.basketService.getBasketProductLinesList(data.id).subscribe(
      response => ctx.dispatch(new LoadProductLinesListSuccess(response)),
      err => ctx.dispatch(new BackendError(err))
    );
    // const fields = ['title', 'availability_data', 'price_data'];

    // fields.forEach(prop => {
    //   if (endsWith(prop, '_data')) {
        // this.store.dispatch(new LoadProperty(id, trimEnd(prop, '_data')));
    //   }
    // });
  }

  @Action(LoadProductLinesListSuccess)
  onLoadProductLinesListSuccess(ctx: StateContext<BasketStateModel>, { data }: LoadProductLinesListSuccess) {
    const lineList = ctx.getState().productLines;
    if (!isEqual(lineList, data)) {
      ctx.patchState({
        productLines: data,
        products: [],
        loading: false,
      });

      data.forEach(prop => {
        this.store.dispatch(new BasketLoadProductProperty(prop.product, prop.quantity));
      });
    }
  }

  @Action(BasketLoadProductProperty)
  onBasketLoadProductProperty(ctx: StateContext<BasketStateModel>, {product, quantity}: BasketLoadProductProperty) {
    const id = product.id as number;
    const itemState = ctx.getState().data;
    const newItem = { [id]: { id, quantity } as ItemList };
    ctx.patchState({
      data: { ...itemState, ...newItem }
    });
    this.store.dispatch(new LoadProductDataFromBasket(product));
  }

  // @Action(BasketLoadProductPropertySuccess)
  // onBasketLoadProductPropertySuccess(ctx: StateContext<BasketStateModel>, {product}: BasketLoadProductPropertySuccess) {
  //   const products = ctx.getState().products;
  //   ctx.patchState({
  //     products: [ ...products, product]
  //   });
  // }

  @Action(LoadBasket)
  onBasketLoadProducts(ctx: StateContext<BasketStateModel>) {
    this.basketService.getBasket().subscribe(
      data => ctx.patchState({ basket: data}),
      err => ctx.dispatch(new BackendError(err))
    );
    // ids.forEach(id => this.store.dispatch(new BasketLoadProduct(id)));
  }

  ngxsOnInit(ctx: StateContext<BasketStateModel>) { }

  @Action(BasketUpdateProductQuantity)
  onBasketUpdateProductQuantity(ctx: StateContext<BasketStateModel>, { id, q }: BasketUpdateProductQuantity) {
    const state = ctx.getState();
    const line = state.productLines.filter(el => el.id === id) as BasketProductLinesList[];
    const productId = line[0].product.id;
    const basketID = ctx.getState().basket.id;
    if (q === 0) {
      const { [productId]: _, ...newState } = state.data || {};
      const filteredLines = state.productLines.filter(el => el.id !== id);
      console.log(productId, newState);

      ctx.patchState({
        data: newState,
        productLines: filteredLines
      });
      this.basketService.deleteLineById(basketID, line[0].id ).subscribe(
        () => ctx.dispatch(new LoadBasket()),
        err => ctx.dispatch(new BackendError(err))
      );
      return;
    }

    const newItem = { [productId]: { id: productId, quantity: q } as ItemList };
    line[0].quantity = q;
    ctx.patchState({
      data: { ...state.data, ...newItem },
      productLines: state.productLines
    });
    this.basketService.changeLineById(basketID, line[0].id, {quantity: q}).subscribe(
      () => ctx.dispatch(new LoadBasket()),
      err => ctx.dispatch(new BackendError(err))
    );
  }

  @Action(SetCurrentProduct)
  onSetCurrentProduct(ctx: StateContext<BasketStateModel>, { id }: SetCurrentProduct) {
    ctx.patchState({
      selectedProduct: id
    });
  }

  @Action(LoadRecommended)
  onLoadRecommended(ctx: StateContext<BasketStateModel>) {
    const state = ctx.getState();
    this.basketService.getRtProductProperty(state.selectedProduct, 'recommended').subscribe(
      data => ctx.dispatch(new LoadRecommendedSuccess(data)),
      err => ctx.dispatch(new BackendError(err)),
    );

  }
  @Action(LoadRecommendedSuccess)
  onLoadRecommendedSuccess(ctx: StateContext<BasketStateModel>, { data }: LoadRecommendedSuccess) {
    ctx.patchState({
      recommended: data
    });
  }
  @Action(ClearingRecommended)
  onClearingRecommended(ctx: StateContext<BasketStateModel>) {
    ctx.patchState({
      recommended: []
    });
  }
}

import { ItemList, BasketProductLinesList, Basket } from './models/basket';
import { Product } from '../catalog/models/product.model';

export class AddToBasket {
  static type = '[Basket] add new item';
  constructor(public id: number, public quantity: number, public name: string) { }
}

export class AddToBasketSuccess {
  static type = '[Basket] AddToBasketSuccess';
  constructor(public data: any, public id: number, public name: string) { }
}

export class AddToBasketFail {
  static type = '[Basket] AddToBasketFail';
  constructor(public err: any) { }
}

export class LoadProductLinesList {
  static type = '[Basket] LoadProductLinesList';
  constructor(public data: Basket) { }
}

export class LoadProductLinesListSuccess {
  static type = '[Basket] LoadProductLinesListSuccess';
  constructor(public data: BasketProductLinesList[]) { }
}

export class LoadBasket {
  static type = '[Basket] LoadBasket';
  // constructor(public ids: number[], ) { }
}

export class BasketLoadProductProperty {
  static type = '[Basket] BasketLoadProductProperty';
  constructor(public product: Product, public quantity: number) { }
}

export class BasketLoadProductPropertySuccess {
  static type = '[Basket] BasketLoadProductPropertySuccess';
  constructor(public product: any) { }
}

export class BasketUpdateProductQuantity {
  static type = '[Basket] BasketUpdateProductQuantity';
  constructor(public id: number, public q: number) { }
}

export class BasketUpdateProductTotal {
  static type = '[Basket] BasketUpdateProductTotal';
  constructor(public id: number, public total: number, ) { }
}

export class SetCurrentProduct {
  static type = '[Basket] SetCurrentProduct';
  constructor(public id: number) { }
}

export class LoadRecommended {
  static type = '[Basket] LoadRecommended';
}
export class LoadRecommendedSuccess {
  static type = '[Basket] LoadRecommendedSuccess';
  constructor(public data: Product[]) { }
}
export class ClearingRecommended {
  static type = '[Basket]  ClearingRecommended';
}


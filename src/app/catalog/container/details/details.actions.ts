import { Product } from '../../models/product.model';

export class LoadProduct {
  static readonly type = '[DetailsPage] coreProductAction';
  constructor(public id: number) { }
}
export class LoadProductData {
  static readonly type = '[DetailsPage] loadMainProductData';
  constructor(public id: number) { }
}
export class LoadProductDataSuccess {
  static readonly type = '[DetailsPage] LoadProductDataSuccess';
  constructor(public dataSet: object) { }
}
export class LoadProperty {
  static readonly type = '[DetailsPage] LoadPropertyCalled';
  constructor(public id: number, public property: string) { }
}
export class LoadPropertyFail {
  static readonly type = '[Product API] LoadPropertyFailed';
  constructor(public error: object, public id: number) { }
}
export class LoadPropertySuccess {
  static readonly type = '[Product API] LoadPropertySuccess';
  constructor(public dataSet: Product, public id: number, public property: string) { }
}
export class RecentViewed {
  static readonly type = '[DetailsPage] RecentViewed';
  constructor(public id: string) { }
}

export class LoadProductDataFromBasket {
  static readonly type = '[DetailsPage] LoadProductDataFromBasket';
  constructor(public dataSet: object) { }
}




import { ProductListResponse } from '../models/product.model';

export class ShowFirst {
  static readonly type = '[PRODUCT] show_first';
}
export class ShowMore {
  static type = '[PRODUCT] show_more' ;
}
export class LoadProductDataAfterAddReview {
  static type = '[PRODUCT] LoadProductDataAfterAddReview';
  constructor(public id: number) {}
}
export class LoadProductsByIdCategory {
  static type = '[PRODUCT] LoadProductsByIdCategory';
  constructor(public id: number) {}
}
export class LoadProductsByIdCategorySuccess {
  static readonly type = '[PRODUCT] LoadProductsByIdCategorySuccess';
  constructor(public data: ProductListResponse,  public key: string) {}
}
export class LoadCatalogFail {
  static type = '[PRODUCT] LoadFail';
  constructor(public error: any) {}
}
export class LoadCatalog {
  static readonly type = '[PRODUCT] load';
  constructor(public page: number) {}
}
export class LoadCatalogSuccess {
  static type = '[PRODUCT] LoadCatalogSuccess';
  constructor(public productData: ProductListResponse, public page: number, public key: string) {}
}
export class LoadProductsPageById {
  static readonly type = '[PRODUCT] load_ProductsPageById';
  constructor(public page: number, public id: number) {}
}
export class LoadProductsPageByIdSuccess {
  static type = '[PRODUCT] LoadProductsPageByIdSuccess';
  constructor(public productsOnPage: ProductListResponse, public page: number, public key: string) {}
}
export class ChangeCurrentElement {
  static readonly type = '[PRODUCT] ChangeCurrentElement';
  constructor(public payload: number) {}
}
export class SetSelectedImage {
  static readonly type = '[PRODUCT] SetSelectedImage';
  constructor(public index: number) {}
}
export class RemoveSelectedImage {
  static type = '[PRODUCT] RemoveSelectedImage' ;
}
export class Loading {
  static type = '[Auth] Loading';
}
export class Loaded {
  static type = '[Auth] Loaded';
}
export class AfterRemoveCategory {
  static type = '[PRODUCT] AfterRemoveCategory' ;
}
export class Searching {
  static readonly type = '[PRODUCT] Searching';
  constructor(public search: string) {}
}
export class SearchingSuccess {
  static type = '[PRODUCT] SearchingSuccess';
  constructor(public searchProducts: ProductListResponse, public search: string, public key: string) {}
}
export class RemoveSearchingParam {
  static type = '[PRODUCT] RemoveSearchingParam' ;
}


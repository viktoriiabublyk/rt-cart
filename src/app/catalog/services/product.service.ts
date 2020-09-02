import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { ProductListResponse } from '../models/product.model';
// import { filterQueryId } from '@angular/core/src/view/util';
// import { map, filter } from 'rxjs/operators';
// import { forEach } from '@angular/router/src/utils/collection';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }
  private apiUrl = '/api';

  getProductList(page: number): Observable<ProductListResponse> {
    const url = `${this.apiUrl}/rt-oscar/products/?page=${page}`;
    return this.http.get<ProductListResponse>(url);
  }
  getProductsListByIdCategory(id: number): Observable<ProductListResponse> {
    const url = `${this.apiUrl}/rt-oscar/products/category/${id}`;
    return this.http.get<ProductListResponse>(url);
  }
  getProductsPageByIdCat(page: number, id: number): Observable<ProductListResponse> {
    const url = `${this.apiUrl}/rt-oscar/products/category/${id}/?page=${page}`;
    return this.http.get<ProductListResponse>(url);
  }
  getProductPrice(id: number) {
    const url = `${this.apiUrl}/rt-oscar/products/${id}/price/`;
    return this.http.get(url);
  }
  getProductItem(id: number) {
    const url = `${this.apiUrl}/rt-oscar/products/${id}`;
    return this.http.get(url);
  }
  getProductProperty(id: number, property: string) {
    const url = `${this.apiUrl}/products/${id}/${property}`;
    return this.http.get(url);
  }
  getRtProductProperty(id: number, property: string) {
    const url = `${this.apiUrl}/rt-oscar/products/${id}/${property}`;
    return this.http.get(url);
  }
  getSearchProducts(search: string) {
    const url = `${this.apiUrl}/rt-oscar/search/?q=${search}`;
    return this.http.get<ProductListResponse>(url);
  }

}

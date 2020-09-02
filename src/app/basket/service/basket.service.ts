import { ItemList, BasketProductLinesList, Basket } from './../models/basket';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Product} from "../../catalog/models/product.model";

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  constructor(private http: HttpClient) { }
  private apiUrl = '/api';
  private lineEndpoint = '/api/rt-oscar/baskets/';

  getProductItem(id: number) {
    const url = `${this.apiUrl}/products/${id}`;
    return this.http.get(url);
  }

  getProductProperty(id: number, property: string) {
    const url = `${this.apiUrl}/products/${id}/${property}`;
    return this.http.get(url);
  }

  getRtProductProperty(id: number, property: string): Observable<Product[]> {
    const url = `${this.apiUrl}/rt-oscar/products/${id}/${property}`;
    return this.http.get<Product[]>(url);
  }

  getBasket(): Observable<Basket> {
    return this.http.get<Basket>(`${this.apiUrl}/rt-oscar/basket/`);
  }

  getBasketProductLinesList(id): Observable<BasketProductLinesList[]> {
    return this.http.get<BasketProductLinesList[]>(this.lineEndpoint + id + '/lines');
  }

  changeLineById(basketId, lineId, value): Observable<BasketProductLinesList> {
    return this.http.patch<BasketProductLinesList>(this.lineEndpoint + basketId + '/lines/' + lineId + '/', value);
  }

  deleteLineById(basketId, lineId ): Observable<any> {
    return this.http.delete<any>(this.lineEndpoint + basketId + '/lines/' + lineId + '/');
  }
  // getBasketProduct(url): Observable<any> {
  //   return this.http.get<any>(url);
  // }

  addProduct(product) {
    return this.http.post(`${this.apiUrl}/basket/add-product/`, product);
  }

}

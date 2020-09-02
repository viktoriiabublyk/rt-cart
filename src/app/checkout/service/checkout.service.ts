import { Observable } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShippingAddressForm, CountryData } from '../models/checkout.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }
  readonly endpoint = '/api/checkout/';
  readonly endpointAddress = '/api/useraddresses/';

  post(formValue): Observable<ShippingAddressForm> {
    return this.http.post<ShippingAddressForm>(this.endpoint, formValue);
  }

  getAddress(): Observable<ShippingAddressForm[]> {
    return this.http.get<ShippingAddressForm[]>(this.endpointAddress);
  }

  deleteAddress(id): Observable<any> {
    return this.http.delete<any>(this.endpointAddress + id);
  }

  getCountry(url): Observable<CountryData> {
    return this.http.get<CountryData>(url);
  }
}

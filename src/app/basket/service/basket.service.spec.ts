import { TestBed, inject } from '@angular/core/testing';

import { BasketService } from './basket.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductListResponse } from '../../catalog/models/product.model';
import {PRODUCT} from "../../catalog/state/product.state.spec";

describe('BasketService', () => {
  let httpMock: HttpTestingController;
  const list: ProductListResponse = {
    count: 209,
    next: '',
    previous: '',
    results: [PRODUCT],
  };

  const availability = {
    is_available_to_buy: true,
    num_available: 42,
    message: 'In stock (42 available)'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [BasketService]
    });
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([BasketService], (service: BasketService) => {
    expect(service).toBeTruthy();
  }));


  it('should done http get for product item', inject([BasketService], (service: BasketService) => {
    service.getProductItem(209).subscribe(l => {
      expect(l).toEqual(list);
    });
    const req = httpMock.expectOne('/api/products/209');
    expect(req.request.method).toBe('GET');
    req.flush(list);
  }));

  it('should done http get for product property', inject([BasketService], (service: BasketService) => {
    service.getProductProperty(207, 'availability').subscribe(l => {
      expect(l).toEqual(availability);
    });
    const req = httpMock.expectOne('/api/products/207/availability');
    expect(req.request.method).toBe('GET');
    req.flush(availability);
  }));

});

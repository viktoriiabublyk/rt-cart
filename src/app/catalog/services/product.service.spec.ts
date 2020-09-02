import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { ProductService } from './product.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ProductListResponse } from '../models/product.model';
import { PRODUCT } from '../state/product.state.spec';

describe('ProductsService', () => {
  let httpMock: HttpTestingController;
  const list: ProductListResponse = {
      count: 209,
      next: '',
      previous: '',
      results: [PRODUCT],
    };

  const priceList = {
    currency: 'GBP',
    excl_tax: '23.99',
    incl_tax: '23.99',
    tax: '0.00'
  };

  const availability = {
    is_available_to_buy: true,
    num_available: 42,
    message: 'In stock (42 available)'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        // {provide: HttpClient, useValue: {}}
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([ProductService], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));

  it('should done http get for 1 page', inject([ProductService], (service: ProductService) => {
    service.getProductList(1).subscribe(l => {
      expect(l).toEqual(list);
    });
    const req = httpMock.expectOne('/api/rt-oscar/products/?page=1');
    expect(req.request.method).toBe('GET');
    req.flush(list);
  }));

  it('should done http get for 2 page', inject([ProductService], (service: ProductService) => {
    service.getProductList(2).subscribe(l => {
      expect(l).toEqual(list);
    });
    const req = httpMock.expectOne('/api/rt-oscar/products/?page=2');
    expect(req.request.method).toBe('GET');
    req.flush(list);
  }));

  it('should done http get for 3 page', inject([ProductService], (service: ProductService) => {
    service.getProductList(3).subscribe(l => {
      expect(l).toEqual(list);
    });
    const req = httpMock.expectOne('/api/rt-oscar/products/?page=3');
    expect(req.request.method).toBe('GET');
    req.flush(list);
  }));

  it('should done http get for product price', inject([ProductService], (service: ProductService) => {
    service.getProductPrice(208).subscribe(l => {
      expect(l).toEqual(priceList);
    });
    const req = httpMock.expectOne('/api/rt-oscar/products/208/price/');
    expect(req.request.method).toBe('GET');
    req.flush(priceList);
  }));

  it('should done http get for product item', inject([ProductService], (service: ProductService) => {
    service.getProductItem(209).subscribe(l => {
      expect(l).toEqual(list);
    });
    const req = httpMock.expectOne('/api/rt-oscar/products/209');
    expect(req.request.method).toBe('GET');
    req.flush(list);
  }));

  it('should done http get for product property', inject([ProductService], (service: ProductService) => {
    service.getProductProperty(207, 'availability').subscribe(l => {
      expect(l).toEqual(availability);
    });
    const req = httpMock.expectOne('/api/products/207/availability');
    expect(req.request.method).toBe('GET');
    req.flush(availability);
  }));

  it('should done http get for all products by category[1]', inject([ProductService], (service: ProductService) => {
    service.getProductsListByIdCategory(1).subscribe(l => {
      expect(l).toEqual(list);
    });
    const req = httpMock.expectOne('/api/rt-oscar/products/category/1');
    expect(req.request.method).toBe('GET');
    req.flush(list);
  }));

  it('should done http get for all products by category[2]', inject([ProductService], (service: ProductService) => {
    service.getProductsListByIdCategory(2).subscribe(l => {
      expect(l).toEqual(list);
    });
    const req = httpMock.expectOne('/api/rt-oscar/products/category/2');
    expect(req.request.method).toBe('GET');
    req.flush(list);
  }));

  it('should done http get for all products by category[7]', inject([ProductService], (service: ProductService) => {
    service.getProductsListByIdCategory(7).subscribe(l => {
      expect(l).toEqual(list);
    });
    const req = httpMock.expectOne('/api/rt-oscar/products/category/7');
    expect(req.request.method).toBe('GET');
    req.flush(list);
  }));

  it('should done http get for products by category[6] on page 2', inject([ProductService], (service: ProductService) => {
    service.getProductsPageByIdCat(2, 6).subscribe(l => {
      expect(l).toEqual(list);
    });
    const req = httpMock.expectOne('/api/rt-oscar/products/category/6/?page=2');
    expect(req.request.method).toBe('GET');
    req.flush(list);
  }));

  it('should done http get for products by category[2] on page 5', inject([ProductService], (service: ProductService) => {
    service.getProductsPageByIdCat(5, 2).subscribe(l => {
      expect(l).toEqual(list);
    });
    const req = httpMock.expectOne('/api/rt-oscar/products/category/2/?page=5');
    expect(req.request.method).toBe('GET');
    req.flush(list);
  }));

});

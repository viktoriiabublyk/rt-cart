import { TestBed, inject } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Category } from '../models/category.model';


describe('CategoryService', () => {
  let httpMock: HttpTestingController;
  const listCat: Category = {
    data: {},
    id: 2,
  children: [{
    data: {},
    id: 3
  }],
  };
  beforeEach(() => {TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
  });
                    httpMock = TestBed.get(HttpTestingController);
});
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', ()  => {
    const service: CategoryService = TestBed.get(CategoryService);
    expect(service).toBeTruthy();
  });


  it('should done http get caterories list', () => {
    const service: CategoryService = TestBed.get(CategoryService);
    service.getCategoriesList().subscribe(l => {
      expect(l).toEqual([listCat]);
    });
    const req = httpMock.expectOne('/api/rt-oscar/category/');
    expect(req.request.method).toBe('GET');
    req.flush([listCat]);
  });
});

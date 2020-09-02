import { TestBed, inject } from '@angular/core/testing';

import { FlatpagesService } from './flatpages.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Flatpages } from '../models/flatpage';

describe('FlatpageService', () => {
  let httpMock: HttpTestingController;
  const page: Flatpages = {
    url: '/faq/',
    title: 'faq',
    content: 'faq page content here',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        FlatpagesService
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([FlatpagesService], (service: FlatpagesService) => {
    expect(service).toBeTruthy();
  }));
  it(`should done http get for 'faq' page`, inject([FlatpagesService], (service: FlatpagesService) => {
    service.getSingleFlatPage('faq').subscribe(data => {
      expect(data).toEqual(page);
    });
    const req = httpMock.expectOne('/api/rt-flatpages/faq');
    expect(req.request.method).toBe('GET');
    req.flush(page);
  }));

});

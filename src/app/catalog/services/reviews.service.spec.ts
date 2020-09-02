import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ReviewsService } from './reviews.service';
import { REVIEW_DATA, REVIEW_FORM } from '../state/review.state.spec';
import { ReviewsList, Review, Item } from '../models/reviews.model';

export const item: Item = {
  loading: false,
  loaded: true,
  next: '',
  ts: 11213,
  list: [203, 134, 32, 23]
};

describe('ReviewsService', () => {
  let httpMock: HttpTestingController;
  const list: ReviewsList = {
      count: 209,
      next: '',
      previous: '',
      results: [REVIEW_DATA],
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

  it('should be created', inject([ReviewsService], (service: ReviewsService) => {
    expect(service).toBeTruthy();
  }));

  it('should done http post when add review', inject([ReviewsService], (service: ReviewsService) => {
    service.setReview(REVIEW_FORM).subscribe(l => {
      expect(l).toEqual(REVIEW_DATA);
      expect(REVIEW_DATA.product).toBe(209);
      expect(REVIEW_DATA.product).toBe(REVIEW_FORM.product);
      expect(service.prod).toBe(undefined);
      expect(service.sortOption).toBe(undefined);
    });
    const req = httpMock.expectOne('/api/rt-oscar/reviews/');
    expect(req.request.method).toBe('POST');
    req.flush(REVIEW_DATA);
  }));

  it('should done http get on 2 page for product 209', inject([ReviewsService], (service: ReviewsService) => {
    service.getReviewsOnPage(209, 2).subscribe(l => {
      expect(l).toEqual(list);
      expect(service.page).toBe(2);
      expect(service.prod).toBe(209);
      expect(service.sortOption).toBe(undefined);
    });
    const req = httpMock.expectOne('/api/rt-oscar/products/209/reviews/?page=2');
    expect(req.request.method).toBe('GET');
    req.flush(list);
  }));


  it('should done http get on 1 page for product 209', inject([ReviewsService], (service: ReviewsService) => {
    service.getReviewsOnPage(209, 1).subscribe(l => {
      expect(l).toEqual(list);
      expect(service.page).toBe(1);
      expect(service.prod).toBe(209);
      expect(service.sortOption).toBe(undefined);
    });
    const req = httpMock.expectOne('/api/rt-oscar/products/209/reviews/');
    expect(req.request.method).toBe('GET');
    req.flush(list);
  }));

  it('should done http get on 3 page for product 209 with sort option "score" ', inject([ReviewsService], (service: ReviewsService) => {
    service.getSortedReviewsOnPage(209, 3, 'score').subscribe(l => {
      expect(l).toEqual(list);
      expect(service.page).toBe(3);
      expect(service.sortOption).toBe('score');

    });
    const req = httpMock.expectOne('/api/rt-oscar/products/209/reviews/?page=3&sort_by=score');
    expect(req.request.method).toBe('GET');
    req.flush(list);
  }));

  it('should done http get on 1 page for product 209 with sort option "score" ', inject([ReviewsService], (service: ReviewsService) => {
    service.getSortedReviewsOnPage(209, 1, 'score').subscribe(l => {
      expect(l).toEqual(list);
      expect(service.page).toBe(1);
      expect(service.sortOption).toBe('score');


    });
    const req = httpMock.expectOne('/api/rt-oscar/products/209/reviews/?sort_by=score');
    expect(req.request.method).toBe('GET');
    req.flush(list);
  }));

  it('should done http get on 1 page for product 207 with sort option "recency" ', inject([ReviewsService], (service: ReviewsService) => {
    service.getSortedReviewsOnPage(207, 1, 'recency').subscribe(l => {
      expect(l).toEqual(list);
      expect(service.page).toBe(1);
      expect(service.sortOption).toBe('recency');


    });
    const req = httpMock.expectOne('/api/rt-oscar/products/207/reviews/?sort_by=recency');
    expect(req.request.method).toBe('GET');
    req.flush(list);
  }));

  it('should done http get on 1 page for product 207 with sort option "score" ', inject([ReviewsService], (service: ReviewsService) => {
    service.getSortedReviewsOnPage(207, 1, 'score').subscribe(l => {
      expect(l).toEqual(list);
      expect(service.page).toBe(1);
      expect(service.sortOption).toBe('score');
    });
    const req = httpMock.expectOne('/api/rt-oscar/products/207/reviews/?sort_by=score');
    expect(req.request.method).toBe('GET');
    req.flush(list);
  }));

  it('should done http get on 3 page for product 207 with sort option "score" ', inject([ReviewsService], (service: ReviewsService) => {
    service.getSortedReviewsOnPage(207, 3, 'score').subscribe(l => {
      expect(l).toEqual(list);
      expect(service.page).toBe(3);

    });
    const req = httpMock.expectOne('/api/rt-oscar/products/207/reviews/?page=3&sort_by=score');
    expect(req.request.method).toBe('GET');
    req.flush(list);
  }));

  it('should done http get for review', inject([ReviewsService], (service: ReviewsService) => {
    service.getSelectedReview(208).subscribe(l => {
      expect(l).toEqual(REVIEW_DATA);
    });
    const req = httpMock.expectOne('/api/rt-oscar/reviews/208');
    expect(req.request.method).toBe('GET');
    req.flush(REVIEW_DATA);
  }));

  it('should API_ENDPOINT is equal', inject([ReviewsService], (service: ReviewsService) => {
    expect(service.API_ENDPOINT).toBe('/api/rt-oscar');
    expect(service.page).toBe(0);

  }));

});

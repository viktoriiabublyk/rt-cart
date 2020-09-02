import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReviewsList, Review } from '../models/reviews.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  API_ENDPOINT = '/api/rt-oscar';

  constructor(private http: HttpClient) { }
  get endpoint() {
    return this.page <= 1 ? `${this.API_ENDPOINT}/products/${this.prod}/reviews/`
      : `${this.API_ENDPOINT}/products/${this.prod}/reviews/?page=${this.page}`;
  }
  get endpointForSorting() {
    return this.page <= 1 ? `${this.API_ENDPOINT}/products/${this.prod}/reviews/?sort_by=${this.sortOption}`
      : `${this.API_ENDPOINT}/products/${this.prod}/reviews/?page=${this.page}&sort_by=${this.sortOption}`;
  }
  page = 0;
  prod: number;
  sortOption: string;

  setReview(formValue): Observable<Review> {
    return this.http.post<Review>(`${this.API_ENDPOINT}/reviews/`, formValue);
  }
  getReviewsOnPage(prod: number, page: number): Observable<ReviewsList> {
    this.page = page;
    this.prod = prod;
    return this.http.get<ReviewsList>(this.endpoint);
  }
  getSortedReviewsOnPage(prod: number, page: number, sort: string): Observable<ReviewsList> {
    this.page = page;
    this.prod = prod;
    this.sortOption = sort;
    return this.http.get<ReviewsList>(this.endpointForSorting);
  }
  getSelectedReview(id: number): Observable<Review> {
    return this.http.get<Review>(`${this.API_ENDPOINT}/reviews/${id}`);
  }
}

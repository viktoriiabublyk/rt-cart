
import { ReviewsList, Review } from '../models/reviews.model';

export class RemoveAddStatus {
  static type = '[REVIEW] RemoveAddStatus';
}

export class AddReview {
  static type = '[REVIEW] AddReview';
  constructor(public form: Review) {}
}

export class AddReviewSuccess {
  static type = '[REVIEW] AddReviewSuccess';
  constructor(public data: Review) {}
}

export class LoadReviews {
  static type = '[REVIEW] LoadReviews';
  constructor(public page: number) {}
}

export class LoadSortedReviews {
  static type = '[REVIEW] LoadSortedReviews';
  constructor(public page: number, public sort: string) {}
}

export class LoadReviewsSuccess {
  static type = '[REVIEW] LoadReviewsSuccess';
  constructor(public data: ReviewsList, public prod: number, public page: number, public key: string ) {}
}

export class LoadReviewsOnPageSuccess {
  static type = '[REVIEW] LoadReviewsOnPageSuccess';
  constructor(public data: ReviewsList, public prod: number, public page: number, public key: string) {}
}

export class SetCurrentReviewPage {
  static type = '[REVIEW] SetCurrentReviewPage';
  constructor(public page: number, public sort: string) {}
}

export class SetLastPage {
  static type = '[REVIEW] SetLastPage';
  constructor(public page: number) {}
}

export class SetCurrentReview {
  static type = '[REVIEW] SetCurrentReview';
  constructor(public id: number) {}
}

export class LoadSelectedReview {
  static type = '[REVIEW] LoadSelectedReview';
  constructor(public id: number) {}
}

export class LoadSelectedReviewSuccess {
  static type = '[REVIEW] LoadSelectedReviewSuccess';
  constructor(public data: Review) {}
}

export class LoadReviewsOnLastPage {
  static type = '[REVIEW] LoadReviewsOnLastPage';
  constructor(public review: Review, public page: number, public key: string) {}
}

export class RemoveCurrentReview {
  static type = '[REVIEW] RemoveCurrentReview';
}

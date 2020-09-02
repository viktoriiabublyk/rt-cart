import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReviewsComponent } from './customer-reviews.component';
import { ReviewComponent } from '../review/review.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxsModule, Store } from '@ngxs/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { TdPagingBarComponent } from '@covalent/core/paging';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoadProduct } from '../../container/details/details.actions';
import { SetCurrentReview, LoadSelectedReview, RemoveCurrentReview, SetCurrentReviewPage, LoadReviews } from '../../state/review.action';
import { SetCurrentCategory } from '../../state/category.action';
import { Navigate } from '@ngxs/router-plugin';
import { data } from '../../container/list/list.component.spec';
import {Settings} from "../../../../conf/settings";
import {StarRatingComponent} from "../../../rt-forms/star-rating/star-rating.component";
export interface SortOprions {
  name: string;
}
describe('CustomerReviewsComponent', () => {
  let component: CustomerReviewsComponent;
  let store: Store;
  let route: ActivatedRoute;
  let service: Title;
  let setting: Settings;



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatFormFieldModule,
        NgxsModule.forRoot(),
        HttpClientTestingModule,
        MatInputModule,
        MatAutocompleteModule,
        MatButtonModule,
      ],
      declarations: [ CustomerReviewsComponent, TdPagingBarComponent, StarRatingComponent, ReviewComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: {
              subscribe: (fn: (value: Params) => void) => fn({
                titleWithId: 'the-shellcoders-handbook_209',
                reviews: 'reviews'
              })
            },
            queryParams: {
              subscribe: (fn: (value: Params) => void) => fn({
                sort_by: null,
              })
            }
          }
        },
        {provide: Title,  useValue: {}},
        {provide: Settings},
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
    store = TestBed.get(Store);
    route = TestBed.get(ActivatedRoute);
    service = TestBed.get(Title);
    setting = TestBed.get(Settings);
    component = new CustomerReviewsComponent(route, store, service, setting);
    component.options = [
      { name: 'Score' },
      { name: 'Recency' },
    ];
  }));

  beforeEach(() => {
    spyOn(store, 'dispatch');
    spyOn(component, 'removeCurrentReview');

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch LoadProduct without product param', () => {
    spyOn(component, 'removeSortOption');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(LoadProduct));
    expect(store.dispatch).not.toHaveBeenCalledWith(jasmine.any(SetCurrentReview));
    expect(store.dispatch).not.toHaveBeenCalledWith(jasmine.any(LoadSelectedReview));
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(RemoveCurrentReview));
    expect(component.removeSortOption).toHaveBeenCalled();

  });

  it('should test function setPage without selected review', () => {
    expect(store.dispatch).not.toHaveBeenCalledWith(jasmine.any(SetCurrentReviewPage));
    component.setPage();
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(SetCurrentReviewPage));
    expect(store.dispatch).not.toHaveBeenCalledWith(jasmine.any(RemoveCurrentReview));
  });

  it('should test function removeSortOption without sortOption', () => {
    expect(store.dispatch).not.toHaveBeenCalledWith(jasmine.any(SetCurrentReviewPage));
    component.removeSortOption();
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(SetCurrentReviewPage));
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(LoadReviews));

  });

  it('should test function removeCurrentReview without selected review', () => {
    component.removeCurrentReview();
    expect(store.dispatch).not.toHaveBeenCalledWith(jasmine.any(SetCurrentReviewPage));
    expect(store.dispatch).not.toHaveBeenCalledWith(jasmine.any(RemoveCurrentReview));
  });

  it('should dispatch RemoveCurrentCategory onDestroy', () => {
    component.ngOnDestroy();
    expect(component.removeCurrentReview).toHaveBeenCalled();
    expect(store.dispatch).not.toHaveBeenCalledWith(jasmine.any(SetCurrentReviewPage));
    expect(store.dispatch).not.toHaveBeenCalledWith(jasmine.any(RemoveCurrentReview));
  });

  it('should dispatch SetCurrentCategory after choose breadcrumb', () => {
    expect(store.dispatch).not.toHaveBeenCalledWith([jasmine.any(SetCurrentCategory), jasmine.any(Navigate)]);
    component.choiseBreadscrum(data);
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith([jasmine.any(SetCurrentCategory), jasmine.any(Navigate)]);
    expect(component.removeCurrentReview).toHaveBeenCalled();
  });
});

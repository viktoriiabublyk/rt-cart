import { of, Subject, Observable } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsComponent } from './details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Title, BrowserModule } from '@angular/platform-browser';
import { LoadProduct, RecentViewed } from './details.actions';
import { Product, NOT_DOWLOADED } from '../../models/product.model';

import { Navigate } from '@ngxs/router-plugin';
import { data } from '../list/list.component.spec';
import { ProductStateModel } from '../../state/product.state';
import { SetCurrentCategory } from '../../state/category.action';
import { NO_ERRORS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PageScrollService } from 'ngx-page-scroll';
import { SetCurrentReviewPage, RemoveCurrentReview, SetCurrentReview, LoadReviews, RemoveAddStatus } from '../../state/review.action';
import { SetSelectedImage } from '../../state/product.action';
import { NgImageSliderComponent } from 'ng-image-slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RtScrollService} from "../../../rt-scroll/rt-scroll.service";
import {BasketModule} from "../../../basket/basket.module";
import {StarRatingComponent} from "../../../rt-forms/star-rating/star-rating.component";
import {settings} from "../../../../environments/environment";

export const PRODUCT: Product = {
  url: 'http://localhost:4200/api/products/209/',
  upc: '9780764544682',
  id: 209,
  title: 'The shellcoder\'s handbook',
  description:
  'The Shellcoder\'s Handbook shows you how to:',
  structure: 'standalone',
  date_created: '2018-10-05T11:14:32.920741+01:00',
  date_updated: '2018-10-05T11:14:32.920769+01:00',
  recommended_products: [],
  attributes: [],
  categories: [
    'Books > Non-Fiction > Hacking'
  ],
  product_class: 'Book',
  stockrecords: 'http://localhost:4200/api/products/209/stockrecords/',
  images: [
    {
      id: 99,
      original: 'http://localhost:4200/media/images/products/2018/10/9780764544682.jpg',
      caption: '',
      display_order: 0,
      date_created: '2018-10-05T11:14:34.270488+01:00',
      product: 209
    }
  ],
  price: 'http://localhost:4200/api/products/209/price/',
  availability: 'http://localhost:4200/api/products/209/availability/',
  options: [],
  children: []
};

export const SOME_DESIRED_STATE: ProductStateModel = {
  dict: {},
  items: {},
  selectedPage: null,
  selectedCategory: null,
  selectedSearch: null,
  selectedImage: null,
  loadedPages: {},
  currentItemKey: null,
  currentElement: null,
  length: 50,
  imgStatus: NOT_DOWLOADED,
  recentlyViewed: [],
};
const EXAMPLESTATE: ProductStateModel = SOME_DESIRED_STATE;

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let store: Store;
  let service: RtScrollService;
  let titleService: Title;
  let route: ActivatedRoute;
  let cd: ChangeDetectorRef;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot(),
        BasketModule,
      ],
      declarations: [ DetailsComponent, StarRatingComponent ],
      providers: [
        {
          provide: ProductService, useValue: {}
        },
        RtScrollService,
        PageScrollService,
        Title,
        ChangeDetectorRef,
        {
          provide: ActivatedRoute,
          useValue: {params: of({titleWithId: 'test_123', add: 'add'})},
        },
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
    service = TestBed.get(RtScrollService);
    store = TestBed.get(Store);
    route = TestBed.get(ActivatedRoute);
    cd = TestBed.get(ChangeDetectorRef);
    store.reset({product: EXAMPLESTATE});
    titleService = TestBed.get(Title);
    component = new DetailsComponent(cd, route, store, titleService, settings, service);
  }));

  beforeEach(() => {
    spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setTitle method was called', async(() => {
    spyOn(titleService, 'setTitle');
    titleService.setTitle(settings.setTitle(data));
    expect(titleService.setTitle).toHaveBeenCalled();
  }));

  it('setTitle changed title', async(() => {
    titleService.setTitle('newTitle');
    fixture.detectChanges();
    expect(titleService.getTitle()).toBe('newTitle');
  }));

  it(`setTitle doesn't change title to empty`, async(() => {
    titleService.setTitle(settings.setTitle(null));
    fixture.detectChanges();
    expect(titleService.getTitle()).not.toEqual('');
    expect(titleService.getTitle()).toEqual('Static page');

  }));

  it('route was injected and result are right', () => {
    let result: any;
    const debugComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    debugComponent.route.params.subscribe( (x: any) => {
      return result = x;
    });
    expect(result.titleWithId).toBe('test_123');
    expect(result.add).toBe('add');

  });

  it('should call scroll service function ToClass and dispatch actions when called ngOnInit', () => {
    spyOn(service, 'toClass');
    expect(service.toClass).not.toHaveBeenCalled();
    component.ngOnInit();
    expect(service.toClass).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(LoadProduct));
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(RecentViewed));
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(SetCurrentReview));
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(LoadReviews));
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(SetCurrentReviewPage));
    expect(store.dispatch).not.toHaveBeenCalledWith(jasmine.any(RemoveCurrentReview));
    expect(service.toClass).toHaveBeenCalled();
  });

  it('should call scroll service function ToClass and dispatch actions when called ngAfterViewInit', () => {
    spyOn(service, 'toClass');
    component.ngAfterViewInit();

    expect(store.dispatch).not.toHaveBeenCalledWith(jasmine.any(RemoveAddStatus));
    expect(service.toClass).not.toHaveBeenCalled();

  });

  it('should dispatch SetCurrentCategory and Navigate when called function choiseBreadscrum', () => {
    expect(store.dispatch).not.toHaveBeenCalledWith([jasmine.any(SetCurrentCategory), jasmine.any(Navigate)]);
    component.choiseBreadscrum(data);
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith([jasmine.any(SetCurrentCategory), jasmine.any(Navigate)]);

  });

  it('should dispatch SetSelectedImage when called function setSelectedImage', () => {
    component.setSelectedImage(2);
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(SetSelectedImage));

  });

  it('should dispatch SetCurrentReviewPage when called function removeCurrentReview', () => {
    component.removeCurrentReview();
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(SetCurrentReviewPage));
    expect(store.dispatch).not.toHaveBeenCalledWith(jasmine.any(RemoveCurrentReview));

  });

  it('should call scroll service function toClass when called function scrollToAddForm' , () => {
    spyOn(service, 'toClass');
    expect(service.toClass).not.toHaveBeenCalled();
    component.scrollToAddForm();
    expect(service.toClass).toHaveBeenCalled();
  });

  it('should dispatch SetCurrentReviewPage and Navigate when called function setFirstPageReviews', () => {
    expect(store.dispatch).not.toHaveBeenCalledWith([jasmine.any(SetCurrentReviewPage), jasmine.any(Navigate)]);
    component.setFirstPageReviews(data);
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith([jasmine.any(SetCurrentReviewPage), jasmine.any(Navigate)]);

  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { Settings } from '../../conf/settings';
import { LoadProductsForHomePage } from './home.action';
import { ProductComponent } from '../catalog/components/product/product.component';
import { BasketModule } from '../basket/basket.module';
import { MockComponent } from 'ng2-mock-component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoadCategory } from '../catalog/state/category.action';
import { StarRatingComponent } from '../rt-forms/star-rating/star-rating.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot(),
        BasketModule,
        MatToolbarModule
      ],
      declarations: [ HomeComponent, ProductComponent, StarRatingComponent,
        MockComponent({ selector : 'app-category', inputs: ['category']}) ],
      providers: [
        // {provide: ProductService, useValue: {}},
        {provide: Settings, useValue: 7},
        // {provide: HomeComponent, useValue: {}}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should this.prosuct$ = this.firstPartProducts$', () => {
    expect(component.product$).toEqual(component.firstPartProducts$);
  });

  it('should dispatch LoadProductsForHomePage', () => {
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith([jasmine.any(LoadProductsForHomePage), jasmine.any(LoadCategory)]);
  });

  it('should done showMore', () => {
    expect(component.product$).toEqual(component.firstPartProducts$);
    component.showMore();
    expect(component.product$).toEqual(component.products$);
    expect(component.hasClickedShowMore).toEqual(true);
  });

  it('should done showLess', () => {
    component.showLess();
    expect(component.product$).toEqual(component.firstPartProducts$);
    expect(component.hasClickedShowMore).toEqual(false);
  });
});

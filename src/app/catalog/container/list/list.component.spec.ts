import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import {} from 'jasmine';
import { ProductService } from '../../services/product.service';
import { ProductComponent } from '../../components/product/product.component';
import { MockComponent } from 'ng2-mock-component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Params } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { ShowFirst, ShowMore, RemoveSearchingParam } from '../../state/product.action';
import { LoadCategory, SetCurrentCategory, RemoveCurrentCategory } from '../../state/category.action';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TdLoadingService, CovalentLoadingModule } from '@covalent/core/loading';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {BasketModule} from "../../../basket/basket.module";

export const data = {
  id: 2,
  name: 'Books',
  descpiption: '',
  image: '',
  slug: 'books'
};
describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let store: Store;
  let route: ActivatedRoute;
  let loading: TdLoadingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        NgxsModule.forRoot(),
        BasketModule,
        HttpClientTestingModule,
        MatToolbarModule,
        CovalentLoadingModule,
      ],
      declarations: [ ListComponent, ProductComponent,
        MockComponent({ selector : 'app-category', inputs: ['category']}) ],
      providers: [
      {
          provide: ActivatedRoute,
          useValue: {
            params: {
              subscribe: (fn: (value: Params) => void) => fn({
                  nameCatWithID: 'books_2',
              })
          },
          queryParams: {
            subscribe: (fn: (value: Params) => void) => fn({
              0: null,
            })
          }
        }
      },
        {provide: ProductService, useValue: {}},
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
   .compileComponents();
    store = TestBed.get(Store);
    route = TestBed.get(ActivatedRoute);
    loading = TestBed.get(TdLoadingService);
    component = new ListComponent(route, store, loading);


  }));

  beforeEach(() => {
    spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(ListComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch ShowFirst with category param', () => {
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(SetCurrentCategory));
    expect(store.dispatch).not.toHaveBeenCalledWith(jasmine.any(RemoveCurrentCategory));
    expect(store.dispatch).toHaveBeenCalledWith([jasmine.any(RemoveSearchingParam), jasmine.any(ShowFirst)]);
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(LoadCategory));
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(SetCurrentCategory));
    expect(store.dispatch).toHaveBeenCalledWith([jasmine.any(RemoveSearchingParam), jasmine.any(ShowFirst)]);
  });

  it('should dispatch ShowMore', () => {
    expect(store.dispatch).not.toHaveBeenCalledWith(jasmine.any(ShowMore));
    component.showMore();
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(ShowMore));
  });

  it('should dispatch SetCurrentCategory', () => {
    expect(store.dispatch).not.toHaveBeenCalledWith([jasmine.any(SetCurrentCategory), jasmine.any(Navigate)]);
    component.choiseBreadscrum(data);
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith([jasmine.any(SetCurrentCategory), jasmine.any(Navigate)]);
  });

  it('should dispatch SetCurrentCategory if choosed category and reload page', () => {
    expect(store.dispatch).not.toHaveBeenCalledWith([jasmine.any(SetCurrentCategory), jasmine.any(Navigate)]);
    component.choiseBreadscrum(data);
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith([jasmine.any(SetCurrentCategory), jasmine.any(Navigate)]);
  });
});

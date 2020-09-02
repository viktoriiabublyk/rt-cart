import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {settings} from '../../../../environments/environment';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PRODUCT, PRODUCT_DATA } from '../../state/product.state.spec';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {StarRatingComponent} from "../../../rt-forms/star-rating/star-rating.component";
import {Settings} from "../../../../conf/settings";

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot(),
        ],
      declarations: [ ProductComponent, StarRatingComponent ],
      providers: [
        {provide: Settings, useValue: settings},
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.item = PRODUCT_DATA;
    settings.formatProductUrl(PRODUCT);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should rating to equal PRODUCT_DATA rating', () => {
    expect(component.rating).toEqual(component.item.rating);
  });

  it('should settings formatProductUrl to equal PRODUCT slug and id', () => {
    expect(settings.formatProductUrl(PRODUCT)).toEqual('the-shellcoders-handbook_209');
  });
});

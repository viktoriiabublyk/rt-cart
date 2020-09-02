import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewComponent } from './review.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxsModule } from '@ngxs/store';
import { REVIEW_DATA } from '../../state/review.state.spec';
import { PRODUCT } from '../../state/product.state.spec';
import {StarRatingComponent} from "../../../rt-forms/star-rating/star-rating.component";
import {settings} from "../../../../environments/environment";
import {Settings} from "../../../../conf/settings";

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot(),
        ],
      declarations: [ ReviewComponent, StarRatingComponent ],
      providers: [
        {provide: Settings, useValue: settings},
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    component.item = REVIEW_DATA;
    component.param = 'the-shellcoders-handbook_209';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should rating to equal REVIEW score', () => {
    expect(component.rating).toEqual(component.item.score);
  });

  it('should settings formatProductUrl to equal PRODUCT slug and id', () => {
    expect(settings.formatProductUrl(PRODUCT)).toEqual(component.param);
  });

  it('should test REVIEW data', () => {
    expect(component.item.id).toEqual(REVIEW_DATA.id);
    expect(component.item.body).toEqual(REVIEW_DATA.body);

  });
});

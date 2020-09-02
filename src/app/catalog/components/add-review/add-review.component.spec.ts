
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { Store, NgxsModule } from '@ngxs/store';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddReviewComponent } from './add-review.component';
import { AddReview } from '../../state/review.action';
import { ReviewsService } from '../../services/reviews.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {InputBlockComponent} from "../../../rt-forms/input-block/input-block.component";
import {InputBlockTextareaComponent} from "../../../rt-forms/input-block-textarea/input-block-textarea.component";
import {StarRatingComponent} from "../../../rt-forms/star-rating/star-rating.component";
import {Settings} from "../../../../conf/settings";


describe('AddReviewComponent', () => {
  let component: AddReviewComponent;
  let fixture: ComponentFixture<AddReviewComponent>;
  let store: Store;
  let formBuilder: FormBuilder;
  beforeAll(() => {
    formBuilder = new FormBuilder();
  });


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        NgxsModule.forRoot(),
        HttpClientTestingModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [ AddReviewComponent, InputBlockComponent, InputBlockTextareaComponent, StarRatingComponent ],
      providers: [
        FormBuilder,
        {provide: ReviewsService},
        {provide: Settings},
        {provide: FormBuilder, useValue: formBuilder }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(AddReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should called onInit', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.form).toBeDefined();
  });

  it('should called onDestroy', () => {
    component.ngOnDestroy();
    fixture.detectChanges();
  });

  it('should called addReview when form is valid', () => {
    component.form = formBuilder.group({
      title: ['super book', Validators.required],
      score: [5, Validators.required],
      body: ['test', Validators.required],
      name: ['Alex', Validators.required],
      email: ['ul@ds.ry', Validators.required],

    });
    component.onSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(AddReview));
  });

  it('should called addReview when form is invalid', () => {
    spyOn(component, 'updateValidationMessages');
    component.form = formBuilder.group({
      title: ['super book', Validators.required],
      score: [6, Validators.required],
      body: ['test', Validators.required],
      name: ['Alex', Validators.required],
      email: ['', Validators.required],
    });
    component.onSubmit();
    expect(component.updateValidationMessages).toHaveBeenCalled();
    // expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(ClearingState));
  });

  // it('should return user from getUser selector', fakeAsync(() => {
  //   const sessionSuccessState: AuthStateModel = {
  //     user,
  //     initialized: true,
  //     loading: false,
  //     is_authenticated: true,
  //   };
  //   const dataFromSelector = AuthState.getUser(sessionSuccessState);
  //   expect(dataFromSelector).toEqual(user);
  // }));

});

import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { AddReview, RemoveAddStatus } from '../../state/review.action';
import { Review } from '../../models/reviews.model';
import {NgxsSingleFormComponent} from '../../../rt-forms/ngxs-single-form-component';
import {FormFields, ValidationMessages} from "../../../rt-forms/models";
import {AuthState, User} from "../../../auth";
import {MessagesState} from "../../../messages/messages.state";

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddReviewComponent extends NgxsSingleFormComponent implements OnInit, OnDestroy {
  rating = 0;
  userId = null;
  showStyle = false;
  param: string;
  prodId = null;
  @Input() score: number;
  @Output() showCancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  public labels = {
    title: 'Title',
    score: 'Score',
    body: 'Body',
    username: 'Name',
    email: 'Email'
  };
  public formFields: FormFields = {
    title: [Validators.required, Validators.maxLength(200)],
    score: [Validators.required, Validators.min(1)],
    body:  [Validators.required, Validators.maxLength(400)],
    name:  [Validators.required, Validators.maxLength(100)],
    email: [Validators.required, Validators.email, Validators.maxLength(200)],
  };
  validationMessages: ValidationMessages = {
    title: {
      required: 'Title is required',
      maxlength: 'Title should not be more than 200 characters',
    },
    score: {
      required: 'Score is required',
      min: 'Score should be more than 0',
    },
    body: {
      required: 'Body is required',
      maxlength: 'Body should not be more than 400 characters',
    },
    name: {
      required: 'Name of reviewer is required',
      maxlength: 'Name of reviewer should not be more than 100 characters',
    },
    email: {
      required: 'Email is required',
      email: 'Email is not valid',
      pattern: 'Email is not valid address',
      maxlength: 'Email should not be more than 200 characters',
    }
  };
  constructor(
    protected store: Store,
    private route: ActivatedRoute,
    protected fb: FormBuilder,
    protected cd: ChangeDetectorRef
    ) {
    super(fb, cd, store);
  }
  @Select(AuthState.isLoading) loading$: Observable<boolean>;
  @Select(MessagesState.getBackendError) backendErrors$: Observable<any>;
  @Select (state => state.auth.is_authenticated) authenticated$: Observable<boolean>;
  @Select (state => state.review.addStatus) addStatus$: Observable<boolean>;
  @Select (AuthState.user) user$: Observable<User>;
  @Select (state => state.product.currentElement) prod$: Observable<boolean>;

  protected subscription = new Subscription();

  ngOnInit() {
    this.form = this.fb.group(this.getFormModel());
    this.subscription.add(
      this.route.params.subscribe(
        params => {
          this.param = params.titleWithId;
          this.store.dispatch(
            new RemoveAddStatus());
        }
    ));
    this.subscription.add(
      this.backendErrors$.subscribe(error => {
        this.onSubmitFail(error);
      }),
    );
    if (!this.subscriptions.length) {
      this.subscriptions.push(
        this.form.valueChanges.subscribe(() => this.updateValidationMessages()),
      );
    }
    this.authenticated$.subscribe(
      x => {
        if (x) {
          this.form.controls.name.disable();
          this.form.controls.email.disable();
        }
      }
    );
    this.user$.subscribe(
      x => {
        if (x) {
          // this.userId = x.pk;
          this.userId = x.id;
        }
      }
    );
    this.prod$.subscribe(
      x => {
        if (x) {
          this.prodId = x;
        } else {
          }
      }
    );
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.subscription.unsubscribe();
   }

  onSubmit() {
     if (this.form.valid) {
       const form = this.form.value;
       const item = form as Review;
       item.product = Number(this.prodId);
       item.user = this.userId;
       this.store.dispatch(new AddReview(item));
       this.addStatus$.subscribe(status => {
        if (status) {
          this.form.reset();
          this.showCancel.emit(false);
          this.store.dispatch(
            new Navigate(['/catalogue/', `${this.param}` ])
          );
        }
      });
    } else {
      this.updateValidationMessages();
    }
    //  this.store.dispatch(new ClearMessages());
  }
}

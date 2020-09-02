import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable, ObjectUnsubscribedError } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { FormFields, ValidationMessages } from '../../rt-forms/models';
import { Validators, FormBuilder } from '@angular/forms';
import { SingleFormComponent } from '../../rt-forms/single-form-component';
import { HttpClient } from '@angular/common/http';
import { ResetPasswordConfirm, Init } from '../auth.actions';
import { Token } from '../auth.model';
import { NgxsSingleFormComponent } from '../../rt-forms/ngxs-single-form-component';
import { AuthState } from '../auth.state';
import { MessagesState } from '../../messages/messages.state';
import {Settings} from '../../../conf/settings';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-password-reset-confirm',
  templateUrl: './password-reset-confirm.component.html',
  styleUrls: ['./password-reset-confirm.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordResetConfirmComponent extends NgxsSingleFormComponent implements OnInit, OnDestroy {
  @Select(AuthState.isLoading) loading$: Observable<boolean>;
  @Select(MessagesState.getBackendError) backendErrors$: Observable<any>;
  protected deferredValidation = true;

  public labels = {
    password1: 'New Password',
    password2: 'New Password (again)',
  };
  public formFields: FormFields = {
    new_password1: [Validators.required, Validators.maxLength(200)],
    new_password2: [Validators.required, Validators.maxLength(200)],
  };
  validationMessages: ValidationMessages = {
    new_password1: {
      required: 'Password is required',
      maxlength: 'Password should not be more than 200 characters',
    },
    new_password2: {
      required: 'Confirm password is required',
      maxlength: 'Password should not be more than 200 characters',
    },
  };

  uid: string;
  token: Token;

  constructor(
    protected fb: FormBuilder,
    protected cd: ChangeDetectorRef,
    protected store: Store,
    private route: ActivatedRoute,
    private settings: Settings,
    private title: Title,
  ) {
    super(fb, cd, store);
  }

  ngOnInit() {
    this.title.setTitle(this.settings.formatTitle('Reset password'));
    super.ngOnInit();
    this.store.dispatch(new Init());
    this.subscriptions.push(
      this.route.params.subscribe(
        params => {
          this.uid = params.uid;
          this.token = params.token;
        }
      )
    );
  }

  performSubmit() {
    this.store.dispatch(new ResetPasswordConfirm(this.form.value, this.uid, this.token));
  }

}

import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormFields, ValidationMessages } from '../../rt-forms/models';
import { Validators, FormBuilder } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { SingleFormComponent } from '../../rt-forms/single-form-component';
import { Observable, Subscription } from 'rxjs';
import { ResetPassword, Init } from '../auth.actions';
import { AuthState } from '../auth.state';
import { MessagesState, Message } from '../../messages/messages.state';
import { NgxsSingleFormComponent } from '../../rt-forms/ngxs-single-form-component';
import {Settings} from '../../../conf/settings';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordResetComponent extends NgxsSingleFormComponent implements OnInit, OnDestroy {

  @Select(AuthState.isLoading) loading$: Observable<boolean>;
  @Select(AuthState.isLoaded) loaded$: Observable<boolean>;
  @Select(MessagesState.getBackendError) backendErrors$: Observable<any>;
  @Select(MessagesState.getSuccessMessages) successMessages$: Observable<Message[]>;

  protected deferredValidation = true;

  public labels = {
    email: 'Email'
  };

  public formFields: FormFields = {
    email: [Validators.required, Validators.email, Validators.maxLength(200)],
  };

  validationMessages: ValidationMessages = {
    email: {
      required: 'Email is required',
      email: 'Email is not valid',
      maxlength: 'Email should not be more than 200 characters',
    },
  };

  constructor(
    protected fb: FormBuilder,
    protected cd: ChangeDetectorRef,
    protected store: Store,
    private settings: Settings,
    private title: Title,
  ) {
    super(fb, cd, store);
  }

  ngOnInit() {
    this.title.setTitle(this.settings.formatTitle('Reset password'));
    super.ngOnInit();
    this.store.dispatch(new Init());
  }

  performSubmit() {
    this.store.dispatch(new ResetPassword(this.form.value));
  }

}

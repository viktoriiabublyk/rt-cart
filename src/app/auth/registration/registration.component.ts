import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SingleFormComponent } from '../../rt-forms/single-form-component';
import { FormBuilder, Validators } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { AuthState } from '../auth.state';
import { Observable } from 'rxjs';
import {Init, RegisterUser} from '../auth.actions';
import { FormFields, ValidationMessages } from '../../rt-forms/models';
import { MessagesState } from '../../messages/messages.state';
import {NgxsSingleFormComponent} from '../../rt-forms/ngxs-single-form-component';
import {loadContent} from "../../app.animations";
import {Settings} from '../../../conf/settings';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent extends NgxsSingleFormComponent implements OnInit, OnDestroy {

  public labels = {
    username: 'User name',
    email: 'Email',
    password1: 'Password',
    password2: 'Confirm password',
  };
  public formFields: FormFields = {
    username: [Validators.required, Validators.maxLength(200)],
    first_name: [Validators.required, Validators.maxLength(200)],
    last_name: [Validators.required, Validators.maxLength(200)],
    email: [Validators.required, Validators.email, Validators.maxLength(200)],
    password1: [Validators.required, Validators.maxLength(200)],
    password2: [Validators.required, Validators.maxLength(200)],
  };
  validationMessages: ValidationMessages = {
    username: {
      required: 'User name is required',
      maxlength: 'User name should not be more than 200 characters',
    },
    email: {
      required: 'Email is required',
      email: 'Email is not valid',
      maxlength: 'Email should not be more than 200 characters',
    },
    password1: {
      required: 'Password is required',
      maxlength: 'Password should not be more than 200 characters',
    },
    password2: {
      required: 'Confirm password is required',
      maxlength: 'Password should not be more than 200 characters',
    },
  };
  formLabels = {
    username: 'Name',
    email: 'Email',
    password1: 'Password',
    password2: 'Password (confirm)',
  };

  formDefaults = {
    subscribe: true
  };
  deferredValidation = true;

  constructor(
    protected store: Store,
    protected fb: FormBuilder,
    protected cd: ChangeDetectorRef,
    private settings: Settings,
    private title: Title,
  ) {
    super(fb, cd, store);
  }
  @Select(AuthState.isLoading) loading$: Observable<boolean>;
  @Select(MessagesState.getBackendError) backendErrors$: Observable<any>;

  ngOnInit() {
    this.title.setTitle(this.settings.formatTitle('Registration'));
    super.ngOnInit();
    this.store.dispatch(new Init());
  }

  protected initObject() {}

  performSubmit() {
    this.store.dispatch(new RegisterUser(this.form.value));
  }

  protected onValidationError() {

  }
}

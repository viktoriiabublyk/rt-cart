import {Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {LoginWithEmailAndPassword, Init} from '../auth.actions';
import {FormBuilder, Validators} from '@angular/forms';
import {FormFields, ValidationMessages} from '../../rt-forms/models';
import {AuthState} from '../auth.state';
import {Observable} from 'rxjs';
import { MessagesState } from '../../messages/messages.state';
import {NgxsSingleFormComponent} from '../../rt-forms/ngxs-single-form-component';
import {loadContent} from "../../app.animations";
import {Settings} from '../../../conf/settings';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends NgxsSingleFormComponent implements OnInit, OnDestroy {

  public formFields: FormFields = {
    email: [Validators.required, Validators.email, Validators.maxLength(200)],
    password: [Validators.required, Validators.maxLength(200)],
  };
  validationMessages: ValidationMessages = {
    email: {
      required: 'Email is required',
      email: 'Email is not valid',
      maxlength: 'Email should not be more than 200 characters',
    },
    password: {
      required: 'Password is required',
      maxlength: 'Password should not be more than 200 characters',
    },
  };
  formLabels = {
    email: 'Email',
    password: 'Password',
  };
  @Select(AuthState.isLoading) loading$: Observable<boolean>;
  @Select(MessagesState.getBackendError) backendErrors$: Observable<any>;

  constructor(
    protected store: Store,
    protected fb: FormBuilder,
    protected cd: ChangeDetectorRef,
    private settings: Settings,
    private title: Title,
    ) {
    super(fb, cd, store);
  }

  ngOnInit() {
    this.title.setTitle(this.settings.formatTitle('Login'));
    super.ngOnInit();
    this.store.dispatch(new Init());
  }

  protected initObject() {
    // Do not need initial object
  }

  performSubmit() {
    this.store.dispatch(new LoginWithEmailAndPassword(this.form.value));
  }
}

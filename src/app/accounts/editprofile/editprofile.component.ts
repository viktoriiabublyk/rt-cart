import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormFields, ValidationMessages } from '../../rt-forms/models';
import { SingleFormComponent } from '../../rt-forms/single-form-component';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { UpdateUser } from '../../auth/auth.actions';
import { AuthState } from '../../auth/auth.state';
import { User } from '../../auth/auth.model';
import { map, filter, take } from 'rxjs/operators';
import { MessagesState } from '../../messages/messages.state';
import {NgxsSingleFormComponent} from "../../rt-forms/ngxs-single-form-component";
import {Settings} from '../../../conf/settings';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditprofileComponent extends NgxsSingleFormComponent implements OnInit, OnDestroy {
  public labels = {
    first_name: 'First Name',
    last_name: 'Second Name',
    username: 'User Name'
  };
  public formFields: FormFields = {
    first_name: [Validators.required, Validators.maxLength(200)],
    last_name: [Validators.required, Validators.maxLength(200)],
    username: [Validators.required, Validators.maxLength(200)],
  };

  validationMessages: ValidationMessages = {
    first_name: {
      required: 'First name is required',
      maxlength: 'First name should not be more than 200 characters',
    },
    last_name: {
      required: 'Last name is required',
      maxlength: 'Last name should not be more than 200 characters',
    },
    username: {
      required: 'Username is required',
      maxlength: 'Username should not be more than 200 characters',
    },
  };

  @Select(AuthState.user) user$: Observable<User>;
  @Select(MessagesState.getBackendError) backendErrors$: Observable<any>;

  private Subscription = new Subscription();

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
    this.title.setTitle(this.settings.formatTitle('Edit profile'));
    this.form = this.fb.group(this.getFormModel());
    this.Subscription.add(
      this.backendErrors$.subscribe(error => {
        this.onSubmitFail(error);
      })
    );
    this.user$.pipe(filter(user => !!user), take(1)).subscribe(user => this.form.patchValue(user));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.Subscription.unsubscribe();
  }

  onSubmit() {
    if (!this.subscriptions.length) {
      this.subscriptions.push(
        this.form.valueChanges.subscribe(() => this.updateValidationMessages()),
      );
    }
    if (this.form.valid) {
      this.store.dispatch(new UpdateUser(this.form.value));
    } else {
      this.updateValidationMessages();
    }
    // this.store.dispatch(new ClearMessages());
  }

}

import {ValidationComponent} from './validation-component';
import { ChangeDetectorRef, OnDestroy, OnInit, Directive } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from './validation.service';
import {Subscription} from 'rxjs';
import {FormErrors, FormFields, ValidationMessages} from './models';
import {HttpClient} from '@angular/common/http';
import { markAsTouchedRecursive } from './utils';

@Directive()
export abstract class SingleFormComponent extends ValidationComponent implements OnInit, OnDestroy {
  form: FormGroup;
  public formErrors: FormErrors = {};
  public formFields: FormFields = {};
  validationMessages: ValidationMessages = {
    name: {
      required: 'Name is required',
      maxlength: 'Email should not be more than 200 characters',
    },
    email: {
      required: 'Email is required',
      email: 'Email is not valid',
      maxlength: 'Email should not be more than 200 characters',
    },
    message: {
      required: 'Message is required',
      maxlength: 'Email should not be more than 5000 characters',
    },
  };

  /**
   * @deprecated use subscription instead
   */
  protected subscriptions: Subscription[] = [];
  protected subscription: Subscription = new Subscription();
  sending = false;
  sent = false;
  globalError = '';

  /**
   * Deferred validation, if true, validates only after submit, if false, validates immediately
   */
  protected deferredValidation = false;
  protected validationAdded = false;

  constructor(
    protected fb: FormBuilder,
    protected cd: ChangeDetectorRef,
  ) {
    super(new ValidationService());
  }

  ngOnInit() {
    this.form = this.fb.group(this.getFormModel());
    if (!this.deferredValidation) {
      this.subscribeValidation();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscription.unsubscribe();
    super.ngOnDestroy();

  }

  protected subscribeValidation() {
    this.subscription.add(
      this.form.valueChanges.subscribe(() => this.updateValidationMessages()),
    );
    this.validationAdded = true;
  }

  getForm() {
    return this.form;
  }

  submitForm() {
    if (this.deferredValidation && !this.validationAdded) {
      this.subscribeValidation();
    }
    if (this.form.valid) {
      this.performSubmit();
    } else {
      markAsTouchedRecursive(this.form);
      this.validation.updateMessages();
      this.onValidationError();
    }
  }

  protected performSubmit() {
  }

  protected onSubmitSuccess(response) {
  }

  protected getBackendErrors(response) {
    if (!response || !response.error || typeof(response.error) !== 'object') {
      return null;
    }
    const errors = {};
    for (const field of Object.keys(response.error)) {
      const messages = response.error[field];
      if (!messages || !messages.length) {
        continue;
      }

      errors[field] = messages[0];
    }
    return errors;
  }

  protected onSubmitFail(response) {
    if (!response) {
      return;
    }
    if (response.error && response.error.non_field_errors && response.error.non_field_errors.length) {
      this.globalError = response.error.non_field_errors[0];
    }
    const form = this.getForm();
    const errors = this.getBackendErrors(response);
    if (errors) {
      const validationErrors = [];
      for (const field of Object.keys(errors)) {
        const message = errors[field];
        const ctrl = form.get(field);
        if (ctrl) {
          validationErrors.push({control: ctrl, error: message});
          ctrl.markAsUntouched({onlySelf: true});
        } else {
          console.warn(`Cant find element ${field}`);
        }
      }
      this.validation.serverErrors = validationErrors;
    }

    this.cd.markForCheck();
    this.onValidationError();
  }

  protected onValidationError() {
  }

}

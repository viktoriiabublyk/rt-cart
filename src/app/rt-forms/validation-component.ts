import {FormGroup, FormArray, AbstractControl} from '@angular/forms';
import { Subscription } from 'rxjs';
import {Injectable, OnDestroy} from '@angular/core';
import {isEqual} from 'lodash';
import {ValidationService} from './validation.service';

/**
 * Component class that help handle validation
 */
@Injectable()
export abstract class ValidationComponent implements OnDestroy {

  public sectionHasErrors = false;
  public submitted = false;
  public validationSubscription: Subscription;

  formErrors = {};
  formLabels = {};
  formFields = {};
  protected formDefaults = {};

  validationMessages = {};

  constructor(protected validation: ValidationService) {
    this.validationSubscription = validation.applier$.subscribe(
      () => this.updateValidationMessages(true)
    );
  }

  ngOnDestroy() {
    this.validationSubscription.unsubscribe();
  }

  /**
   * Need to be implemented
   */
  protected getForm(): FormGroup | FormArray {
    return new FormGroup({});
  }

  protected isControlHasErrors(control, likeSubmit?: boolean): boolean {
    if (this.submitted || likeSubmit) {
      return control && control.enabled && !control.valid;
    } else {
      return control && control.enabled && control.dirty && !control.valid;
    }
  }

  setSubmitted(submitted: boolean): void {
    this.submitted = submitted;
  }

  protected setSectionError() {
    this.sectionHasErrors = true;
  }

  updateValidationMessages(likeSubmit = false) {
    const formGroup = this.getForm();
    if (!formGroup) {
      return;
    }
    if (likeSubmit) {
      this.submitted = true;
    }

    this.sectionHasErrors = false;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';

      const control = formGroup.get(field);
      if (!control) {
        continue;
      }
      const serverError = this.getServerError(control);
      if (serverError) {
        this.formErrors[field] = serverError;
        if (this.submitted && control.untouched) {
          this.setSectionError();
          control.markAsTouched({onlySelf: true});
          control.setErrors({backend: serverError});
        }
      } else if (this.isControlHasErrors(control, likeSubmit)) {
        const messages = this.validationMessages[field];
        // console.warn(field);
        this.setSectionError();
        for (const key in control.errors) { // tslint:disable-line

          this.formErrors[field] += this.makeMessage(messages, control, field, key);
          break;
        }
      }
    }
  }

  protected makeMessage(messages, control: AbstractControl, field: string, key: string): string {
    let message = '';

    if (messages && key in messages) {
      message = messages[key];
      if (message.indexOf('%label') >= 0 && this.formLabels[field]) {
        let label = this.formLabels[field];
        if (label.endsWith('*')) {
          label = label.replace(/\*$/, '');
        }
        message = message.replace('%label', label);
      }

    } else if (typeof control.errors[key] === 'string') {
      message = control.errors[key];
    } else {
      message = key;
    }
    return message;
  }

  getFormModel() {
    const model = {};
    for (const name of Object.keys(this.formFields)) {
      const dflt = name in this.formDefaults ? this.formDefaults[name] : '';

      if (this.formFields[name]) {
        model[name] = [dflt, this.formFields[name]];
      } else {
        model[name] = dflt;
      }
      this.formErrors[name] = '';
    }
    return model;
  }

  getServerError(control) {
    const error = this.validation.serverErrors.filter(serverError => isEqual(serverError.control, control));
    if (error.length) {
      return error[0].error;
    }
    return null;
  }

  hasErrors(): boolean {
    return this.sectionHasErrors;
  }


}

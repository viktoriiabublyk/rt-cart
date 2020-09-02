import { Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';

@Injectable()
export class ValidationService {

  private applierSource = new Subject();
  applier$ = this.applierSource.asObservable();
  private SERVER_ERRORS_;
  form: FormGroup;


  static ifControlHasErrors(control, likeSubmit?: boolean): boolean {
    if (likeSubmit) {
      return control && control.enabled && !control.valid;
    } else {
      return control && control.enabled && control.dirty && !control.valid;
    }
  }

  constructor() { }

  updateMessages() {
    this.applierSource.next();
  }

  clearServerErrors() {
    this.SERVER_ERRORS_ = [];
  }

  set serverErrors(errors) {
    this.SERVER_ERRORS_ = errors;
    this.updateMessages();
  }

  get serverErrors() {
    if (!this.SERVER_ERRORS_) {
      return [];
    }
    return this.SERVER_ERRORS_;
  }
  forChild() {
    return new ValidationService();
  }


}

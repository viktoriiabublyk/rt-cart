import { Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ValidationService} from './validation.service';


@Injectable()
export class ResponseProcessorService {
  static ResponseProcessor: any;

  constructor(
    // private swal: SwalService,
    private validation: ValidationService,
  ) { }

  newProcessor(): ResponseProcessor {
    // const item =  ResponseProcessorService.ResponseProcessor;
    return ResponseProcessorService.ResponseProcessor(this.validation);
  }
}




export class ResponseProcessor {
  windowErrorTitle: string;
  windowErrorText: string;

  windowSuccessTitle: string;
  windowSuccessText: string;
  hideWindowSuccess = false;
  hideWindowError = false;
  callbackSuccess: () => {};
  callbackError: () => {};

  form: FormGroup|null;
  errorFieldDict = {
    //  example
    // 'CustomerName': 'CustomerData.CustomerName',
    // 'CustomerMnemonic': 'CustomerData.CustomerMnemonic',
    // 'CustomerReservedAddress': 'CustomerData.CustomerReservedAddress',
    // 'CustomerReservedAddress2': 'CustomerData.CustomerReservedAddress2',
  };

  errorsPaths = [];
  errors = [];
  successMessages = [];
  valid: boolean;

  constructor(
    private validation: ValidationService
  ) {

  }

  onSuccess(title: string, text: string): void {
    // this.swal.success(title, text, this.callbackSuccess)
  }

  onWarning(title: string, text: string): void {
    // this.swal.error(title, text, this.callbackError)
  }

  createErrorsArray(data): void {
    this.errors = [];
    try {
      if ('G_ERRORS' in data) {
        for (const ERROR_OBJ of data.G_ERRORS) {
          // According to Task Ref 0/inbox/227388348049228/228012982034778/169637668684147
          if ('ERRORCODE' in ERROR_OBJ && ERROR_OBJ['ERRORCODE'] == 0) {  // tslint:disable-line
            if ('ERRORDESCRIPTION' in ERROR_OBJ) {
              this.successMessages.push(ERROR_OBJ.ERRORDESCRIPTION);
            }
          } else {
            if ('ERRORDESCRIPTION' in ERROR_OBJ) {
              this.errors.push(ERROR_OBJ);
            } else {
              this.errors.push({ERRORDESCRIPTION: 'Unknown error'});
            }
          }
        }
      } else {
        if (!data) {
          throw new Error('Server error');
        }
      }
    } catch (e) {
      this.errors.push({ERRORDESCRIPTION: e.message});
    }
  }

  handleResponse(data) {
    this.successMessages = [];
    this.validation.clearServerErrors();
    this.preHandleResponse(data);
    this.createErrorsArray(data);

    if (this.errors.length) {
      this.valid = false;
      this.handleError();
    } else {
      this.valid = true;
      this.handleSuccess(data);
    }
    this.postHandleResponse(data);
    return this.valid;
  }

  preHandleError() {

  }

  getErrorFields(): any {
    const errorFields = {};
    let message = '';
    for (const error of this.errors) {
      if ('ERRORFIELD' in error) {
        errorFields[error.ERRORFIELD] = error.ERRORDESCRIPTION;
      } else {
        message += error.ERRORDESCRIPTION + ' ';
      }
    }

    if (!message) {
      message = this.windowErrorText;
      if (errorFields) {
        message += 'CHECK_THE_FORM';
      }
    }
    return {errorFields, message};
  }

  handleError() {
    this.preHandleError();
    const errorsFieldsDesc = this.getErrorFields();
    const message = errorsFieldsDesc.message;
    const errorFields = errorsFieldsDesc.errorFields;

    // this.form.markAsPristine();
    if (!this.hideWindowError) {
      this.onWarning(this.windowErrorTitle, message);
    }
    if (errorFields) {
      this.handleErrorFields(errorFields);
    } else {
      this.validation.serverErrors = [];
    }

    this.postHandleError();
  }

  postHandleError() {
  }

  handleErrorFields(fields) {
    const form = this.getHandledForm();
    const serverErrors = [];
    for (const field of fields) {
      const element = form.get(field);
      this.errorsPaths.push(field);
      if (element) {
        serverErrors.push({control: element, error: fields[field]});
        this.postProcessErrorField(field, fields[field]);
        element.markAsUntouched({onlySelf: true});
      } else {
        console.warn(['Cant process error field or find out the element with path=', field]);
      }
    }
    this.postHandleErrorFields();
    this.validation.serverErrors = serverErrors;
  }

  postProcessErrorField(key: string, message: string) {
  }

  preHandleSuccess(data) {

  }

  // For implementation
  handleSuccess(data) {
    this.preHandleSuccess(data);
    if (this.hideWindowSuccess) {
    } else {
      if (this.successMessages.length) {
        // this.swal.success(this.windowSuccessTitle, this.successMessages.join(' '));
        this.onSuccess(this.windowSuccessTitle, this.successMessages.join(' '));
      } else {
        // this.swal.success(this.windowSuccessTitle, this.windowSuccessText);
        this.onSuccess(this.windowSuccessTitle, this.windowSuccessText);
      }
    }
    this.postHandleSuccess(data);
  }

  postHandleSuccess(data) {

  }

  postHandleErrorFields() {

  }

  getHandledForm(): FormGroup|null {
    return this.form;
  }

  preHandleResponse(data) {

  }

  postHandleResponse(data) {

  }
}

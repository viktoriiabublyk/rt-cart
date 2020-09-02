import {ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {SingleFormComponent} from './single-form-component';


export abstract class HttpSingleFormComponent extends SingleFormComponent implements OnInit, OnDestroy {
  protected API_ENDPOINT: string;
  protected HTTP_METHOD = 'post';
  sending = false;
  sent = false;
  successMessage = '';

  constructor(
    protected fb: FormBuilder,
    protected cd: ChangeDetectorRef,
    protected http: HttpClient,
  ) {
    super(fb, cd);
  }

  protected makeRequest() {
    if (!this.API_ENDPOINT) {
      console.warn('Please, provide the API_ENDPOINT');
      return;
    }
    return this.http.request(
      this.HTTP_METHOD,
      this.API_ENDPOINT,
      {
        body: this.getRequestData(),
      },
    );
  }

  protected getRequestData() {
    return this.form.value;
  }

  protected performSubmit() {
    this.sending = true;
    this.sent = false;
    this.successMessage = '';
    this.cd.detectChanges();
    const detailKey = 'detail';
    this.makeRequest().subscribe(
      response => {
        this.sending = false;
        this.sent = true;
        if (response[detailKey]) {
          this.successMessage = response[detailKey];
        }
        this.onSubmitSuccess(response);
        this.cd.detectChanges();
      },
      response => {
        this.sending = false;
        this.onSubmitFail(response);
      },
    );
  }

}

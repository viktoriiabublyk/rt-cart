import { ChangeDetectorRef, OnDestroy, OnInit, Directive } from '@angular/core';
import {Observable} from 'rxjs';
import {SingleFormComponent} from './single-form-component';
import {filter, take} from 'rxjs/operators';
import {ClearMessages} from '../messages/messages.actions';
import {FormBuilder} from '@angular/forms';
import {Store} from '@ngxs/store';
import {first} from 'rxjs/internal/operators/first';


@Directive()
export abstract class NgxsSingleFormComponent extends SingleFormComponent implements OnInit, OnDestroy {
  object$: Observable<any>;
  backendErrors$: Observable<any>;

  constructor(
    protected fb: FormBuilder,
    protected cd: ChangeDetectorRef,
    protected store: Store,
  ) {
    super(fb, cd);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.object$) {
      this.initObject();
    }
    this.subscription.add(
      this.backendErrors$.subscribe(error => {
        if (error) {
          this.onSubmitFail(error);
        }
      }),
    );
  }

  protected initObject() {
    this.subscription.add(
      this.object$.pipe(filter(x => !!x)).subscribe(
        obj => this.form.patchValue(obj)
      )
    );
  }

  submitForm() {
    this.store.dispatch(new ClearMessages());
    super.submitForm();
  }
}

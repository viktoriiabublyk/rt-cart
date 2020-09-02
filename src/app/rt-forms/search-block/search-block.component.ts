import { Component, OnInit, EventEmitter, Output, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { FormFields, ValidationMessages } from '../models';
import { Subscription, Observable } from 'rxjs';
import { NgxsSingleFormComponent } from '../ngxs-single-form-component';
import {Searching} from "../../catalog/state/product.action";


@Component({
  selector: 'app-search-block',
  templateUrl: './search-block.component.html',
  styleUrls: ['./search-block.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBlockComponent extends NgxsSingleFormComponent implements OnInit, OnDestroy {
  rating = 0;
  userId = null;
  showStyle = false;
  param: string;
  prodId = null;
  @Output() showCancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  public labels = {
    search: 'Search product',
  };
  public formFields: FormFields = {
    search: [Validators.minLength(1), Validators.maxLength(200)],
  };
  validationMessages: ValidationMessages = {
    search: {
      required: 'Search is required',
      minLength: 'Search should  be more than 0 characters',
      maxlength: 'Search should not be more than 200 characters',
    }
  };
  constructor(
    protected store: Store,
    private route: ActivatedRoute,
    protected fb: FormBuilder,
    protected cd: ChangeDetectorRef
  ) {
    super(fb, cd, store);
  }
  @Select(state => state.product.selectedSearch) searchParam$: Observable<number>;

  protected subscription = new Subscription();

  ngOnInit() {
    this.form = this.fb.group(this.getFormModel());
    this.subscription.add(
      this.route.params.subscribe(
        params => {
          this.param = params.titleWithId;
        }
      ));
    this.searchParam$.subscribe(x => {
      x ? this.form.controls.search.setValue(x) : this.form.controls.search.setValue('');
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.subscription.unsubscribe();
  }

  onSubmit() {
    if (this.form.controls.search.value !== null && this.form.controls.search.value !== '') {
      this.store.dispatch(new Searching(this.form.value.search));
    } else {
      this.updateValidationMessages();
    }
  }

}

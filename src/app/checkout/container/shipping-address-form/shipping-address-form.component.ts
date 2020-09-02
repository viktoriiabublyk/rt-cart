import { CheckoutState } from './../../state/checkout.state';
import { SHIPPING_ADDRESS_VALIDATION_MESSAGES } from './../../validation-messages';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';
import { SaveShippingAddress, LoadShippingAddress, SelectedShippingAddress, SetWizardStep, DeleteAddressById } from '../../state/checkout.actions';
import { ActivatedRoute } from '@angular/router';
import { ShippingAddressForm, CountryData } from '../../models/checkout.model';
import { skip, filter, take } from 'rxjs/operators';
import {SingleFormComponent} from "../../../rt-forms/single-form-component";
import {FormFields, ValidationMessages} from "../../../rt-forms/models";
import {markAsTouchedRecursive, updateValueAndValidityRecursive} from "../../../rt-forms/utils";

@Component({
  selector: 'app-shipping-address-form',
  templateUrl: './shipping-address-form.component.html',
  styleUrls: ['./shipping-address-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShippingAddressFormComponent extends SingleFormComponent implements OnInit, OnDestroy {

  @Select(CheckoutState.getAddressList) addressList$: Observable<ShippingAddressForm[]>;
  @Select(CheckoutState.getCountry) countryData$: Observable<CountryData>;
  @Select(CheckoutState.getShippingAddress) shippingAddress$: Observable<ShippingAddressForm>;


  constructor(
    protected store: Store,
    protected fb: FormBuilder,
    protected cd: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) { super(fb, cd); }

  subscription = new Subscription();
  choices = [
    ['----', '----'],
    ['Mr', 'Mr'],
    ['Miss', 'Miss'],
    ['Mrs', 'Mrs'],
    ['Ms', 'Ms'],
    ['Dr', 'Dr'],
  ];

  public formFields: FormFields = {
    title: [],
    first_name: [Validators.required, Validators.maxLength(200)],
    last_name: [Validators.required, Validators.maxLength(200)],
    line1: [Validators.required, Validators.maxLength(200)],
    line2: [],
    line3: [],
    line4: [Validators.required, Validators.maxLength(200)],
    state: [],
    postcode: [Validators.required],
    country: [Validators.required],
    phone_number: [],
    notes: [],
  };

  public labels = {
    title: 'Title',
    first_name: 'First name ',
    last_name: 'Last name',
    line1: 'First line of address ',
    line2: 'Second line of address',
    line3: 'Third line of address',
    line4: 'City',
    state: 'State/County',
    postcode: 'Post/Zip-code',
    country: 'Country',
    phone_number: 'Phone number',
    notes: 'Instructions',
  };

  validationMessages: ValidationMessages = SHIPPING_ADDRESS_VALIDATION_MESSAGES;

  ngOnInit() {
    this.store.dispatch([new LoadShippingAddress(), new SetWizardStep(1)]);
    super.ngOnInit();
    // this.form = this.fb.group(this.getFormModel());
    this.subscription.add(
      this.form.valueChanges.subscribe(() => this.updateValidationMessages()),
    );
    this.subscription.add(
      this.shippingAddress$.pipe(filter(x => !!x), take(1)).subscribe(value => this.form.patchValue(value))
    );
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.subscription.unsubscribe();
  }

  continue() {
    if (this.form.valid) {
      this.store.dispatch(new SaveShippingAddress(this.form.value));
    } else {
      markAsTouchedRecursive(this.form);
      updateValueAndValidityRecursive(this.form);
      this.updateValidationMessages(true);
    }
  }

  selectAddress(id) {
    this.store.dispatch(new SelectedShippingAddress(id));
  }

  deleteAddress(id) {
    console.log(id)
    this.store.dispatch(new DeleteAddressById(id));
  }

  formAdressId(index) {
    return index;
  }

}

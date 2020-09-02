import { loadContent } from './../../../app.animations';
import { AuthState } from './../../../auth/auth.state';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SaveGuestEmail } from '../../state/checkout.actions';
import { CheckoutState } from '../../state/checkout.state';
import { ActivatedRoute, Router } from '@angular/router';
import {SingleFormComponent} from "../../../rt-forms/single-form-component";
import {FormFields} from "../../../rt-forms/models";
import {LoginWithEmailAndPassword} from "../../../auth";
import {WarrningMessage} from "../../../messages/messages.actions";
import {markAsTouchedRecursive} from "../../../rt-forms/utils";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationComponent extends SingleFormComponent implements OnInit, OnDestroy {

  @Select(AuthState.isAuthenticated) isAuthenticated$: Observable<any>;
  @Select(CheckoutState.getGuestEmail) guestEmail$: Observable<string>;

  constructor(
    protected store: Store,
    protected fb: FormBuilder,
    protected cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
  ) { super(fb, cd); }

  subscription = new Subscription();
  checked = false;
  typeChoices = [
    [1, 'I am a new customer and want to checkout as a guest'],
    [2, 'I am a returning customer, and my password is...'],
    [3, 'I am a new customer and want to create an account before checking out']
  ];

  public formFields: FormFields = {
    email: [Validators.required, Validators.email, Validators.maxLength(200)],
    users_type: [Validators.required],
    password: [],
  };

  public labels = {
    email: 'My email address is',
    users_type: '',
    password: 'Password',
  };

  ngOnInit() {
    this.route.queryParams.pipe(filter(x => !!x)).subscribe(() => {
      if (this.form) {
        this.store.dispatch(new LoginWithEmailAndPassword(
          {email: this.form.get('email').value, password: this.form.get('password').value}));
        this.store.dispatch(new WarrningMessage('We have merged a basket from a previous session. Its contents might have changed.'));
      }
    });

    this.isAuthenticated$.pipe(filter(x => !!x), take(1)).subscribe(() => {
      this.router.navigate(['/checkout/shipping-address']);
    });

    this.form = this.fb.group(this.getFormModel());

    this.guestEmail$.pipe(filter(x => !!x), take(1)).subscribe(value => {
      this.form.patchValue({email: value});
    });

    this.subscription.add(
      this.form.valueChanges.subscribe(() => this.updateValidationMessages()),
    );

    this.subscription.add(
      this.form.get('users_type').valueChanges.subscribe(x => {
        this.checked = x === 2 ? true : false;
      })
    );
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.subscription.unsubscribe();
  }

  continue() {
    if (this.form.valid) {
      const type = this.form.get('users_type').value;
      const email = this.form.get('email').value;

      switch (type) {
        case 1:
          this.store.dispatch(new SaveGuestEmail(email));
          break;
        case 2:
          this.store.dispatch(new Navigate(['checkout'], {redirect: 'checkout/shipping-address'}));
          break;
        case 3:
          this.store.dispatch(new Navigate(['auth/register'], {redirect: 'checkout/shipping-address'}));
          break;
      }
    } else {
      markAsTouchedRecursive(this.form);
      this.updateValidationMessages(true);
    }
  }



}

import {Component, OnInit, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import {ConfirmEmail, Init} from '../auth.actions';
import {Observable, Subscription, timer} from 'rxjs';
import {Settings} from '../../../conf/settings';
import {AuthState} from '../auth.state';
import {Navigate} from '@ngxs/router-plugin';
import {filter, delay} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmEmailComponent implements OnInit, OnDestroy {

  subscription = new Subscription();
  key: string;
  confirmEmailOnGet: boolean;
  settings = new Settings();

  @Select(AuthState.isLoading) loading$: Observable<boolean>;
  @Select(AuthState.isLoaded) loaded$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    protected store: Store,
    private globalSettings: Settings,
    private title: Title,
  ) {}


  ngOnInit() {
    this.title.setTitle(this.globalSettings.formatTitle('Email confirmation'));
    this.store.dispatch(new Init());
    this.confirmEmailOnGet = this.settings.ACCOUNT_CONFIRM_EMAIL_ON_GET;

    this.subscription.add(
      this.route.params.subscribe(params => {
        this.key = params.key;
        if (this.settings.ACCOUNT_CONFIRM_EMAIL_ON_GET) {
          timer(1000).subscribe(() => this.confirmEmail());
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  confirmEmail() {
    this.store.dispatch(new ConfirmEmail(this.key));
  }

}

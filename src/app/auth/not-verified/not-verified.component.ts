import {Component, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Init, SendEmailConfirmation} from '../auth.actions';
import {AuthState} from '../auth.state';
import {Observable, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Navigate} from '@ngxs/router-plugin';
import {Settings} from '../../../conf/settings';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-not-verified',
  templateUrl: './not-verified.component.html',
  styleUrls: ['./not-verified.component.scss']
})
export class NotVerifiedComponent implements OnInit, OnDestroy {

  @Select(AuthState.isLoading) loading$: Observable<boolean>;
  @Select(AuthState.isLoaded) loaded$: Observable<boolean>;
  @Select(AuthState.isVerified) verified$: Observable<boolean>;
  private subscription = new Subscription();

  constructor(private store: Store,
              private settings: Settings,
              private title: Title,
  ) { }

  ngOnInit() {
    this.title.setTitle(this.settings.formatTitle('Not verified'));
    this.store.dispatch(new Init());

    this.subscription.add(
      this.verified$.pipe(filter(x => !!x)).subscribe(
        () => this.store.dispatch(new Navigate([this.settings.LOGIN_REDIRECT_URL]))
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  sendEmailConfirmation() {
    this.store.dispatch(new SendEmailConfirmation());
  }

}

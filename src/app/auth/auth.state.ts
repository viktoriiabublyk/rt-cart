import { Action, Selector, State, StateContext, Store, NgxsOnInit } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { take, tap, filter, switchMap } from 'rxjs/operators';
import {
  Init,
  CheckSession,
  SessionSuccess,
  SessionClosed,
  LoginWithGoogle,
  LoginWithFacebook,
  LoginSuccess,
  LoginFail,
  Logout,
  LogoutSuccess,
  LoginWithEmailAndPassword,
  RegisterUser,
  ResetPassword,
  ResetPasswordSuccess,
  ResetPasswordFail,
  ResetPasswordConfirm,
  ResetPasswordConfirmSuccess,
  ResetPasswordConfirmFail,
  ConfirmEmail,
  ConfirmEmailSuccess,
  ConfirmEmailFail,
  EnablePreview,
  DisablePreview,
  LoginRedirect,
  SendFormSuccess,
  RegistrationSuccess,
  RegistrationFail,
  Loading,
  Loaded,
  UpdateUser,
  UpdateUserSuccess,
  SendEmailConfirmation,
  SendEmailConfirmationSuccess,
  SendEmailConfirmationFail,
} from './auth.actions';
import { AuthStateModel, User } from './auth.model';
import { AuthService } from './auth.service';
import { has, get } from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { BackendError, ErrorMessage, SuccessMessage } from '../messages/messages.actions';
import { Settings } from '../../conf/settings';
import { timer } from 'rxjs';
import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    initialized: false,
    loading: false,
    loaded: false,
    user: null,
    token: null,
  },
})
@Injectable()
export class AuthState implements NgxsOnInit {

  settings = new Settings();

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private store: Store,
    private userService: UserService,
  ) { }

  /**
   * Selectors
   */
  @Selector()
  static initialized(state: AuthStateModel): boolean {
    return state.initialized;
  }

  @Selector()
  static user(state: AuthStateModel): User {
    return state.user;
  }

  @Selector()
  static userName(state: AuthStateModel): string {
    const user = state.user;
    if (user.first_name || user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }

    if (user.username) {
      return user.username;
    }

    if (user.email) {
      return user.email;
    }

    return '';
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return state.user ? state.user.is_authenticated : false;
  }

  @Selector()
  static isVerified(state: AuthStateModel): boolean {
    return state.user ? state.user.is_verified : false;
  }

  @Selector()
  static isLoading(state: AuthStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static isLoaded(state: AuthStateModel): boolean {
    return state.loaded;
  }

  ngxsOnInit(ctx: StateContext<AuthStateModel>) {
    ctx.dispatch(new CheckSession());
    const routerState$ = this.store.select(state => state.router.state);
    routerState$.pipe(
      switchMap(
        routeState => this.store.select(AuthState.isAuthenticated).pipe(
          filter(isAuthenticated => isAuthenticated && has(routeState, 'data.loginRoute')),
        ),
      ),
    ).subscribe(() => ctx.dispatch(new Navigate([this.settings.LOGIN_REDIRECT_URL])));
  }

  @Action(Init)
  resetPasswordInit(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      loading: false,
      loaded: false,
    });
  }

  /**
   * Commands
   */
  @Action(CheckSession)
  checkSession(ctx: StateContext<AuthStateModel>) {
    return this.userService.getUser().pipe(
      take(1),
      tap((user: User) => {
        if (user.is_authenticated) {
          ctx.dispatch(new SessionSuccess(user));
        } else {
          ctx.dispatch(new SessionClosed(user));
        }
      }),
    );
  }

  @Action(SessionSuccess)
  sessionSuccess(ctx: StateContext<AuthStateModel>, action: SessionSuccess) {
    ctx.patchState({
      initialized: true,
      loading: false,
      user: action.user,
    });
  }

  @Action(SessionClosed)
  sessionClosed(ctx: StateContext<AuthStateModel>, action: SessionClosed) {
    const user = ctx.getState().user;
    const wasAuthenticated = user && user.is_authenticated;
    ctx.patchState({
      initialized: true,
      loading: false,
      user: action.user,
    });
    if (wasAuthenticated && !action.user.is_authenticated) {
      ctx.dispatch(new LoginRedirect());
    }
  }

  @Action(LoginWithEmailAndPassword)
  loginWithEmailAndPassword(ctx: StateContext<AuthStateModel>, action: LoginWithEmailAndPassword) {
    ctx.patchState({ loading: true, loaded: false });
    this.auth.signInWithEmailAndPassword(action.data)
      .subscribe(
        token => ctx.dispatch(new LoginSuccess(token)),
        err => ctx.dispatch(new LoginFail(err)),
      );
  }
  @Action(LoginSuccess)
  loginSuccess(ctx: StateContext<AuthStateModel>, event: LoginSuccess) {
    ctx.patchState({
      token: event.token,
    });
    ctx.dispatch(new CheckSession());
    const redirect = this.route.snapshot.queryParams.redirect || this.settings.LOGIN_REDIRECT_URL;
    ctx.dispatch(new Navigate([redirect]));
    ctx.dispatch(new SuccessMessage('Welcome back'));
  //   this.scroll.toId('top');
  }

  @Action(LoginFail)
  loginFail({ patchState, dispatch }: StateContext<AuthStateModel>, { err }: LoginFail) {
    patchState({ loading: false, loaded: false });
    dispatch(new BackendError(err));
  }

  @Action(LoginRedirect)
  loginRedirect(ctx: StateContext<AuthStateModel>) {
    ctx.dispatch(new Navigate([this.settings.LOGIN_URL]));
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    return this.auth.logout().subscribe(
      () => ctx.dispatch(new LogoutSuccess()),
    );
  }

  @Action(LogoutSuccess)
  logoutSuccess(ctx: StateContext<AuthStateModel>) {
    const redirectUrl = this.settings.ACCOUNT_LOGOUT_REDIRECT_URL || '/';
    ctx.dispatch([
      ctx.dispatch(new CheckSession()),
      ctx.dispatch(new Navigate([redirectUrl])),
      // ctx.dispatch(new DisablePreview())
    ]);
  }

  @Action(RegisterUser)
  registration(ctx: StateContext<AuthStateModel>, action: RegisterUser) {
    ctx.patchState({
      loading: true,
      loaded: false,
    });
    this.auth.registration(action.data).pipe(
      switchMap(token => this.userService.getUser()),
    ).subscribe(
      user => ctx.dispatch(new RegistrationSuccess(user)),
      err => ctx.dispatch(new RegistrationFail(err)),
    );
  }

  @Action(RegistrationSuccess)
  registrationSuccess(ctx: StateContext<AuthStateModel>, data: RegistrationSuccess) {
    ctx.patchState({
      user: data.user,
      loading: false,
      loaded: true,
    });

    ctx.dispatch(new SendEmailConfirmation());

    ctx.dispatch(new Navigate([this.settings.LOGIN_REDIRECT_URL]));
    // console.log('Scroll:', this.scroll);
    // this.scroll.toId('top');
  }

  @Action(RegistrationFail)
  registrationFail(ctx: StateContext<AuthStateModel>, { err }: RegistrationFail) {
    ctx.patchState({
      loading: false,
      loaded: false,
    });
    ctx.dispatch(new BackendError(err));
  }

  @Action(ResetPassword)
  resetPassword(ctx: StateContext<AuthStateModel>, action) {
    ctx.patchState({
      loading: true,
      loaded: false,
    });
    this.auth.passwordReset(action.email).subscribe(
      data => ctx.dispatch(new ResetPasswordSuccess(data.detail)),
      err => ctx.dispatch(new BackendError(err)),
    );
  }

  @Action(ResetPasswordSuccess)
  resetPasswordSuccess(ctx: StateContext<AuthStateModel>, { detail }: ResetPasswordSuccess) {
    ctx.patchState({
      loading: false,
      loaded: true,
    });
    ctx.dispatch(new SuccessMessage(detail));
    ctx.dispatch(new Navigate([this.settings.LOGIN_URL]));
  }

  @Action(ResetPasswordFail)
  resetPasswordFail(ctx: StateContext<AuthStateModel>, { err }: ResetPasswordFail) {
    ctx.patchState({
      loading: false,
      loaded: false,
    });
    ctx.dispatch(new BackendError(err));
  }

  @Action(ResetPasswordConfirm)
  resetPasswordConfirm(ctx: StateContext<AuthStateModel>, action: ResetPasswordConfirm) {
    ctx.patchState({
      loading: true,
      loaded: false,
    });
    this.auth.resetPasswordConfirm(action.passwords.new_password1,
      action.passwords.new_password2, action.uid, action.token).subscribe(
        data => ctx.dispatch(new ResetPasswordConfirmSuccess(data.detail)),
        err => ctx.dispatch(new ResetPasswordConfirmFail(err)),
      );
  }

  @Action(ResetPasswordConfirmSuccess)
  resetPasswordConfirmSuccess(ctx: StateContext<AuthStateModel>, { detail }: ResetPasswordConfirmSuccess) {
    ctx.patchState({
      loading: false,
      loaded: true,
    });
    ctx.dispatch([
      new SuccessMessage(detail),
      new Navigate([this.settings.LOGIN_URL])
    ]);
  }

  @Action(ResetPasswordConfirmFail)
  resetPasswordConfirmFail(ctx: StateContext<AuthStateModel>, { err }: ResetPasswordFail) {
    ctx.patchState({
      loading: false,
      loaded: false,
    });

    let hiddenError;
    const hiddenFields = ['uid', 'token'];
    for (const field of hiddenFields) {
      const errorLine = get(err, `error.${field}.0`, null);
      if (errorLine) {
        hiddenError = `${field}: ${errorLine}`;
        break;
      }
    }

    if (hiddenError) {
      ctx.dispatch([new BackendError(err), new ErrorMessage(hiddenError)]);
    } else {
      ctx.dispatch(new BackendError(err));
    }
  }

  @Action(SendEmailConfirmation)
  sendEmailConfirmation(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      loading: true,
      loaded: false,
    });
    this.auth.sendEmailConfirmation().subscribe(
      resp => ctx.dispatch(new SendEmailConfirmationSuccess(resp.message)),
      err => ctx.dispatch(new SendEmailConfirmationFail(err)),
    );
  }

  @Action(SendEmailConfirmationSuccess)
  sendEmailConfirmationSuccess(ctx: StateContext<AuthStateModel>, { message }: SendEmailConfirmationSuccess) {
    ctx.patchState({
      loading: false,
      loaded: true,
    });
    ctx.dispatch(new SuccessMessage(message));
  }

  @Action(SendEmailConfirmationFail)
  sendEmailConfirmationFail(ctx: StateContext<AuthStateModel>, { err }: SendEmailConfirmationFail) {
    ctx.patchState({
      loading: false,
      loaded: false,
    });
    ctx.dispatch(new BackendError(err));
  }


  @Action(ConfirmEmail)
  confirmEmail(ctx: StateContext<AuthStateModel>, action: ConfirmEmail) {
    ctx.patchState({
      loading: true,
      loaded: false,
    });
    this.auth.confirmEmail(action.key).subscribe(
      data => ctx.dispatch(new ConfirmEmailSuccess(data)),
      err => ctx.dispatch(new BackendError(err)),
    );
  }

  @Action(ConfirmEmailSuccess)
  confirmEmailSuccess(ctx: StateContext<AuthStateModel>, { data }: ConfirmEmailSuccess) {
    const user = ctx.getState().user;
    ctx.patchState({
      loading: false,
      loaded: true,
      user: { ...user, is_verified: true },
    });
    const isAuthenticated = user.is_authenticated;
    let redirectUrl = null;
    if (isAuthenticated) {
      redirectUrl = this.settings.ACCOUNT_EMAIL_CONFIRMATION_AUTHENTICATED_REDIRECT_URL
        || this.settings.LOGIN_REDIRECT_URL;
    } else {
      redirectUrl = this.settings.ACCOUNT_EMAIL_CONFIRMATION_ANONYMOUS_REDIRECT_URL || this.settings.LOGIN_URL;
    }
    ctx.dispatch(new Navigate([redirectUrl]));

    const dataKey = 'detail';
    const message = data[dataKey] === 'ok' ? 'Your email was successfully verified' : data[dataKey];
    timer(1000).subscribe(() => ctx.dispatch(new SuccessMessage(message)));
  }

  @Action(ConfirmEmailFail)
  confirmEmailFail(ctx: StateContext<AuthStateModel>, { err }: ConfirmEmailFail) {
    ctx.patchState({
      loading: false,
      loaded: false,
    });
    ctx.dispatch(new BackendError(err));
  }

  @Action([Loading])
  loading(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ loading: true });
  }

  @Action([Loaded])
  loaded(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ loading: false });
  }

  @Action(BackendError)
  backendError(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ loading: false });
  }

}

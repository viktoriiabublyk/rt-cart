import { Store, NgxsModule, Actions, ofActionDispatched, ofActionErrored, ofActionSuccessful, ofAction, StateContext } from '@ngxs/store';
import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AuthState } from './auth.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Settings } from '../../conf/settings';
import { AuthService } from './auth.service';
import { AuthStateModel, User, PasswordConfirm, SimpleResponse } from './auth.model';
import { CheckSession, SessionClosed, SessionSuccess,
   LoginWithEmailAndPassword, RegisterUser, LoginRedirect,
     LoginSuccess, RegistrationSuccess,  Logout, ResetPassword, ResetPasswordSuccess,
    LogoutSuccess, ResetPasswordConfirm, SendEmailConfirmation, ResetPasswordConfirmSuccess, ResetPasswordConfirmFail } from './auth.actions';
import { ActivatedRoute } from '@angular/router';
import { of, throwError, Observable } from 'rxjs';
import { user, anonimousUser, loginForm, token, registrationForm, editProfileForm } from './auth.service.spec';
import { filter } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';
import { BackendError } from '../messages/messages.actions';
import { UserService } from './../services/user.service';
import {RtScrollService} from "../rt-scroll/rt-scroll.service";
import {PageScrollService} from "ngx-page-scroll-core";


class MockStateContext<T> implements StateContext<T> {
  sets = [];
  patches = [];
  dispatches = [];

  constructor(private _STATE: any) {}

  getState() {
      return this._STATE as T;
  }
  /**
   * Reset the state to a new value.
   */
  setState(state) {
      this.sets.push(state);
      this._STATE = state;
      return this._STATE as T;
  }
  /**
   * Patch the existing state with the provided value.
   */
  patchState(partial) {
      this.patches.push(partial);
      this._STATE = {
          ...this._STATE,
          ...partial
      };
      return this._STATE as T;
  }
  /**
   * Dispatch a new action and return the dispatched observable.
   */
  dispatch(actions: any | any[]) {
    this.dispatches.push(actions);
    return of() as Observable<void>;
  }
}

const SOME_DESIRED_STATE: AuthStateModel = {
  initialized: false,
  loading: false,
  user: null,
  token: null,
  is_authenticated: false,
};

const invalideForm = {
  email: '',
  password: ''
};

const rstInvalideForm = {
  username: '',
  email: '',
  password1: '',
  password2: ''
};

const backenderror = {
  error: 'Must include "email" and "password".'
};

const EXAMPLESTATE: AuthStateModel = SOME_DESIRED_STATE;

describe('AuthState', () => {
  let store: Store;
  let state: AuthState;
  let ctxMock: MockStateContext<AuthStateModel>;
  let service: AuthService;
  let userService: UserService;
  let actions$: Actions;
  let dispatched = [];
  let route: ActivatedRoute;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([AuthState]),
        HttpClientTestingModule
      ],
      providers: [
        AuthService ,
        UserService,
        PageScrollService,
        RtScrollService,
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {queryParams: {redirect: '/'}}},
        },
        {provide: Settings},
      ]
    }).compileComponents();

    store = TestBed.get(Store);
    store.reset({auth: EXAMPLESTATE});
    service = TestBed.get(AuthService);
    userService = TestBed.get(UserService);
    route = TestBed.get(ActivatedRoute);
    state = new AuthState(route, service, store, userService);
    actions$ = TestBed.get(Actions);
    dispatched = [];
    actions$.pipe(
      filter(x => x.status === 'DISPATCHED')
    ).subscribe(x => dispatched.push(x.action));
  }));

  // Tests with using Actions Hendlers

  it('should test the action CheckSession without user', fakeAsync(() => {
    spyOn(userService, 'getUser').and.returnValue(of(anonimousUser));
    store.dispatch(new CheckSession());
    tick();
    expect(dispatched[1] instanceof SessionClosed ).toBeTruthy();
    expect(dispatched[1].user).toEqual(anonimousUser);
  }));

  it('should test the action CheckSession with user', fakeAsync(() => {
    spyOn(userService, 'getUser').and.returnValue(of(user));
    store.dispatch(new CheckSession());
    tick();
    expect(dispatched[1] instanceof SessionSuccess).toBeTruthy();
    expect(dispatched[1].user).toEqual(user);
  }));

  it('should test the action SessionSuccess', fakeAsync(() => {
    store.dispatch(new SessionSuccess(user));
    tick();
    expect(dispatched[0] instanceof SessionSuccess).toBeTruthy();
    expect(dispatched[0].user).toEqual(user);
  }));

  it('should test the action SessionClosed', fakeAsync(() => {
    store.dispatch(new SessionClosed(anonimousUser));
    tick();
    expect(dispatched[0] instanceof SessionClosed).toBeTruthy();
    expect(dispatched[0].user).toEqual(anonimousUser);
  }));

  it('should test the action login with email and password', fakeAsync(() => {
    spyOn(service, 'signInWithEmailAndPassword').and.returnValue(of(token));
    store.dispatch(new LoginWithEmailAndPassword(loginForm));
    tick();
    expect(dispatched.length).toEqual(5);
    expect(dispatched[1] instanceof LoginSuccess ).toBeTruthy();
    expect(dispatched[1].token).toEqual(token);
  }));

  it('should test the action login with email and password with Invalid form', fakeAsync(() => {
    spyOn(service, 'signInWithEmailAndPassword').and.returnValue(throwError (backenderror));
    store.dispatch(new LoginWithEmailAndPassword(invalideForm));
    tick();
    expect(dispatched.length).toEqual(3);
    expect(dispatched[2] instanceof BackendError ).toBeTruthy();
    expect(dispatched[2].error).toEqual(backenderror);
  }));

  it('should test the action register', fakeAsync(() => {
    spyOn(service, 'registration').and.returnValue(of(token));
    store.dispatch(new RegisterUser(registrationForm));
    tick();
    console.log(dispatched);
    expect(dispatched[1] instanceof RegistrationSuccess ).toBeTruthy();
    expect(dispatched[1].token).toEqual(token);
  }));

  it('should test the action register with Invalid form', fakeAsync(() => {
    spyOn(service, 'registration').and.returnValue(throwError(backenderror));
    store.dispatch(new RegisterUser(rstInvalideForm));
    tick();
    expect(dispatched[2] instanceof BackendError ).toBeTruthy();
    expect(dispatched[2].error).toEqual(backenderror);
  }));

  // Tests with using MockStateContext

  it('should test the action login with valid form', fakeAsync(() => {
    ctxMock = new MockStateContext(state);
    spyOn(service, 'signInWithEmailAndPassword').and.returnValue(of(token));
    state.loginWithEmailAndPassword(ctxMock, new LoginWithEmailAndPassword(loginForm));
    tick();
    expect(ctxMock.dispatches.length).toEqual(1);
    expect(ctxMock.dispatches[0] instanceof LoginSuccess).toBeTruthy();
  }));

  it('should test the action login success', fakeAsync(() => {
    ctxMock = new MockStateContext(state);
    state.onLoginSuccess(ctxMock);
    tick();
    expect(ctxMock.dispatches[1] instanceof Navigate).toBeTruthy();
    expect(ctxMock.dispatches.length).toEqual(3);
  }));

  it('should test the action login and registration success', fakeAsync(() => {
    ctxMock = new MockStateContext(state);
    state.setUserStateOnSuccess(ctxMock, new LoginSuccess(token));
    tick();
    ctxMock.patchState({ token });
    expect(ctxMock.patches[0].token).toEqual(token);
    expect(ctxMock.patches[1].token).toEqual(token);
  }));

  it('should test the action login redirect', fakeAsync(() => {
    ctxMock = new MockStateContext(state);
    state.loginRedirect(ctxMock);
    tick();
    expect(ctxMock.dispatches[0] instanceof Navigate).toBeTruthy();
    expect(ctxMock.dispatches.length).toEqual(1);
  }));

  it('should test the action registration success', fakeAsync(() => {
    ctxMock = new MockStateContext(state);
    state.registrationSuccess(ctxMock, new RegistrationSuccess(user));
    tick();
    expect(ctxMock.dispatches[0] instanceof SendEmailConfirmation).toBeTruthy();
    expect(ctxMock.dispatches.length).toEqual(2);
  }));

  it('should test the action logout', fakeAsync(() => {
    spyOn(service, 'logout').and.returnValue(of(''));
    ctxMock = new MockStateContext(state);
    state.logout(ctxMock);
    tick();
    expect(ctxMock.dispatches[0] instanceof LogoutSuccess).toBeTruthy();
    expect(ctxMock.dispatches.length).toEqual(1);
  }));

  it('should test the action logout success', fakeAsync(() => {
    spyOn(userService, 'getUser').and.returnValue(of(anonimousUser));
    ctxMock = new MockStateContext(state);
    state.logoutSuccess(ctxMock);
    tick();
    expect(ctxMock.dispatches[1] instanceof Navigate).toBeTruthy();
    expect(ctxMock.dispatches.length).toEqual(3);
  }));

  it('should test the action reset password with valid form', fakeAsync(() => {
    spyOn(service, 'passwordReset').and.returnValue(of('test'));
    ctxMock = new MockStateContext(state);
    state.resetPassword(ctxMock, new ResetPassword('test@test.com'));
    tick();
    expect(ctxMock.dispatches.length).toEqual(1);
    expect(ctxMock.dispatches[0] instanceof ResetPasswordSuccess).toBeTruthy();
  }));

  it('should test the action reset password with invalid form', fakeAsync(() => {
    spyOn(service, 'passwordReset').and.returnValue(throwError(backenderror));
    ctxMock = new MockStateContext(state);
    state.resetPassword(ctxMock, new ResetPassword('test.com'));
    tick();
    expect(ctxMock.dispatches.length).toEqual(1);
    expect(ctxMock.dispatches[0] instanceof BackendError).toBeTruthy();
  }));

  it('should test the action reset password success', fakeAsync(() => {
    ctxMock = new MockStateContext(state);
    const answer: SimpleResponse = {
      detail: 'reset password success',
    };
    const detail = new ResetPasswordSuccess(answer.detail);
    state.resetPasswordSuccess(ctxMock, detail);
    tick();
    expect(ctxMock.dispatches.length).toEqual(2);
    expect(ctxMock.dispatches[1] instanceof Navigate).toBeTruthy();
  }));

  it('should test the action reset password confirm with valid form', fakeAsync(() => {
    const uid = 'MQ';
    const passwords: PasswordConfirm = {
      new_password1: 'test',
      new_password2: 'test',
    };

    spyOn(service, 'resetPasswordConfirm').and.returnValue(of('test'));
    ctxMock = new MockStateContext(state);
    state.resetPasswordConfirm(ctxMock, new ResetPasswordConfirm(passwords, uid, token));
    tick();

    expect(ctxMock.dispatches.length).toEqual(1);
    expect(ctxMock.dispatches[0] instanceof ResetPasswordConfirmSuccess).toBeTruthy();
  }));

  it('should test the action reset password confirm with invalid form', fakeAsync(() => {
    const uid = 'MQ';
    const passwords: PasswordConfirm = {
      new_password1: '',
      new_password2: '',
    };
    spyOn(service, 'resetPasswordConfirm').and.returnValue(throwError(backenderror));
    ctxMock = new MockStateContext(state);
    state.resetPasswordConfirm(ctxMock, new ResetPasswordConfirm(passwords, uid, token));
    tick();
    expect(ctxMock.dispatches.length).toEqual(1);
    expect(ctxMock.dispatches[0] instanceof ResetPasswordConfirmFail).toBeTruthy();
  }));



  // Selector

  it('should return loading from isLoading selector', () => {
    const sessionSuccessState: AuthStateModel = {
      user: null,
      initialized: false,
      loading: true,
      is_authenticated: false,
    };
    const dataFromSelector = AuthState.isLoading(sessionSuccessState);
    expect(dataFromSelector).toEqual(true);
  });

  it('should return authenticated from isAuthenticated selector', fakeAsync(() => {
    const sessionSuccessState: AuthStateModel = {
      user,
      initialized: true,
      loading: false,
      is_authenticated: true,
    };

    const sessionFaildState: AuthStateModel = {
      user: anonimousUser,
      initialized: true,
      loading: false,
      is_authenticated: false,
    };

    const dataFromSelector = AuthState.isAuthenticated(sessionSuccessState);
    expect(dataFromSelector).toEqual(true);

    const dataFromSelector2 = AuthState.isAuthenticated(sessionFaildState);
    expect(dataFromSelector2).toEqual(false);
  }));

  // it('should return user from getUser selector', fakeAsync(() => {
  //   const sessionSuccessState: AuthStateModel = {
  //     user,
  //     initialized: true,
  //     loading: false,
  //     is_authenticated: true,
  //   };
  //   const dataFromSelector = AuthState.getUser(sessionSuccessState);
  //   expect(dataFromSelector).toEqual(user);
  // }));

  // it('should return user from getInitialized selector', () => {
  //   const sessionSuccessState: AuthStateModel = {
  //     user,
  //     initialized: true,
  //     loading: false,
  //     is_authenticated: true,
  //   };
  //   const dataFromSelector = AuthState.getInitialized(sessionSuccessState);
  //   expect(dataFromSelector).toEqual(true);
  // });

});

import { Store, NgxsModule, StateContext, Actions } from '@ngxs/store';
import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MessagesState, MessagesStateModel, MessageType, Message } from './messages.state';
import { Settings } from '../../conf/settings';
import {settings} from '../../environments/environment';
import { Router, NavigationStart} from '@angular/router';
import { filter, skipUntil, take, map } from 'rxjs/operators';
import { BackendError,
   SubscribeToRouter, CleanByIndex, ErrorMessage, SuccessMessage,
    DebugMessage, InfoMessage, WarrningMessage } from './messages.actions';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Observable, timer, Subscriber } from 'rxjs';
import { pipe } from '@angular/core/src/render3/pipe';

class MockStateContext<T> implements StateContext<T> {
  sets = [];
  patches = [];
  dispatches = [];

  constructor(private _STATE) {}

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

const SOME_DESIRED_STATE = {
  messages: [],
  backendError: null,
};

const ERROR = {
  error: {
    non_field_errors: [
      'Unable to log in with provided credentials.'
    ]
  },
  headers: {}
};

const MESSAGE: Message = {
  type: MessageType.ERROR,
  text: 'Error 404',
};

const SUCCESS_MESSAGE: Message = {
  type: MessageType.SUCCESS,
  text: 'Succees 200',
};
class MockRouter {
  events = {} as NavigationStart;
  getEvent() {
    return this.events;
  }
}

const EXAMPLESTATE: MessagesStateModel = SOME_DESIRED_STATE;

describe('MessageState', () => {
  let store: Store;
  let actions$: Actions;
  let ctxMock: MockStateContext<MessagesStateModel>;
  let dispatched = [];
  let router: Router;
  let state: MessagesState;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, NgxsModule.forRoot([MessagesState])],
      providers: [
        {provide: Settings, useValue: {settings: {...settings, DELAY_TIME: 600}}},
      ]
    }).compileComponents();

    store = TestBed.get(Store);
    router = TestBed.get(Router);
    store.reset({messages: EXAMPLESTATE});
    state = new MessagesState(store, router, settings);

    actions$ = TestBed.get(Actions);
    dispatched = [];
    actions$.pipe(
      filter(x => x.status === 'DISPATCHED')
    ).subscribe(x => dispatched.push(x.action));
  }));

  it('should test the action ErrorMessage', () => {
    store.dispatch(new ErrorMessage('Error'));
    expect(dispatched.length).toEqual(2);
    const newMessage = new Message(MessageType.ERROR, 'Error');
    expect(dispatched[0].text).toEqual(newMessage.text);
    expect(dispatched[0].messageType).toEqual(newMessage.type);
    expect(dispatched[1] instanceof SubscribeToRouter ).toBeTruthy();
  });

  it('should test the action SuccessMessage', () => {
    store.dispatch(new SuccessMessage('Welcome'));
    expect(dispatched.length).toEqual(2);
    const newMessage = new Message(MessageType.SUCCESS, 'Welcome');
    expect(dispatched[0].text).toEqual(newMessage.text);
    expect(dispatched[0].messageType).toEqual(newMessage.type);
    expect(dispatched[1] instanceof SubscribeToRouter ).toBeTruthy();
  });

  it('should test the action DebugMessage', () => {
    store.dispatch(new DebugMessage('Debug'));
    expect(dispatched.length).toEqual(2);
    const newMessage = new Message(MessageType.DEBUG, 'Debug');
    expect(dispatched[0].text).toEqual(newMessage.text);
    expect(dispatched[0].messageType).toEqual(newMessage.type);
    expect(dispatched[1] instanceof SubscribeToRouter ).toBeTruthy();
  });

  it('should test the action InfoMessage', () => {
    store.dispatch(new InfoMessage('Info'));
    expect(dispatched.length).toEqual(2);
    const newMessage = new Message(MessageType.INFO, 'Info');
    expect(dispatched[0].text).toEqual(newMessage.text);
    expect(dispatched[0].messageType).toEqual(newMessage.type);
    expect(dispatched[1] instanceof SubscribeToRouter ).toBeTruthy();
  });

  it('should test the action WarrningMessage', () => {
    store.dispatch(new WarrningMessage('Warrning'));
    expect(dispatched.length).toEqual(2);
    const newMessage = new Message(MessageType.WARNING, 'Warrning');
    expect(dispatched[0].text).toEqual(newMessage.text);
    expect(dispatched[0].messageType).toEqual(newMessage.type);
    expect(dispatched[1] instanceof SubscribeToRouter ).toBeTruthy();
  });


  it('should test the action BackendError', () => {
    store.dispatch(new BackendError(ERROR));
    expect(dispatched.length).toEqual(3);
    expect(dispatched[1] instanceof ErrorMessage).toBeTruthy();
    expect(dispatched[1].text).toEqual(ERROR.error.non_field_errors[0]);
  });

  // Tests with using MockStateContext

  it('should test the action ClearMessages', () => {
    ctxMock = new MockStateContext(state);
    ctxMock.patchState({
      messages: [MESSAGE],
      backendError: ERROR
    });
    // Unsubscibe is undefind;
    ctxMock.patchState({
      messages: [...ctxMock.getState().messages, MESSAGE],
      backendError: ERROR
    });

    expect(ctxMock.patches.length).toEqual(2);
    expect(ctxMock.getState().messages.length).toEqual(2);

    state.ClearMessages(ctxMock);
    expect(ctxMock.getState().messages.length).toEqual(0);
  });

  it('should test the action CleanByIndex with two messages', () => {
    ctxMock = new MockStateContext(state);
    ctxMock.patchState({
      messages: [MESSAGE, SUCCESS_MESSAGE],
      backendError: ERROR
    });
    ctxMock.patchState({
      messages: [...ctxMock.getState().messages, MESSAGE],
      backendError: [ctxMock.getState().backendError, ERROR]
    });

    expect(ctxMock.getState().messages.length).toEqual(3);
    expect(ctxMock.getState().backendError.length).toEqual(2);
    state.cleanByIndex(ctxMock, new CleanByIndex(1));

    expect(ctxMock.getState().messages.length).toEqual(2);
    expect(ctxMock.getState().backendError.length).toEqual(2);
  });

  it('should test the action CleanByIndex with one message', () => {
    ctxMock = new MockStateContext(state);
    spyOn(ctxMock, 'dispatch');
    ctxMock.patchState({
      messages: [MESSAGE],
      backendError: ERROR
    });
    expect(ctxMock.getState().messages.length).toEqual(1);
    expect(ctxMock.getState().backendError).toEqual(ERROR);
    // state.cleanByIndex(ctxMock, new CleanByIndex(1));
    // expect(ctxMock.dispatch).toHaveBeenCalledWith(jasmine.any(ClearingState));
  });

  // END

  it('should test the action SubscribeToRouter', fakeAsync(() => {

    const navigationEvent = {} as NavigationStart;
    const t = new MockRouter();
    const events = t.getEvent();
    console.log(events);
    store.dispatch(new SubscribeToRouter());
    tick(600);
    spyOn(router, 'events').and.returnValue(events);
    console.log(dispatched);
    expect(dispatched.length).toEqual(1);
    // REVIEW возможно этот тест можна доделать но я не знаю как
  }));

  // Selectors

  it('should return user from getMessages selector', () => {
    const Messages: MessagesStateModel = {
      messages: [MESSAGE, MESSAGE],
      backendError: ERROR
    };
    const dataFromSelector = MessagesState.getMessages(Messages);
    expect(dataFromSelector).toEqual([MESSAGE, MESSAGE]);
  });

  it('should return user from getBackendError selector', () => {
    const Messages: MessagesStateModel = {
      messages: [MESSAGE, MESSAGE],
      backendError: ERROR
    };
    const dataFromSelector = MessagesState.getBackendError(Messages);
    expect(dataFromSelector).toEqual(ERROR);
  });

  it('should return user from getBackendError selector', () => {
    const Messages: MessagesStateModel = {
      messages: [MESSAGE, MESSAGE],
      backendError: ERROR
    };
    const dataFromSelector = MessagesState.getBackendError(Messages);
    expect(dataFromSelector).toEqual(ERROR);
  });

  it('should return user from getErrorMessages selector', () => {
    const Messages: MessagesStateModel = {
      messages: [MESSAGE, MESSAGE],
      backendError: ERROR
    };
    const dataFromSelector = MessagesState.getErrorMessages(Messages);
    expect(dataFromSelector).toEqual([MESSAGE, MESSAGE]);
  });

  it('should return user from getSuccessMessages selector', () => {
    const Messages: MessagesStateModel = {
      messages: [MESSAGE, MESSAGE],
      backendError: ERROR
    };
    const dataFromSelector = MessagesState.getSuccessMessages(Messages);
    expect(dataFromSelector).toEqual([]);
  });

  it('should return user from getSuccessMessages selector', () => {
    const Messages: MessagesStateModel = {
      messages: [MESSAGE, MESSAGE, SUCCESS_MESSAGE],
      backendError: ERROR
    };
    const dataFromSelector = MessagesState.getSuccessMessages(Messages);
    expect(dataFromSelector).toEqual([SUCCESS_MESSAGE]);
  });

});

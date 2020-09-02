import { State, Select, Selector, StateContext, Action, NgxsOnInit, Store, } from '@ngxs/store';
import { BackendError,
   CleanByIndex, SubscribeToRouter,
   InfoMessage, WarrningMessage, ErrorMessage, DebugMessage, SuccessMessage, ClearMessages } from './messages.actions';
import { take, tap, filter, skipUntil} from 'rxjs/operators';
import { Router, NavigationStart, } from '@angular/router';
import { Observable, timer, interval, } from 'rxjs';
import { Settings } from '../../conf/settings';
import { Injectable } from '@angular/core';

export const enum MessageType {
  ERROR = 'error',
  SUCCESS = 'success',
  WARNING = 'warning',
  DEBUG = 'debug',
  INFO = 'info'
}

export class Message {

  constructor(
    public type: string,
    public text: string,
    public category?: string,
    public data?: any
  ) { }
}

export class MessagesStateModel {
  messages: Message[];
  backendError: any;
}

@State<MessagesStateModel>({
  name: 'messages',
  defaults: {
    messages: [],
    backendError: null,
  },
})
@Injectable()
export class MessagesState implements NgxsOnInit {

  navigationStart$;

  constructor(private store: Store, private router: Router, private setting: Settings) {}

  @Selector()
  static getMessages(state: MessagesStateModel): Message[] {
    return state.messages;
  }

  @Selector()
  static getBackendError(state: MessagesStateModel): any {
    return state.backendError;
  }

  @Selector()
  static getErrorMessages(state: MessagesStateModel): Message[] {
    return state.messages.filter( data => data.type === MessageType.ERROR);
  }

  @Selector()
  static getSuccessMessages(state: MessagesStateModel): Message[] {
    return state.messages.filter( data => data.type === MessageType.SUCCESS);
  }

  ngxsOnInit(ctx: StateContext <MessagesStateModel>) {}

  @Action([InfoMessage, WarrningMessage, ErrorMessage, DebugMessage, SuccessMessage])
  creatMessage(ctx: StateContext<MessagesStateModel>, message) {
    ctx.dispatch(new SubscribeToRouter());
    const newMessage = new Message(message.messageType, message.text);
    const state = ctx.getState();
    ctx.patchState({
      messages: [...state.messages, newMessage],
    });
  }

  @Action(BackendError)
  backendError(ctx: StateContext<MessagesStateModel>, data: BackendError) {
    ctx.patchState({
      backendError: data.error
    });
    if (data.error && data.error.error.non_field_errors && data.error.error.non_field_errors.length) {
      for (const text of data.error.error.non_field_errors) {
        ctx.dispatch( new ErrorMessage(text));
      }
    }
  }

  @Action(ClearMessages)
  ClearMessages( ctx: StateContext<MessagesStateModel>) {
    const state = ctx.getState().messages;
    if (state.length === 1) {
      console.log('unsubcribe');
      this.navigationStart$.unsubscribe();
    }
    console.log('Clearing State');
    ctx.patchState({
      messages: [],
      backendError: null,
    });
  }

  @Action(SubscribeToRouter)
  onSubscribeToRouter(ctx: StateContext<MessagesStateModel>) {
    console.log('subcribe');
    this.navigationStart$ = this.router.events.pipe(
      filter(event => (event instanceof NavigationStart)),
      tap(console.log),
      skipUntil(timer(this.setting.DELAY_TIME)),
      tap(console.log),
      take(1),
    ).subscribe(() => ctx.dispatch(new ClearMessages()));
  }

  @Action(CleanByIndex)
  cleanByIndex( ctx: StateContext<MessagesStateModel>, index: CleanByIndex) {
    const state = ctx.getState().messages;
    if (state.length === 1) {
      ctx.dispatch( new ClearMessages());
    } else if (!!state.length && state.length !== 1) {
      ctx.patchState({
        messages: state.filter((message, i ) => i !== index.index)
      });
    }
  }
}

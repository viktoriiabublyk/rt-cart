import { Message, MessageType } from './messages.state';
import { Observable } from 'rxjs';

export class InfoMessage {
  static type = '[Messages] InfoMessage';
  readonly messageType = MessageType.INFO;
  constructor(public text: string) { }
}

export class DebugMessage {
  static type = '[Messages] DebugMessage';
  readonly messageType = MessageType.DEBUG;
  constructor(public text: string) { }
}

export class WarrningMessage {
  static type = '[Messages] WarrningMessage';
  readonly messageType = MessageType.WARNING;
  constructor(public text: string) { }
}

export class SuccessMessage {
  static type = '[Messages] SuccessMessage';
   readonly messageType = MessageType.SUCCESS;
  constructor(public text: string) {}
}

export class ErrorMessage {
  static type = '[Messages] ErrorMessage';
   readonly messageType = MessageType.ERROR;
  constructor(public text: string) {}
}

// export class GetMessage {
//   static type = '[Messages] GetMessage';
//   constructor(public type: string, public text: string) {}
// }

export class SuccessMessages {
  static type = '[Messages] MessagesSuccess';
  constructor(public text: string[]) {}
}

export class ErrorMessages {
  static type = '[Messages] ErrorMessages';
  constructor(public text: string[]) {}
}

export class BackendError {
  static type = '[Messages] BackendError';
  constructor(public error: any) {}
}

export class ClearMessages {
  static type = '[Messages] ClearMessages';
}

export class CleanByIndex {
  static type = '[Messages] CleanByIndex';
  constructor(public index: number) {}
}

export class SubscribeToRouter {
  static type = '[Messages] SubscribeToRouter';
}



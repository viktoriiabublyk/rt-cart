import {
EmailPasswordData,
User,
RegisterData,
Token,
PasswordConfirm
} from './auth.model';

export class Init {
  static type = '[Auth] Init';
}

// Actions
export class CheckSession {
  static type = '[Auth] CheckSession';
}

export class SessionSuccess {
  static type = '[Auth] SessionSuccess';
  constructor(public user: User) {}
}

export class SessionClosed {
  static type = '[Auth] SessionClosed';
  constructor(public user: User) {}
}
export class LoginWithGoogle {
  static type = '[Auth] LoginWithGoogle';
}
export class LoginWithFacebook {
  static type = '[Auth] LoginWithFacebook';
}

export class LoginSuccess {
  static type = '[Auth] LoginSuccess';
  constructor(public token: Token) {}
}

export class LoginFail {
  static type = '[Auth] LoginFail';
  constructor(public err: any) {}
}

export class Logout {
  static type = '[Auth] Logout';
}

export class LogoutSuccess {
  static type = '[Auth] LogoutSuccess';
}

export class LoginWithEmailAndPassword {
  static type = '[Auth] LoginWithEmailAndPassword';
  constructor(public data: EmailPasswordData) { }
}

export class RegisterUser {
  static type = '[Auth] Registration';
  constructor(public data: RegisterData) { }
}

export class ResetPassword {
  static type = '[Auth] ResetPassword';
  constructor(public email: string) { }
}

export class ResetPasswordSuccess {
  static type = '[Auth] ResetPasswordSuccess';
  constructor(public detail: string) { }
}

export class ResetPasswordFail {
  static type = '[Auth] Reset password fail';
  constructor(public err: any) { }
}

export class ResetPasswordConfirm {
  static type = '[Auth] ResetPasswordConfirm';
  constructor(public passwords: PasswordConfirm, public uid: string, public token: Token) { }
}

export class ResetPasswordConfirmSuccess {
  static type = '[Auth] Reset Password Confirm Success';
  constructor(public detail: string) { }
}

export class ResetPasswordConfirmFail {
  static type = '[Auth] Reset password Confirm Fail';
  constructor(public err: any) { }
}

export class ConfirmEmail {
  static type = '[Auth] ConfirmEmail';
  constructor(public key: string) { }
}

export class ConfirmEmailSuccess {
  static type = '[Auth] ConfirmEmailSuccess';
  constructor(public data: string) { }
}

export class ConfirmEmailFail {
  static type = '[Auth] ConfirmEmailFail';
  constructor(public err: any) { }
}

export class EnablePreview {
  static type = '[Auth] EnablePreview';
}

export class DisablePreview {
  static type = '[Auth] DisablePreview';
}

// Events
export class LoginRedirect {
  static type = '[Auth] LoginRedirect';
}

export class SendFormSuccess {
  static type = '[Auth] SendFormSuccess';
  constructor(public message: any) { }
}

export class RegistrationSuccess {
  static type = '[Auth] RegistrationSuccess';
  constructor(public user: User) { }
}

export class RegistrationFail {
  static type = '[Auth] RegistrationFail';
  constructor(public err: any) { }
}

export class Loading {
  static type = '[Auth] Loading';
}

export class Loaded {
  static type = '[Auth] Loaded';
}

export class UpdateUser {
  static type = '[Auth] Update User';
  constructor(public user: User) {}
}

export class UpdateUserSuccess {
  static type = '[Auth] Update User Success';
  constructor(public user: User) {}
}

export class SendEmailConfirmation {
  static type = '[Auth] Send Email Confirmation';
}

export class SendEmailConfirmationSuccess {
  static type = '[Auth] Send Email Conformation Success';
  constructor(public message: string) {}
}

export class SendEmailConfirmationFail {
  static type = '[Auth] Send Email Confirmation Fail';
  constructor(public err: any) {}
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Token, User, SimpleResponse} from './auth.model';


@Injectable()
export class AuthService {
  API_ENDPOINT = '/api/rest-auth';

  constructor(private http: HttpClient) { }

  signInWithEmailAndPassword(formValue): Observable<Token> {
    return this.http.post<Token>(`${this.API_ENDPOINT}/login/`, formValue);
  }

  registration(formValue): Observable<Token> {
      return this.http.post<Token>(`${this.API_ENDPOINT}/registration/`, formValue);
  }

  logout(): Observable<SimpleResponse> {
    return this.http.post<SimpleResponse>(`${this.API_ENDPOINT}/logout/`, {});
  }

  passwordReset(email: string): Observable<SimpleResponse> {
    return this.http.post<SimpleResponse>(`${this.API_ENDPOINT}/password/reset/`, email);
  }

  resetPasswordConfirm(newPassword1, newPassword2, uid: string, token: Token): Observable<SimpleResponse> {
    return this.http.post<SimpleResponse>(`${this.API_ENDPOINT}/password/reset/confirm/`, {new_password1: newPassword1,
       new_password2: newPassword2, uid, token});
  }

  confirmEmail(key: string ): Observable<string> {
    return this.http.post<string>(
      `${this.API_ENDPOINT}/registration/verify-email/`,
      { key }
    );
  }

  sendEmailConfirmation(): Observable<any> {
    return this.http.post<any>(`/api/rt-auth/send-email-confirmation/`, {});
  }

}

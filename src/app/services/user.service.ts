import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { User} from '../auth/auth.model';

@Injectable()
export class UserService {

  API_ENDPOINT = '/api/rt-auth';

  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.API_ENDPOINT}/user/current`);
  }

  updateUser(formValue): Observable<User> {
    return this.http.patch<User>(`${this.API_ENDPOINT}/user/`, formValue);
  }
}

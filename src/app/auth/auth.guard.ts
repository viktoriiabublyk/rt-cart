import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from './auth.state';
import {AuthService} from './auth.service';
import { tap, map } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store, private userService: UserService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);
    if (isAuthenticated) {
      return true;
    }
    return this.userService.getUser().pipe(
      tap( user => {
        if (!user.is_authenticated) {
          const redirect = state.url === '/' || state.url === '' ? null : state.url;
          this.store.dispatch(new Navigate(['/auth/login'], { redirect }));
        }
      }),
      map(user => user.is_authenticated),
    );
  }
}

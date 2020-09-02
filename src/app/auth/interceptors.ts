import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, of, Subject} from 'rxjs';
import {catchError, debounceTime} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {CheckSession} from './auth.actions';


@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {
  private sessionCheckerSource = new Subject();
  private sessionChecker = this.sessionCheckerSource.asObservable();

  constructor(private router: Router, private store: Store) {
    this.sessionChecker.pipe(
      debounceTime(1000)
    ).subscribe(() => store.dispatch(new CheckSession()));
  }

  /**
   * intercept all XHR request
   * @param request requestObject
   * @param next requestHandler
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    /**
     * continues request execution
     */
    return next.handle(request).pipe(
      catchError((error, caught) => {
        // intercept the respons error and displace it to the console
        this.handleAuthError(error);
        return of(error);
      }) as any
    );
  }

  /**
   * manage formErrors
   * @param err errorResponse object
   */
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    // handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
      this.sessionCheckerSource.next();
      return of(err.message);
    }
    throw err;
  }
}

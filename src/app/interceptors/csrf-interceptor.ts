import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs/index';
import {Injectable} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class CSRFInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {
  }

  /**
   * intercept all XHR request
   * @param request;
   * @param next;
   * @returns;
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'X-CSRFToken': this.cookieService.get('csrftoken')
      }
    });
    return next.handle(request);
  }

}

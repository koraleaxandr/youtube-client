import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';

import {
  UserAuthServiceService,
} from '../../auth/services/user-auth-service.service';

@Injectable()
export class SearchInterceptor implements HttpInterceptor {
  authService: UserAuthServiceService;

  constructor(authService: UserAuthServiceService) {
    this.authService = authService;
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const searchReq = req.clone({
      params: req.params.set('key', this.authService.userSettings.userAuthToken),
    });

    return next.handle(searchReq);
  }
}

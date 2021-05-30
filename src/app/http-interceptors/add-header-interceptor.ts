import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from '../services/authentication/auth.service';

@Injectable()
export class AddHeaderInterceptor  implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({ headers: req.headers.append('Authorization', `Bearer ${this.authService.apiToken}`) });
    return next.handle(clonedRequest);
  }
}

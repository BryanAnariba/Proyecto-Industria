import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        return next.handle(req);
      }
      const headers = req.clone({
        headers: req.headers.set('x-access-token', `${token}`)
      });
      return next.handle(headers);
    }
}
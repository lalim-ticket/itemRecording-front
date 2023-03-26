import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAccessToken();
    if (token) {
      const headers =
        req.headers.get('Authorization') === 'null'
          ? req.headers.delete('Authorization')
          : req.headers.set('Authorization', `Bearer ${token}`);
      req = req.clone({ headers });
    }

    return next.handle(req);
  }
}

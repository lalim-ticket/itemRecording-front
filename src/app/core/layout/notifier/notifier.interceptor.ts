import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NotifierService } from 'angular-notifier';

@Injectable()
export class NotifierInterceptor implements HttpInterceptor {
  constructor(private notifierService: NotifierService) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (!(error.error instanceof ErrorEvent)) {
          this.notifierService.notify(
            'error',
            `[${error.status ?? 'XXX'}] ${error.error.code ?? error.error.message ?? 'Unknown error'}`,
          );
        }

        return throwError(() => error);
      }),
    );
  }
}

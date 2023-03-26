import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class RolesGuard implements CanActivate, CanActivateChild {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._check(route);
  }

  public canActivateChild(
    route: ActivatedRouteSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._check(route);
  }

  private _check(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    if (!route.data['roles']) {
      return of(true);
    }

    return this.authService.user$.pipe(
      switchMap((user) => {
        const hasRole = user?.roles.some((role) => route.data['roles'].includes(role));
        if (!hasRole) {
          return of(this.router.parseUrl('/'));
        }

        return of(true);
      }),
    );
  }
}

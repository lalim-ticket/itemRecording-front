import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UserGroup } from '@core/auth/auth.groups';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const redirectUrl = state.url === '/logout' ? '/' : state.url;
    return this._check(redirectUrl);
  }

  public canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const redirectUrl = state.url === '/logout' ? '/' : state.url;
    return this._check(redirectUrl);
  }

  public canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._check('/');
  }

  private _check(redirectURL: string): Observable<boolean | UrlTree> {
    return this.authService.user$.pipe(
      switchMap((user) => {
        const hasRole = user?.roles.includes(UserGroup.USER);
        if (!hasRole) {
          return of(this.router.createUrlTree(['login'], { queryParams: { redirectURL } }));
        }

        return of(true);
      }),
    );
  }
}

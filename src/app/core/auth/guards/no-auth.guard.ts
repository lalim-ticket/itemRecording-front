import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router, UrlTree } from '@angular/router';
import { UserGroup } from '@core/auth/auth.groups';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  public canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._check();
  }

  public canActivateChild(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._check();
  }

  public canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._check();
  }

  private _check(): Observable<boolean | UrlTree> {
    return this.authService.user$.pipe(
      switchMap((user) => {
        const hasRole = user?.roles.includes(UserGroup.USER);
        if (hasRole) {
          return of(this.router.parseUrl('/'));
        }

        return of(true);
      }),
    );
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environment';
import { BehaviorSubject } from 'rxjs';
import { first, tap } from 'rxjs/operators';

interface AuthData {
  accessToken: string;
  user: {
    userId: string;
    username: string;
    roles: string[];
  };
}

interface RegisterData {
  _id: string;
  username: string;
  roles: string[];
}

interface UserData {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly user$ = new BehaviorSubject<AuthData['user'] | null>(null);

  constructor(private readonly http: HttpClient, private readonly router: Router) {}

  public get userState() {
    return this.user$.getValue();
  }

  public async initialize() {
    if (this.getAccessToken() && this.getUser()) {
      this.validateToken().subscribe(async (_) => {
        if (!_) await this.logout();
      });
    } else {
      await this.logout();
    }
  }

  public login(data: UserData) {
    return this.http.post<AuthData>(`${environment.apiUrl}/auth/login`, { ...data }).pipe(
      first(),
      tap((response) => {
        this.setAccessToken(response.accessToken);
        this.setUser(response.user);
        this.user$.next(response.user);
      }),
    );
  }

  private validateToken() {
    return this.http
      .get<{ userId: string; username: string; roles: string[] }>(`${environment.apiUrl}/auth/profile`, {
        headers: { Authorization: `Bearer ${this.getAccessToken()}` },
      })
      .pipe(
        first(),
        tap({
          next: (response) => {
            this.user$.next(response);
          },
          error: (e: HttpErrorResponse) => {
            if (e.status === 401) this.logout();
          },
        }),
      );
  }

  public register(data: UserData) {
    return this.http.post<RegisterData>(`${environment.apiUrl}/users`, { ...data }).pipe(first());
  }

  public async logout() {
    this.deleteAccessToken();
    this.deleteUser();
    this.user$.next(null);
    await this.router.navigate(['/login']);
  }

  private setAccessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  public getAccessToken() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      return token;
    }

    return null;
  }

  private deleteAccessToken() {
    localStorage.removeItem('accessToken');
  }

  private setUser(user: AuthData['user']) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  private getUser() {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user) as AuthData['user'];
    }

    return null;
  }

  private deleteUser() {
    localStorage.removeItem('user');
  }
}

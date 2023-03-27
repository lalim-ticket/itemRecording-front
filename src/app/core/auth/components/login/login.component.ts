import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { environment } from '@environment';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class LoginComponent {
  public readonly environment = environment;

  constructor(
    private readonly authService: AuthService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) {}

  public readonly form = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(32),
      Validators.pattern(/((?=.*\d)(?=.*[A-Za-z]).*$)/),
    ]),
  });

  public async login() {
    this.authService
      .login({
        username: this.form.value.login!,
        password: this.form.value.password!,
      })
      .subscribe({
        next: async () => {
          const redirectURL = this.activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/login-redirect';
          await this.router.navigateByUrl(redirectURL);
        },
      });
  }
}

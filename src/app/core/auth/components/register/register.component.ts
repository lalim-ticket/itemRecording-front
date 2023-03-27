import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { environment } from '@environment';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class RegisterComponent {
  public readonly environment = environment;

  public password = '';

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
    retryPassword: new FormControl('', [Validators.required, Validators.pattern(this.password)]),
  });

  public async register() {
    this.authService
      .register({
        username: this.form.value.login!,
        password: this.form.value.password!,
      })
      .subscribe({
        next: async () => {
          const redirectURL = this.activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/login';
          await this.router.navigateByUrl(redirectURL);
        },
      });
  }
}

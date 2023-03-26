import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { environment } from '@environment';

@Component({
  standalone: true,
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class LogoutComponent implements OnInit {
  public readonly environment = environment;

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  public async ngOnInit() {
    await this.authService.logout();
  }
}

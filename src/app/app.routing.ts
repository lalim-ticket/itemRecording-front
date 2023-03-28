import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserGroup } from '@core/auth/auth.groups';
import { AuthGuard } from '@core/auth/guards/auth.guard';
import { NoAuthGuard } from '@core/auth/guards/no-auth.guard';
import { RolesGuard } from '@core/auth/guards/roles.guard';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard/home' },
  { path: 'login-redirect', pathMatch: 'full', redirectTo: 'dashboard/home' },

  {
    path: 'login',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    loadComponent: () => import('@core/auth/components/login/login.component').then((c) => c.LoginComponent),
    data: { showSidebar: false },
  },

  {
    path: 'register',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    loadComponent: () => import('@core/auth/components/register/register.component').then((c) => c.RegisterComponent),
    data: { showSidebar: false },
  },

  {
    path: 'logout',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadComponent: () => import('@core/auth/components/logout/logout.component').then((c) => c.LogoutComponent),
    data: { showSidebar: false },
  },

  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: { showSidebar: false },
    children: [
      {
        path: 'home',
        loadChildren: () => import('@modules/home/home.module').then((m) => m.HomeModule),
        canActivate: [RolesGuard],
        data: {
          roles: [UserGroup.USER],
          name: 'Home',
          icon: faHouse,
        },
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

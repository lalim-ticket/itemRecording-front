import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotifierModule } from 'angular-notifier';
import { CardComponent } from './card/card.component';
import { LoadingComponent } from './loading/loading.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotifierComponent } from './notifier/notifier.component';
import { NotifierInterceptor } from './notifier/notifier.interceptor';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NotifierModule.withConfig({
      position: {
        horizontal: { position: 'right', distance: 12 },
        vertical: { position: 'top', distance: 12, gap: 10 },
      },
      behaviour: {
        autoHide: 10_000,
        stacking: 5,
      },
    }),
    FontAwesomeModule,
  ],
  exports: [NotifierComponent, SidebarComponent, NavbarComponent, CardComponent, LoadingComponent],
  declarations: [NotifierComponent, SidebarComponent, NavbarComponent, CardComponent, LoadingComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotifierInterceptor,
      multi: true,
    },
  ],
})
export class LayoutModule {}

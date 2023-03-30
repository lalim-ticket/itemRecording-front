import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { notifierConfig } from '@core/configs/notifier.config';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotifierModule } from 'angular-notifier';
import { CardComponent } from './card/card.component';
import { GradientButtonComponent } from './gradientButton/gradient-button.component';
import { LoadingComponent } from './loading/loading.component';
import { ModalComponent } from './modal/modal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotifierComponent } from './notifier/notifier.component';
import { NotifierInterceptor } from './notifier/notifier.interceptor';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, NotifierModule.withConfig(notifierConfig), FontAwesomeModule],
  exports: [
    NotifierComponent,
    SidebarComponent,
    NavbarComponent,
    CardComponent,
    LoadingComponent,
    GradientButtonComponent,
    ModalComponent,
  ],
  declarations: [
    NotifierComponent,
    SidebarComponent,
    NavbarComponent,
    CardComponent,
    LoadingComponent,
    GradientButtonComponent,
    ModalComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotifierInterceptor,
      multi: true,
    },
  ],
})
export class LayoutModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { notifierConfig } from '@core/configs/notifier.config';
import { LayoutModule } from '@core/layout/layout.module';
import { GroupsService } from '@core/services/groups.service';
import { NotifierModule } from 'angular-notifier';
import { HomeComponent } from './home.component';

const routes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [],
  },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    LayoutModule,
    NotifierModule.withConfig(notifierConfig),
  ],
  providers: [GroupsService],
})
export class HomeModule {}

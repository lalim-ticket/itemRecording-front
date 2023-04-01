import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { notifierConfig } from '@core/configs/notifier.config';
import { LayoutModule } from '@core/layout/layout.module';
import { GroupsService } from '@core/services/groups.service';
import { HistoryService } from '@core/services/history.service';
import { ItemsService } from '@core/services/items.service';
import { NotifierModule } from 'angular-notifier';
import { GroupComponent } from './group.component';

const routes: Route[] = [
  {
    path: ':id',
    component: GroupComponent,
    canActivate: [],
  },
];

@NgModule({
  declarations: [GroupComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    LayoutModule,
    NotifierModule.withConfig(notifierConfig),
  ],
  providers: [GroupsService, ItemsService, HistoryService],
})
export class GroupModule {}

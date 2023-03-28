import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LayoutModule } from '@core/layout/layout.module';
import { GroupsService } from '@core/services/groups.service';
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
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule],
  providers: [GroupsService],
})
export class HomeModule {}

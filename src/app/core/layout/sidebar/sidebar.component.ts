import { Component } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { routes } from 'src/app/app.routing';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  public routes: Array<{ children: Array<{ name: string; icon: IconProp; url: string }> }> = routes
    .filter((route) => route.children?.length)
    .map((x) => ({
      children: x
        .children!.filter((child) => child?.data?.name)
        .map((y) => ({
          name: y.data!.name!,
          icon: y.data!.icon!,
          url: `/${x.path}/${y.path}`,
        })),
    }));
}

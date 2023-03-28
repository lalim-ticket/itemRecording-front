import { Component, OnInit } from '@angular/core';
import { IGroup } from '@core/services/dto/group.dto';
import { GroupsService } from '@core/services/groups.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public groups: IGroup[];

  constructor(private groupsService: GroupsService) {}

  ngOnInit() {
    this.groupsService.get().subscribe((groups) => {
      this.groups = groups;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { IGroup } from '@core/services/dto/group.dto';
import { GroupsService } from '@core/services/groups.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public showModal = false;

  public groups: IGroup[];
  public groupName: string;
  public groupDescription: string;

  constructor(private groupsService: GroupsService, private notifierService: NotifierService) {}

  ngOnInit() {
    this.groupsGet();
  }

  public toggleModal() {
    this.showModal = !this.showModal;
  }

  public buttonCreate() {
    this.groupCreate()?.subscribe(() => {
      this.groupsGet();
      this.toggleModal();
    });
  }

  public groupsGet() {
    this.groupsService.get().subscribe((groups) => {
      this.groups = groups;
    });
  }

  public groupCreate() {
    if (this.groupName && this.groupDescription)
      return this.groupsService.create({ name: this.groupName, description: this.groupDescription });

    this.notifierService.notify('default', 'Enter a name and description for the group');
    return;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGroup } from '@core/services/dto/group.dto';
import { GroupsService } from '@core/services/groups.service';
import { ItemsService } from '@core/services/items.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  public groupId: string;
  public group: IGroup;

  public username: string;

  public showAddUserModal = false;
  public showCreateItemModal = false;

  public itemName: string;
  public itemDescription: string;

  constructor(
    private readonly activateRoute: ActivatedRoute,
    private readonly groupsService: GroupsService,
    private readonly itemsService: ItemsService,
  ) {}

  ngOnInit() {
    this.groupId = this.activateRoute.snapshot.params['id'];
    this.getGroup();
  }

  public toggleUsersModal() {
    this.showAddUserModal = !this.showAddUserModal;
  }

  public addUser() {
    this.groupsService.addUser(this.username, this.group._id).subscribe(() => {
      this.username = '';
      this.getGroup();
    });
  }

  public deleteUser(username: string) {
    this.groupsService.deleteUser(username, this.group._id).subscribe(() => this.getGroup());
  }

  public toggleItemModal() {
    this.showCreateItemModal = !this.showCreateItemModal;
  }

  public createItem() {
    this.itemsService
      .create({ name: this.itemName, description: this.itemDescription, groupId: this.group._id })
      .subscribe(() => {
        this.itemName = '';
        this.itemDescription = '';
        this.getGroup();
        this.toggleItemModal();
      });
  }

  public getGroup() {
    this.groupsService.getByGroupId(this.groupId).subscribe((_) => (this.group = _));
  }
}

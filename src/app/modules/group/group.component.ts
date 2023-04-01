import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGroup } from '@core/services/dto/group.dto';
import { IHistory } from '@core/services/dto/history.dto';
import { IItem } from '@core/services/dto/item.dto';
import { GroupsService } from '@core/services/groups.service';
import { HistoryService } from '@core/services/history.service';
import { ItemsService } from '@core/services/items.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  public groupId: string;
  public group: IGroup;
  public selectedItem: IItem;

  public username: string;

  public showAddUserModal = false;
  public showCreateItemModal = false;
  public showEditItemModal = false;
  public showHistoryModal = false;

  public itemName: string;
  public itemDescription: string;
  public itemCount: number;

  public history: IHistory[];
  public offsetHistory: number;

  constructor(
    private readonly activateRoute: ActivatedRoute,
    private readonly groupsService: GroupsService,
    private readonly itemsService: ItemsService,
    private readonly historyService: HistoryService,
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

  public toggleUpdateItemModal() {
    this.showEditItemModal = !this.showEditItemModal;
  }

  public closeUpdateItemModal() {
    this.toggleUpdateItemModal();
    this.getGroup();
  }

  public selectItem(itemId: string) {
    this.selectedItem = this.group.items.find((item) => item._id == itemId) as IItem;
    this.toggleUpdateItemModal();
  }

  public createItem() {
    this.itemsService
      .create({
        name: this.itemName,
        description: this.itemDescription,
        count: this.itemCount,
        groupId: this.group._id,
      })
      .subscribe(() => {
        this.itemName = '';
        this.itemDescription = '';
        this.getGroup();
        this.toggleItemModal();
      });
  }

  public updateItem() {
    this.itemsService
      .update(this.groupId, this.selectedItem._id, {
        name: this.selectedItem.name,
        description: this.selectedItem.description,
        count: this.selectedItem.count,
      })
      .subscribe(() => {
        this.getGroup();
        this.toggleUpdateItemModal();
      });
  }

  public toggleHistoryModal() {
    this.showHistoryModal = !this.showHistoryModal;
  }

  public openHistoryModal() {
    this.getHistory();
    this.toggleHistoryModal();
  }

  public listHistory() {
    this.offsetHistory += 1;
    this.historyService
      .get(this.group._id, this.offsetHistory, 30)
      .subscribe((_) => (this.history = [...this.history, ..._]));
  }

  public getHistory() {
    this.offsetHistory = 1;
    this.historyService.get(this.group._id, this.offsetHistory, 30).subscribe((_) => (this.history = _));
  }

  public getGroup() {
    this.groupsService.getByGroupId(this.groupId).subscribe((_) => (this.group = _));
  }
}

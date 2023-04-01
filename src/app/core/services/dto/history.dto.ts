import { IGroup } from './group.dto';
import { IItem } from './item.dto';
import { IUser } from './user.dto';

export interface IHistory {
  _id: string;
  status: HistoryStatus;
  oldValue: string;
  newValue: string;
  item: IItem;
  user: IUser;
  group: IGroup;
  createdAt: Date;
}

export type HistoryStatus = 'add' | 'update' | 'delete';

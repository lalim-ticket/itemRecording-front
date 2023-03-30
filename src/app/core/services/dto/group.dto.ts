import { IItem } from './item.dto';
import { IUser } from './user.dto';

export interface IGroup {
  _id: string;
  name: string;
  description: string;
  owner: IUser;
  users: IUser[];
  items: IItem[];
  createdAt: Date;
}

export interface IGroupCreate {
  name: string;
  description: string;
}

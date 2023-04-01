export interface IItem {
  _id: string;
  name: string;
  description: string;
  count: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IItemCreate {
  name?: string;
  description?: string;
  count?: number;
  groupId: string;
}

export interface IItemUpdate {
  name?: string;
  description?: string;
  count?: number;
}

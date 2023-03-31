export interface IItem {
  _id: string;
  name: string;
  description: string;
  count: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IItemCreate {
  name: string;
  description?: string;
  groupId: string;
}

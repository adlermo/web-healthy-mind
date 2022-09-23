import { IResourceModel } from './IResourceModel';

export interface IResourceParser extends IResourceModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  enabled: boolean;
}

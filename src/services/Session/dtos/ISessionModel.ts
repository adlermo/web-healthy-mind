import { IResourceModel } from 'src/services/Resource/dto/IResourceModel';

export interface ISessionListModel {
  id: string;
  page: number;
  perPage: number;
}

export interface ISessionCreateModel {
  patientId: string;
  status: string;
  subject: string;
  duration: string;
  type: string;
  service: string;
  comments: string;
  appointmentDate: string;
  resourceId: string;
}

export interface ISessionEditModel {
  sessionId?: string;
  patientId: string;
  status: string;
  subject: string;
  duration: string;
  type: string;
  service: string;
  comments: string;
  appointmentDate: string;
  resourceId: string;
}

export interface ISessionShowModel {
  id?: string;
  workerId?: string;
  sessionId: string;
}

export interface ISessionFilterModel {
  subject?: string;
  patientId?: string;
  page?: number;
}

export interface ISessionModel {
  patientName: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  patientId: string;
  status: string;
  subject: string;
  duration: string;
  type: string;
  comments: string;
  enabled: boolean;
  appointmentDate: string;
  resourceId: number;
  service: string;
  resource: IResourceModel;
}

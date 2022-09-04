export interface ISessionListModel {
  id: string
  page: number,
  perPage: number
}

export interface ISessionCreateModel {
  workerId: string;
  patientId: string;
  patientName: string;
  sessionDescription: string;
  sessionDate: string;
}

export interface ISessionEditModel {
  id: string;
  workerId: string;
  patientId: string;
  patientName: string;
  sessionDescription: string;
  sessionDate: string;
}

export interface ISessionShowModel {
  id: string
  workerId: string
}
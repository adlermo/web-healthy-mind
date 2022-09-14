export interface ISessionListModel {
  id: string
  page: number,
  perPage: number
}

export interface ISessionCreateModel {
  patientId: string;
  status: string;
  subject: string;
  duration: string;
  type: string;
  comments: string;
  appointmentDate: string;
}

export interface ISessionEditModel {
  sessionId: string;
  patientId: string;
  status: string;
  subject: string;
  duration: string;
  type: string;
  comments: string;
}

export interface ISessionShowModel {
  id: string
  workerId: string
}
export interface IPatientListModel {
  workerId: string
  page: number,
  perPage: number
}

export interface IPatientCreateModel {
  name: string;
  password: string;
  birthDate: string;
  phone: string;
  email: string;
  address: string;
  workerId: string;
}

export interface IPatientEditModel {
  id: string;
  name: string;
  password: string;
  birthDate: string;
  phone: string;
  email: string;
  address: string;
  workerId: string;
  role: string;
}

export interface IPatientShowModel {
  workerId: string
  patientId: string
}
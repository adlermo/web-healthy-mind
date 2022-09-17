export interface IPatientListModel {
  workerId: string;
  page: number;
  perPage: number;
}

export interface IPatientCreateModel {
  addressId: number;
  name: string;
  email: string;
  document: string;
  gender: string;
  birthDate: string;
  phone: number;
}

export interface IPatientEditModel {
  patientId: string;
  addressId: string;
  name: string;
  email: string;
  document: string;
  gender: string;
  birthDate: string;
  phone: string;
}

export interface IPatientShowModel {
  workerId: string;
  patientId: string;
}

export interface IPatientFilterModel {
  name?: string;
  email?: string;
  page: number;
}

export interface IPatientDeleteModel {
  patientId: string;
}

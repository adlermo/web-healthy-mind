import { IAddressPatient } from './IAddressModel';

export interface IPatientListModel {
  workerId: string;
  page: number;
  perPage: number;
}

export interface IPatientCreateModel {
  address: IAddressPatient;
  name: string;
  email: string;
  document: string;
  gender?: string;
  birthDate: string;
  phone: number;
}

export interface IPatientEditModel {
  name?: string;
  email?: string;
  document?: string;
  gender?: string;
  birthDate?: string;
  phone?: string;
  password?: string;
  newPassword?: string;
  confirmPassword?: string;
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

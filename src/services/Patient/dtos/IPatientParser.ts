import { IAddressPatient } from './IAddressModel';

export interface IPatientParser {
  id: string;
  name: string;
  email: string;
  document: string;
  gender: string;
  birthDate: Date;
  phone: string;
  address: IAddressPatient;
  isFirstLogin?: string;
  password?: string;
  roleId?: string;
}

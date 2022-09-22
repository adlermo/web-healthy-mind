export interface IPatientParser {
  id: string;
  name: string;
  email: string;
  document: string;
  gender: string;
  birthDate: Date;
  phone: string;
  isFirstLogin?: string;
  password?: string;
  roleId?: string;
}

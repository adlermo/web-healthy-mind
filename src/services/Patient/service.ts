import { api } from '../api';
import {
  IPatientCreateModel,
  IPatientDeleteModel,
  IPatientEditModel,
  IPatientFilterModel,
  IPatientShowModel,
} from './dtos/IPatientModel';
import { IPatientParser } from './dtos/IPatientParser';
import { PATIENT_FIRST_PASSWORD } from '../Auth/service';

export async function fetchPatientList(filterParams: IPatientFilterModel): Promise<IPatientParser> {
  const url = `/patients/list`;
  const { data } = await api.get(url, { params: { filterParams } });

  return data.response;
}

export async function fetchPatientById({
  workerId,
  patientId,
}: IPatientShowModel): Promise<IPatientParser> {
  const url = `v1/${workerId}/patients/${patientId}`;
  const { data } = await api.get(url);
  return data;
}

export async function fetchRegisterPatient({
  address,
  name,
  email,
  document,
  gender,
  birthDate,
  phone,
}: IPatientCreateModel): Promise<IPatientParser> {
  const params = {
    address,
    name,
    email,
    document,
    gender,
    birthDate,
    phone,
  };

  const url = `/patients`;
  const { data, status } = await api.post(url, params);
  if (status === 201) {
    localStorage.setItem(PATIENT_FIRST_PASSWORD, JSON.stringify(data.password));
  }

  return data;
}

export async function fetchEditPatient(
  patientId: string,
  {
    name,
    email,
    document,
    gender,
    birthDate,
    phone,
    password,
    newPassword,
    confirmPassword,
  }: IPatientEditModel,
): Promise<IPatientParser> {
  const params = {
    name,
    email,
    document,
    gender,
    birthDate,
    phone,
    password,
    newPassword,
    confirmPassword,
  };

  const url = `/patients/update/${patientId.toString()}`;
  const { data } = await api.put(url, params);
  return data;
}

export async function fetchDeletePatient({
  patientId,
}: IPatientDeleteModel): Promise<IPatientParser> {
  const url = `/patients/remove/${patientId}`;
  const { data } = await api.delete(url);

  return data;
}

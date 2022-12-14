import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  fetchDeletePatient,
  fetchEditPatient,
  fetchPatientInfo,
  fetchPatientList,
  fetchRegisterPatient,
} from './service';

import {
  IPatientCreateModel,
  IPatientDeleteModel,
  IPatientEditModel,
  IPatientFilterModel,
  IPatientShowModel,
} from './dtos/IPatientModel';

import { IPatientParser } from './dtos/IPatientParser';

export function usePatientsList(
  filterParams: IPatientFilterModel,
): UseQueryResult<IPatientParser[]> {
  const queryKey = ['patientList'];
  return useQuery(queryKey, () => fetchPatientList(filterParams), {
    keepPreviousData: true,
  });
}

export function usePatientInfo({ patientId }: IPatientShowModel): UseQueryResult<IPatientParser> {
  const queryKey = ['patientById'];
  return useQuery(queryKey, () => fetchPatientInfo({ patientId }), {
    keepPreviousData: true,
  });
}

export function useRegisterPatient({
  address,
  name,
  email,
  document,
  gender,
  birthDate,
  phone,
}: IPatientCreateModel): UseQueryResult<IPatientParser> {
  const queryKey = ['registerPatient'];
  return useQuery(
    queryKey,
    () =>
      fetchRegisterPatient({
        address,
        name,
        email,
        document,
        gender,
        birthDate,
        phone,
      }),
    {
      keepPreviousData: true,
    },
  );
}

export function useEditPatient(
  patientId: string,
  { name, email, document, gender, birthDate, phone }: IPatientEditModel,
): UseQueryResult<IPatientParser> {
  const queryKey = ['editPatient'];
  return useQuery(
    queryKey,
    () =>
      fetchEditPatient(patientId, {
        name,
        email,
        document,
        gender,
        birthDate,
        phone,
      }),
    {
      keepPreviousData: true,
    },
  );
}

export function useDeletePatient({
  patientId,
}: IPatientDeleteModel): UseQueryResult<IPatientParser> {
  const queryKey = ['deletePatient'];
  return useQuery(queryKey, () => fetchDeletePatient({ patientId }), {
    keepPreviousData: true,
  });
}

import { useQuery, UseQueryResult } from  '@tanstack/react-query';
import {
  fetchPatientList,
  fetchPatientById,
  fetchRegisterPatient,
  fetchEditPatient,
  fetchDeletePatient
} from './service';
import { IPatientListModel, IPatientShowModel, IPatientCreateModel, IPatientEditModel } from './dtos/IPatientModel';
import { IPatientParser } from './dtos/IPatientParser';

export function usePatientsList({ workerId, page, perPage }: IPatientListModel): UseQueryResult<IPatientParser[]> {
  const queryKey = ['patientList'];
  return useQuery(queryKey, () => fetchPatientList({ workerId, page, perPage }), {
    keepPreviousData: true,
  });
}

export function usePatientById({workerId, patientId}: IPatientShowModel): UseQueryResult<IPatientParser> {
  const queryKey = ['patientById'];
  return useQuery(queryKey, () => fetchPatientById({workerId, patientId}), {
    keepPreviousData: true,
  });
}

export function useRegisterPatient({name, password, birthDate, phone, email, address, workerId}: IPatientCreateModel): UseQueryResult<IPatientParser> {
  const queryKey = ['registerPatient'];
  return useQuery(queryKey, () => fetchRegisterPatient(
      {
        name,
        password,
        birthDate,
        phone,
        email,
        address,
        workerId
      }
    ),
    {
    keepPreviousData: true,
    }
  );
}

export function useEditPatient({id, name, password, birthDate, phone, email, address, workerId, role}: IPatientEditModel): UseQueryResult<IPatientParser> {
  const queryKey = ['editPatient'];
  return useQuery(queryKey, () => fetchEditPatient(
      {
        id,
        name,
        password,
        birthDate,
        phone,
        email,
        address,
        workerId,
        role
      }
    ),
    {
    keepPreviousData: true,
    }
  );
}

export function useDeletePatient({workerId, patientId}: IPatientShowModel): UseQueryResult<IPatientParser> {
  const queryKey = ['deletePatient'];
  return useQuery(queryKey, () => fetchDeletePatient({workerId, patientId}), {
    keepPreviousData: true,
  });
}
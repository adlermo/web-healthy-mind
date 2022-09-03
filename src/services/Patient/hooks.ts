import { useQuery, UseQueryResult } from  '@tanstack/react-query';
import { PatientDto } from './dtos/Patient.dto';
import { fetchPatientList, fetchPatientById, fetchRegisterPatient } from './service';
import { IWorkerId, IWorkerAndPatientId} from '../Worker/dtos/IWorker';
import { ModelDto } from './dtos/Model.dto';

export function usePatientList(id: IWorkerId): UseQueryResult<PatientDto[]> {
  const queryKey = ['patientList'];
  return useQuery(queryKey, () => fetchPatientList(id), {
    keepPreviousData: true,
  });
}

export function usePatientById({workerId, patientId}: IWorkerAndPatientId): UseQueryResult<PatientDto> {
  const queryKey = ['patientById'];
  return useQuery(queryKey, () => fetchPatientById({workerId, patientId}), {
    keepPreviousData: true,
  });
}

export function useRegisterPatient({name, password, birthDate, phone, email, address, workerId}: ModelDto): UseQueryResult<PatientDto> {
  const queryKey = ['registerPatient'];
  return useQuery(queryKey, () => fetchRegisterPatient({name, password, birthDate, phone, email, address, workerId}), {
    keepPreviousData: true,
  });
}
import { useQuery, UseQueryResult } from  '@tanstack/react-query';
import { PatientDto } from './dtos/Patient.dto';
import { fetchPatientList, fetchPatientById } from './service';
import { IWorkerId, IWorkerAndPatientId} from '../Worker/dtos/IWorker';

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
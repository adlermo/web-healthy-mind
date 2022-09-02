import api from "../api";
import { PatientDto } from "./dtos/Patient.dto";
import { IWorkerId, IWorkerAndPatientId } from "../Worker/dtos/IWorker";

export async function fetchPatientList(id: IWorkerId): Promise<PatientDto[]> {
  const url = `v1/${id}/patients`;
  const { data } = await api.get(url);
  return data;
}

export async function fetchPatientById({workerId, patientId}: IWorkerAndPatientId): Promise<PatientDto> {
  const url = `v1/${workerId}/patients/${patientId}`;
  const { data } = await api.get(url);
  return data;
}

export async function fetchAddPatient({id, name, email, cfp, phone, createdAt, workerId, role} :PatientDto): Promise<PatientDto> {
  const params ={
    id,
    name,
    email,
    cfp,
    phone,
    createdAt, 
    workerId,
    role
  }
  
  const url = `${workerId}/patients`;
  const { data } = await api.post(url, params);
  return data;
}


export async function fetchEditPatient({id, name, email, cfp, phone, createdAt, workerId, role} :PatientDto): Promise<PatientDto> {
  const params ={
    id,
    name,
    email,
    cfp,
    phone,
    createdAt, 
    workerId,
    role
  }
  
  const url = `${workerId}/patients`;
  const { data } = await api.put(url, params);
  return data;
}

export async function fetchDeletePatient({workerId, patientId}: IWorkerAndPatientId): Promise<any> {
  const url = `v1/${workerId}/patients/${patientId}`;
  const { data } = await api.delete(url);
  return data;
}
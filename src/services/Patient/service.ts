import api from "../api";
import { PatientDto } from "./dtos/Patient.dto";
import { ModelDto } from "./dtos/Model.dto";
import { IWorkerListParams, IWorkerAndPatientId } from "../Worker/dtos/IWorker";

export async function fetchPatientList({ id, page, perPage }: IWorkerListParams): Promise<any> {
  const url = `v1/users/${id}/patients`;
  const filters: any = {page, perPage}
  const { data } = await api.get(url, { params: filters });

  return data;
}

export async function fetchPatientById({workerId, patientId}: IWorkerAndPatientId): Promise<PatientDto> {
  const url = `v1/${workerId}/patients/${patientId}`;
  const { data } = await api.get(url);

  return data;
}

export async function fetchRegisterPatient({ name, password, birthDate, phone, email, address, workerId }: ModelDto): Promise<any> {

  const params ={
    name,
    password,
    birthDate,
    phone,
    email,
    address,
    workerId,
    role: 'user'
  }
  
  const url = `v1/users/${workerId}/patients`;
  const { data } = await api.post(url, params);

  return data;
}


export async function fetchEditPatient({id, name, phone, email, address, createdAt, workerId, role} :PatientDto): Promise<PatientDto> {
  const params ={
    id,
    name,
    phone,
    email,
    address,
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
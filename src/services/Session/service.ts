import api from "../api";
import { ISessionListModel, ISessionCreateModel, ISessionEditModel, ISessionShowModel } from "./dtos/ISessionModel";
import { ISessionParser } from "./dtos/ISessionParser";

export async function fetchSessionsList({ id, page, perPage }: ISessionListModel): Promise<ISessionParser> {
  const url = `v1/sessions/`;
  const filters: any = {id, page, perPage}
  const { data } = await api.get(url, { params: filters });

  return data;
}

export async function fetchSessionById({id, workerId}: ISessionShowModel): Promise<ISessionParser> {
  const url = `v1/sessions/${id}`;
  const params = {workerId}
  const { data } = await api.get(url, { params });

  return data;
}

export async function fetchCreateSession({ workerId, patientId, patientName, sessionDescription, sessionDate }: ISessionCreateModel): Promise<ISessionParser> {
  const params ={
    workerId,
    patientId,
    patientName,
    sessionDescription,
    sessionDate
  }
  
  const url = `v1/sessions`;
  const { data } = await api.post(url, params);

  return data;
}


export async function fetchEditSession({ id, workerId, patientId, patientName, sessionDescription, sessionDate } :ISessionEditModel): Promise<ISessionParser> {
  const params ={
    id,
    workerId,
    patientId,
    patientName,
    sessionDescription,
    sessionDate
  }
  
  const url = `v1/sessions/${id}`;
  const { data } = await api.put(url, params);
  return data;
}

export async function fetchDeleteSession({id, workerId}: ISessionShowModel): Promise<ISessionParser> {
  const url = `v1/sessions/${id}`;
  const params = {workerId}
  const { data } = await api.delete(url, { params });

  return data;
}
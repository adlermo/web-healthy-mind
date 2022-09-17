import { api } from '../api';
import {
  ISessionCreateModel,
  ISessionEditModel,
  ISessionFilterModel,
  ISessionShowModel,
} from './dtos/ISessionModel';
import { ISessionParser } from './dtos/ISessionParser';

export async function fetchSessionsList(
  filterParams: ISessionFilterModel,
): Promise<ISessionParser> {
  const url = `/sessions/list`;
  const { data } = await api.get(url, { params: { filterParams } });

  return data.response;
}

export async function fetchSessionById({
  id,
  workerId,
}: ISessionShowModel): Promise<ISessionParser> {
  const url = `v1/sessions/${id}`;
  const params = { workerId };
  const { data } = await api.get(url, { params });

  return data;
}

export async function fetchCreateSession({
  patientId,
  status,
  subject,
  duration,
  type,
  comments,
  appointmentDate,
}: ISessionCreateModel): Promise<ISessionParser> {
  const params = {
    patientId,
    status,
    subject,
    duration,
    type,
    comments,
    appointmentDate,
  };

  const url = `/sessions`;
  const { data } = await api.post(url, params);

  return data;
}

export async function fetchEditSession({
  sessionId,
  patientId,
  status,
  subject,
  duration,
  type,
  comments,
}: ISessionEditModel): Promise<ISessionParser> {
  const params = {
    sessionId,
    patientId,
    status,
    subject,
    duration,
    type,
    comments,
  };

  const url = `/sessions/update/${sessionId}`;
  const { data } = await api.put(url, params);
  return data;
}

export async function fetchRemoveSession({
  sessionId,
}: ISessionShowModel): Promise<ISessionParser> {
  const url = `/sessions/remove/${sessionId}`;
  const { data } = await api.delete(url);

  return data;
}

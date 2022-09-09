import { useQuery, UseQueryResult } from  '@tanstack/react-query';
import {
  fetchSessionsList,
  fetchSessionById,
  fetchCreateSession,
  fetchEditSession,
  fetchDeleteSession
} from './service';
import { ISessionShowModel, ISessionCreateModel, ISessionEditModel } from './dtos/ISessionModel';
import { ISessionParser } from './dtos/ISessionParser';

export function useSessionsList(filterParams: {}): UseQueryResult<ISessionParser[]> {
  const queryKey = ['sessionList'];
  return useQuery(queryKey, () => fetchSessionsList(filterParams), {
    keepPreviousData: true,
  });
}

export function useSessionById({id, workerId}: ISessionShowModel): UseQueryResult<ISessionParser> {
  const queryKey = ['sessionById'];
  return useQuery(queryKey, () => fetchSessionById({id, workerId}), {
    keepPreviousData: true,
  });
}

export function useCreateSession({ patientId, status, subject, duration, type, comments }: ISessionCreateModel): UseQueryResult<ISessionParser> {
  const queryKey = ['registerSession'];
  return useQuery(queryKey, () => fetchCreateSession(
      {
        patientId,
        status,
        subject,
        duration,
        type,
        comments
      }
    ),
    {
    keepPreviousData: true,
    }
  );
}

export function useEditSession({ sessionId, patientId, status, subject, duration, type, comments }: ISessionEditModel): UseQueryResult<ISessionParser> {
  const queryKey = ['editSession'];
  return useQuery(queryKey, () => fetchEditSession(
      {
        sessionId,
        patientId,
        status,
        subject,
        duration,
        type,
        comments
      }
    ),
    {
    keepPreviousData: true,
    }
  );
}

export function useDeleteSession({id, workerId}: ISessionShowModel): UseQueryResult<ISessionParser> {
  const queryKey = ['deleteSession'];
  return useQuery(queryKey, () => fetchDeleteSession({id, workerId}), {
    keepPreviousData: true,
  });
}
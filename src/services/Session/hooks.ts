import { useQuery, UseQueryResult } from  '@tanstack/react-query';
import {
  fetchSessionsList,
  fetchCreateSession,
  fetchEditSession,
  fetchRemoveSession
} from './service';
import { ISessionShowModel, ISessionCreateModel, ISessionEditModel } from './dtos/ISessionModel';
import { ISessionParser } from './dtos/ISessionParser';

export function useSessionsList(filterParams: {}): UseQueryResult<ISessionParser[]> {
  const queryKey = ['sessionList'];
  return useQuery(queryKey, () => fetchSessionsList(filterParams), {
    keepPreviousData: true,
  });
}

export function useCreateSession({ patientId, status, subject, duration, type, comments, appointmentDate }: ISessionCreateModel): UseQueryResult<ISessionParser> {
  const queryKey = ['registerSession'];
  return useQuery(queryKey, () => fetchCreateSession(
      {
        patientId,
        status,
        subject,
        duration,
        type,
        comments,
        appointmentDate
      }
    ),
    {
    keepPreviousData: true,
    }
  );
}

export function useEditSession({ sessionId, patientId, status, subject, duration, type, comments, appointmentDate }: ISessionEditModel): UseQueryResult<ISessionParser> {
  const queryKey = ['editSession'];
  return useQuery(queryKey, () => fetchEditSession(
      {
        sessionId,
        patientId,
        status,
        subject,
        duration,
        type,
        comments,
        appointmentDate
      }
    ),
    {
    keepPreviousData: true,
    }
  );
}

export function useRemoveSession({sessionId}: ISessionShowModel): UseQueryResult<ISessionParser> {
  const queryKey = ['deleteSession'];
  return useQuery(queryKey, () => fetchRemoveSession({sessionId}), {
    keepPreviousData: true,
  });
}
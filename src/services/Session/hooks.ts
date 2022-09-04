import { useQuery, UseQueryResult } from  '@tanstack/react-query';
import {
  fetchSessionList,
  fetchSessionById,
  fetchCreateSession,
  fetchEditSession,
  fetchDeleteSession
} from './service';
import { ISessionListModel, ISessionShowModel, ISessionCreateModel, ISessionEditModel } from './dtos/ISessionModel';
import { ISessionParser } from './dtos/ISessionParser';

export function useSessionList({ id, page, perPage }: ISessionListModel): UseQueryResult<ISessionParser[]> {
  const queryKey = ['sessionList'];
  return useQuery(queryKey, () => fetchSessionList({ id, page, perPage }), {
    keepPreviousData: true,
  });
}

export function useSessionById({id, workerId}: ISessionShowModel): UseQueryResult<ISessionParser> {
  const queryKey = ['sessionById'];
  return useQuery(queryKey, () => fetchSessionById({id, workerId}), {
    keepPreviousData: true,
  });
}

export function useCreateSession({ workerId, patientId, patientName, sessionDescription, sessionDate }: ISessionCreateModel): UseQueryResult<ISessionParser> {
  const queryKey = ['registerSession'];
  return useQuery(queryKey, () => fetchCreateSession(
      {
        workerId,
        patientId,
        patientName,
        sessionDescription,
        sessionDate
      }
    ),
    {
    keepPreviousData: true,
    }
  );
}

export function useEditSession({ id, workerId, patientId, patientName, sessionDescription, sessionDate }: ISessionEditModel): UseQueryResult<ISessionParser> {
  const queryKey = ['editSession'];
  return useQuery(queryKey, () => fetchEditSession(
      {
        id,
        workerId,
        patientId,
        patientName,
        sessionDescription,
        sessionDate
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
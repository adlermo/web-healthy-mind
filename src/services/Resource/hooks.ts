import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { IResourceParser } from './dto/IResourceParser';
import { listResources } from './service';

export function useListResources(): UseQueryResult<IResourceParser[]> {
  const queryKey = ['listResources'];
  return useQuery(queryKey, () => listResources(), {
    keepPreviousData: true,
  });
}

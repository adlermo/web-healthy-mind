import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { IDashboardParser } from './dtos/IDashboardParser';
import { fetchDashboard } from './service';

export function useDashboard(): UseQueryResult<IDashboardParser> {
  const queryKey = ['dashboard'];
  return useQuery(queryKey, () => fetchDashboard(), {
    keepPreviousData: true,
  });
}

import { api } from '../api';
import { IDashboardParser } from './dtos/IDashboardParser';

export async function fetchDashboard(): Promise<IDashboardParser> {
  return api.get('/dashboard').then(({ data }) => data);
}

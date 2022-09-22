export interface IDashboardParser {
  userId: string;
  totalPatients: number;
  totalSessionsIndividual: number;
  totalSessionsPair: number;
  totalSessionsGroup: number;
  totalSessionsScheduledPerDay: number;
  totalSessionsScheduledPerMonth: number;
  totalSessionsCanceledPerMonth: number;
}

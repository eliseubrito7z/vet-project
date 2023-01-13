import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'
import { Report, ReportRequest } from './useClinicData'

export async function getReports(): Promise<Report[]> {
  const { data } = await api.get('/reports')

  const reports = data.map((report: ReportRequest) => {
    return {
      id: report.id,
      approved: report.approved,
      created_at: report.created_at,
      description: report.description,
      title: report.title,
      type: report.type,
      staff: report.staff,
    }
  })

  return reports
}

export function useReports() {
  return useQuery(['reports'], getReports, {
    staleTime: 1000,
  })
}

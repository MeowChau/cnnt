import { create } from 'zustand'
import { CourseReport } from '../types/report.types'
import { ReportService } from '../services/report.service'

interface ReportState {
  currentReport: CourseReport | null
  loading: boolean
  error: string | null
  loadCourseReport: (courseId: string) => void
  exportCurrentReport: () => void
}

export const useReportStore = create<ReportState>((set, get) => ({
  currentReport: null,
  loading: false,
  error: null,

  loadCourseReport: (courseId) => {
    set({ loading: true, error: null })
    try {
      const report = ReportService.getCourseReport(courseId)
      set({ currentReport: report, loading: false })
    } catch (error) {
      set({ error: 'Failed to load report', loading: false })
    }
  },

  exportCurrentReport: () => {
    const { currentReport } = get()
    if (currentReport) {
      ReportService.exportReportToCSV(currentReport)
    }
  }
}))

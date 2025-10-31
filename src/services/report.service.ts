import { AttendanceStats, CourseReport, SessionReport } from '../types/report.types'

export const ReportService = {
  calculateStats(students: any[]): AttendanceStats {
    const total = students.length
    const present = students.filter(s => s.status === 'present').length
    const absent = students.filter(s => s.status === 'absent').length
    const late = students.filter(s => s.status === 'late').length

    return {
      present,
      absent,
      late,
      totalStudents: total,
      presentPercentage: (present / total) * 100,
      absentPercentage: (absent / total) * 100,
      latePercentage: (late / total) * 100
    }
  },

  getCourseReport(courseId: string): CourseReport | null {
    // Get all sessions from localStorage for this course
    const sessions = Object.keys(localStorage)
      .filter(key => key.startsWith('session_'))
      .map(key => JSON.parse(localStorage.getItem(key) || '{}'))
      .filter(session => session.courseId === courseId)

    if (!sessions.length) return null

    const sessionReports: SessionReport[] = sessions.map(session => ({
      sessionId: session.id,
      date: session.date,
      courseId: session.courseId,
      stats: this.calculateStats(session.students)
    }))

    // Calculate overall stats
    const allStudents = sessions.flatMap(s => s.students)
    const overallStats = this.calculateStats(allStudents)

    return {
      courseId,
      courseName: sessions[0].courseName || 'Unknown Course',
      sessions: sessionReports,
      overallStats
    }
  },

  exportReportToCSV(report: CourseReport) {
    const headers = ['Session Date', 'Total Students', 'Present %', 'Absent %', 'Late %']
    const rows = report.sessions.map(s => [
      s.date,
      s.stats.totalStudents,
      s.stats.presentPercentage.toFixed(2),
      s.stats.absentPercentage.toFixed(2),
      s.stats.latePercentage.toFixed(2)
    ])

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `report_${report.courseId}.csv`
    link.click()
  }
}

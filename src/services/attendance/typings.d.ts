export interface Student {
  id: string
  name: string
  studentId: string
  status: AttendanceStatus
}

export interface Session {
  id: string
  date: string
  courseId: string
  courseName: string
  students: Student[]
}

export type AttendanceStatus = 'present' | 'absent' | 'late'

export interface AttendanceService {
  getSession(sessionId: string): Session | null
  updateStudentStatus(sessionId: string, studentId: string, status: AttendanceStatus): Session | null
  exportToCSV(session: Session): void
}

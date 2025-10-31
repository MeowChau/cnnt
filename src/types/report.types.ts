export interface AttendanceStats {
  present: number
  absent: number
  late: number
  totalStudents: number
  presentPercentage: number
  absentPercentage: number
  latePercentage: number
}

export interface SessionReport {
  sessionId: string
  date: string
  courseId: string
  stats: AttendanceStats
}

export interface CourseReport {
  courseId: string
  courseName: string
  sessions: SessionReport[]
  overallStats: AttendanceStats
}

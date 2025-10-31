interface Student {
  id: string
  name: string
  studentId: string
  status: 'present' | 'absent' | 'late'
}

interface Session {
  id: string
  date: string
  courseId: string
  students: Student[]
}

export const AttendanceService = {
  getSession: (sessionId: string): Session | null => {
    const data = localStorage.getItem(`session_${sessionId}`)
    return data ? JSON.parse(data) : null
  },

  updateStudentStatus: (sessionId: string, studentId: string, status: 'present' | 'absent' | 'late') => {
    const session = AttendanceService.getSession(sessionId)
    if (!session) return null

    const updatedStudents = session.students.map(student => 
      student.id === studentId ? {...student, status} : student
    )

    const updatedSession = {...session, students: updatedStudents}
    localStorage.setItem(`session_${sessionId}`, JSON.stringify(updatedSession))
    return updatedSession
  },

  exportToCSV: (session: Session) => {
    const headers = ['Student ID', 'Name', 'Status']
    const rows = session.students.map(s => [s.studentId, s.name, s.status])
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `attendance_${session.id}.csv`
    link.click()
  }
}

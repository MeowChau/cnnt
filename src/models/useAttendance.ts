import { useState, useCallback } from 'react'
import { attendanceService } from '../services/attendance'
import type { Session, AttendanceStatus } from '../services/attendance/typings'

export const useAttendance = (sessionId: string) => {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadSession = useCallback(async () => {
    setLoading(true)
    try {
      const data = attendanceService.getSession(sessionId)
      setSession(data)
    } catch (err) {
      setError('Failed to load session')
    } finally {
      setLoading(false)
    }
  }, [sessionId])

  const updateStatus = useCallback(async (studentId: string, status: AttendanceStatus) => {
    if (!session) return
    const updated = attendanceService.updateStudentStatus(sessionId, studentId, status)
    if (updated) setSession(updated)
  }, [session, sessionId])

  const exportSession = useCallback(() => {
    if (session) {
      attendanceService.exportToCSV(session)
    }
  }, [session])

  return {
    session,
    loading,
    error,
    loadSession,
    updateStatus,
    exportSession
  }
}

import { create } from 'zustand'
import { AttendanceService } from '../services/attendance.service'

interface AttendanceState {
  currentSession: any
  loading: boolean
  error: string | null
  loadSession: (sessionId: string) => Promise<void>
  updateStatus: (studentId: string, status: 'present' | 'absent' | 'late') => Promise<void>
  exportCurrentSession: () => void
}

export const useAttendanceStore = create<AttendanceState>((set, get) => ({
  currentSession: null,
  loading: false,
  error: null,

  loadSession: async (sessionId) => {
    set({ loading: true, error: null })
    try {
      const session = await AttendanceService.getSession(sessionId)
      set({ currentSession: session, loading: false })
    } catch (error) {
      set({ error: 'Failed to load session', loading: false })
    }
  },

  updateStatus: async (studentId, status) => {
    const { currentSession } = get()
    if (!currentSession) return

    const updated = await AttendanceService.updateStudentStatus(
      currentSession.id,
      studentId,
      status
    )
    if (updated) {
      set({ currentSession: updated })
    }
  },

  exportCurrentSession: () => {
    const { currentSession } = get()
    if (currentSession) {
      AttendanceService.exportToCSV(currentSession)
    }
  }
}))

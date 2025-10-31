import { create } from 'zustand'
import { STORAGE_KEYS } from '../constants/storage'

interface AuthState {
  isAuthenticated: boolean
  user: null | {
    id: string
    name: string
    email: string
    role: 'lecturer' | 'student'
  }
  login: (userData: { id: string; name: string; email: string; role: 'lecturer' | 'student' }) => void
  logout: () => void
  isLecturer: () => boolean
  initializeFromStorage: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  login: (userData) => {
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(userData))
    set({ isAuthenticated: true, user: userData })
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER)
    set({ isAuthenticated: false, user: null })
  },
  isLecturer: () => get().user?.role === 'lecturer',
  initializeFromStorage: () => {
    const stored = localStorage.getItem(STORAGE_KEYS.AUTH_USER)
    if (stored) {
      const userData = JSON.parse(stored)
      set({ isAuthenticated: true, user: userData })
    }
  }
}))

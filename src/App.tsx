import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/auth.store'
import { LoginForm } from './components/auth/LoginForm'
import HomePage from './pages/home'
import AttendancePage from './pages/attendance/[id]'
import ReportsPage from './pages/reports'
import { initializeMockData } from './constants/mockData'
import { Layout } from './components/layout/Layout'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/login" />
}

function App() {
  useEffect(() => {
    // Initialize mock data on mount
    if (import.meta.env.DEV) {
      initializeMockData()
    }
  }, [])

  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      
      <Route path="/" element={<Navigate to="/home" replace />} />
      
      <Route path="/home" element={
        <PrivateRoute>
          <Layout>
            <HomePage />
          </Layout>
        </PrivateRoute>
      } />
      
      <Route path="/sessions/:id/attendance" element={
        <PrivateRoute>
          <Layout>
            <AttendancePage />
          </Layout>
        </PrivateRoute>
      } />
      
      <Route path="/reports" element={
        <PrivateRoute>
          <Layout>
            <ReportsPage />
          </Layout>
        </PrivateRoute>
      } />
    </Routes>
  )
}

export default App

import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAttendance } from '../../models/useAttendance'
import { AttendanceTable } from '../../components/attendance/AttendanceTable'
import { Card } from '../../components/ui/card'
import { Search, Download } from 'lucide-react'

export default function AttendancePage() {
  const { id = '' } = useParams()
  const { session, loading, error, loadSession, updateStatus, exportSession } = useAttendance(id)

  useEffect(() => {
    loadSession()
  }, [loadSession])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (!session) return <div>Session not found</div>

  return (
    <div className="space-y-6 container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Điểm danh: {session.courseName}
          </h1>
          <p className="text-gray-500">Lớp: Lập trình web - 20/12/2023</p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text"
              placeholder="Tìm kiếm sinh viên..."
              className="pl-9 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ring-purple-200"
            />
          </div>
          <button
            onClick={exportSession}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Download className="w-4 h-4" />
            Xuất Excel
          </button>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <AttendanceTable 
            session={session}
            onStatusChange={updateStatus}
          />
        </div>
      </Card>
    </div>
  )
}

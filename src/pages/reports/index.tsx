import { useEffect } from 'react'
import { useReportStore } from '../../store/report.store'

export default function ReportsPage() {
  const { currentReport, loading, loadCourseReport, exportCurrentReport } = useReportStore()

  useEffect(() => {
    // Load report for course CS101 (mock data)
    loadCourseReport('CS101')
  }, [loadCourseReport])

  if (loading) return <div>Loading...</div>
  if (!currentReport) return <div>No report data available</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Báo cáo: {currentReport.courseName}
        </h1>
        <button
          onClick={exportCurrentReport}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold mb-2">Tỷ lệ có mặt</h3>
          <p className="text-2xl">{currentReport.overallStats.presentPercentage.toFixed(1)}%</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold mb-2">Tỷ lệ vắng</h3>
          <p className="text-2xl">{currentReport.overallStats.absentPercentage.toFixed(1)}%</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold mb-2">Tỷ lệ đi muộn</h3>
          <p className="text-2xl">{currentReport.overallStats.latePercentage.toFixed(1)}%</p>
        </div>
      </div>
    </div>
  )
}

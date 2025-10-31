import { useAuthStore } from '../../store/auth.store'
import { Link } from 'react-router-dom'
import { Card } from "../../components/ui/card"
import { BarChart2, Users, Clock } from "lucide-react"
import { cn } from "../../lib/utils"

export default function HomePage() {
  const user = useAuthStore(state => state.user)

  const stats = [
    {
      title: "Tổng số buổi học",
      value: "24",
      icon: Clock,
      trend: "+12%",
      trendUp: true
    },
    {
      title: "Tổng số sinh viên",
      value: "438",
      icon: Users,
      trend: "+5%",
      trendUp: true
    },
    {
      title: "Tỷ lệ điểm danh",
      value: "92%",
      icon: BarChart2,
      trend: "-2%",
      trendUp: false
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Tổng quan về điểm danh hôm nay</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <stat.icon className="w-16 h-16 text-purple-600" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <div className="flex items-baseline space-x-2">
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <span className={cn(
                  "text-sm font-medium",
                  stat.trendUp ? "text-green-600" : "text-red-600"
                )}>
                  {stat.trend}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-2">
          <h2 className="text-lg font-semibold mb-4">Phiên điểm danh gần đây</h2>
          {/* Add table or chart here */}
        </Card>
      </div>
    </div>
  )
}

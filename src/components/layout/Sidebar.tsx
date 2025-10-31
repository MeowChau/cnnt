import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/utils'
import {
  Boxes,
  ClipboardList,
  BarChart2,
  LogOut,
} from 'lucide-react'
import { useAuthStore } from '../../store/auth.store'

const menuItems = [
  {
    group: "CHỨC NĂNG CHÍNH",
    items: [
      { 
        title: 'Trang chủ',
        icon: Boxes,
        path: '/home'
      },
      {
        title: 'Điểm danh',
        icon: ClipboardList,
        path: '/sessions/SES001/attendance'
      },
      {
        title: 'Báo cáo',
        icon: BarChart2,
        path: '/reports'
      }
    ]
  }
]

export const Sidebar = () => {
  const location = useLocation()
  const logout = useAuthStore(state => state.logout)
  const user = useAuthStore(state => state.user)

  return (
    <div className="fixed left-0 h-screen w-[300px] bg-white border-r">
      {/* Logo */}
      <div className="h-[70px] flex items-center gap-2 px-6 border-b">
        <div className="w-10 h-10 rounded bg-purple-100 flex items-center justify-center">
          <ClipboardList className="h-6 w-6 text-purple-700" />
        </div>
        <div>
          <h1 className="font-bold text-xl text-purple-900">Face Attendance</h1>
          <p className="text-xs text-purple-600">Hệ thống điểm danh</p>
        </div>
      </div>

      {/* User Info */}
      <div className="px-4 py-6">
        <div className="flex items-center gap-3 px-2">
          <div className="h-10 w-10 rounded bg-purple-100 flex items-center justify-center">
            <span className="text-purple-700 font-medium">{user?.name.charAt(0)}</span>
          </div>
          <div>
            <p className="font-medium text-gray-900">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Menu Groups */}
      <div className="px-4 space-y-6">
        {menuItems.map((group, idx) => (
          <div key={idx}>
            <p className="text-xs font-semibold text-gray-400 px-2 mb-2">
              {group.group}
            </p>
            <nav className="space-y-1">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-2 py-2 rounded transition-colors",
                      isActive 
                        ? "text-purple-700 bg-purple-50" 
                        : "text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded flex items-center justify-center",
                      isActive ? "bg-purple-100" : "bg-gray-100"
                    )}>
                      <item.icon className={cn(
                        "w-5 h-5",
                        isActive ? "text-purple-700" : "text-gray-500"
                      )} />
                    </div>
                    <span className="font-medium">{item.title}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-2 py-2 w-full text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded transition-colors"
        >
          <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
            <LogOut className="w-5 h-5 text-gray-500" />
          </div>
          <span className="font-medium">Đăng xuất</span>
        </button>
      </div>
    </div>
  )
}

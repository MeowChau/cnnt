import { Sidebar } from './Sidebar'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-[300px]">
        <div className="max-w-6xl mx-auto p-8 py-6">
          {children}
        </div>
      </main>
    </div>
  )
}

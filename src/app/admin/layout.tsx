"use client"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Plus, Edit, Trash2, Menu, Users, LogOut, Settings, Star } from "lucide-react"
import { ToastProvider } from "@/components/ui/toast"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")
    if (!token || !user) {
      router.push("/admin/login")
    } else {
      try {
        const userData = JSON.parse(user)
        if (userData.role !== "admin") {
          router.push("/admin/login")
        }
      } catch {
        router.push("/admin/login")
      }
    }
  }, [router])

  if (pathname === "/admin/login") {
    return <div className="h-[100vh]">{children}</div>
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const page = [
  { id: 1, name: "Yarat", slug: "create", icon: Plus },
  { id: 3, name: "Sil", slug: "delete", icon: Trash2 },
  { id: 4, name: "İstifadəçilər", slug: "users", icon: Users },
 
]

  return (
    <ToastProvider>
    <div className="flex justify-between w-full h-[100vh] bg-gradient-to-br from-gray-50 to-gray-100"><div className={`${sidebarOpen ? 'w-[280px]' : 'w-[80px]'} h-[100vh] bg-white/80 backdrop-blur-xl border-r border-gray-200/50 shadow-2xl flex flex-col relative transition-all duration-300 ease-in-out`}><div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 to-purple-50/20 pointer-events-none"></div><div className="relative w-full flex justify-between items-center p-6 border-b border-gray-200/60">
          <div className={`flex items-center gap-3 transition-all duration-300 ${!sidebarOpen && 'justify-center w-full'}`}>
          
            {sidebarOpen && (
              <h2 className="text-gray-900 font-bold text-2xl tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
                ETOR
              </h2>
            )}
          </div>
          <button 
            onClick={toggleSidebar}
            className={`p-2 hover:bg-white/60 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-md ${!sidebarOpen && 'absolute right-6'}`}
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div><div className="relative flex flex-col p-4 space-y-2 flex-1">
          {sidebarOpen && (
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-3">
              Əməliyyatlar
            </h3>
          )}
          {page.map((item) => {
            const Icon = item.icon
            const isActive = pathname === `/admin/${item.slug}`
            return (
              <Link
                key={item.id}
                href={`/admin/${item.slug}`}
                className={`relative flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-4 rounded-2xl transition-all duration-300 group ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl shadow-blue-500/25 transform scale-[1.02]"
                    : "text-gray-700 hover:text-gray-900 hover:bg-white/60 hover:shadow-lg hover:scale-[1.01]"
                }`}
                title={!sidebarOpen ? item.name : undefined}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl opacity-90"></div>
                )}
                <Icon
                  className={`relative z-10 w-5 h-5 transition-all duration-300 ${
                    isActive 
                      ? "text-white drop-shadow-sm" 
                      : "text-gray-500 group-hover:text-blue-600 group-hover:scale-110"
                  }`}
                />
                {sidebarOpen && (
                  <>
                    <span className={`relative z-10 font-medium ${isActive ? "text-white" : ""}`}>
                      {item.name}
                    </span>
                    {isActive && (
                      <div className="absolute right-3 w-2 h-2 bg-white/40 rounded-full"></div>
                    )}
                  </>
                )}
              </Link>
            )
          })}

        
        </div><div className="relative p-4 border-t border-gray-200/60 bg-gradient-to-r from-white/50 to-gray-50/50">
          <div className={`flex items-center ${sidebarOpen ? 'gap-3 p-4' : 'justify-center p-2'} bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 transition-all duration-300`}>
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-bold">A</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            {sidebarOpen && (
              <>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Admin</p>
                  <p className="text-xs text-gray-500">admin@etor.com</p>
                </div>
                <button className="p-2 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-105 group">
                  <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-500 transition-colors" />
                </button>
              </>
            )}
          </div>
        </div>
      </div><div className="flex-1 h-[100vh] p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
    </ToastProvider>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Recycle, Settings, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

interface DashboardNavigationProps {
  currentPage?: string
  userTokens?: number
}

export function DashboardNavigation({ currentPage, userTokens = 10 }: DashboardNavigationProps) {
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const handleLogout = () => {
    // Clear any stored auth data
    localStorage.removeItem("user")
    router.push("/")
  }

  return (
    <nav className="bg-white border-b border-green-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigation("/")}>
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Recycle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Borla2Earn</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => handleNavigation("/dashboard")}
              className={`text-sm font-medium transition-colors ${
                currentPage === "dashboard" ? "text-green-600" : "text-gray-600 hover:text-green-600"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => handleNavigation("/submit")}
              className={`text-sm font-medium transition-colors ${
                currentPage === "submit" ? "text-green-600" : "text-gray-600 hover:text-green-600"
              }`}
            >
              Submit Waste
            </button>
            <button
              onClick={() => handleNavigation("/leaderboard")}
              className={`text-sm font-medium transition-colors ${
                currentPage === "leaderboard" ? "text-green-600" : "text-gray-600 hover:text-green-600"
              }`}
            >
              Leaderboard
            </button>
            <button
              onClick={() => handleNavigation("/shop")}
              className={`text-sm font-medium transition-colors ${
                currentPage === "shop" ? "text-green-600" : "text-gray-600 hover:text-green-600"
              }`}
            >
              Shop
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                {userTokens} BORLA
              </Badge>
            </div>

            <Button variant="ghost" size="sm" onClick={() => handleNavigation("/settings")}>
              <Settings className="w-4 h-4" />
            </Button>

            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

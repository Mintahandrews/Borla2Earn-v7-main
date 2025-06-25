"use client"

import { Button } from "@/components/ui/button"
import { Recycle } from "lucide-react"
import { useRouter } from "next/navigation"

interface NavigationProps {
  variant?: "default" | "auth"
}

export function Navigation({ variant = "default" }: NavigationProps) {
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const handleExternalLink = (url: string) => {
    window.open(url, "_blank")
  }

  if (variant === "auth") {
    return (
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigation("/")}>
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Recycle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Borla2Earn</span>
          </div>
          <Button variant="outline" onClick={() => handleNavigation("/")}>
            Back to Home
          </Button>
        </div>
      </nav>
    )
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigation("/")}>
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <Recycle className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Borla2Earn</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => handleNavigation("/#how-it-works")}
            className="text-gray-600 hover:text-green-600 transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavigation("/#token")}
            className="text-gray-600 hover:text-green-600 transition-colors"
          >
            $BORLA Token
          </button>
          <button
            onClick={() => handleNavigation("/#impact")}
            className="text-gray-600 hover:text-green-600 transition-colors"
          >
            Impact
          </button>
          <button
            onClick={() => handleNavigation("/#roadmap")}
            className="text-gray-600 hover:text-green-600 transition-colors"
          >
            Roadmap
          </button>
          <button
            onClick={() => handleNavigation("/leaderboard")}
            className="text-gray-600 hover:text-green-600 transition-colors"
          >
            Leaderboard
          </button>
          <button
            onClick={() => handleNavigation("/shop")}
            className="text-gray-600 hover:text-green-600 transition-colors"
          >
            Shop
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => handleNavigation("/auth/login")}>
            Sign In
          </Button>
          <Button
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            onClick={() => handleNavigation("/auth/signup")}
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  )
}

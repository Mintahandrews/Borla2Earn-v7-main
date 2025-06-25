"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Award, TrendingUp, Crown } from "lucide-react"

interface LeaderboardUser {
  rank: number
  name: string
  wasteRecycled: number
  tokensEarned: number
  submissions: number
  joinDate: string
  avatar?: string
  badge?: string
}

// Replace mockLeaderboard with a smaller sample and add empty state handling
const mockLeaderboard: LeaderboardUser[] = [
  // Keep only 3 sample users to show what the leaderboard looks like
  {
    rank: 1,
    name: "Sarah Johnson",
    wasteRecycled: 156.7,
    tokensEarned: 892.3,
    submissions: 45,
    joinDate: "2024-01-15",
    badge: "Eco Champion",
  },
  {
    rank: 2,
    name: "Michael Chen",
    wasteRecycled: 142.3,
    tokensEarned: 756.8,
    submissions: 38,
    joinDate: "2024-02-03",
    badge: "Green Warrior",
  },
  {
    rank: 3,
    name: "Emma Williams",
    wasteRecycled: 128.9,
    tokensEarned: 689.4,
    submissions: 42,
    joinDate: "2024-01-28",
    badge: "Recycling Pro",
  },
]

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("all-time")

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-gray-600 font-bold">{rank}</span>
    }
  }

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white"
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600 text-white"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-purple-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
              <p className="text-gray-600">See how you rank among our top recyclers</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Top 3 Podium */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* 2nd Place */}
            <div className="order-1 md:order-1">
              <Card className="border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100">
                <CardContent className="text-center p-6">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-600">MC</span>
                    </div>
                    <div className="absolute -top-2 -right-2">
                      <Medal className="w-8 h-8 text-gray-400" />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">{mockLeaderboard[1].name}</h3>
                  <Badge className="bg-gray-200 text-gray-700 mb-2">{mockLeaderboard[1].badge}</Badge>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-600">{mockLeaderboard[1].wasteRecycled} kg recycled</p>
                    <p className="font-medium text-gray-800">{mockLeaderboard[1].tokensEarned} BORLA</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 1st Place */}
            <div className="order-2 md:order-2">
              <Card className="border-yellow-300 bg-gradient-to-br from-yellow-50 to-yellow-100 transform md:scale-110">
                <CardContent className="text-center p-6">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 bg-yellow-200 rounded-full mx-auto flex items-center justify-center">
                      <span className="text-2xl font-bold text-yellow-700">SJ</span>
                    </div>
                    <div className="absolute -top-3 -right-3">
                      <Crown className="w-10 h-10 text-yellow-500" />
                    </div>
                  </div>
                  <h3 className="font-bold text-xl text-gray-900">{mockLeaderboard[0].name}</h3>
                  <Badge className="bg-yellow-500 text-white mb-2">{mockLeaderboard[0].badge}</Badge>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-600">{mockLeaderboard[0].wasteRecycled} kg recycled</p>
                    <p className="font-medium text-gray-800">{mockLeaderboard[0].tokensEarned} BORLA</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 3rd Place */}
            <div className="order-3 md:order-3">
              <Card className="border-amber-300 bg-gradient-to-br from-amber-50 to-amber-100">
                <CardContent className="text-center p-6">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 bg-amber-200 rounded-full mx-auto flex items-center justify-center">
                      <span className="text-2xl font-bold text-amber-700">EW</span>
                    </div>
                    <div className="absolute -top-2 -right-2">
                      <Award className="w-8 h-8 text-amber-600" />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">{mockLeaderboard[2].name}</h3>
                  <Badge className="bg-amber-500 text-white mb-2">{mockLeaderboard[2].badge}</Badge>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-600">{mockLeaderboard[2].wasteRecycled} kg recycled</p>
                    <p className="font-medium text-gray-800">{mockLeaderboard[2].tokensEarned} BORLA</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-6">
            <TabsTrigger value="all-time">All Time</TabsTrigger>
            <TabsTrigger value="monthly">This Month</TabsTrigger>
            <TabsTrigger value="weekly">This Week</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-purple-600" />
                  {activeTab === "all-time"
                    ? "All-Time Leaders"
                    : activeTab === "monthly"
                      ? "Monthly Leaders"
                      : "Weekly Leaders"}
                </CardTitle>
                <CardDescription>Top recyclers ranked by total waste recycled and tokens earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockLeaderboard.map((user, index) => (
                    <div
                      key={user.rank}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-all hover:shadow-md ${
                        user.rank <= 3
                          ? "bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${getRankBadgeColor(user.rank)}`}
                        >
                          {getRankIcon(user.rank)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-gray-900">{user.name}</h4>
                            {user.badge && (
                              <Badge variant="secondary" className="text-xs">
                                {user.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            Member since {new Date(user.joinDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Waste</p>
                            <p className="font-medium">{user.wasteRecycled} kg</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Tokens</p>
                            <p className="font-medium text-green-600">{user.tokensEarned}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Submissions</p>
                            <p className="font-medium">{user.submissions}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Your Rank Card */}
        <Card className="mt-8 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                  <span className="font-bold text-blue-700">-</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Your Current Rank</h4>
                  <p className="text-sm text-gray-600">Start recycling to join the leaderboard!</p>
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => (window.location.href = "/submit")}>
                <TrendingUp className="w-4 h-4 mr-2" />
                Start Recycling
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

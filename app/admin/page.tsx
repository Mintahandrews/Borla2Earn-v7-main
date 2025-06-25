"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Recycle,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Download,
  Eye,
  BarChart3,
  MapPin,
} from "lucide-react"

interface AdminSubmission {
  id: number
  userId: number
  userName: string
  userEmail: string
  date: string
  wasteType: string
  quantity: number
  unit: string
  status: "pending" | "verified" | "rejected"
  location: string
  submittedAt: string
  verifiedBy?: string
  verifiedAt?: string
}

const mockAdminSubmissions: AdminSubmission[] = [
  {
    id: 1,
    userId: 101,
    userName: "John Doe",
    userEmail: "john@example.com",
    date: "2024-12-15",
    wasteType: "Plastic Bottles",
    quantity: 2.5,
    unit: "kg",
    status: "pending",
    location: "Accra Central Hub",
    submittedAt: "2024-12-15 10:30:00",
  },
  {
    id: 2,
    userId: 102,
    userName: "Jane Smith",
    userEmail: "jane@example.com",
    date: "2024-12-14",
    wasteType: "Glass Bottles",
    quantity: 1.8,
    unit: "kg",
    status: "verified",
    location: "Tema Community Center",
    submittedAt: "2024-12-14 14:20:00",
    verifiedBy: "Admin User",
    verifiedAt: "2024-12-14 16:45:00",
  },
  {
    id: 3,
    userId: 103,
    userName: "Mike Johnson",
    userEmail: "mike@example.com",
    date: "2024-12-14",
    wasteType: "Paper",
    quantity: 3.2,
    unit: "kg",
    status: "pending",
    location: "East Legon Station",
    submittedAt: "2024-12-14 09:15:00",
  },
  {
    id: 4,
    userId: 104,
    userName: "Sarah Wilson",
    userEmail: "sarah@example.com",
    date: "2024-12-13",
    wasteType: "Metal Cans",
    quantity: 0.8,
    unit: "kg",
    status: "rejected",
    location: "Kumasi Green Point",
    submittedAt: "2024-12-13 11:00:00",
    verifiedBy: "Admin User",
    verifiedAt: "2024-12-13 13:30:00",
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const totalUsers = 1247
  const totalSubmissions = 3456
  const pendingSubmissions = 23
  const totalTokensIssued = 45678.9

  const filteredSubmissions = mockAdminSubmissions.filter((submission) => {
    const matchesStatus = statusFilter === "all" || submission.status === statusFilter
    const matchesSearch =
      submission.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.wasteType.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const handleVerifySubmission = (id: number) => {
    console.log("Verifying submission:", id)
    // Here you would call the API to verify the submission
  }

  const handleRejectSubmission = (id: number) => {
    console.log("Rejecting submission:", id)
    // Here you would call the API to reject the submission
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "rejected":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-blue-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage waste submissions and user activities</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-600">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-200 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{totalUsers.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Submissions</p>
                  <p className="text-2xl font-bold text-gray-900">{totalSubmissions.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Recycle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Reviews</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingSubmissions}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tokens Issued</p>
                  <p className="text-2xl font-bold text-gray-900">{totalTokensIssued.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Submissions</CardTitle>
                  <CardDescription>Latest waste submissions requiring review</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAdminSubmissions
                      .filter((s) => s.status === "pending")
                      .slice(0, 3)
                      .map((submission) => (
                        <div
                          key={submission.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            {getStatusIcon(submission.status)}
                            <div>
                              <p className="font-medium text-sm">{submission.userName}</p>
                              <p className="text-xs text-gray-600">
                                {submission.wasteType} • {submission.quantity} {submission.unit}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleVerifySubmission(submission.id)}>
                              <CheckCircle className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleRejectSubmission(submission.id)}>
                              <XCircle className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Statistics</CardTitle>
                  <CardDescription>Key performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Verification Rate</span>
                      <span className="font-medium">94.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Avg. Processing Time</span>
                      <span className="font-medium">2.3 hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Active Collection Centers</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Monthly Growth</span>
                      <span className="font-medium text-green-600">+23.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="submissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Waste Submissions Management</CardTitle>
                <CardDescription>Review and manage all waste submissions</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search by user name or waste type..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submissions Table */}
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Waste Type</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSubmissions.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{submission.userName}</p>
                              <p className="text-xs text-gray-600">{submission.userEmail}</p>
                            </div>
                          </TableCell>
                          <TableCell>{submission.wasteType}</TableCell>
                          <TableCell>
                            {submission.quantity} {submission.unit}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-gray-400" />
                              <span className="text-sm">{submission.location}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(submission.status)}>{submission.status}</Badge>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {new Date(submission.submittedAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {submission.status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => handleVerifySubmission(submission.id)}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    <CheckCircle className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleRejectSubmission(submission.id)}
                                  >
                                    <XCircle className="w-3 h-3" />
                                  </Button>
                                </>
                              )}
                              <Button size="sm" variant="ghost">
                                <Eye className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage registered users and their activities</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">User management interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>Detailed insights and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Analytics dashboard coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

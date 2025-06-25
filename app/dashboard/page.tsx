'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Coins, 
  Recycle, 
  TrendingUp, 
  Award, 
  Plus, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Wallet,
  Loader2
} from 'lucide-react';
import { DashboardNavigation } from '@/components/dashboard-navigation';
import { apiGet } from '@/lib/api';

interface Submission {
  id: string;
  date: string;
  wasteType: string;
  quantity: number;
  unit: string;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  tokensAwarded: number;
  location?: string;
}

interface DashboardStats {
  totalTokens: number;
  totalWasteRecycled: number;
  monthlyGoal: number;
  currentRank: number;
  submissions: Submission[];
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await apiGet<DashboardStats>('/api/dashboard/stats');
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusIcon = (status: Submission['status']) => {
    switch (status) {
      case 'VERIFIED':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'REJECTED':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'PENDING':
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: Submission['status']) => {
    switch (status) {
      case 'VERIFIED':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'REJECTED':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'PENDING':
      default:
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
        <XCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Dashboard</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <DashboardNavigation currentPage="dashboard" userTokens={stats.totalTokens} />

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-200 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total BORLA Tokens</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalTokens.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Coins className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Waste Recycled</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalWasteRecycled.toFixed(2)} kg
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Recycle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Monthly Progress</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round((stats.totalWasteRecycled / stats.monthlyGoal) * 100)}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <Progress value={(stats.totalWasteRecycled / stats.monthlyGoal) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Leaderboard Rank</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats?.currentRank ? `#${stats.currentRank}` : 'Unranked'}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="submissions">My Submissions</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                  <CardDescription>Your latest waste submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  {stats.submissions.length === 0 ? (
                    <div className="text-center py-8">
                      <Recycle className="mx-auto h-12 w-12 text-gray-300" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No submissions yet</h3>
                      <p className="mt-1 text-sm text-gray-500">Start by submitting your first waste collection.</p>
                      <div className="mt-6">
                        <Button 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => router.push('/dashboard/submit')}
                        >
                          <Plus className="-ml-1 mr-2 h-5 w-5" />
                          New Submission
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {stats.submissions.slice(0, 3).map((submission: Submission) => (
                        <div
                          key={submission.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                          onClick={() => router.push(`/dashboard/submissions/${submission.id}`)}
                        >
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(submission.status)}
                            <div>
                              <p className="font-medium text-sm">{submission.wasteType}</p>
                              <p className="text-xs text-gray-600">
                                {submission.quantity} {submission.unit} • {formatDate(submission.date)}
                              </p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(submission.status)}>
                            {submission.status.charAt(0) + submission.status.slice(1).toLowerCase()}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Monthly Goal */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Goal</CardTitle>
                  <CardDescription>Track your recycling progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Goal: {stats.monthlyGoal} kg</span>
                      <span className="text-sm font-medium">{stats.totalWasteRecycled.toFixed(2)} kg</span>
                    </div>
                    <Progress 
                      value={(stats.totalWasteRecycled / stats.monthlyGoal) * 100} 
                      className="h-2" 
                    />
                    <p className="text-xs text-gray-600">
                      {Math.round((stats.totalWasteRecycled / stats.monthlyGoal) * 100)}% of monthly goal
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Your recycling milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Award className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="font-medium text-sm">First Submission</p>
                      <p className="text-xs text-gray-600">Completed your first waste submission</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="font-medium text-sm">10kg Milestone</p>
                      <p className="text-xs text-gray-600">Recycled 10kg of waste</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg opacity-50">
                    <Recycle className="w-6 h-6 text-gray-400" />
                    <div>
                      <p className="font-medium text-sm">Eco Warrior</p>
                      <p className="text-xs text-gray-600">Recycle 50kg of waste (32.7kg remaining)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

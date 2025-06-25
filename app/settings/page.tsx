"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Settings,
  Wallet,
  Bell,
  Shield,
  Globe,
  Download,
  Trash2,
  Camera,
  Edit,
  Save,
  Eye,
  EyeOff,
  Copy,
  CheckCircle,
  Award,
  TrendingUp,
  Recycle,
  Coins,
  Users,
  ExternalLink,
  AlertTriangle,
  Info,
} from "lucide-react"
import { TokenSwapWidget } from "@/components/token-swap-widget"

interface UserProfile {
  name: string
  email: string
  bio: string
  location: string
  joinDate: string
  avatar?: string
  walletAddress?: string
  isWalletConnected: boolean
}

interface UserStats {
  totalWasteRecycled: number
  totalTokensEarned: number
  totalSubmissions: number
  rank: number
  co2Saved: number
  treesEquivalent: number
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: string
  progress?: number
  maxProgress?: number
}

export default function UserSettings() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [copied, setCopied] = useState(false)

  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    bio: "",
    location: "",
    joinDate: new Date().toISOString().split("T")[0],
    walletAddress: undefined,
    isWalletConnected: false,
  })

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      submissions: true,
      rewards: true,
      leaderboard: false,
      newsletter: true,
    },
    privacy: {
      showProfile: true,
      showStats: true,
      showOnLeaderboard: true,
    },
    preferences: {
      language: "en",
      theme: "light",
      units: "metric",
      currency: "GHS",
    },
  })

  const userStats: UserStats = {
    totalWasteRecycled: 0,
    totalTokensEarned: 10, // Welcome bonus
    totalSubmissions: 0,
    rank: 0,
    co2Saved: 0,
    treesEquivalent: 0,
  }

  const achievements: Achievement[] = [
    {
      id: "first-submission",
      name: "First Steps",
      description: "Made your first waste submission",
      icon: "🎯",
      progress: 0,
      maxProgress: 1,
    },
    {
      id: "10kg-milestone",
      name: "10kg Recycler",
      description: "Recycled 10kg of waste",
      icon: "♻️",
      progress: 0,
      maxProgress: 10,
    },
    {
      id: "100-tokens",
      name: "Token Collector",
      description: "Earned 100 BORLA tokens",
      icon: "🪙",
      progress: 10,
      maxProgress: 100,
    },
    {
      id: "eco-warrior",
      name: "Eco Warrior",
      description: "Recycle 50kg of waste",
      icon: "🌱",
      progress: 0,
      maxProgress: 50,
    },
    {
      id: "community-leader",
      name: "Community Leader",
      description: "Refer 10 new users",
      icon: "👥",
      progress: 0,
      maxProgress: 10,
    },
  ]

  const handleProfileUpdate = () => {
    setIsEditing(false)
    // Here you would save the profile data to the backend
    console.log("Profile updated:", profile)
  }

  const handleWalletConnect = () => {
    // Here you would implement wallet connection logic
    console.log("Connecting wallet...")
  }

  const handleWalletDisconnect = () => {
    setProfile((prev) => ({ ...prev, isWalletConnected: false, walletAddress: undefined }))
  }

  const copyWalletAddress = () => {
    if (profile.walletAddress) {
      navigator.clipboard.writeText(profile.walletAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleExportData = () => {
    // Here you would implement data export functionality
    console.log("Exporting user data...")
  }

  const handleDeleteAccount = () => {
    // Here you would implement account deletion with proper confirmation
    console.log("Account deletion requested...")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-blue-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings & Profile</h1>
              <p className="text-gray-600">Manage your account, preferences, and privacy settings</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
            <TabsTrigger value="swap">Token Swap</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Information */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your personal information and bio</CardDescription>
                      </div>
                      <Button
                        variant={isEditing ? "default" : "outline"}
                        onClick={isEditing ? handleProfileUpdate : () => setIsEditing(true)}
                      >
                        {isEditing ? (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </>
                        ) : (
                          <>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Profile
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Avatar Section */}
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <Avatar className="w-20 h-20">
                          <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-lg">
                            {profile.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                          <Button
                            size="sm"
                            className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
                            variant="secondary"
                          >
                            <Camera className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{profile.name}</h3>
                        <p className="text-sm text-gray-600">
                          Member since {new Date(profile.joinDate).toLocaleDateString()}
                        </p>
                        <Badge className="mt-1 bg-green-100 text-green-700">Verified User</Badge>
                      </div>
                    </div>

                    <Separator />

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile((prev) => ({ ...prev, location: e.target.value }))}
                        disabled={!isEditing}
                        placeholder="City, Country"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                        disabled={!isEditing}
                        placeholder="Tell us about yourself and your environmental goals..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Stats Card */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      Your Impact
                    </CardTitle>
                    <CardDescription>Your environmental contribution</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <Recycle className="w-6 h-6 text-green-600 mx-auto mb-1" />
                        <p className="text-lg font-bold text-gray-900">{userStats.totalWasteRecycled} kg</p>
                        <p className="text-xs text-gray-600">Waste Recycled</p>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <Coins className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
                        <p className="text-lg font-bold text-gray-900">{userStats.totalTokensEarned}</p>
                        <p className="text-xs text-gray-600">BORLA Earned</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">CO₂ Saved</span>
                        <span className="font-medium">{userStats.co2Saved} kg</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Trees Equivalent</span>
                        <span className="font-medium">{userStats.treesEquivalent} trees</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Global Rank</span>
                        <Badge variant="secondary">#{userStats.rank}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Security Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>Manage your account security and authentication</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter current password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" placeholder="Enter new password" />
                  </div>

                  <div>
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                  </div>

                  <Button className="w-full">Update Password</Button>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-600">Add an extra layer of security</p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Login Notifications</p>
                        <p className="text-sm text-gray-600">Get notified of new logins</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-purple-600" />
                    Preferences
                  </CardTitle>
                  <CardDescription>Customize your app experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={settings.preferences.language}
                      onValueChange={(value) =>
                        setSettings((prev) => ({ ...prev, preferences: { ...prev.preferences, language: value } }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="tw">Twi</SelectItem>
                        <SelectItem value="ga">Ga</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="theme">Theme</Label>
                    <Select
                      value={settings.preferences.theme}
                      onValueChange={(value) =>
                        setSettings((prev) => ({ ...prev, preferences: { ...prev.preferences, theme: value } }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="units">Units</Label>
                    <Select
                      value={settings.preferences.units}
                      onValueChange={(value) =>
                        setSettings((prev) => ({ ...prev, preferences: { ...prev.preferences, units: value } }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="metric">Metric (kg, km)</SelectItem>
                        <SelectItem value="imperial">Imperial (lbs, miles)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={settings.preferences.currency}
                      onValueChange={(value) =>
                        setSettings((prev) => ({ ...prev, preferences: { ...prev.preferences, currency: value } }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GHS">Ghanaian Cedi (GHS)</SelectItem>
                        <SelectItem value="USD">US Dollar (USD)</SelectItem>
                        <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Data Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-green-600" />
                  Data Management
                </CardTitle>
                <CardDescription>Export your data or delete your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Export Your Data</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Download a copy of all your data including submissions, rewards, and activity history.
                    </p>
                    <Button variant="outline" onClick={handleExportData} className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                  </div>

                  <div className="p-4 border border-red-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Delete Account</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <Button variant="destructive" onClick={handleDeleteAccount} className="w-full">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wallet Tab */}
          <TabsContent value="wallet" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-blue-600" />
                  Wallet Connection
                </CardTitle>
                <CardDescription>Manage your blockchain wallet connection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {profile.isWalletConnected ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-green-800">Wallet Connected</p>
                          <p className="text-sm text-green-600">Your wallet is successfully connected</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700">Connected</Badge>
                    </div>

                    <div>
                      <Label>Wallet Address</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input value={profile.walletAddress} readOnly className="font-mono text-sm" />
                        <Button variant="outline" size="sm" onClick={copyWalletAddress}>
                          {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">BORLA Balance</h4>
                        <p className="text-2xl font-bold text-green-600">{userStats.totalTokensEarned}</p>
                        <p className="text-sm text-gray-600">≈ ${(userStats.totalTokensEarned * 0.1).toFixed(2)} USD</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Network</h4>
                        <p className="text-lg font-medium">Celo Mainnet</p>
                        <p className="text-sm text-gray-600">Low gas fees</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View on Explorer
                      </Button>
                      <Button variant="destructive" onClick={handleWalletDisconnect}>
                        Disconnect Wallet
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Wallet className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Wallet Connected</h3>
                    <p className="text-gray-600 mb-6">
                      Connect your wallet to receive BORLA tokens and interact with the blockchain
                    </p>
                    <div className="space-y-3 max-w-sm mx-auto">
                      <Button onClick={handleWalletConnect} className="w-full">
                        Connect MetaMask
                      </Button>
                      <Button variant="outline" className="w-full">
                        Connect WalletConnect
                      </Button>
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Wallet Security Tips:</p>
                      <ul className="list-disc list-inside space-y-1 text-blue-700">
                        <li>Never share your private keys or seed phrase</li>
                        <li>Always verify transaction details before signing</li>
                        <li>Use hardware wallets for large amounts</li>
                        <li>Keep your wallet software updated</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Token Swap Tab */}
          <TabsContent value="swap" className="space-y-6">
            <TokenSwapWidget userBalance={userStats.totalTokensEarned} />
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-yellow-600" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose what notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Email Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Submission Updates</p>
                        <p className="text-sm text-gray-600">Get notified when your submissions are reviewed</p>
                      </div>
                      <Switch
                        checked={settings.notifications.submissions}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({
                            ...prev,
                            notifications: { ...prev.notifications, submissions: checked },
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Reward Notifications</p>
                        <p className="text-sm text-gray-600">Get notified when you earn BORLA tokens</p>
                      </div>
                      <Switch
                        checked={settings.notifications.rewards}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({
                            ...prev,
                            notifications: { ...prev.notifications, rewards: checked },
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Leaderboard Updates</p>
                        <p className="text-sm text-gray-600">Get notified about your ranking changes</p>
                      </div>
                      <Switch
                        checked={settings.notifications.leaderboard}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({
                            ...prev,
                            notifications: { ...prev.notifications, leaderboard: checked },
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Newsletter</p>
                        <p className="text-sm text-gray-600">Receive our weekly environmental newsletter</p>
                      </div>
                      <Switch
                        checked={settings.notifications.newsletter}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({
                            ...prev,
                            notifications: { ...prev.notifications, newsletter: checked },
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Push Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Enable Push Notifications</p>
                        <p className="text-sm text-gray-600">Receive real-time notifications on your device</p>
                      </div>
                      <Switch
                        checked={settings.notifications.push}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({
                            ...prev,
                            notifications: { ...prev.notifications, push: checked },
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>Control what information is visible to other users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Profile on Leaderboard</p>
                      <p className="text-sm text-gray-600">Display your name and stats on public leaderboards</p>
                    </div>
                    <Switch
                      checked={settings.privacy.showOnLeaderboard}
                      onCheckedChange={(checked) =>
                        setSettings((prev) => ({
                          ...prev,
                          privacy: { ...prev.privacy, showOnLeaderboard: checked },
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Public Profile</p>
                      <p className="text-sm text-gray-600">Allow other users to view your profile information</p>
                    </div>
                    <Switch
                      checked={settings.privacy.showProfile}
                      onCheckedChange={(checked) =>
                        setSettings((prev) => ({
                          ...prev,
                          privacy: { ...prev.privacy, showProfile: checked },
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Statistics</p>
                      <p className="text-sm text-gray-600">Display your recycling stats and achievements publicly</p>
                    </div>
                    <Switch
                      checked={settings.privacy.showStats}
                      onCheckedChange={(checked) =>
                        setSettings((prev) => ({
                          ...prev,
                          privacy: { ...prev.privacy, showStats: checked },
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium mb-1">Privacy Notice:</p>
                      <p>
                        Your wallet address and transaction history on the blockchain are always public. These settings
                        only control what's displayed in our app interface.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  Achievements & Badges
                </CardTitle>
                <CardDescription>Track your progress and unlock new achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 border rounded-lg ${
                        achievement.unlockedAt ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`text-2xl ${achievement.unlockedAt ? "" : "grayscale opacity-50"}`}>
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium ${achievement.unlockedAt ? "text-green-800" : "text-gray-600"}`}>
                            {achievement.name}
                          </h4>
                          <p className={`text-sm ${achievement.unlockedAt ? "text-green-600" : "text-gray-500"}`}>
                            {achievement.description}
                          </p>

                          {achievement.unlockedAt ? (
                            <Badge className="mt-2 bg-green-100 text-green-700">
                              Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                            </Badge>
                          ) : achievement.progress !== undefined ? (
                            <div className="mt-2">
                              <div className="flex justify-between text-xs text-gray-600 mb-1">
                                <span>Progress</span>
                                <span>
                                  {achievement.progress}/{achievement.maxProgress}
                                </span>
                              </div>
                              <Progress
                                value={(achievement.progress / (achievement.maxProgress || 1)) * 100}
                                className="h-2"
                              />
                            </div>
                          ) : (
                            <Badge variant="secondary" className="mt-2">
                              Locked
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Referral Program */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Referral Program
                </CardTitle>
                <CardDescription>Invite friends and earn bonus BORLA tokens</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Your Referral Code</h4>
                    <div className="flex items-center gap-2">
                      <Input value="BORLA-JD2024" readOnly className="font-mono" />
                      <Button variant="outline" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-blue-600 mt-2">
                      Share this code with friends. You both get 10 BORLA tokens when they make their first submission!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-gray-900">3</p>
                      <p className="text-sm text-gray-600">Friends Referred</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-gray-900">30</p>
                      <p className="text-sm text-gray-600">Bonus Tokens Earned</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-gray-900">7</p>
                      <p className="text-sm text-gray-600">Tokens to Next Reward</p>
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

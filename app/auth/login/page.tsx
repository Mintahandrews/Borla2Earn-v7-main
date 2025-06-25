"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn, useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Wallet, Mail, Lock, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [loginMethod, setLoginMethod] = useState<"email" | "wallet">("email")

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("") // Clear error when user types
  }

  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const { data: session } = useSession()

  // Redirect if already authenticated
  useEffect(() => {
    if (session) {
      router.push(callbackUrl)
    }
  }, [session, callbackUrl, router])

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email.trim(),
        password: formData.password,
        callbackUrl
      })

      if (result?.error) {
        // More user-friendly error messages
        if (result.error === 'CredentialsSignin') {
          throw new Error('Invalid email or password. Please try again.')
        }
        throw new Error('Login failed. Please try again.')
      }

      // Handle successful login
      if (result?.url) {
        window.location.href = result.url
      } else {
        router.push(callbackUrl)
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleWalletLogin = async () => {
    setIsLoading(true)
    setError("")

    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === "undefined") {
        throw new Error("MetaMask is not installed. Please install MetaMask to continue.")
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (accounts.length === 0) {
        throw new Error("No accounts found. Please connect your wallet.")
      }

      // Simulate wallet authentication
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to dashboard on success
      window.location.href = "/dashboard"
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <Navigation variant="auth" />

        <Card className="border-green-200 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">Choose your preferred sign-in method</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Login Method Toggle */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={loginMethod === "email" ? "default" : "outline"}
                onClick={() => setLoginMethod("email")}
                className="w-full"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
              <Button
                variant={loginMethod === "wallet" ? "default" : "outline"}
                onClick={() => setLoginMethod("wallet")}
                className="w-full"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Wallet
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {loginMethod === "email" ? (
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                      disabled={isLoading}
                    />
                    <Label htmlFor="remember" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Link href="/auth/forgot-password" className="text-sm text-green-600 hover:text-green-700">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="text-center py-8">
                  <Wallet className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Connect Your Wallet</h3>
                  <p className="text-gray-600 mb-6">Sign in securely using your crypto wallet</p>
                  <Button onClick={handleWalletLogin} className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Wallet className="w-4 h-4 mr-2" />
                        Connect MetaMask
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-green-600 hover:text-green-700 font-medium">
                  Sign up here
                </Link>
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-800 font-medium mb-1">Demo Credentials:</p>
              <p className="text-xs text-blue-700">Email: demo@borla2earn.io</p>
              <p className="text-xs text-blue-700">Password: demo123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

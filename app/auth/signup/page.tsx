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
import { Progress } from "@/components/ui/progress"
import { Eye, EyeOff, User, MapPin, AlertCircle, Loader2, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  location: string
  termsAccepted: boolean
  agreeToNewsletter: boolean
}

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const { data: session } = useSession()
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    termsAccepted: false,
    agreeToNewsletter: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Redirect if already authenticated
  useEffect(() => {
    if (session) {
      router.push(callbackUrl)
    }
  }, [session, callbackUrl, router])

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const validateStep1 = (): string | null => {
    if (!formData.firstName.trim()) return "First name is required"
    if (!formData.lastName.trim()) return "Last name is required"
    if (!formData.email.trim()) return "Email is required"
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Please enter a valid email"
    if (!formData.termsAccepted) return "You must accept the terms and conditions"
    return null
  }

  const validateStep2 = (): string | null => {
    if (formData.password.length < 8) return "Password must be at least 8 characters"
    if (formData.password !== formData.confirmPassword) return "Passwords do not match"
    if (!formData.location.trim()) return "Location is required"
    return null
  }

  const getPasswordStrength = () => {
    const password = formData.password
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    if (/[^A-Za-z0-9]/.test(password)) strength += 25
    return strength
  }

  const getPasswordStrengthText = () => {
    const strength = getPasswordStrength()
    if (strength < 25) return "Very Weak"
    if (strength < 50) return "Weak"
    if (strength < 75) return "Good"
    return "Strong"
  }

  const getPasswordStrengthColor = () => {
    const strength = getPasswordStrength()
    if (strength < 25) return "bg-red-500"
    if (strength < 50) return "bg-orange-500"
    if (strength < 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()
    const error = validateStep1()
    if (error) {
      setError(error)
      return
    }
    setCurrentStep(2)
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const error = validateStep2()
    if (error) {
      setError(error)
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Register the user
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          location: formData.location,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed. Please try again.')
      }
      
      // Automatically sign in the user after successful registration
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
        callbackUrl
      })

      if (result?.error) {
        throw new Error('Registration successful, but login failed. Please try logging in.')
      }

      // Redirect to dashboard after successful signup and login
      if (result?.url) {
        window.location.href = result.url
      } else {
        router.push(callbackUrl)
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during signup. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation variant="auth" />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-md">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
              <CardDescription>
                Join Borla2Earn and start earning rewards for recycling
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Step {currentStep} of 2</span>
                  <span className="text-sm text-muted-foreground">
                    {currentStep === 1 ? 'Account' : 'Profile'}
                  </span>
                </div>
                <Progress value={currentStep === 1 ? 50 : 100} className="h-2" />
              </div>

              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {currentStep === 1 ? (
                <form onSubmit={handleNextStep} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      {formData.password && (
                        <span className="text-xs text-muted-foreground">
                          {getPasswordStrengthText()}
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        required
                        minLength={8}
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {formData.password && (
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getPasswordStrengthColor()}`}
                          style={{ width: `${getPasswordStrength()}%` }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.termsAccepted}
                        onCheckedChange={(checked) => handleInputChange('termsAccepted', checked === true)}
                        required
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the{' '}
                          <Link href="/terms" className="text-primary underline underline-offset-4">
                            Terms and Conditions
                          </Link>
                        </label>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={formData.agreeToNewsletter}
                        onCheckedChange={(checked) => handleInputChange('agreeToNewsletter', checked === true)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="newsletter"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I want to receive updates and news
                        </label>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      'Continue'
                    )}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="location"
                        placeholder="Enter your location"
                        className="pl-9"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      We'll use this to show you relevant recycling centers and rewards.
                    </p>
                  </div>

                  <div className="pt-2">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        'Complete Registration'
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-2 w-full"
                      onClick={() => setCurrentStep(1)}
                      disabled={isLoading}
                    >
                      Back
                    </Button>
                  </div>
                </form>
              )}

              <div className="mt-6 text-center text-sm">
                Already have an account?{' '}
                <Link href="/auth/login" className="font-medium text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
